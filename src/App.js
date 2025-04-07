import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Provider as PaperProvider, BottomNavigation, Text, Card, TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useOnlineStatus } from './hooks/useOnlineStatus';

const { height } = Dimensions.get('window');

const CrisisSteps = () => (
  <Card style={styles.card}>
    <Card.Content>
      <Text variant="titleMedium"><Icon name="clipboard-text" size={20} color="#1d4370" /> What to Do</Text>
      <Text variant="titleMedium"><Icon name="account-check" size={20} color="#94c12e" /> BRT Central</Text>
      <Text variant="titleMedium"><Icon name="bell" size={20} color="#04bbf1" /> Agenda</Text>
      <Text variant="titleMedium"><Icon name="information" size={20} color="#1d4370" /> 3IA Theory</Text>
      <Text variant="titleMedium"><Icon name="map" size={20} color="#94c12e" /> Stakeholder Map</Text>
      <Text variant="titleMedium"><Icon name="bell-ring" size={20} color="#04bbf1" /> Notification Salewe</Text>
      <Text variant="titleMedium"><Icon name="file-document" size={20} color="#1d4370" /> Sit Rep</Text>
    </Card.Content>
  </Card>
);

const Roles = () => (
  <Card style={styles.card}>
    <Card.Content>
      <Text>List of key people and responsibilities</Text>
    </Card.Content>
  </Card>
);

const ActionLog = ({ isOnline }) => {
  const [newEntry, setNewEntry] = useState("");

  const handleAddEntry = () => {
    if (!newEntry) return;
    console.log("Adding log entry:", newEntry);
    setNewEntry("");
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text>Status: {isOnline ? "Online" : "Offline"}</Text>
        <TextInput
          label="Write a new log entry"
          value={newEntry}
          onChangeText={setNewEntry}
          style={{ marginBottom: 16 }}
        />
        <Button mode="contained" onPress={handleAddEntry}>Add Entry</Button>
      </Card.Content>
    </Card>
  );
};

export default function App() {
  const [index, setIndex] = useState(0);
  const isOnline = useOnlineStatus();

  const routes = [
    { key: 'crisis', title: 'Crisis Steps', icon: 'clipboard-text' },
    { key: 'roles', title: 'Roles', icon: 'account-group' },
    { key: 'action', title: 'Action Log', icon: 'clipboard-list' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    crisis: CrisisSteps,
    roles: Roles,
    action: () => <ActionLog isOnline={isOnline} />,
  });

  return (
    <PaperProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
});