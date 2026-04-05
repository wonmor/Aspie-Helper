import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, KeyboardAvoidingView, Platform, Alert,
  Linking, ActivityIndicator, SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

const SYSTEM_PROMPT = `You are a compassionate, knowledgeable AI assistant specialised in supporting individuals with Asperger's Syndrome and Autism Spectrum Disorder (ASD).

Your responsibilities:
1. Provide accurate, evidence-based information about ASD, social communication, sensory processing, and mental health.
2. Explain social situations, unwritten social rules, and neurotypical communication patterns using clear, literal, direct language — no ambiguity.
3. Offer practical coping strategies for sensory overload, social anxiety, executive function difficulties, meltdowns, and shutdowns.
4. Discuss therapeutic approaches in an accessible way: CBT, DBT, social stories, mindfulness, and sensory integration.
5. Help users process and understand their emotions using concrete, structured frameworks (e.g., emotion scales, thought records).
6. Be a non-judgmental supportive companion during difficult social or emotional situations.

Communication rules:
- Use clear, direct, unambiguous sentences.
- Avoid sarcasm, irony, or figurative speech unless you are explicitly explaining them.
- When explaining complex topics, use numbered lists or clearly labelled sections.
- Be patient; never make the person feel judged for not understanding social conventions.
- Acknowledge that neurological differences are differences, not deficits.
- For any medical, diagnostic, or clinical decisions always advise the user to consult a qualified professional.

Remember: each person on the spectrum is unique. Ask clarifying questions when needed.`;

const QUICK_PROMPTS = [
  "How do I start a conversation with a stranger?",
  "What should I do during a sensory overload?",
  "Can you explain what 'reading between the lines' means?",
  "How can I manage social anxiety?",
  "Is stimming okay and why do I do it?",
  "How can I tell if someone is upset with me?",
  "What is executive dysfunction?",
  "How do I politely end a conversation?",
];

