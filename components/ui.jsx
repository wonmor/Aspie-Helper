import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const C = {
  purple: '#6366f1',
  purpleLight: '#ede9fe',
  navy: '#1e1b4b',
  text: '#333',
  muted: '#64748b',
  bg: '#f8f8fc',
  card: '#fff',
  green: '#166534',
  greenLight: '#f0fdf4',
  red: '#b91c1c',
  redLight: '#fef2f2',
  amberLight: '#fef3c7',
  border: '#e5e7eb',
};

export const F = {
  regular: 'Quicksand_400Regular',
  medium: 'Quicksand_500Medium',
  semi: 'Quicksand_600SemiBold',
  bold: 'Quicksand_700Bold',
};

export function Glyph({ name, size = 20, color = C.purple, style }) {
  return <Ionicons name={name} size={size} color={color} style={style} />;
}

export function ProTag({ small }) {
  return (
    <View style={[s.proTag, small && { paddingHorizontal: 6, paddingVertical: 1 }]}>
      <Glyph name="lock-closed-outline" size={small ? 11 : 12} color={C.purple} />
      <Text style={[s.proTagText, small && { fontSize: 11 }]}>Pro</Text>
    </View>
  );
}

export function BackLink({ onPress, label = 'Back' }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.back} accessibilityRole="button" accessibilityLabel={label}>
      <Glyph name="chevron-back-outline" size={20} />
      <Text style={s.backText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function SectionTitle({ icon, children }) {
  return (
    <View style={s.sectionRow}>
      {icon ? <Glyph name={icon} size={18} color={C.navy} style={{ marginRight: 8 }} /> : null}
      <Text style={s.sectionTitle}>{children}</Text>
    </View>
  );
}

export function Button({ title, onPress, icon, kind = 'primary', disabled, style }) {
  const primary = kind === 'primary';
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={[s.btn, primary ? s.btnPrimary : s.btnSecondary, disabled && { opacity: 0.5 }, style]}
    >
      {icon ? <Glyph name={icon} size={18} color={primary ? '#fff' : C.purple} style={{ marginRight: 8 }} /> : null}
      <Text style={[s.btnText, { color: primary ? '#fff' : C.purple }]}>{title}</Text>
    </TouchableOpacity>
  );
}

/** Full-screen, large-text card to read from or show to someone. */
export function ShowCard({ visible, text, onClose }) {
  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose} supportedOrientations={['portrait', 'landscape']}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 28 }}>
          <Text style={s.showText} accessibilityRole="text">
            {text}
          </Text>
        </ScrollView>
        <TouchableOpacity onPress={onClose} style={s.showDone} accessibilityRole="button">
          <Text style={s.showDoneText}>Done</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}

export const s = StyleSheet.create({
  proTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.purpleLight,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    gap: 3,
  },
  proTagText: { fontFamily: F.bold, fontSize: 12, color: C.purple },
  back: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, alignSelf: 'flex-start', paddingVertical: 4 },
  backText: { fontFamily: F.semi, fontSize: 16, color: C.purple, marginLeft: 2 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', marginTop: 18, marginBottom: 8 },
  sectionTitle: { fontFamily: F.bold, fontSize: 17, color: C.navy },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  btnPrimary: { backgroundColor: C.purple },
  btnSecondary: { backgroundColor: C.purpleLight },
  btnText: { fontFamily: F.bold, fontSize: 16 },
  showText: { fontFamily: F.bold, fontSize: 34, lineHeight: 46, color: '#111', textAlign: 'center' },
  showDone: { margin: 20, padding: 16, borderRadius: 14, backgroundColor: C.purple, alignItems: 'center' },
  showDoneText: { fontFamily: F.bold, fontSize: 18, color: '#fff' },
});
