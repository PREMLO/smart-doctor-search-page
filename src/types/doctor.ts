
export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  experience: number;
  fees: number;
  city: string;
  availability: {
    clinic: boolean;
    video: boolean;
  };
  profilePic: string;
}

export interface FilterState {
  consultationType: 'video' | 'clinic' | null;
  specialties: string[];
  sortBy: 'fees' | 'experience' | null;
  searchQuery: string;
}
