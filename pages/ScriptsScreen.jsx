import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import * as Haptics from 'expo-haptics';
import { CATEGORIES, SCENARIOS, FREE_SAVE_LIMIT, scenarioById } from '../data/scenarios';
import { usePro } from '../lib/pro';
import { useSaved } from '../lib/saved';
import { pickEngine } from '../lib/coach';
import { C, F, Glyph, ProTag, BackLink, SectionTitle, Button, ShowCard } from '../components/ui';
import { ScriptedPractice, AIRolePlay } from '../components/Practice';

export function useSaveScript() {
  const isPro = usePro((x) => x.isPro);
  const showPaywall = usePro((x) => x.showPaywall);
  const { scripts, addScript, hasScript } = useSaved();
  return (title, text, scenarioId) => {
    if (hasScript(text)) return 'exists';
    if (!isPro && scripts.length >= FREE_SAVE_LIMIT) {
      showPaywall('save');
      return 'limit';
    }
    addScript(title, text, scenarioId);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    return 'saved';
  };
}

export default function ScriptsScreen({ navigation, route }) {
  const isPro = usePro((x) => x.isPro);
  const showPaywall = usePro((x) => x.showPaywall);
  const [cat, setCat] = useState(null);
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);
  const [mode, setMode] = useState('detail'); // detail | practice | ai

  // Deep link from search / home: { scenarioId }
  useEffect(() => {
    const id = route?.params?.scenarioId;
    if (id && scenarioById(id)) {
      setOpenId(id);
      setMode(route?.params?.mode === 'practice' ? 'practice' : 'detail');
    }
  }, [route?.params?.scenarioId]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCENARIOS.filter((x) => (!cat || x.cat === cat)).filter(
      (x) => !q || `${x.title} ${x.situation} ${x.say.join(' ')}`.toLowerCase().includes(q)
    );
  }, [cat, query]);

  const open = openId ? scenarioById(openId) : null;
  const unlocked = (x) => x.free || isPro;
  const openHelp = () => navigation.navigate('Get Help Now');

  if (open && mode === 'practice') {
    const pool = SCENARIOS.filter(unlocked);
    const next = () => {
      const i = pool.findIndex((x) => x.id === open.id);
      setOpenId(pool[(i + 1) % pool.length].id);
    };
    return (
      <SafeAreaView style={st.safe}>
        <ScriptedPractice key={open.id} scenario={open} onBack={() => setMode('detail')} onNext={next} />
      </SafeAreaView>
    );
  }
  if (open && mode === 'ai') {
    return (
      <SafeAreaView style={st.safe}>
        <AIRolePlay scenario={open} onBack={() => setMode('detail')} onOpenHelp={openHelp} />
      </SafeAreaView>
    );
  }
  if (open) {
    return (
      <SafeAreaView style={st.safe}>
        <ScenarioDetail
          scenario={open}
          locked={!unlocked(open)}
          onBack={() => setOpenId(null)}
          onPractice={() => setMode('practice')}
          onAI={() => setMode('ai')}
          onOpenHelp={openHelp}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={st.safe}>
      <ScrollView contentContainerStyle={st.pad} keyboardShouldPersistTaps="handled">
        <Text style={st.h1}>Situation Scripts</Text>
        <Text style={st.lead}>What to say, what to do, and why it works, for everyday situations.</Text>

        <View style={st.search}>
          <Glyph name="search-outline" size={18} color={C.muted} style={{ marginRight: 8 }} />
          <TextInput
            style={st.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search situations"
            placeholderTextColor="#9ca3af"
            clearButtonMode="while-editing"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
          <Chip label="All" on={!cat} onPress={() => setCat(null)} />
          {CATEGORIES.map((c) => (
            <Chip key={c.id} label={c.title} icon={c.icon} on={cat === c.id} onPress={() => setCat(c.id)} />
          ))}
        </ScrollView>

        {CATEGORIES.filter((c) => !cat || c.id === cat).map((c) => {
          const items = list.filter((x) => x.cat === c.id);
          if (!items.length) return null;
          return (
            <View key={c.id}>
              <SectionTitle icon={c.icon}>{c.title}</SectionTitle>
              {items.map((x) => (
                <TouchableOpacity
                  key={x.id}
                  style={st.row}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setOpenId(x.id);
                    setMode('detail');
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={`${x.title}${unlocked(x) ? '' : ', Pro'}`}
                >
                  <Text style={st.rowTitle}>{x.title}</Text>
                  {unlocked(x) ? <Glyph name="chevron-forward-outline" size={18} color="#9ca3af" /> : <ProTag small />}
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
        {list.length === 0 ? <Text style={st.lead}>No situations match "{query}".</Text> : null}

        {!isPro ? (
          <TouchableOpacity style={st.upsell} onPress={() => showPaywall('scripts')} accessibilityRole="button">
            <Glyph name="library-outline" size={22} style={{ marginRight: 10 }} />
            <Text style={st.upsellText}>
              {SCENARIOS.filter((x) => x.free).length} situations are free. Pro unlocks all {SCENARIOS.length}, with practice and the AI coach.
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function Chip({ label, icon, on, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[st.chip, on && st.chipOn]} accessibilityRole="button" accessibilityState={{ selected: on }}>
      {icon ? <Glyph name={icon} size={14} color={on ? '#fff' : C.purple} style={{ marginRight: 5 }} /> : null}
      <Text style={[st.chipText, on && { color: '#fff' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function ScenarioDetail({ scenario, locked, onBack, onPractice, onAI, onOpenHelp }) {
  const isPro = usePro((x) => x.isPro);
  const showPaywall = usePro((x) => x.showPaywall);
  const saved = useSaved((x) => x.scripts);
  const save = useSaveScript();
  const [show, setShow] = useState(null);
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    pickEngine().then(setEngine);
  }, []);

  const clean = (t) => t.replace(/^"|"$/g, '');

  return (
    <ScrollView contentContainerStyle={st.pad}>
      <BackLink onPress={onBack} label="All situations" />
      <Text style={st.h1}>{scenario.title}</Text>
      <Text style={st.lead}>{scenario.situation}</Text>

      {locked ? (
        <View style={st.lockedBox}>
          <Glyph name="lock-closed-outline" size={26} style={{ alignSelf: 'center' }} />
          <Text style={st.lockedText}>
            The scripts, tips and practice for this situation are part of Aspie Guide Pro.
          </Text>
          <Button title="See Aspie Guide Pro" onPress={() => showPaywall('scripts')} />
        </View>
      ) : (
        <>
          <SectionTitle icon="chatbox-ellipses-outline">What you can say</SectionTitle>
          {scenario.say.map((line, i) => {
            const isSaved = saved.some((x) => x.text === clean(line));
            return (
              <View key={i} style={st.sayRow}>
                <Text style={st.sayText}>{line}</Text>
                <View style={st.sayActions}>
                  <TouchableOpacity onPress={() => setShow(clean(line))} style={st.iconBtn} accessibilityLabel="Show full screen">
                    <Glyph name="expand-outline" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => !isSaved && save(scenario.title, clean(line), scenario.id)}
                    style={st.iconBtn}
                    accessibilityLabel={isSaved ? 'Saved' : 'Save to My Scripts'}
                  >
                    <Glyph name={isSaved ? 'bookmark' : 'bookmark-outline'} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          <SectionTitle icon="checkmark-outline">What to do</SectionTitle>
          {scenario.do.map((t, i) => (
            <ListLine key={i} icon="arrow-forward-outline" text={t} />
          ))}

          {scenario.avoid?.length ? (
            <>
              <SectionTitle icon="hand-left-outline">Try to avoid</SectionTitle>
              {scenario.avoid.map((t, i) => (
                <ListLine key={i} icon="close-outline" text={t} />
              ))}
            </>
          ) : null}

          <SectionTitle icon="bulb-outline">Why it works</SectionTitle>
          <Text style={st.why}>{scenario.why}</Text>

          <Button title="Practice this situation" icon="chatbubbles-outline" onPress={onPractice} style={{ marginTop: 20 }} />
          <Button
            title={isPro ? 'Rehearse with the AI coach' : 'Rehearse with the AI coach (Pro)'}
            icon="sparkles-outline"
            kind="secondary"
            onPress={() => {
              if (!isPro) return showPaywall('coach');
              onAI(); // explains itself when no AI engine is available
            }}
          />
          {isPro && !engine ? (
            <Text style={st.note}>
              The AI coach needs an iPhone with Apple Intelligence (iOS 26+), or your own OpenAI key in the AI Chat Assistant.
            </Text>
          ) : null}
          {scenario.cat === 'safety' || scenario.cat === 'health' ? (
            <TouchableOpacity style={st.helpLink} onPress={onOpenHelp}>
              <Glyph name="call-outline" size={18} color={C.red} style={{ marginRight: 8 }} />
              <Text style={st.helpLinkText}>In danger or in crisis? Open Get Help Now.</Text>
            </TouchableOpacity>
          ) : null}
        </>
      )}
      <ShowCard visible={!!show} text={show} onClose={() => setShow(null)} />
    </ScrollView>
  );
}

function ListLine({ icon, text }) {
  return (
    <View style={st.listLine}>
      <Glyph name={icon} size={16} color={C.muted} style={{ marginRight: 8, marginTop: 3 }} />
      <Text style={st.listText}>{text}</Text>
    </View>
  );
}

const st = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  pad: { padding: 20, paddingBottom: 48 },
  h1: { fontFamily: F.bold, fontSize: 24, color: C.navy, marginBottom: 6 },
  lead: { fontFamily: F.regular, fontSize: 15, color: '#475569', lineHeight: 22, marginBottom: 12 },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, borderWidth: 1.5, borderColor: C.border, marginBottom: 12 },
  searchInput: { flex: 1, paddingVertical: 11, fontFamily: F.medium, fontSize: 15, color: '#222' },
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.purpleLight, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 7, marginRight: 8 },
  chipOn: { backgroundColor: C.purple },
  chipText: { fontFamily: F.semi, fontSize: 13, color: C.purple },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8 },
  rowTitle: { flex: 1, fontFamily: F.semi, fontSize: 15, color: '#222', marginRight: 10, lineHeight: 21 },
  upsell: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.purpleLight, borderRadius: 12, padding: 14, marginTop: 20 },
  upsellText: { flex: 1, fontFamily: F.semi, fontSize: 14, color: '#3730a3', lineHeight: 20 },
  lockedBox: { backgroundColor: '#fff', borderRadius: 14, padding: 18, marginTop: 8 },
  lockedText: { fontFamily: F.medium, fontSize: 15, color: '#475569', textAlign: 'center', marginVertical: 10, lineHeight: 22 },
  sayRow: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8, borderLeftWidth: 4, borderLeftColor: C.purple },
  sayText: { flex: 1, fontFamily: F.medium, fontSize: 15, color: '#111', lineHeight: 22 },
  sayActions: { flexDirection: 'row', marginLeft: 6 },
  iconBtn: { padding: 6 },
  listLine: { flexDirection: 'row', marginBottom: 8 },
  listText: { flex: 1, fontFamily: F.regular, fontSize: 15, color: '#334155', lineHeight: 22 },
  why: { fontFamily: F.regular, fontSize: 15, color: '#334155', lineHeight: 22 },
  note: { fontFamily: F.regular, fontSize: 12, color: C.muted, textAlign: 'center', marginTop: 8, lineHeight: 17 },
  helpLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 18, padding: 10 },
  helpLinkText: { fontFamily: F.semi, fontSize: 14, color: C.red },
});
