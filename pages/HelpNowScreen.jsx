// Get Help Now: crisis lines, help cards and a meltdown plan.
// Always free. Nothing on this screen is ever behind Pro.
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Linking, TextInput, Platform } from 'react-native';
import { useSaved } from '../lib/saved';
import { C, F, Glyph, SectionTitle, ShowCard } from '../components/ui';

const EMERGENCY = [
  { region: 'US and Canada', label: 'Emergency 911', url: 'tel:911' },
  { region: 'UK', label: 'Emergency 999', url: 'tel:999' },
  { region: 'EU and many countries', label: 'Emergency 112', url: 'tel:112' },
  { region: 'Australia', label: 'Emergency 000', url: 'tel:000' },
];

const CRISIS = [
  { region: 'US', label: '988 Suicide & Crisis Lifeline', detail: 'Call or text 988', url: 'tel:988', icon: 'call-outline' },
  { region: 'Canada', label: '988 Suicide Crisis Helpline', detail: 'Call or text 988', url: 'tel:988', icon: 'call-outline' },
  { region: 'US', label: 'Crisis Text Line', detail: 'Text HOME to 741741', url: `sms:741741${Platform.OS === 'ios' ? '&' : '?'}body=HOME`, icon: 'chatbubble-outline' },
  { region: 'UK and Ireland', label: 'Samaritans', detail: 'Call 116 123, free, any time', url: 'tel:116123', icon: 'call-outline' },
  { region: 'UK', label: 'Shout', detail: 'Text SHOUT to 85258', url: `sms:85258${Platform.OS === 'ios' ? '&' : '?'}body=SHOUT`, icon: 'chatbubble-outline' },
  { region: 'Australia', label: 'Lifeline', detail: 'Call 13 11 14', url: 'tel:131114', icon: 'call-outline' },
  { region: 'Anywhere', label: 'Find a helpline in your country', detail: 'findahelpline.com', url: 'https://findahelpline.com', icon: 'globe-outline' },
];

const CARDS = [
  'I am autistic. I may need a little more time to understand and answer.',
  'I am overwhelmed by noise and light. I need somewhere quiet for a few minutes.',
  'I can\'t speak right now, but I can understand you. I can answer by typing or writing.',
  'Please don\'t touch me. I\'m okay. I just need some space.',
  'I am lost. Please help me get to a safe place or call someone for me.',
];

const PLAN = [
  'Move away from the noise, light or crowd if you can. Leaving is allowed.',
  'Lower the input: headphones, sunglasses, a hood, close your eyes.',
  'Breathe out slowly, longer than you breathe in. Repeat five times.',
  'Show a help card instead of talking, if talking is hard.',
  'Text or call someone you trust.',
  'Afterwards: water, food, rest. A meltdown or shutdown is exhausting, not a failure.',
];

