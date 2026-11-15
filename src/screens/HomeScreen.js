import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useApp } from '../context/AppContext';
import MenuCard from '../components/MenuCard';

const MENU = [
  { id: 'lab1', title: 'Lab 1', subtitle: 'Coming soon', icon: 'flask-outline' },
  { id: 'lab2', title: 'Lab 2', subtitle: 'Coming soon', icon: 'code-slash-outline' },
  { id: 'lab3', title: 'Lab 3', subtitle: 'Coming soon', icon: 'layers-outline' },
  { id: 'lab4', title: 'Lab 4', subtitle: 'Coming soon', icon: 'rocket-outline' },
  { id: 'settings', title: 'Settings', subtitle: 'Theme & profile', icon: 'settings-outline', screen: 'Settings' },
];

const PADDING = 16;
const GAP = 12;

export default function HomeScreen({ navigation }) {
  const { theme, userName, isDark } = useApp();
  const { width } = useWindowDimensions();
  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const columns = width >= 900 ? 4 : width >= 600 ? 3 : 2;
  const cardWidth = Math.floor((width - PADDING * 2 - GAP * (columns - 1)) / columns);

  const handlePress = (item) => {
    if (item.screen) navigation.navigate(item.screen);
    else navigation.navigate('Lab', { title: item.title });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ padding: PADDING }}
    >
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <Text style={styles.greeting}>{greeting},</Text>
        <Text style={styles.name} numberOfLines={1}>{userName} 👋</Text>
        <Text style={styles.mode}>{isDark ? 'Dark' : 'Light'} mode is on</Text>
      </View>

      <Text style={[styles.section, { color: theme.text }]}>Laboratory Activities</Text>

      <View style={[styles.grid, { gap: GAP }]}>
        {MENU.map((item) => (
          <MenuCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            onPress={() => handlePress(item)}
            style={{ flex: 0, width: cardWidth, minHeight: 140 }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { borderRadius: 20, padding: 20, marginBottom: 24 },
  greeting: { color: '#FFFFFFCC', fontSize: 16 },
  name: { color: '#FFFFFF', fontSize: 26, fontWeight: '800', marginTop: 4 },
  mode: { color: '#FFFFFFCC', fontSize: 13, marginTop: 8 },
  section: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
});
