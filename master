import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Map, ClipboardList, UserCheck, Info, FileText, Camera, Upload, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const icons = {
  whatToDo: <ClipboardList className="w-6 h-6 text-[#1d4370]" />,
  brtCentral: <UserCheck className="w-6 h-6 text-[#94c12e]" />,
  agenda: <Bell className="w-6 h-6 text-[#04bbf1]" />,
  theory3IA: <Info className="w-6 h-6 text-[#1d4370]" />,
  stakeholderMap: <Map className="w-6 h-6 text-[#94c12e]" />,
  notificationSalewe: <Bell className="w-6 h-6 text-[#04bbf1]" />,
  sitRep: <FileText className="w-6 h-6 text-[#1d4370]" />,
};

const userPermissions = {
  isAdmin: true,
  canViewLocations: ["Location A", "Location B"],
  canViewCentral: true,
};

export default function BusinessResilienceApp() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Initialize IndexedDB
    const dbRequest = indexedDB.open("actionLogsDB", 1);
    dbRequest.onupgradeneeded = function(event) {
      const db = event.target.result;
      db.createObjectStore("logs", { autoIncrement: true });
    };

    // Handle online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const syncOfflineData = async () => {
    try {
      const dbRequest = indexedDB.open("actionLogsDB", 1);
      dbRequest.onerror = () => console.error("Database error");
      dbRequest.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["logs"], "readonly");
        const store = transaction.objectStore("logs");
        const allLogs = store.getAll();

        allLogs.onsuccess = function() {
          if (allLogs.result.length > 0) {
            sendLogsToServer(allLogs.result);
          }
        };
      };
    } catch (error) {
      console.error("Offline sync failed:", error);
    }
  };

  const sendLogsToServer = (logs) => {
    console.log("Sending logs to server: ", logs);
    // Implement actual API call here
    // fetch('/api/logs', { method: 'POST', body: JSON.stringify(logs) })
    clearOfflineLogs();
  };

  const clearOfflineLogs = () => {
    const dbRequest = indexedDB.open("actionLogsDB", 1);
    dbRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(["logs"], "readwrite");
      const store = transaction.objectStore("logs");
      store.clear();
    };
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white min-h-screen">
      <div className="mb-2 text-sm text-gray-500">
        Status: {isOnline ? "Online" : "Offline"}
      </div>
      <Tabs defaultValue="crisis-steps" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
          <TabsTrigger value="crisis-steps" className="text-[#1d4370] data-[state=active]:bg-[#94c12e]">Crisis Steps</TabsTrigger>
          <TabsTrigger value="roles" className="text-[#1d4370] data-[state=active]:bg-[#94c12e]">Roles</TabsTrigger>
          <TabsTrigger value="info" className="text-[#1d4370] data-[state=active]:bg-[#94c12e]">Info</TabsTrigger>
          <TabsTrigger value="log" className="text-[#1d4370] data-[state=active]:bg-[#94c12e]">Action Log</TabsTrigger>
          {userPermissions.isAdmin && (
            <TabsTrigger value="admin" className="text-[#1d4370] data-[state=active]:bg-[#94c12e]">Admin</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="crisis-steps">
          <ScrollArea className="h-[400px] pr-2">
            <div className="grid grid-cols-2 gap-3">
              <CrisisCard title="What to Do" icon={icons.whatToDo} />
              <CrisisCard title="BRT Central" icon={icons.brtCentral} />
              <CrisisCard title="Agenda" icon={icons.agenda} />
              <CrisisCard title="3IA Theory" icon={icons.theory3IA} />
              <CrisisCard title="Stakeholder Map" icon={icons.stakeholderMap} />
              <CrisisCard title="Notification Salewe" icon={icons.notificationSalewe} />
              <CrisisCard title="Sit Rep" icon={icons.sitRep} />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="roles">
          <Card className="bg-[#f9f9f9] border-none">
            <CardContent className="p-4 text-black">
              List of key people and responsibilities (public view)
              <div className="flex items-center gap-2 mt-4">
                <label className="flex items-center gap-1 cursor-pointer text-[#04bbf1]">
                  <Camera className="w-4 h-4" />
                  <Input type="file" accept="image/*,.pdf,.doc,.docx" className="hidden" />
                  <span className="text-sm">Upload Document</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info">
          <Card className="bg-[#f9f9f9] border-none">
            <CardContent className="p-4 text-black">Documentation and information resources.</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="log">
          {(userPermissions.canViewCentral || userPermissions.canViewLocations.length > 0) ? (
            <ActionLog isOnline={isOnline} />
          ) : (
            <Card className="bg-[#f9f9f9] border-none">
              <CardContent className="p-4 text-black">You do not have permission to view the Action Log.</CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="admin">
          <AdminPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CrisisCard({ title, icon }) {
  return (
    <Card className="bg-[#f9f9f9] rounded-xl hover:shadow-md transition-shadow border border-[#e0e0e0]">
      <CardContent className="flex flex-col items-center justify-center p-6 gap-2">
        {icon}
        <span className="text-center font-medium text-sm text-black">{title}</span>
      </CardContent>
    </Card>
  );
}

function ActionLog({ isOnline }) {
  const [logEntries, setLogEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddEntry = async () => {
    if (!newEntry) return;
    
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      alert("File size exceeds 5MB limit");
      return;
    }

    setIsLoading(true);
    const entry = {
      text: newEntry,
      time: new Date().toLocaleString(),
      file: file ? file.name : null,
    };

    if (!isOnline) {
      saveLogEntryOffline(entry);
    } else {
      // Add API call to save to server when online
      console.log("Saving to server:", entry);
    }

    setLogEntries([entry, ...logEntries]);
    setNewEntry("");
    setFile(null);
    setIsLoading(false);
  };

  const saveLogEntryOffline = (entry) => {
    const dbRequest = indexedDB.open("actionLogsDB", 1);
    dbRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(["logs"], "readwrite");
      const store = transaction.objectStore("logs");
      store.add(entry);
    };
    dbRequest.onerror = () => console.error("Failed to save offline entry");
  };

  return (
    <Card className="bg-[#f9f9f9] border-none">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-semibold text-[#1d4370]">Action Log</h2>
        {isLoading && <div className="text-sm text-gray-500">Saving...</div>}
        <div className="space-y-2">
          <textarea
            className="w-full border rounded p-2 text-sm"
            placeholder="Write a new log entry..."
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 cursor-pointer text-[#04bbf1]">
              <Camera className="w-4 h-4" />
              <Input 
                type="file" 
                accept="image/*,.pdf,.doc,.docx" 
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
                className="hidden"
                disabled={isLoading}
              />
              <span className="text-sm">Take Photo / Upload</span>
            </label>
            {file && <span className="text-sm">{file.name}</span>}
          </div>
        </div>
        <Button onClick={handleAddEntry} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Entry"}
        </Button>

        <div className="mt-4">
          <h3 className="text-md font-semibold text-[#1d4370]">Previous Entries</h3>
          <div className="space-y-3">
            {logEntries.map((entry, index) => (
              <div key={index} className="p-3 border rounded border-[#e0e0e0]">
                <div className="text-sm">{entry.time}</div>
                <div className="text-sm">{entry.text}</div>
                {entry.file && <div className="text-sm text-[#04bbf1]">{entry.file}</div>}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminPanel() {
  return (
    <Card className="bg-[#f9f9f9] border-none">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-semibold text-[#1d4370]">Admin Panel</h2>
        <div className="space-y-2">
          <p className="text-sm">Here you can manage user permissions and settings.</p>
          {/* Add admin functionalities here */}
        </div>
      </CardContent>
    </Card>
  );
}
