'use client';

import React from 'react';

const RecentExperiences = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Experiences</h2>
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg font-medium">Coming Soon</p>
        <p className="text-sm">Share your experiences after attending events</p>
      </div>
    </div>
  );
};

export default RecentExperiences;