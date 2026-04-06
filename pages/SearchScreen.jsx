import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, Keyboard,
} from 'react-native';
import * as Haptics from 'expo-haptics';

// ─── Searchable content index ─────────────────────────────────────────────────

const SEARCH_ITEMS = [
  // Features
  { title: 'Sensory Relaxation', subtitle: 'Guided breathing exercises', screen: 'Sensory Relaxation', category: 'Feature', icon: '🫁', keywords: 'breathing calm relax meditation inhale exhale hold pattern audio haptic' },
  { title: 'AI Chat Assistant', subtitle: 'Ask anything about ASD', screen: 'AI Chat Assistant', category: 'Feature', icon: '🤖', keywords: 'chatbot openai gpt conversation help question answer advice support' },
  { title: 'Mini-Games', subtitle: 'Build social skills playfully', screen: 'Mini-Games', category: 'Feature', icon: '🎮', keywords: 'game play emotion social scenario conversation literal figurative practice interactive' },
  { title: 'Quizzes', subtitle: 'Test your knowledge', screen: 'Quizzes', category: 'Feature', icon: '📝', keywords: 'quiz test assessment knowledge sensory profile social skills check' },
  { title: 'Psychology & Therapy', subtitle: 'Evidence-based techniques', screen: 'Psychology & Therapy', category: 'Feature', icon: '🧠', keywords: 'therapy cbt dbt mindfulness sensory integration executive function emotion regulation special interests social stories' },

  // Games (navigate to Mini-Games)
  { title: 'Emotion Decoder', subtitle: 'Identify emotions from body language', screen: 'Mini-Games', category: 'Game', icon: '😊', keywords: 'emotion face expression body language feeling recognition read' },
  { title: 'Social Scenario Practice', subtitle: 'Choose the right response', screen: 'Mini-Games', category: 'Game', icon: '🤝', keywords: 'social situation response appropriate conflict workplace friend' },
  { title: 'Conversation Flow', subtitle: 'Keep conversations going', screen: 'Mini-Games', category: 'Game', icon: '💬', keywords: 'conversation talk chat reply response reciprocity listening' },
  { title: 'Literal vs. Figurative', subtitle: 'Identify idioms and metaphors', screen: 'Mini-Games', category: 'Game', icon: '🔍', keywords: 'idiom metaphor literal figurative language sarcasm phrase meaning' },

  // Quizzes (navigate to Quizzes)
  { title: 'Understanding ASD Quiz', subtitle: '10 questions about autism', screen: 'Quizzes', category: 'Quiz', icon: '🧩', keywords: 'autism asperger spectrum neurodiversity masking stimming burnout knowledge' },
  { title: 'Sensory Profile Assessment', subtitle: 'Understand your sensory needs', screen: 'Quizzes', category: 'Quiz', icon: '🎯', keywords: 'sensory sensitivity sound light touch smell taste proprioception overload hyper hypo' },
  { title: 'Social Situations Quiz', subtitle: 'Unwritten social rules', screen: 'Quizzes', category: 'Quiz', icon: '🗣️', keywords: 'social rules norms etiquette polite greeting gift conversation eye contact' },

  // Therapy techniques (navigate to Psychology & Therapy)
  { title: 'Cognitive Behavioural Therapy (CBT)', subtitle: 'Changing unhelpful thought patterns', screen: 'Psychology & Therapy', category: 'Therapy', icon: '🧩', keywords: 'cbt cognitive behavioural therapy thoughts feelings distortions thought record worry' },
  { title: 'Dialectical Behaviour Therapy (DBT)', subtitle: 'Emotion regulation & distress tolerance', screen: 'Psychology & Therapy', category: 'Therapy', icon: '⚖️', keywords: 'dbt dialectical emotion regulation distress tolerance mindfulness interpersonal tipp dear man' },
  { title: 'Social Stories', subtitle: 'Learning through narrative', screen: 'Psychology & Therapy', category: 'Therapy', icon: '📖', keywords: 'social stories carol gray narrative script situation expectation behaviour' },
  { title: 'Mindfulness for ASD', subtitle: 'Present-moment awareness', screen: 'Psychology & Therapy', category: 'Therapy', icon: '🧘', keywords: 'mindfulness meditation grounding breathing body scan awareness calm anxiety present' },
  { title: 'Sensory Integration Therapy', subtitle: 'Managing sensory experiences', screen: 'Psychology & Therapy', category: 'Therapy', icon: '🎨', keywords: 'sensory integration occupational therapy overload toolkit weighted blanket headphones fidget' },
  { title: 'Executive Function Strategies', subtitle: 'Planning, organising, time', screen: 'Psychology & Therapy', category: 'Therapy', icon: '📋', keywords: 'executive function planning organising time management task initiation body doubling schedule transition' },
  { title: 'Emotion Regulation', subtitle: 'Managing emotional intensity', screen: 'Psychology & Therapy', category: 'Therapy', icon: '💙', keywords: 'emotion regulation meltdown shutdown intensity scale alexithymia interoception' },
  { title: 'Leveraging Special Interests', subtitle: 'Turning strengths into superpowers', screen: 'Psychology & Therapy', category: 'Therapy', icon: '⭐', keywords: 'special interests hyperfocus passion strength career community connection joy' },

  // Book chapters
  { title: 'Foreword', subtitle: 'Chapter 1', screen: 'Foreword', category: 'Article', icon: '📄', keywords: 'foreword introduction beginning' },
  { title: 'Introduction', subtitle: 'Chapter 2', screen: 'Introduction', category: 'Article', icon: '📄', keywords: 'introduction overview' },
  { title: 'Getting the best from this book', subtitle: 'Chapter 3', screen: 'Getting the best from this book', category: 'Article', icon: '📄', keywords: 'guide how to use instructions' },
  { title: 'Worrying', subtitle: 'Chapter 4', screen: 'Worrying', category: 'Article', icon: '📄', keywords: 'worry anxiety stress overthinking rumination fear' },
  { title: 'Looking on the bright side', subtitle: 'Chapter 5', screen: 'Looking on the bright side', category: 'Article', icon: '📄', keywords: 'positive optimism bright side hope perspective reframe' },
  { title: 'Body language', subtitle: 'Chapter 6', screen: 'Body language', category: 'Article', icon: '📄', keywords: 'body language nonverbal gesture posture facial expression communication' },
  { title: 'Boundaries', subtitle: 'Chapter 7', screen: 'Boundaries', category: 'Article', icon: '📄', keywords: 'boundaries personal space limits respect' },
  { title: 'Eye contact', subtitle: 'Chapter 8', screen: 'Eye contact', category: 'Article', icon: '📄', keywords: 'eye contact gaze looking staring social' },
  { title: 'Tone of voice', subtitle: 'Chapter 9', screen: 'Tone of voice', category: 'Article', icon: '📄', keywords: 'tone voice pitch volume speaking communication prosody' },
  { title: 'Dress sense', subtitle: 'Chapter 10', screen: 'Dress sense', category: 'Article', icon: '📄', keywords: 'dress clothing fashion appearance sensory comfort' },
  { title: 'Distortions of the truth', subtitle: 'Chapter 11', screen: 'Distortions of the truth', category: 'Article', icon: '📄', keywords: 'truth lies honesty deception distortion white lie' },
  { title: 'Misunderstandings', subtitle: 'Chapter 12', screen: 'Misunderstandings other people might have about you', category: 'Article', icon: '📄', keywords: 'misunderstanding perception stereotype judgment impression' },
  { title: 'Conversation', subtitle: 'Chapter 13', screen: 'Conversation', category: 'Article', icon: '📄', keywords: 'conversation talk chat small talk topic turn taking' },
  { title: 'General knowledge', subtitle: 'Chapter 14', screen: 'General knowledge', category: 'Article', icon: '📄', keywords: 'general knowledge facts trivia learning information' },
  { title: 'Names', subtitle: 'Chapter 15', screen: 'Names', category: 'Article', icon: '📄', keywords: 'names remembering people memory introduction' },
  { title: 'Humour and conflict', subtitle: 'Chapter 16', screen: 'Humour and conflict', category: 'Article', icon: '📄', keywords: 'humour humor joke conflict argument sarcasm teasing banter' },
  { title: 'Invitation', subtitle: 'Chapter 17', screen: 'Invitation', category: 'Article', icon: '📄', keywords: 'invitation invite event party gathering social accept decline' },
  { title: 'Personal Security', subtitle: 'Chapter 18', screen: 'Personal Security', category: 'Article', icon: '📄', keywords: 'security safety personal protection vulnerability' },
  { title: 'Finding the right friends', subtitle: 'Chapter 19', screen: 'Finding the right friends', category: 'Article', icon: '📄', keywords: 'friends friendship social connection relationship trust' },
  { title: 'Keeping a clean slate', subtitle: 'Chapter 20', screen: 'Keeping a clean slate', category: 'Article', icon: '📄', keywords: 'clean slate fresh start reputation forgiveness' },
  { title: 'Coming Clean', subtitle: 'Chapter 21', screen: 'Coming Clean', category: 'Article', icon: '📄', keywords: 'coming clean honesty disclosure truth telling' },
  { title: 'Education', subtitle: 'Chapter 22', screen: 'Education', category: 'Article', icon: '📄', keywords: 'education school university college learning study classroom' },
  { title: 'Living Away from Home', subtitle: 'Chapter 23', screen: 'Living Away from Home', category: 'Article', icon: '📄', keywords: 'living away home independent flat apartment roommate' },
  { title: 'Using the Phone', subtitle: 'Chapter 24', screen: 'Using the Phone', category: 'Article', icon: '📄', keywords: 'phone telephone call talking anxiety communication' },
  { title: 'Guests', subtitle: 'Chapter 25', screen: 'Guests', category: 'Article', icon: '📄', keywords: 'guests visitors hosting entertaining hospitality' },
  { title: 'Jobs and Interviews', subtitle: 'Chapter 26', screen: 'Jobs and Interviews', category: 'Article', icon: '📄', keywords: 'jobs interview work career employment resume cv workplace' },
  { title: 'Driving', subtitle: 'Chapter 27', screen: 'Driving', category: 'Article', icon: '📄', keywords: 'driving car licence road transport travel' },
  { title: 'Travelling abroad', subtitle: 'Chapter 28', screen: 'Travelling abroad', category: 'Article', icon: '📄', keywords: 'travel abroad foreign country airport flying holiday vacation' },
  { title: 'Bartering', subtitle: 'Chapter 29', screen: 'Bartering', category: 'Article', icon: '📄', keywords: 'bartering negotiation price money buying selling deal' },
  { title: 'Opportunities', subtitle: 'Chapter 30', screen: 'Opportunities', category: 'Article', icon: '📄', keywords: 'opportunities chance growth development' },
  { title: 'Analysis of the problem', subtitle: 'Chapter 31', screen: 'A Personal in depth analysis of the problem', category: 'Article', icon: '📄', keywords: 'analysis problem personal depth understanding self reflection' },
  { title: 'Further Reading', subtitle: 'Chapter 32', screen: 'Further Reading', category: 'Article', icon: '📄', keywords: 'further reading books resources references' },
];