export default function ChatbotScreen() {
  const [savedApiKey, setSavedApiKey] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm your Aspie AI assistant.\n\nI'm here to help you navigate social situations, understand emotions, and explore strategies for Asperger's and ASD.\n\nYou can ask me anything — there are no wrong questions. What would you like to talk about?",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [screen, setScreen] = useState('chat'); // 'chat' | 'setup' | 'instructions'
  const scrollRef = useRef(null);

  useEffect(() => {
    loadApiKey();
  }, []);

  const loadApiKey = async () => {
    try {
      const key = await AsyncStorage.getItem('openai_api_key');
      if (key) setSavedApiKey(key);
    } catch (_) {}
  };

  const saveApiKey = async () => {
    const trimmed = apiKeyInput.trim();
    if (!trimmed) {
      Alert.alert('Empty Key', 'Please paste your API key before saving.');
      return;
    }
    if (!trimmed.startsWith('sk-')) {
      Alert.alert(
        'Invalid Key Format',
        'OpenAI API keys start with "sk-". Please double-check that you copied the full key from the OpenAI website.',
      );
      return;
    }
    try {
      await AsyncStorage.setItem('openai_api_key', trimmed);
      setSavedApiKey(trimmed);
      setApiKeyInput('');
      setScreen('chat');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('Saved!', 'Your API key has been saved. You can now chat with the AI assistant.');
    } catch (_) {
      Alert.alert('Error', 'Could not save the API key. Please try again.');
    }
  };

  const removeApiKey = () => {
    Alert.alert('Remove API Key', 'Are you sure? You will need to enter it again to use the chatbot.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('openai_api_key');
          setSavedApiKey('');
          setApiKeyInput('');
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        },
      },
    ]);
  };

  const sendMessage = async (overrideText) => {
    const content = (overrideText ?? inputText).trim();
    if (!content) return;
    if (!savedApiKey) {
      setScreen('setup');
      return;
    }

    const newMessages = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${savedApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.slice(-12),
          ],
          max_tokens: 700,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          Alert.alert('Invalid API Key', 'Your API key was rejected. Please go to Settings and re-enter it.');
        } else if (response.status === 429) {
          Alert.alert('Rate Limit', 'Too many requests. Please wait a moment and try again.');
        } else {
          Alert.alert('API Error', errData.error?.message || `Error ${response.status}. Please try again.`);
        }
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      const reply =
        data.choices?.[0]?.message?.content ??
        'Sorry, I could not generate a response. Please try again.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (_) {
      Alert.alert(
        'Connection Error',
        'Could not reach the AI service. Please check your internet connection and try again.',
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 200);
    }
  };

  const clearConversation = () => {
    Alert.alert('Clear Conversation', 'This will erase all messages. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          setMessages([
            {
              role: 'assistant',
              content:
                "Conversation cleared. I'm ready to help you again. What would you like to talk about?",
            },
          ]);
        },
      },
    ]);
  };

  // ─── Setup Screen ───────────────────────────────────────────────
  if (screen === 'setup') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.setupContainer}>
          <Text style={styles.setupTitle}>Connect AI Assistant</Text>
          <Text style={styles.setupSubtitle}>
            To use the AI chatbot, you need a free OpenAI API key. This key lets the app talk to ChatGPT on your behalf.
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Your key is stored only on this device</Text>
            <Text style={styles.infoCardBody}>
              The key is saved in your phone's private storage and is never sent anywhere except directly to OpenAI when you send a message.
            </Text>
          </View>

          <TouchableOpacity style={styles.instructionsButton} onPress={() => setScreen('instructions')}>
            <Text style={styles.instructionsButtonText}>How to get a free API key  →</Text>
          </TouchableOpacity>

          <Text style={styles.inputLabel}>Paste your OpenAI API key below:</Text>
          <TextInput
            style={styles.apiKeyInput}
            value={apiKeyInput}
            onChangeText={setApiKeyInput}
            placeholder="sk-..."
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveApiKey}>
            <Text style={styles.saveButtonText}>Save & Start Chatting</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setScreen('chat')}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── Instructions Screen ─────────────────────────────────────────
  if (screen === 'instructions') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.setupContainer}>
          <TouchableOpacity onPress={() => setScreen('setup')} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.setupTitle}>How to Get an OpenAI API Key</Text>
          <Text style={styles.setupSubtitle}>Follow these simple steps. It takes about 3 minutes.</Text>

          {[
            {
              step: '1',
              title: 'Create a free OpenAI account',
              body: 'Go to platform.openai.com and click "Sign Up". You can use an email address or sign in with Google or Microsoft.',
            },
            {
              step: '2',
              title: 'Verify your email',
              body: 'OpenAI will send a verification email. Click the link inside it to activate your account.',
            },
            {
              step: '3',
              title: 'Go to API Keys',
              body: 'Once logged in, click your profile icon (top right), then select "API Keys" from the menu. Or go directly to: platform.openai.com/api-keys',
            },
            {
              step: '4',
              title: 'Create a new key',
              body: 'Click the "+ Create new secret key" button. Give it a name like "Aspie Guide App" so you remember what it\'s for.',
            },
            {
              step: '5',
              title: 'Copy your key immediately',
              body: 'IMPORTANT: Copy the key right away — you can only see it once. It will look like: sk-proj-abc123... or sk-abc123...',
            },
            {
              step: '6',
              title: 'Add billing (for continued use)',
              body: 'OpenAI gives some free credits to start. For ongoing use, go to "Billing" in your account and add a payment method. Typical usage for this app costs only a few cents per month.',
            },
            {
              step: '7',
              title: 'Paste the key here',
              body: 'Come back to this app, go to the "Connect AI Assistant" screen, and paste the key you copied.',
            },
          ].map(({ step, title, body }) => (
            <View key={step} style={styles.stepCard}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{step}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{title}</Text>
                <Text style={styles.stepBody}>{body}</Text>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.openWebsiteButton}
            onPress={() => Linking.openURL('https://platform.openai.com/api-keys')}
          >
            <Text style={styles.openWebsiteButtonText}>Open OpenAI Website</Text>
          </TouchableOpacity>

          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Privacy Note</Text>
            <Text style={styles.infoCardBody}>
              Your API key is stored privately on your device only. Messages you send go directly from your device to OpenAI's servers, just like using ChatGPT. OpenAI's privacy policy applies to the content of your messages.
            </Text>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={() => setScreen('setup')}>
            <Text style={styles.saveButtonText}>I Have My Key — Enter It Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── Chat Screen ─────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View style={styles.chatHeader}>
          <View>
            <Text style={styles.chatHeaderTitle}>Aspie AI Assistant</Text>
            <Text style={styles.chatHeaderSub}>
              {savedApiKey ? 'Connected' : 'No API key — tap to set up'}
            </Text>
          </View>
          <View style={styles.chatHeaderActions}>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => setScreen('setup')}
            >
              <Text style={styles.headerBtnText}>⚙️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn} onPress={clearConversation}>
              <Text style={styles.headerBtnText}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.messagesContainer}
          contentContainerStyle={{ padding: 12, paddingBottom: 8 }}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.map((msg, i) => (
            <View
              key={i}
              style={[
                styles.messageBubble,
                msg.role === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              {msg.role === 'assistant' && (
                <Text style={styles.bubbleLabel}>AI Assistant</Text>
              )}
              <Text
                style={[
                  styles.messageText,
                  msg.role === 'user' ? styles.userText : styles.assistantText,
                ]}
              >
                {msg.content}
              </Text>
            </View>
          ))}

          {isLoading && (
            <View style={[styles.messageBubble, styles.assistantBubble]}>
              <Text style={styles.bubbleLabel}>AI Assistant</Text>
              <View style={styles.typingIndicator}>
                <ActivityIndicator size="small" color="#6366f1" />
                <Text style={styles.typingText}>Thinking...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.quickPromptsScroll}
            contentContainerStyle={{ paddingHorizontal: 12 }}
          >
            {QUICK_PROMPTS.map((p, i) => (
              <TouchableOpacity
                key={i}
                style={styles.quickPromptChip}
                onPress={() => sendMessage(p)}
              >
                <Text style={styles.quickPromptText}>{p}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.chatInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder={savedApiKey ? 'Type a message...' : 'Set up API key to chat...'}
            placeholderTextColor="#aaa"
            multiline
            maxLength={1000}
            editable={!!savedApiKey}
          />
          <TouchableOpacity
            style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
            onPress={() => sendMessage()}
            disabled={!inputText.trim() || isLoading}
          >
            <Text style={styles.sendButtonText}>↑</Text>
          </TouchableOpacity>
        </View>

        {!savedApiKey && (
          <TouchableOpacity style={styles.setupBanner} onPress={() => setScreen('setup')}>
            <Text style={styles.setupBannerText}>
              Tap here to set up your OpenAI API key and enable the AI assistant
            </Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PURPLE = '#6366f1';
const PURPLE_LIGHT = '#ede9fe';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f8fc' },

  // ── Setup / Instructions ──────────────────────────────────────────
  setupContainer: { padding: 20, paddingBottom: 40 },
  setupTitle: { fontSize: 24, fontFamily: 'Quicksand_700Bold', color: '#1e1b4b', marginBottom: 8 },
  setupSubtitle: { fontSize: 15, fontFamily: 'Quicksand_400Regular', color: '#555', lineHeight: 22, marginBottom: 20 },
  backButton: { marginBottom: 16 },
  backButtonText: { color: PURPLE, fontFamily: 'Quicksand_600SemiBold', fontSize: 16 },
  inputLabel: { fontFamily: 'Quicksand_600SemiBold', fontSize: 15, color: '#333', marginBottom: 8 },
  apiKeyInput: {
    borderWidth: 1.5,
    borderColor: '#c7c7d4',
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#222',
    backgroundColor: '#fff',
    marginBottom: 16,
    letterSpacing: 1,
  },
  saveButton: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: { color: '#fff', fontFamily: 'Quicksand_700Bold', fontSize: 16 },
  cancelButton: { alignItems: 'center', padding: 12 },
  cancelButtonText: { color: '#888', fontFamily: 'Quicksand_600SemiBold', fontSize: 15 },
  instructionsButton: {
    backgroundColor: PURPLE_LIGHT,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  instructionsButtonText: { color: PURPLE, fontFamily: 'Quicksand_600SemiBold', fontSize: 15 },
  infoCard: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
  },
  infoCardTitle: { fontFamily: 'Quicksand_700Bold', fontSize: 14, color: '#166534', marginBottom: 4 },
  infoCardBody: { fontFamily: 'Quicksand_400Regular', fontSize: 13, color: '#166534', lineHeight: 19 },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
    flexShrink: 0,
  },
  stepBadgeText: { color: '#fff', fontFamily: 'Quicksand_700Bold', fontSize: 14 },
  stepContent: { flex: 1 },
  stepTitle: { fontFamily: 'Quicksand_700Bold', fontSize: 14, color: '#1e1b4b', marginBottom: 4 },
  stepBody: { fontFamily: 'Quicksand_400Regular', fontSize: 13, color: '#555', lineHeight: 19 },
  openWebsiteButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  openWebsiteButtonText: { color: '#fff', fontFamily: 'Quicksand_700Bold', fontSize: 15 },

  // ── Chat ─────────────────────────────────────────────────────────
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  chatHeaderTitle: { fontFamily: 'Quicksand_700Bold', fontSize: 17, color: '#1e1b4b' },
  chatHeaderSub: { fontFamily: 'Quicksand_400Regular', fontSize: 12, color: '#888', marginTop: 2 },
  chatHeaderActions: { flexDirection: 'row', gap: 4 },
  headerBtn: { padding: 8 },
  headerBtnText: { fontSize: 18 },
  messagesContainer: { flex: 1, backgroundColor: '#f8f8fc' },
  messageBubble: {
    maxWidth: '85%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  userBubble: {
    backgroundColor: PURPLE,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  bubbleLabel: { fontFamily: 'Quicksand_700Bold', fontSize: 11, color: '#9ca3af', marginBottom: 4 },
  messageText: { fontFamily: 'Quicksand_400Regular', fontSize: 15, lineHeight: 22 },
  userText: { color: '#fff' },
  assistantText: { color: '#222' },
  typingIndicator: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  typingText: { fontFamily: 'Quicksand_400Regular', fontSize: 14, color: '#9ca3af' },
  quickPromptsScroll: { maxHeight: 52, paddingVertical: 6 },
  quickPromptChip: {
    backgroundColor: PURPLE_LIGHT,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  quickPromptText: { fontFamily: 'Quicksand_600SemiBold', fontSize: 13, color: PURPLE },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 8,
  },
  chatInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: 'Quicksand_400Regular',
    color: '#222',
    maxHeight: 120,
    backgroundColor: '#fafafa',
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: { backgroundColor: '#c4b5fd' },
  sendButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold', lineHeight: 24 },
  setupBanner: {
    backgroundColor: PURPLE_LIGHT,
    padding: 12,
    alignItems: 'center',
  },
  setupBannerText: { fontFamily: 'Quicksand_600SemiBold', fontSize: 13, color: PURPLE, textAlign: 'center' },
});