export default function HelpNowScreen({ navigation }) {
  const { customCard, setCustomCard } = useSaved();
  const [show, setShow] = useState(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(customCard);

  const open = (url) => Linking.openURL(url).catch(() => {});

  return (
    <SafeAreaView style={st.safe}>
      <ScrollView contentContainerStyle={st.pad}>
        <Text style={st.h1}>Get Help Now</Text>
        <Text style={st.lead}>Free for everyone. If you are in danger right now, call your local emergency number.</Text>

        <View style={st.emergencyBox}>
          {EMERGENCY.map((e) => (
            <TouchableOpacity key={e.url} style={st.emergency} onPress={() => open(e.url)} accessibilityRole="button" accessibilityLabel={`Call ${e.label}, ${e.region}`}>
              <Glyph name="call-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={st.emergencyLabel}>{e.label}</Text>
                <Text style={st.emergencyRegion}>{e.region}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <SectionTitle icon="heart-outline">Crisis and suicide support</SectionTitle>
        {CRISIS.map((c) => (
          <TouchableOpacity key={c.label + c.region} style={st.row} onPress={() => open(c.url)} accessibilityRole="button">
            <Glyph name={c.icon} size={20} style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={st.rowTitle}>{c.label}</Text>
              <Text style={st.rowSub}>{c.region} | {c.detail}</Text>
            </View>
            <Glyph name="chevron-forward-outline" size={18} color="#9ca3af" />
          </TouchableOpacity>
        ))}

        <SectionTitle icon="id-card-outline">Help cards</SectionTitle>
        <Text style={st.small}>Tap a card to show it full screen when talking is hard.</Text>
        {CARDS.map((t) => (
          <TouchableOpacity key={t} style={st.card} onPress={() => setShow(t)} accessibilityRole="button" accessibilityHint="Shows this card full screen">
            <Text style={st.cardText}>{t}</Text>
            <Glyph name="expand-outline" size={18} />
          </TouchableOpacity>
        ))}

        <View style={st.card}>
          {editing ? (
            <View style={{ flex: 1 }}>
              <TextInput
                style={st.input}
                value={draft}
                onChangeText={setDraft}
                placeholder="Write your own card, e.g. your name, an emergency contact, or what helps you."
                placeholderTextColor="#9ca3af"
                multiline
                maxLength={300}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 16, marginTop: 8 }}>
                <Text style={st.action} onPress={() => { setDraft(customCard); setEditing(false); }}>Cancel</Text>
                <Text style={st.action} onPress={() => { setCustomCard(draft.trim()); setEditing(false); }}>Save</Text>
              </View>
            </View>
          ) : customCard ? (
            <>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => setShow(customCard)}>
                <Text style={st.cardText}>{customCard}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setDraft(customCard); setEditing(true); }} accessibilityLabel="Edit my card" style={{ padding: 4 }}>
                <Glyph name="create-outline" size={18} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} onPress={() => setEditing(true)}>
              <Glyph name="add-outline" size={20} style={{ marginRight: 8 }} />
              <Text style={[st.cardText, { color: C.purple }]}>Make my own card</Text>
            </TouchableOpacity>
          )}
        </View>

        <SectionTitle icon="leaf-outline">If a meltdown or shutdown is coming</SectionTitle>
        {PLAN.map((t, i) => (
          <View key={i} style={st.planRow}>
            <Text style={st.planNum}>{i + 1}.</Text>
            <Text style={st.planText}>{t}</Text>
          </View>
        ))}
        <TouchableOpacity style={st.row} onPress={() => navigation.navigate('Sensory Relaxation')} accessibilityRole="button">
          <Glyph name="leaf-outline" size={20} style={{ marginRight: 12 }} />
          <Text style={[st.rowTitle, { flex: 1 }]}>Open guided breathing</Text>
          <Glyph name="chevron-forward-outline" size={18} color="#9ca3af" />
        </TouchableOpacity>

        <Text style={st.disclaimer}>
          Aspie Guide is not a crisis or medical service. Phone numbers are provided for convenience; check your local services. If you cannot call, many emergency services accept texts.
        </Text>
      </ScrollView>
      <ShowCard visible={!!show} text={show} onClose={() => setShow(null)} />
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  pad: { padding: 20, paddingBottom: 48 },
  h1: { fontFamily: F.bold, fontSize: 26, color: C.navy, marginBottom: 6 },
  lead: { fontFamily: F.medium, fontSize: 15, color: '#475569', lineHeight: 22, marginBottom: 12 },
  small: { fontFamily: F.regular, fontSize: 13, color: C.muted, marginBottom: 8 },
  emergencyBox: { gap: 8 },
  emergency: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#b91c1c', borderRadius: 12, padding: 14 },
  emergencyLabel: { fontFamily: F.bold, fontSize: 17, color: '#fff' },
  emergencyRegion: { fontFamily: F.medium, fontSize: 12, color: '#fee2e2' },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8 },
  rowTitle: { fontFamily: F.bold, fontSize: 15, color: C.navy },
  rowSub: { fontFamily: F.regular, fontSize: 13, color: C.muted, marginTop: 2 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8, borderLeftWidth: 4, borderLeftColor: C.purple },
  cardText: { flex: 1, fontFamily: F.semi, fontSize: 15, color: '#111', lineHeight: 21, marginRight: 8 },
  input: { fontFamily: F.medium, fontSize: 15, color: '#111', minHeight: 70, textAlignVertical: 'top' },
  action: { fontFamily: F.bold, fontSize: 15, color: C.purple, padding: 4 },
  planRow: { flexDirection: 'row', marginBottom: 8 },
  planNum: { fontFamily: F.bold, fontSize: 15, color: C.purple, width: 24 },
  planText: { flex: 1, fontFamily: F.regular, fontSize: 15, color: '#334155', lineHeight: 22 },
  disclaimer: { fontFamily: F.regular, fontSize: 12, color: '#94a3b8', lineHeight: 17, marginTop: 20 },
});
