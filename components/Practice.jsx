import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput,
  ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { C, F, Glyph, Button, BackLink } from './ui';
import { rolePlayTurn, errorText, looksLikeCrisis, onDeviceAvailability } from '../lib/coach';

/** Scripted practice: the other person's line and three choices with feedback. */
export function ScriptedPractice({ scenario, onBack, onNext }) {
  const [picked, setPicked] = useState(null);
  const p = scenario.practice;
  const choice = picked != null ? p.choices[picked] : null;

  return (
    <ScrollView contentContainerStyle={st.pad}>
      <BackLink onPress={onBack} />
      <Text style={st.kicker}>Practice</Text>
      <Text style={st.title}>{scenario.title}</Text>
      <Text style={st.situation}>{scenario.situation}</Text>

      <View style={st.them}>
        <Text style={st.whoLabel}>{capital(scenario.otherRole || 'They')} says</Text>
        <Text style={st.themText}>{p.line}</Text>
      </View>

      <Text style={st.prompt}>What would you say or do?</Text>
      {p.choices.map((c, i) => {
        const shown = picked === i;
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setPicked(i);
              Haptics.notificationAsync(
                c.best ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning
              );
            }}
            style={[st.choice, shown && (c.best ? st.choiceGood : st.choiceTry)]}
            accessibilityRole="button"
          >
            <Text style={st.choiceText}>{c.text}</Text>
          </TouchableOpacity>
        );
      })}

      {choice ? (
        <View style={[st.feedback, choice.best ? st.feedbackGood : st.feedbackTry]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Glyph
              name={choice.best ? 'checkmark-outline' : 'bulb-outline'}
              size={20}
              color={choice.best ? C.green : '#92400e'}
              style={{ marginRight: 6 }}
            />
            <Text style={[st.feedbackTitle, { color: choice.best ? C.green : '#92400e' }]}>
              {choice.best ? 'That works well' : 'Something to think about'}
            </Text>
          </View>
          <Text style={st.feedbackText}>{choice.note}</Text>
        </View>
      ) : null}

      {choice?.best && onNext ? <Button title="Next situation" icon="arrow-forward-outline" onPress={onNext} /> : null}
      {choice && !choice.best ? (
        <Button title="Try another answer" kind="secondary" icon="refresh-outline" onPress={() => setPicked(null)} />
      ) : null}
    </ScrollView>
  );
}

function splitCoach(text) {
  const i = text.search(/\n?\s*Coach:/i);
  if (i < 0) return { line: text.trim(), coach: null };
  return { line: text.slice(0, i).trim(), coach: text.slice(i).replace(/^\s*Coach:\s*/i, '').trim() };
}

/** AI role-play with the on-device model (or the person's OpenAI key). */
export function AIRolePlay({ scenario, onBack, onOpenHelp }) {
  const [turns, setTurns] = useState([]); // { role: 'user'|'assistant', content, coach? }
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [crisis, setCrisis] = useState(false);
  const scroll = useRef(null);
  const onDevice = onDeviceAvailability() === 'available';

  const run = async (history) => {
    setLoading(true);
    setError(null);
    const r = await rolePlayTurn(scenario, history.map(({ role, content }) => ({ role, content })));
    setLoading(false);
    if (r.text) {
      const { line, coach } = splitCoach(r.text);
      setTurns([...history, { role: 'assistant', content: line, coach }]);
    } else {
      setError(errorText(r.error));
    }
    setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 100);
  };

  useEffect(() => {
    run([]);
  }, []);

  const send = () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    if (looksLikeCrisis(text)) setCrisis(true);
    const next = [...turns, { role: 'user', content: text }];
    setTurns(next);
    run(next);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView ref={scroll} contentContainerStyle={st.pad} onContentSizeChange={() => scroll.current?.scrollToEnd()}>
        <BackLink onPress={onBack} />
        <Text style={st.kicker}>Rehearse with the AI coach</Text>
        <Text style={st.title}>{scenario.title}</Text>
        <View style={st.privacy}>
          <Glyph name={onDevice ? 'phone-portrait-outline' : 'cloud-outline'} size={16} color={C.muted} style={{ marginRight: 6 }} />
          <Text style={st.privacyText}>
            {onDevice
              ? 'Runs on your iPhone with Apple Intelligence. Nothing leaves this device.'
              : 'Uses your OpenAI key. Messages go to OpenAI.'}
          </Text>
        </View>

        {crisis ? (
          <TouchableOpacity style={st.crisis} onPress={onOpenHelp} accessibilityRole="button">
            <Glyph name="hand-left-outline" size={20} color={C.red} style={{ marginRight: 8 }} />
            <Text style={st.crisisText}>
              It sounds like things may be hard right now. Tap here for Get Help Now: crisis lines and help cards, always free.
            </Text>
          </TouchableOpacity>
        ) : null}

        {turns.map((t, i) =>
          t.role === 'assistant' ? (
            <View key={i}>
              <View style={st.them}>
                <Text style={st.whoLabel}>{capital(scenario.otherRole || 'They')}</Text>
                <Text style={st.themText}>{t.content}</Text>
              </View>
              {t.coach ? (
                <View style={st.coach}>
                  <Glyph name="sparkles-outline" size={16} color={C.purple} style={{ marginRight: 6, marginTop: 2 }} />
                  <Text style={st.coachText}>{t.coach}</Text>
                </View>
              ) : null}
            </View>
          ) : (
            <View key={i} style={st.me}>
              <Text style={st.meText}>{t.content}</Text>
            </View>
          )
        )}
        {loading ? <ActivityIndicator color={C.purple} style={{ marginVertical: 12 }} /> : null}
        {error ? (
          <View style={st.feedbackTry}>
            <Text style={st.feedbackText}>{error}</Text>
            <Button title="Try again" kind="secondary" onPress={() => run(turns)} />
          </View>
        ) : null}
        {turns.length > 0 && !loading ? (
          <Text style={st.hint}>Try one of the scripts, or say it your own way.</Text>
        ) : null}
      </ScrollView>
      <View style={st.inputRow}>
        <TextInput
          style={st.input}
          value={input}
          onChangeText={setInput}
          placeholder="What would you say?"
          placeholderTextColor="#9ca3af"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          onPress={send}
          disabled={!input.trim() || loading}
          style={[st.send, (!input.trim() || loading) && { opacity: 0.4 }]}
          accessibilityRole="button"
          accessibilityLabel="Send"
        >
          <Glyph name="arrow-up-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function capital(x) {
  return x ? x.charAt(0).toUpperCase() + x.slice(1) : x;
}

