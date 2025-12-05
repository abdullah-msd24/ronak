import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateUserProfile } from '../../lib/api';
import { useAuth } from '../../hooks/use-auth';

const ProfileForm = () => {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
      age: user?.age || '',
      city: user?.city || '',
      interests: user?.interests || '',
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await updateUserProfile(data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          id="bio"
          {...register('bio')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
        <input
          id="age"
          type="number"
          {...register('age', { min: 0, max: 120 })}
          className={`mt-1 block w-full border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.age && <p className="text-red-500 text-sm">Age must be between 0 and 120</p>}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          id="city"
          type="text"
          {...register('city')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="interests" className="block text-sm font-medium text-gray-700">Interests</label>
        <input
          id="interests"
          type="text"
          {...register('interests')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 bg-orange-600 text-white rounded-md shadow-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500'}`}
      >
        {isLoading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default ProfileForm;