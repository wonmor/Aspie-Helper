// Practice & Coach: quick practice rounds, AI role-play and Message Check.
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import { SCENARIOS } from '../data/scenarios';
import { usePro } from '../lib/pro';
import { messageCheck, errorText, looksLikeCrisis, onDeviceAvailability, onDeviceStatusText, pickEngine } from '../lib/coach';
import { C, F, Glyph, ProTag, BackLink, Button } from '../components/ui';
import { ScriptedPractice, AIRolePlay } from '../components/Practice';
import { useSaveScript } from './ScriptsScreen';

export default function CoachScreen({ navigation }) {
  const isPro = usePro((x) => x.isPro);
  const showPaywall = usePro((x) => x.showPaywall);
  const [view, setView] = useState('home'); // home | practice | pick | ai | check
  const [scenario, setScenario] = useState(null);
  const [engine, setEngine] = useState(null);
  const status = onDeviceAvailability();

  useEffect(() => {
    pickEngine().then(setEngine);
  }, [view]);

  const pool = SCENARIOS.filter((x) => x.free || isPro);
  const random = () => pool[Math.floor(Math.random() * pool.length)];
  const openHelp = () => navigation.navigate('Get Help Now');

  if (view === 'practice' && scenario) {
    return (
      <SafeAreaView style={st.safe}>
        <ScriptedPractice key={scenario.id} scenario={scenario} onBack={() => setView('home')} onNext={() => setScenario(random())} />
      </SafeAreaView>
    );
  }
  if (view === 'ai' && scenario) {
    return (
      <SafeAreaView style={st.safe}>
        <AIRolePlay scenario={scenario} onBack={() => setView('pick')} onOpenHelp={openHelp} />
      </SafeAreaView>
    );
  }
  if (view === 'pick') {
    return (
      <SafeAreaView style={st.safe}>
        <ScrollView contentContainerStyle={st.pad}>
          <BackLink onPress={() => setView('home')} />
          <Text style={st.h1}>Choose a situation to rehearse</Text>
          {SCENARIOS.map((x) => (
            <TouchableOpacity key={x.id} style={st.row} onPress={() => { setScenario(x); setView('ai'); }} accessibilityRole="button">
              <Text style={st.rowTitle}>{x.title}</Text>
              <Glyph name="chevron-forward-outline" size={18} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
  if (view === 'check') {
    return (
      <SafeAreaView style={st.safe}>
        <MessageCheck onBack={() => setView('home')} onOpenHelp={openHelp} />
      </SafeAreaView>
    );
  }

  const aiNote = engine === 'device'
    ? onDeviceStatusText('available')
    : engine === 'openai'
    ? 'Uses your OpenAI key from the AI Chat Assistant. ' + onDeviceStatusText(status)
    : onDeviceStatusText(status) + ' You can also add your own OpenAI key in the AI Chat Assistant.';

  return (
    <SafeAreaView style={st.safe}>
      <ScrollView contentContainerStyle={st.pad}>
        <Text style={st.h1}>Practice & Coach</Text>
        <Text style={st.lead}>Rehearse before the real thing, at your own pace. There is no score and no time limit.</Text>

        <Tile
          icon="chatbubbles-outline"
          title="Quick practice"
          body={`A random situation with three possible answers and feedback. ${isPro ? `All ${SCENARIOS.length} situations.` : `${pool.length} free situations; Pro adds ${SCENARIOS.length - pool.length} more.`}`}
          onPress={() => { setScenario(random()); setView('practice'); }}
        />
        <Tile
          icon="sparkles-outline"
          title="Rehearse with the AI coach"
          body="The coach plays the other person and gives you one kind, specific tip after each reply."
          pro={!isPro}
          onPress={() => (isPro ? setView('pick') : showPaywall('coach'))}
        />
        <Tile
          icon="mail-outline"
          title="Message Check"
          body="Paste a message before you send it. See how it may come across and get a clearer version."
          pro={!isPro}
          onPress={() => (isPro ? setView('check') : showPaywall('coach'))}
        />

        <View style={st.note}>
          <Glyph name={engine === 'device' ? 'phone-portrait-outline' : 'information-outline'} size={18} color={C.muted} style={{ marginRight: 8, marginTop: 1 }} />
          <Text style={st.noteText}>{aiNote}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Tile({ icon, title, body, pro, onPress }) {
  return (
    <TouchableOpacity style={st.tile} onPress={onPress} accessibilityRole="button" accessibilityLabel={`${title}${pro ? ', Pro' : ''}`}>
      <Glyph name={icon} size={28} style={{ marginRight: 14, marginTop: 2 }} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={st.tileTitle}>{title}</Text>
          {pro ? <ProTag small /> : null}
        </View>
        <Text style={st.tileBody}>{body}</Text>
      </View>
    </TouchableOpacity>
  );
}

function MessageCheck({ onBack, onOpenHelp }) {
  const [message, setMessage] = useState('');
  const [context, setContext] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [crisis, setCrisis] = useState(false);
  const [savedState, setSavedState] = useState(null);
  const save = useSaveScript();

  const run = async () => {
    if (!message.trim()) return;
    setCrisis(looksLikeCrisis(message));
    setLoading(true);
    setError(null);
    setResult(null);
    setSavedState(null);
    const r = await messageCheck(message.trim(), context.trim());
    setLoading(false);
    if (r.text) setResult(r.text);
    else setError(errorText(r.error));
  };

  const clearer = result?.match(/Clearer version:\s*([\s\S]*?)(\n\s*Why:|$)/i)?.[1]?.trim();

  return (
    <ScrollView contentContainerStyle={st.pad} keyboardShouldPersistTaps="handled">
      <BackLink onPress={onBack} />
      <Text style={st.h1}>Message Check</Text>
      <Text style={st.lead}>Write the message you want to send or say. The coach explains how it may be read and suggests a clearer version.</Text>
      <TextInput
        style={[st.input, { minHeight: 110 }]}
        value={message}
        onChangeText={setMessage}
        placeholder="e.g. I can't come to the meeting. The time doesn't work."
        placeholderTextColor="#9ca3af"
        multiline
        maxLength={1200}
      />
      <TextInput
        style={st.input}
        value={context}
        onChangeText={setContext}
        placeholder="Who is it for? (optional, e.g. my manager)"
        placeholderTextColor="#9ca3af"
        maxLength={200}
      />
      <Button title={loading ? 'Checking...' : 'Check my message'} icon="sparkles-outline" onPress={run} disabled={loading || !message.trim()} />
      {loading ? <ActivityIndicator color={C.purple} style={{ marginTop: 16 }} /> : null}
      {crisis ? (
        <TouchableOpacity style={st.crisis} onPress={onOpenHelp} accessibilityRole="button">
          <Glyph name="hand-left-outline" size={20} color={C.red} style={{ marginRight: 8 }} />
          <Text style={st.crisisText}>If you are not safe right now, tap here for Get Help Now. It is always free.</Text>
        </TouchableOpacity>
      ) : null}
      {error ? <Text style={[st.lead, { marginTop: 12 }]}>{error}</Text> : null}
      {result ? (
        <View style={st.result}>
          <Text style={st.resultText}>{result}</Text>
          {clearer ? (
            <Button
              title={savedState === 'saved' || savedState === 'exists' ? 'Saved to My Scripts' : 'Save clearer version'}
              kind="secondary"
              icon={savedState === 'saved' || savedState === 'exists' ? 'bookmark' : 'bookmark-outline'}
              onPress={() => setSavedState(save(context.trim() || 'Message', clearer))}
            />
          ) : null}
        </View>
      ) : null}
    </ScrollView>
  );
}

const st = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  pad: { padding: 20, paddingBottom: 48 },
  h1: { fontFamily: F.bold, fontSize: 24, color: C.navy, marginBottom: 6 },
  lead: { fontFamily: F.regular, fontSize: 15, color: '#475569', lineHeight: 22, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8 },
  rowTitle: { flex: 1, fontFamily: F.semi, fontSize: 15, color: '#222', marginRight: 10 },
  tile: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12 },
  tileTitle: { fontFamily: F.bold, fontSize: 17, color: C.navy },
  tileBody: { fontFamily: F.regular, fontSize: 14, color: '#475569', lineHeight: 20, marginTop: 4 },
  note: { flexDirection: 'row', marginTop: 8, padding: 12, backgroundColor: '#fff', borderRadius: 12 },
  noteText: { flex: 1, fontFamily: F.regular, fontSize: 13, color: C.muted, lineHeight: 19 },
  input: {
    borderWidth: 1.5, borderColor: '#d1d5db', borderRadius: 12, padding: 12, fontSize: 15, fontFamily: F.regular,
    color: '#222', backgroundColor: '#fff', marginBottom: 8, textAlignVertical: 'top',
  },
  result: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginTop: 16, borderLeftWidth: 4, borderLeftColor: C.purple },
  resultText: { fontFamily: F.medium, fontSize: 15, color: '#111', lineHeight: 23 },
  crisis: { flexDirection: 'row', backgroundColor: C.redLight, borderRadius: 12, padding: 12, marginTop: 12 },
  crisisText: { flex: 1, fontFamily: F.semi, fontSize: 14, color: C.red, lineHeight: 20 },
});
