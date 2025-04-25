
import React, { useState, useEffect, useRef } from 'react';
import { Doctor } from '../types/doctor';

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
  initialQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ doctors, onSearch, initialQuery }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const filtered = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3); // Only show top 3 matches
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (doctorName: string) => {
    setQuery(doctorName);
    onSearch(doctorName);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-6" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for doctors..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          data-testid="autocomplete-input"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {suggestions.map(doctor => (
            <div
              key={doctor.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectSuggestion(doctor.name)}
              data-testid="suggestion-item"
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
