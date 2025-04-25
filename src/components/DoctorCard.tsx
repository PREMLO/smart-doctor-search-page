
import React from 'react';
import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-4 border border-gray-100 hover:shadow-lg transition-shadow" 
      data-testid="doctor-card"
    >
      <div className="w-24 h-24 mx-auto md:mx-0 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-100">
        <img 
          src={doctor.profilePic || 'https://via.placeholder.com/150?text=Doctor'} 
          alt={doctor.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/150?text=Doctor';
          }}
        />
      </div>

      <div className="flex-grow md:ml-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2" data-testid="doctor-name">
          {doctor.name}
        </h3>
        
        <div className="mb-2" data-testid="doctor-specialty">
          <span className="text-gray-600">Specialties: </span>
          {doctor.specialty.map((specialty, index) => (
            <span key={specialty} className="text-gray-700">
              {specialty}{index < doctor.specialty.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
          <span className="flex items-center text-gray-700" data-testid="doctor-experience">
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {doctor.experience} years experience
          </span>
          
          <span className="flex items-center text-gray-700" data-testid="doctor-fee">
            <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ₹{doctor.fees} consultation fee
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {doctor.availability.video && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video Consult Available
            </span>
          )}
          
          {doctor.availability.clinic && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              In-Clinic Visits Available
            </span>
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-2 mt-4 md:mt-0">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
