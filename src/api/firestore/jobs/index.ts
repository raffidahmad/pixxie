import { Job, JobRequest } from '@/types/Common.types';
import { collection, getDocs, addDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const createJob = async (jobData: Omit<JobRequest, 'id'>): Promise<void> => {
  try {
    console.log('Creating job...');
    await updateDoc(doc(db, 'jobRequests', jobData.customer.id), {
      accepted: true
    });
    // Create a new job document in Firestore
    const docRef = await addDoc(collection(db, 'jobs'), jobData);
    console.log('Job created with ID: ', docRef.id);
  } catch (error) {
    console.error('Error creating job:', error);
    // Handle any errors here, such as updating an error state or notifying the user
  }
};

export const createRequest = async (
  jobData: Omit<JobRequest, 'id'>,
  showError: (message: string) => void
): Promise<void> => {
  try {
    console.log('Creating job request...', jobData);
    // Create a new job request document in Firestore
    await setDoc(doc(db, 'jobRequests', jobData.customer.id), jobData);
  } catch (error) {
    console.error('Error creating job request:', error);
    showError('There was an error creating the job request. Please try again.');
    // Handle any errors here, such as updating an error state or notifying the user
  }
};
