import React, { useState, useEffect } from 'react';
import { Card, CardContent } from 'react-native-paper';  // Use Paper for Material UI on mobile
import { Tabs, Tab } from 'react-native-paper'; // For Tabs in React Native
import { ScrollView } from 'react-native';
import { Bell, Map, ClipboardList, UserCheck, Info, FileText, Camera, Upload, Settings } from 'lucide-react';
import { Button, TextInput } from 'react-native-paper';
import { useOnlineStatus } from './hooks/useOnlineStatus';  // Custom hook for online status

const icons = {
  whatToDo: <ClipboardList size={24} color="#1d4370" />,
  brtCentral: <UserCheck size={24} color="#94c12e" />,
  agenda: <Bell size={24} color="#04bbf1" />,
  theory3IA: <Info size={24} color="#1d4370" />,
  stakeholderMap: <Map size={24} color="#94c12e" />,
  notificationSalewe: <Bell size={24} color="#04bbf1" />,
  sitRep: <FileText size={24} color="#1d4370" />,
};

const userPermissions = {
  isAdmin: true,
  canViewLocations: ["Location A", "Location B"],
  canViewCentral: true,
};

export default function BusinessResilienceApp() {
  const [isOnline, setIsOnline] = useState(useOnlineStatus());

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ScrollView style={{ padding: 16, backgroundColor: '#fff', minHeight: '100vh' }}>
      <Text>Status: {isOnline ? 'Online' : 'Offline'}</Text>
      <Tabs>
        <Tab label="Crisis Steps">
          <ScrollView style={{ height: 400 }}>
            <Card>
              <CardContent>
                <CrisisCard title="What to Do" icon={icons.whatToDo} />
                <CrisisCard title="BRT Central" icon={icons.brtCentral} />
                <CrisisCard title="Agenda" icon={icons.agenda} />
                <CrisisCard title="3IA Theory" icon={icons.theory3IA} />
                <CrisisCard title="Stakeholder Map" icon={icons.stakeholderMap} />
                <CrisisCard title="Notification Salewe" icon={icons.notificationSalewe} />
                <CrisisCard title="Sit Rep" icon={icons.sitRep} />
              </CardContent>
            </Card>
          </ScrollView>
        </Tab>
        <Tab label="Roles">
          <Card>
            <CardContent>
              <Text>List of key people and responsibilities</Text>
            </CardContent>
          </Card>
        </Tab>
        <Tab label="Action Log">
          <ActionLog isOnline={isOnline} />
        </Tab>
      </Tabs>
    </ScrollView>
  );
}

function CrisisCard({ title, icon }) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <CardContent>
        {icon}
        <Text>{title}</Text>
      </CardContent>
    </Card>
  );
}

function ActionLog({ isOnline }) {
  const [newEntry, setNewEntry] = useState("");
  const [file, setFile] = useState(null);

  const handleAddEntry = () => {
    if (!newEntry) return;
    console.log('Adding log entry:', newEntry);
  };

  return (
    <Card>
      <CardContent>
        <TextInput
          label="Write a new log entry"
          value={newEntry}
          onChangeText={setNewEntry}
          style={{ marginBottom: 16 }}
        />
        <Button onPress={handleAddEntry}>Add Entry</Button>
      </CardContent>
    </Card>
  );
}
