
import React from 'react';
import { FilterState } from '../types/doctor';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  specialtyOptions: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, specialtyOptions }) => {
  const handleConsultationTypeChange = (type: 'video' | 'clinic' | null) => {
    onFilterChange({ consultationType: type });
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    const updatedSpecialties = checked
      ? [...filters.specialties, specialty]
      : filters.specialties.filter(s => s !== specialty);
    
    onFilterChange({ specialties: updatedSpecialties });
  };

  const handleSortChange = (sortBy: 'fees' | 'experience' | null) => {
    onFilterChange({ sortBy });
  };

  return (
    <div className="flex flex-col space-y-6 bg-white p-6 rounded-lg shadow-md">
      {/* Consultation Type Filter */}
      <div>
        <h3 className="font-medium text-lg mb-3" data-testid="filter-header-moc">Consultation Mode</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="video-consult"
              name="consultation-type"
              checked={filters.consultationType === 'video'}
              onChange={() => handleConsultationTypeChange('video')}
              className="h-4 w-4 text-blue-600"
              data-testid="filter-video-consult"
            />
            <label htmlFor="video-consult" className="ml-2 text-gray-700">
              Video Consult
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="in-clinic"
              name="consultation-type"
              checked={filters.consultationType === 'clinic'}
              onChange={() => handleConsultationTypeChange('clinic')}
              className="h-4 w-4 text-blue-600"
              data-testid="filter-in-clinic"
            />
            <label htmlFor="in-clinic" className="ml-2 text-gray-700">
              In Clinic
            </label>
          </div>
          {filters.consultationType && (
            <div className="mt-1">
              <button
                onClick={() => handleConsultationTypeChange(null)}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Specialties Filter */}
      <div>
        <h3 className="font-medium text-lg mb-3" data-testid="filter-header-speciality">Specialty</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {specialtyOptions.map(specialty => (
            <div key={specialty} className="flex items-center">
              <input
                type="checkbox"
                id={`specialty-${specialty}`}
                checked={filters.specialties.includes(specialty)}
                onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
                data-testid={`filter-specialty-${specialty.replace(/\s+/g, '-').replace('/', '-')}`}
              />
              <label htmlFor={`specialty-${specialty}`} className="ml-2 text-gray-700">
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="font-medium text-lg mb-3" data-testid="filter-header-sort">Sort By</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="sort-fees"
              name="sort-option"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="h-4 w-4 text-blue-600"
              data-testid="sort-fees"
            />
            <label htmlFor="sort-fees" className="ml-2 text-gray-700">
              Fees (Low to High)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="sort-experience"
              name="sort-option"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="h-4 w-4 text-blue-600"
              data-testid="sort-experience"
            />
            <label htmlFor="sort-experience" className="ml-2 text-gray-700">
              Experience (High to Low)
            </label>
          </div>
          {filters.sortBy && (
            <div className="mt-1">
              <button
                onClick={() => handleSortChange(null)}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
