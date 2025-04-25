
import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import DoctorList from '../components/DoctorList';
import { useDoctors } from '../hooks/useDoctors';
import { getQueryParams, updateQueryParams } from '../utils/queryParams';

const Index = () => {
  const initialFilters = getQueryParams();
  const { doctors, loading, error, filters, updateFilters, specialtyOptions, allDoctors } = useDoctors(initialFilters);

  useEffect(() => {
    updateQueryParams(filters);
  }, [filters]);

  const handleSearch = (query: string) => {
    updateFilters({ searchQuery: query });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Find the Best Doctors</h1>
          <SearchBar 
            doctors={allDoctors} 
            onSearch={handleSearch} 
            initialQuery={filters.searchQuery} 
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-1/4">
            <FilterPanel 
              filters={filters} 
              onFilterChange={updateFilters} 
              specialtyOptions={specialtyOptions}
            />
          </aside>

          <main className="md:w-3/4">
            <div className="bg-white p-4 mb-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div className="text-gray-600">
                  {loading ? 'Loading...' : `${doctors.length} doctors found`}
                </div>
                <div className="text-sm text-gray-500">
                  {filters.sortBy === 'fees' && 'Sorted by: Fees (Low to High)'}
                  {filters.sortBy === 'experience' && 'Sorted by: Experience (High to Low)'}
                </div>
              </div>
            </div>

            <DoctorList 
              doctors={doctors} 
              loading={loading} 
              error={error} 
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
