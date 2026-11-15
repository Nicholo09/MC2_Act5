import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, TextInput, Switch, StyleSheet,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useApp } from '../context/AppContext';
import CustomButton from '../components/CustomButton';

export default function SettingsScreen({ navigation }) {
  const { theme, isDark, toggleTheme, userName, setUserName } = useApp();
  const [draftName, setDraftName] = useState(userName);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [saved]);

  const handleSave = () => {
    const trimmed = draftName.trim();
    if (!trimmed) return;
    setUserName(trimmed);
    setSaved(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Theme */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
              <Text style={[styles.hint, { color: theme.subtext }]}>
                Applies instantly across the app
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#CBD5E1', true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Profile name */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.label, { color: theme.text }]}>Profile Name</Text>
          <Text style={[styles.hint, { color: theme.subtext }]}>
            Shown on the Home Dashboard
          </Text>
          <TextInput
            value={draftName}
            onChangeText={setDraftName}
            placeholder="Enter your name"
            placeholderTextColor={theme.subtext}
            style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.background }]}
          />
          <CustomButton title="Save Name" onPress={handleSave} />
          {saved && (
            <Text style={[styles.saved, { color: theme.primary }]}>✓ Name updated!</Text>
          )}
        </View>

        <CustomButton
          title="Back to Dashboard"
          variant="outline"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  card: { padding: 16, borderRadius: 16, borderWidth: 1 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { fontSize: 16, fontWeight: '700' },
  hint: { fontSize: 13, marginTop: 2 },
  input: {
    borderWidth: 1, borderRadius: 12, paddingHorizontal: 14,
    paddingVertical: 12, fontSize: 16, marginVertical: 12,
  },
  saved: { marginTop: 10, fontWeight: '600', textAlign: 'center' },
});
