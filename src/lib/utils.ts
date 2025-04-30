import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { BloodPressureRecord } from "@/types"; // Assuming types definition
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// CSV Export Utility
export function exportToCSV(data: BloodPressureRecord[], filename: string = 'blood_pressure_records.csv') {
  if (!data || data.length === 0) {
    console.warn("No data available to export.");
    return;
  }

  const headers = ['Date', 'Time', 'Systolic (mmHg)', 'Diastolic (mmHg)', 'Pulse (bpm)'];
  const csvRows = [
    headers.join(','), // header row
    ...data.map(row => [
      format(new Date(row.timestamp), 'yyyy-MM-dd'),
      format(new Date(row.timestamp), 'HH:mm:ss'),
      row.systolic,
      row.diastolic,
      row.pulse ?? '' // Handle optional pulse
    ].join(','))
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) { // Feature detection
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up
  } else {
    console.error("CSV download not supported in this browser.");
    // Fallback or error message
  }
}


// localStorage helpers
export const setLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key “${key}”:`, error);
  }
};

export const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage key “${key}”:`, error);
    return defaultValue;
  }
};
