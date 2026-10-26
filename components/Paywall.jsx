import React, { useEffect, useState } from 'react';
import {
  Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView,
  ActivityIndicator, Linking, Platform,
} from 'react-native';
import { usePro, PLAN_LABEL, PLAN_TERM, PRIVACY_URL, TERMS_URL } from '../lib/pro';
import { SCENARIOS } from '../data/scenarios';
import { C, F, Glyph, Button } from './ui';

const REASONS = {
  scripts: 'This situation is part of Aspie Guide Pro.',
  save: 'Free accounts can save up to 3 scripts. Pro saves as many as you like.',
  coach: 'The AI coach is part of Aspie Guide Pro.',
  practice: 'Practice for this situation is part of Aspie Guide Pro.',
};

export function PaywallContent({ onClose }) {
  const { offers, loadingOffers, loadOffers, buy, restore, busy, message, paywallReason, isPro, manage } = usePro();
  const [selected, setSelected] = useState('yearly');

  useEffect(() => {
    loadOffers();
  }, []);

  useEffect(() => {
    if (offers.length && !offers.find((o) => o.plan === selected)) setSelected(offers[0].plan);
  }, [offers]);

  const offer = offers.find((o) => o.plan === selected);
  const total = SCENARIOS.length;
  const store = Platform.OS === 'ios' ? 'Apple Account' : 'Google Play account';
  const manageWhere =
    Platform.OS === 'ios' ? 'Settings > your name > Subscriptions' : 'Google Play > Payments & subscriptions';

  const features = [
    { icon: 'library-outline', title: `All ${total} Situation Scripts`, body: 'Work, school, friends, phone calls, shops, dating and family: what to say, what to do, and why.' },
    { icon: 'chatbubbles-outline', title: 'Practice every situation', body: 'Rehearse with choices and kind, specific feedback.' },
    {
      icon: 'sparkles-outline',
      title: 'Private AI coach',
      body:
        Platform.OS === 'ios'
          ? 'Role-play a conversation and check a message before you send it. With Apple Intelligence (iOS 26+) it runs entirely on your iPhone.'
          : 'Role-play a conversation and check a message before you send it, using your own OpenAI key.',
    },
    { icon: 'bookmark-outline', title: 'Unlimited saved scripts', body: 'Save lines that work for you, write your own, and show them full-screen.' },
  ];

  if (isPro) {
    return (
      <View style={st.wrap}>
        <Glyph name="checkmark-done-outline" size={40} style={{ alignSelf: 'center', marginTop: 12 }} />
        <Text style={st.title}>Aspie Guide Pro is active</Text>
        <Text style={st.sub}>Thank you for supporting Aspie Guide. Everything is unlocked on this device.</Text>
        <Button title="Manage subscription" kind="secondary" icon="settings-outline" onPress={manage} />
        <Button title="Restore Purchases" kind="secondary" icon="refresh-outline" onPress={restore} disabled={busy} />
        {message ? <Text style={st.message}>{message}</Text> : null}
        {onClose ? <Button title="Close" onPress={onClose} /> : null}
      </View>
    );
  }

  return (
    <View style={st.wrap}>
      <Text style={st.title}>Aspie Guide Pro</Text>
      <Text style={st.sub}>{REASONS[paywallReason] || 'More situations, practice and a private coach.'}</Text>

      {features.map((f) => (
        <View key={f.title} style={st.feature}>
          <Glyph name={f.icon} size={24} style={{ marginRight: 12, marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={st.featureTitle}>{f.title}</Text>
            <Text style={st.featureBody}>{f.body}</Text>
          </View>
        </View>
      ))}

      <View style={st.freeNote}>
        <Glyph name="heart-outline" size={18} color={C.green} style={{ marginRight: 8, marginTop: 1 }} />
        <Text style={st.freeNoteText}>
          Always free: Get Help Now and crisis lines, help cards, safety and health scripts, breathing, articles, games, quizzes and the AI Chat Assistant.
        </Text>
      </View>

      {loadingOffers ? (
        <ActivityIndicator color={C.purple} style={{ marginVertical: 24 }} />
      ) : offers.length === 0 ? (
        <View style={{ marginVertical: 12 }}>
          <Text style={st.sub}>Prices could not be loaded from the store. Check your connection and try again.</Text>
          <Button title="Try again" kind="secondary" icon="refresh-outline" onPress={loadOffers} />
        </View>
      ) : (
        <View style={{ marginTop: 8 }}>
          {offers.map((o) => {
            const on = o.plan === selected;
            return (
              <TouchableOpacity
                key={o.plan}
                onPress={() => setSelected(o.plan)}
                style={[st.plan, on && st.planOn]}
                accessibilityRole="radio"
                accessibilityState={{ selected: on }}
                accessibilityLabel={`${PLAN_LABEL[o.plan]}, ${o.price}, ${PLAN_TERM[o.plan]}`}
              >
                <Glyph name={on ? 'checkmark-outline' : 'remove-outline'} size={20} color={on ? C.purple : '#cbd5e1'} style={{ marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Text style={st.planName}>{PLAN_LABEL[o.plan]}</Text>
                  <Text style={st.planTerm}>{PLAN_TERM[o.plan]}</Text>
                </View>
                <Text style={st.planPrice}>{o.price}</Text>
              </TouchableOpacity>
            );
          })}
          <Button
            title={
              busy
                ? 'Please wait...'
                : offer?.plan === 'lifetime'
                ? `Buy Lifetime for ${offer.price}`
                : offer
                ? `Subscribe for ${offer.price} ${offer.plan === 'yearly' ? 'a year' : 'a month'}`
                : 'Continue'
            }
            onPress={() => offer && buy(offer)}
            disabled={!offer || busy}
            style={{ marginTop: 14 }}
          />
        </View>
      )}

      <TouchableOpacity onPress={restore} disabled={busy} style={st.restore} accessibilityRole="button">
        <Text style={st.restoreText}>Restore Purchases</Text>
      </TouchableOpacity>
      {message ? <Text style={st.message}>{message}</Text> : null}

      <Text style={st.legal}>
        Subscriptions renew automatically at the price shown for the same period (monthly or yearly) unless cancelled at least 24 hours before the end of the current period. Payment is charged to your {store} when you confirm the purchase, and renewals are charged within 24 hours before the period ends. You can manage or cancel in {manageWhere}. Lifetime is a single payment with no renewal.
      </Text>
      <View style={st.links}>
        <Text style={st.link} onPress={() => Linking.openURL(TERMS_URL)} accessibilityRole="link">
          Terms of Use{Platform.OS === 'ios' ? ' (EULA)' : ''}
        </Text>
        <Text style={st.linkSep}> | </Text>
        <Text style={st.link} onPress={() => Linking.openURL(PRIVACY_URL)} accessibilityRole="link">
          Privacy Policy
        </Text>
      </View>
      {onClose ? (
        <TouchableOpacity onPress={onClose} style={st.restore} accessibilityRole="button">
          <Text style={[st.restoreText, { color: C.muted }]}>Not now</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default function PaywallModal() {
  const { paywallVisible, hidePaywall } = usePro();
  return (
    <Modal visible={paywallVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={hidePaywall}>
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        <TouchableOpacity onPress={hidePaywall} style={st.close} accessibilityRole="button" accessibilityLabel="Close">
          <Glyph name="close-outline" size={28} color={C.muted} />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <PaywallContent onClose={hidePaywall} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const st = StyleSheet.create({
  wrap: { padding: 20 },
  close: { alignSelf: 'flex-end', padding: 12 },
  title: { fontFamily: F.bold, fontSize: 28, color: C.navy, textAlign: 'center', marginTop: 4 },
  sub: { fontFamily: F.medium, fontSize: 15, color: C.muted, textAlign: 'center', marginTop: 6, marginBottom: 16, lineHeight: 21 },
  feature: { flexDirection: 'row', backgroundColor: C.card, borderRadius: 12, padding: 14, marginBottom: 10 },
  featureTitle: { fontFamily: F.bold, fontSize: 15, color: C.navy, marginBottom: 2 },
  featureBody: { fontFamily: F.regular, fontSize: 13, color: '#475569', lineHeight: 19 },
  freeNote: { flexDirection: 'row', backgroundColor: C.greenLight, borderRadius: 12, padding: 12, marginTop: 4, marginBottom: 8 },
  freeNoteText: { flex: 1, fontFamily: F.medium, fontSize: 13, color: C.green, lineHeight: 19 },
  plan: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderRadius: 12,
    padding: 14, marginBottom: 8, borderWidth: 2, borderColor: C.border,
  },
  planOn: { borderColor: C.purple },
  planName: { fontFamily: F.bold, fontSize: 16, color: C.navy },
  planTerm: { fontFamily: F.regular, fontSize: 12, color: C.muted, marginTop: 1 },
  planPrice: { fontFamily: F.bold, fontSize: 17, color: C.navy },
  restore: { alignItems: 'center', padding: 12, marginTop: 4 },
  restoreText: { fontFamily: F.semi, fontSize: 15, color: C.purple },
  message: { fontFamily: F.medium, fontSize: 14, color: C.navy, textAlign: 'center', marginVertical: 6 },
  legal: { fontFamily: F.regular, fontSize: 11, color: '#94a3b8', lineHeight: 16, marginTop: 8, textAlign: 'center' },
  links: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  link: { fontFamily: F.semi, fontSize: 13, color: C.purple, textDecorationLine: 'underline' },
  linkSep: { fontFamily: F.regular, fontSize: 13, color: '#94a3b8' },
});
