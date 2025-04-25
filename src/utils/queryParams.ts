
import { FilterState } from "../types/doctor";

export const getQueryParams = (): FilterState => {
  const params = new URLSearchParams(window.location.search);
  
  const consultationType = params.get('consultationType') as 'video' | 'clinic' | null;
  
  const specialties = params.get('specialties')
    ? params.get('specialties')?.split(',') || []
    : [];
    
  const sortBy = params.get('sortBy') as 'fees' | 'experience' | null;
  
  const searchQuery = params.get('search') || '';

  return {
    consultationType,
    specialties,
    sortBy,
    searchQuery
  };
};

export const updateQueryParams = (filters: FilterState) => {
  const params = new URLSearchParams();
  
  if (filters.consultationType) {
    params.set('consultationType', filters.consultationType);
  }
  
  if (filters.specialties.length > 0) {
    params.set('specialties', filters.specialties.join(','));
  }
  
  if (filters.sortBy) {
    params.set('sortBy', filters.sortBy);
  }
  
  if (filters.searchQuery) {
    params.set('search', filters.searchQuery);
  }
  
  const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
};