// ─── Category colours ─────────────────────────────────────────────────────────

const CATEGORY_STYLES = {
  Feature: { bg: '#ede9fe', text: '#6366f1' },
  Game: { bg: '#fef3c7', text: '#d97706' },
  Quiz: { bg: '#dcfce7', text: '#16a34a' },
  Therapy: { bg: '#e0f2fe', text: '#0284c7' },
  Article: { bg: '#f1f5f9', text: '#64748b' },
};

// ─── Search Screen ────────────────────────────────────────────────────────────

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

  const normalise = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '');

  const results = query.trim().length === 0
    ? []
    : SEARCH_ITEMS.filter((item) => {
        const q = normalise(query);
        const words = q.split(/\s+/);
        const searchable = normalise(
          `${item.title} ${item.subtitle} ${item.keywords} ${item.category}`
        );
        return words.every((w) => searchable.includes(w));
      });

  const grouped = {};
  results.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  const categoryOrder = ['Feature', 'Game', 'Quiz', 'Therapy', 'Article'];
  const sortedCategories = categoryOrder.filter((c) => grouped[c]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Search input */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search articles, games, quizzes, therapy..."
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
          >
            <Text style={styles.clearBtnText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Empty state */}
        {query.trim().length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔎</Text>
            <Text style={styles.emptyTitle}>Search everything</Text>
            <Text style={styles.emptyBody}>
              Find articles, mini-games, quizzes, therapy techniques, and more across the entire app.
            </Text>

            <Text style={styles.suggestionsTitle}>Try searching for:</Text>
            {['anxiety', 'social skills', 'sensory overload', 'CBT', 'conversation', 'meltdown', 'eye contact', 'job interview'].map((s) => (
              <TouchableOpacity
                key={s}
                style={styles.suggestionChip}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setQuery(s);
                }}
              >
                <Text style={styles.suggestionText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* No results */}
        {query.trim().length > 0 && results.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🤔</Text>
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptyBody}>
              Try different keywords or check your spelling.
            </Text>
          </View>
        )}

        {/* Results */}
        {sortedCategories.map((category) => (
          <View key={category}>
            <View style={styles.categoryHeader}>
              <View style={[styles.categoryBadge, { backgroundColor: CATEGORY_STYLES[category].bg }]}>
                <Text style={[styles.categoryBadgeText, { color: CATEGORY_STYLES[category].text }]}>
                  {category}
                </Text>
              </View>
              <Text style={styles.categoryCount}>{grouped[category].length} result{grouped[category].length > 1 ? 's' : ''}</Text>
            </View>

            {grouped[category].map((item, i) => (
              <TouchableOpacity
                key={`${category}-${i}`}
                style={styles.resultCard}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  Keyboard.dismiss();
                  navigation.navigate(item.screen);
                }}
              >
                <Text style={styles.resultIcon}>{item.icon}</Text>
                <View style={styles.resultContent}>
                  <Text style={styles.resultTitle}>{item.title}</Text>
                  <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.resultChevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {results.length > 0 && (
          <Text style={styles.resultsSummary}>
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f8fc' },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: { fontSize: 18, marginRight: 8 },
  searchInput: {
    flex: 1,
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
    color: '#1e1b4b',
    paddingVertical: 14,
  },
  clearBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  clearBtnText: { fontSize: 13, color: '#64748b', fontWeight: 'bold' },

  // Empty state
  emptyState: { alignItems: 'center', paddingTop: 40, paddingHorizontal: 16 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontFamily: 'Quicksand_700Bold', fontSize: 20, color: '#1e1b4b', marginBottom: 8 },
  emptyBody: { fontFamily: 'Quicksand_400Regular', fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 21, marginBottom: 24 },
  suggestionsTitle: { fontFamily: 'Quicksand_600SemiBold', fontSize: 14, color: '#888', marginBottom: 12, alignSelf: 'flex-start', width: '100%' },
  suggestionChip: {
    backgroundColor: '#ede9fe',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginBottom: 8,
    alignSelf: 'flex-start',
    width: '100%',
  },
  suggestionText: { fontFamily: 'Quicksand_600SemiBold', fontSize: 14, color: '#6366f1' },

  // Category header
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  categoryBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  categoryBadgeText: { fontFamily: 'Quicksand_700Bold', fontSize: 12 },
  categoryCount: { fontFamily: 'Quicksand_400Regular', fontSize: 12, color: '#9ca3af' },

  // Result card
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  resultIcon: { fontSize: 26, marginRight: 12, flexShrink: 0 },
  resultContent: { flex: 1 },
  resultTitle: { fontFamily: 'Quicksand_700Bold', fontSize: 15, color: '#1e1b4b', marginBottom: 2 },
  resultSubtitle: { fontFamily: 'Quicksand_400Regular', fontSize: 12, color: '#888' },
  resultChevron: { fontSize: 20, color: '#c4b5fd', marginLeft: 8 },

  resultsSummary: {
    fontFamily: 'Quicksand_400Regular',
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 16,
  },
});
