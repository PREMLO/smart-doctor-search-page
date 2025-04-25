
import React from 'react';
import DoctorCard from './DoctorCard';
import { Doctor } from '../types/doctor';

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md my-4">
        <p className="font-medium">Error loading doctors</p>
        <p>{error}</p>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-8 rounded-md my-4 text-center">
        <p className="font-medium text-lg">No doctors found</p>
        <p className="mt-2">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
