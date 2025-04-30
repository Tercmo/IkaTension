export interface BloodPressureRecord {
  id: string; // Unique identifier for the record
  systolic: number;
  diastolic: number;
  pulse?: number; // Optional pulse reading
  timestamp: number; // Unix timestamp (milliseconds)
}
