import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { PaywallContent } from '../components/Paywall';
import { C } from '../components/ui';

export default function ProScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <PaywallContent />
      </ScrollView>
    </SafeAreaView>
  );
}
