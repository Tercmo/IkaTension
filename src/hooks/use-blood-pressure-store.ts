"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { BloodPressureRecord } from '@/types';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/utils'; // Use existing helpers

interface BloodPressureState {
  records: BloodPressureRecord[];
  addRecord: (record: Omit<BloodPressureRecord, 'id' | 'timestamp'>) => void;
  deleteRecord: (id: string) => void;
  clearRecords: () => void; // Added for potential future use
  setRecords: (records: BloodPressureRecord[]) => void; // For initial hydration if needed
}

export const useBloodPressureStore = create<BloodPressureState>()(
  persist(
    (set, get) => ({
      records: [],
      addRecord: (newRecordData) => {
        const newRecord: BloodPressureRecord = {
          ...newRecordData,
          id: crypto.randomUUID(), // Generate unique ID
          timestamp: Date.now(), // Add timestamp
        };
        set((state) => ({
          // Ensure records is always an array before spreading
          records: [...(Array.isArray(state.records) ? state.records : []), newRecord].sort((a, b) => b.timestamp - a.timestamp), // Keep sorted
        }));
      },
      deleteRecord: (id) => {
        set((state) => ({
          // Ensure records is an array before filtering
          records: (Array.isArray(state.records) ? state.records : []).filter((record) => record.id !== id),
        }));
      },
      clearRecords: () => set({ records: [] }),
      setRecords: (records) => set({ records: Array.isArray(records) ? records.sort((a, b) => b.timestamp - a.timestamp) : [] }),
    }),
    {
      name: 'blood-pressure-storage', // Name of the item in localStorage
       storage: createJSONStorage(() => localStorage), // Use localStorage directly via zustand middleware
       // Initialize state from localStorage on hydration
      // This part ensures that on initial load, the store is populated from localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Ensure records are sorted after rehydration and is an array
           state.records = Array.isArray(state.records)
             ? state.records.sort((a, b) => b.timestamp - a.timestamp)
             : [];
        }
      }
    }
  )
);

// Initial hydration from localStorage outside the hook if needed (alternative approach)
// This ensures the store is populated on the client side after the initial render
if (typeof window !== 'undefined') {
  const initialRecords = getLocalStorageItem<BloodPressureRecord[]>('blood-pressure-storage', []);
   // Check if initialRecords is an array before sorting
   const sortedInitialRecords = Array.isArray(initialRecords)
     ? initialRecords.sort((a, b) => b.timestamp - a.timestamp)
     : [];
   useBloodPressureStore.setState({ records: sortedInitialRecords });
}
