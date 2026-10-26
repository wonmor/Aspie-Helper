import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native';
import { useSaved } from '../lib/saved';
import { usePro } from '../lib/pro';
import { FREE_SAVE_LIMIT } from '../data/scenarios';
import { C, F, Glyph, Button, ShowCard, ProTag } from '../components/ui';

export default function MyScriptsScreen({ navigation }) {
  const { scripts, addScript, updateScript, removeScript } = useSaved();
  const isPro = usePro((x) => x.isPro);
  const showPaywall = usePro((x) => x.showPaywall);
  const [show, setShow] = useState(null);
  const [editing, setEditing] = useState(null); // { id?, title, text }

  const startNew = () => {
    if (!isPro) return showPaywall('save');
    setEditing({ title: '', text: '' });
  };

  const save = () => {
    const title = editing.title.trim() || 'My script';
    const text = editing.text.trim();
    if (!text) return;
    if (editing.id) updateScript(editing.id, { title, text });
    else addScript(title, text, null);
    setEditing(null);
  };

  const remove = (id) =>
    Alert.alert('Delete this script?', 'This removes it from this device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeScript(id) },
    ]);

  return (
    <SafeAreaView style={st.safe}>
      <ScrollView contentContainerStyle={st.pad} keyboardShouldPersistTaps="handled">
        <Text style={st.h1}>My Scripts</Text>
        <Text style={st.lead}>Lines that work for you, ready to read or show full screen. Saved only on this device.</Text>

        {editing ? (
          <View style={st.editor}>
            <TextInput
              style={st.titleInput}
              value={editing.title}
              onChangeText={(title) => setEditing({ ...editing, title })}
              placeholder="When I use it (e.g. Ordering coffee)"
              placeholderTextColor="#9ca3af"
              maxLength={80}
            />
            <TextInput
              style={st.textInput}
              value={editing.text}
              onChangeText={(text) => setEditing({ ...editing, text })}
              placeholder="What I say (e.g. Hi, could I have a small oat latte, please?)"
              placeholderTextColor="#9ca3af"
              multiline
              maxLength={600}
            />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Button title="Cancel" kind="secondary" onPress={() => setEditing(null)} style={{ flex: 1 }} />
              <Button title="Save" onPress={save} disabled={!editing.text.trim()} style={{ flex: 1 }} />
            </View>
          </View>
        ) : (
          <TouchableOpacity style={st.add} onPress={startNew} accessibilityRole="button">
            <Glyph name="add-outline" size={22} style={{ marginRight: 8 }} />
            <Text style={st.addText}>Write my own script</Text>
            {!isPro ? <ProTag small /> : null}
          </TouchableOpacity>
        )}

        {scripts.length === 0 && !editing ? (
          <View style={st.empty}>
            <Glyph name="bookmark-outline" size={30} style={{ alignSelf: 'center', marginBottom: 8 }} />
            <Text style={st.emptyText}>
              Nothing saved yet. In Situation Scripts, tap the bookmark next to a line to keep it here.
            </Text>
            <Button title="Browse Situation Scripts" kind="secondary" onPress={() => navigation.navigate('Situation Scripts')} />
          </View>
        ) : null}

        {scripts.map((x) => (
          <View key={x.id} style={st.item}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => setShow(x.text)} accessibilityRole="button" accessibilityHint="Shows this script full screen">
              <Text style={st.itemTitle}>{x.title}</Text>
              <Text style={st.itemText}>{x.text}</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={st.iconBtn} onPress={() => setShow(x.text)} accessibilityLabel="Show full screen">
                <Glyph name="expand-outline" size={19} />
              </TouchableOpacity>
              <TouchableOpacity style={st.iconBtn} onPress={() => setEditing({ id: x.id, title: x.title, text: x.text })} accessibilityLabel="Edit">
                <Glyph name="create-outline" size={19} />
              </TouchableOpacity>
              <TouchableOpacity style={st.iconBtn} onPress={() => remove(x.id)} accessibilityLabel="Delete">
                <Glyph name="trash-outline" size={19} color={C.muted} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {!isPro && scripts.length > 0 ? (
          <Text style={st.limit}>
            {Math.min(scripts.length, FREE_SAVE_LIMIT)} of {FREE_SAVE_LIMIT} free saves used. Pro saves as many as you like and lets you write your own.
          </Text>
        ) : null}
      </ScrollView>
      <ShowCard visible={!!show} text={show} onClose={() => setShow(null)} />
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  pad: { padding: 20, paddingBottom: 48 },
  h1: { fontFamily: F.bold, fontSize: 24, color: C.navy, marginBottom: 6 },
  lead: { fontFamily: F.regular, fontSize: 15, color: '#475569', lineHeight: 22, marginBottom: 12 },
  add: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.purpleLight, borderRadius: 12, padding: 14, marginBottom: 12, gap: 4 },
  addText: { flex: 1, fontFamily: F.bold, fontSize: 15, color: C.purple },
  editor: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 12 },
  titleInput: { fontFamily: F.bold, fontSize: 16, color: C.navy, borderBottomWidth: 1, borderBottomColor: C.border, paddingVertical: 8, marginBottom: 8 },
  textInput: { fontFamily: F.medium, fontSize: 15, color: '#111', minHeight: 90, textAlignVertical: 'top' },
  empty: { backgroundColor: '#fff', borderRadius: 14, padding: 18 },
  emptyText: { fontFamily: F.medium, fontSize: 15, color: '#475569', textAlign: 'center', lineHeight: 22 },
  item: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: C.purple },
  itemTitle: { fontFamily: F.bold, fontSize: 13, color: C.muted, marginBottom: 4 },
  itemText: { fontFamily: F.medium, fontSize: 16, color: '#111', lineHeight: 23 },
  iconBtn: { padding: 6 },
  limit: { fontFamily: F.regular, fontSize: 13, color: C.muted, textAlign: 'center', marginTop: 8, lineHeight: 19 },
});
