import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import CustomButton from '../components/CustomButton';

export default function LabScreen({ route }) {
  const { theme } = useApp();
  const { title } = route.params;
  const [count, setCount] = useState(0);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.sub, { color: theme.subtext }]}>
        This activity will be added soon.
      </Text>

      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sub, { color: theme.subtext }]}>Local state demo</Text>
        <Text style={[styles.count, { color: theme.primary }]}>{count}</Text>
        <View style={styles.row}>
          <CustomButton title="−" variant="outline" onPress={() => setCount(count - 1)} style={{ flex: 1 }} />
          <CustomButton title="+" onPress={() => setCount(count + 1)} style={{ flex: 1 }} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '800' },
  sub: { fontSize: 14, marginTop: 4, textAlign: 'center' },
  card: {
    width: '100%', maxWidth: 400, marginTop: 24, padding: 20,
    borderRadius: 16, borderWidth: 1, alignItems: 'center',
  },
  count: { fontSize: 48, fontWeight: '800', marginVertical: 12 },
  row: { flexDirection: 'row', gap: 12, width: '100%' },
});
