
import { useState, useEffect } from 'react';
import { Doctor, FilterState } from '../types/doctor';

export const useDoctors = (initialFilters: FilterState) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [specialtyOptions, setSpecialtyOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        
        // Map the API response to our Doctor interface
        const formattedDoctors: Doctor[] = data.map((item: any) => ({
          id: item.id || String(Math.random()),
          name: item.name || '',
          specialty: item.specialities ? item.specialities.map((spec: any) => spec.name) : [],
          experience: parseInt(String(item.experience || '0').match(/\d+/)?.[0] || '0', 10),
          fees: parseInt(String(item.fees || '0').match(/\d+/)?.[0] || '0', 10),
          city: item.clinic?.address?.city || '',
          availability: {
            clinic: item.in_clinic || false,
            video: item.video_consult || false,
          },
          profilePic: item.photo || '',
        }));
        
        setDoctors(formattedDoctors);
        
        // Extract unique specialties
        const allSpecialties = new Set<string>();
        formattedDoctors.forEach((doctor: Doctor) => {
          if (doctor.specialty && Array.isArray(doctor.specialty)) {
            doctor.specialty.forEach(spec => {
              if (spec) allSpecialties.add(spec);
            });
          }
        });
        setSpecialtyOptions(Array.from(allSpecialties).sort());
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let result = [...doctors];

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(query)
      );
    }

    // Filter by consultation type
    if (filters.consultationType) {
      result = result.filter(doctor => 
        doctor.availability[filters.consultationType as keyof typeof doctor.availability]
      );
    }

    // Filter by specialties
    if (filters.specialties.length > 0) {
      result = result.filter(doctor =>
        doctor.specialty && filters.specialties.some(specialty => 
          doctor.specialty.includes(specialty)
        )
      );
    }

    // Sort by selected criteria
    if (filters.sortBy) {
      result = [...result].sort((a, b) => {
        if (filters.sortBy === 'fees') {
          return a.fees - b.fees; // ascending
        } else if (filters.sortBy === 'experience') {
          return b.experience - a.experience; // descending
        }
        return 0;
      });
    }

    setFilteredDoctors(result);
  }, [doctors, filters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return {
    doctors: filteredDoctors,
    loading,
    error,
    filters,
    updateFilters,
    specialtyOptions,
    allDoctors: doctors,
  };
};