const st = StyleSheet.create({
  pad: { padding: 20, paddingBottom: 40 },
  kicker: { fontFamily: F.bold, fontSize: 13, color: C.purple, textTransform: 'uppercase', letterSpacing: 0.5 },
  title: { fontFamily: F.bold, fontSize: 22, color: C.navy, marginTop: 4, marginBottom: 6 },
  situation: { fontFamily: F.regular, fontSize: 15, color: '#475569', lineHeight: 22, marginBottom: 12 },
  them: { backgroundColor: C.card, borderRadius: 14, padding: 14, marginVertical: 6, borderLeftWidth: 4, borderLeftColor: C.purple, maxWidth: '92%' },
  whoLabel: { fontFamily: F.bold, fontSize: 12, color: C.muted, marginBottom: 4 },
  themText: { fontFamily: F.medium, fontSize: 16, color: '#111', lineHeight: 23 },
  me: { alignSelf: 'flex-end', backgroundColor: C.purple, borderRadius: 14, padding: 12, marginVertical: 6, maxWidth: '88%' },
  meText: { fontFamily: F.medium, fontSize: 15, color: '#fff', lineHeight: 22 },
  coach: { flexDirection: 'row', backgroundColor: C.purpleLight, borderRadius: 10, padding: 10, marginBottom: 6, maxWidth: '92%' },
  coachText: { flex: 1, fontFamily: F.medium, fontSize: 14, color: '#3730a3', lineHeight: 20 },
  prompt: { fontFamily: F.bold, fontSize: 16, color: C.navy, marginTop: 14, marginBottom: 8 },
  choice: { backgroundColor: C.card, borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 2, borderColor: C.border },
  choiceGood: { borderColor: '#22c55e', backgroundColor: C.greenLight },
  choiceTry: { borderColor: '#f59e0b', backgroundColor: '#fffbeb' },
  choiceText: { fontFamily: F.medium, fontSize: 15, color: '#222', lineHeight: 21 },
  feedback: { borderRadius: 12, padding: 14, marginTop: 6 },
  feedbackGood: { backgroundColor: C.greenLight },
  feedbackTry: { backgroundColor: '#fffbeb', borderRadius: 12, padding: 14, marginTop: 6 },
  feedbackTitle: { fontFamily: F.bold, fontSize: 15 },
  feedbackText: { fontFamily: F.regular, fontSize: 14, color: '#334155', lineHeight: 20 },
  privacy: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  privacyText: { flex: 1, fontFamily: F.regular, fontSize: 12, color: C.muted },
  crisis: { flexDirection: 'row', backgroundColor: C.redLight, borderRadius: 12, padding: 12, marginBottom: 10 },
  crisisText: { flex: 1, fontFamily: F.semi, fontSize: 14, color: C.red, lineHeight: 20 },
  hint: { fontFamily: F.regular, fontSize: 12, color: C.muted, textAlign: 'center', marginTop: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: C.border, gap: 8 },
  input: {
    flex: 1, borderWidth: 1.5, borderColor: '#d1d5db', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10,
    fontSize: 15, fontFamily: F.regular, color: '#222', maxHeight: 120, backgroundColor: '#fafafa',
  },
  send: { width: 44, height: 44, borderRadius: 12, backgroundColor: C.purple, alignItems: 'center', justifyContent: 'center' },
});
