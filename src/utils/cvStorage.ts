
import { CV } from '../types/cv';
import { validateUserId } from './idGenerator';

export const saveCVToStorage = (cv: CV): void => {
  try {
    // Validate user ID before saving
    if (!validateUserId(cv.userId)) {
      console.error('Invalid user ID when saving CV:', cv.userId);
      return;
    }

    const existingCVs = getCVsFromStorage();
    const updatedCVs = existingCVs.filter(existingCV => existingCV.id !== cv.id);
    updatedCVs.push(cv);
    
    localStorage.setItem('user_cvs', JSON.stringify(updatedCVs));
    console.log('CV saved successfully:', cv.id, 'for user:', cv.userId);
  } catch (error) {
    console.error('Error saving CV to storage:', error);
  }
};

export const getCVsFromStorage = (): CV[] => {
  try {
    const stored = localStorage.getItem('user_cvs');
    const cvs = stored ? JSON.parse(stored) : [];
    console.log('Retrieved CVs from storage:', cvs.length, 'total CVs');
    return cvs;
  } catch (error) {
    console.error('Error retrieving CVs from storage:', error);
    return [];
  }
};

export const getCVById = (id: string): CV | undefined => {
  try {
    const cvs = getCVsFromStorage();
    const foundCV = cvs.find(cv => cv.id === id);
    console.log('Looking for CV with ID:', id, 'Found:', !!foundCV);
    return foundCV;
  } catch (error) {
    console.error('Error getting CV by ID:', error);
    return undefined;
  }
};

export const deleteCVFromStorage = (id: string): void => {
  try {
    const cvs = getCVsFromStorage();
    const filteredCVs = cvs.filter(cv => cv.id !== id);
    localStorage.setItem('user_cvs', JSON.stringify(filteredCVs));
    console.log('CV deleted:', id);
  } catch (error) {
    console.error('Error deleting CV from storage:', error);
  }
};

export const getUserCVs = (userId: string): CV[] => {
  try {
    const allCVs = getCVsFromStorage();
    const userCVs = allCVs.filter(cv => cv.userId === userId);
    console.log('User CVs for', userId, ':', userCVs.length, 'out of', allCVs.length, 'total');
    
    // Additional validation: ensure all returned CVs have valid user IDs
    const validatedCVs = userCVs.filter(cv => {
      const isValid = validateUserId(cv.userId);
      if (!isValid) {
        console.warn('Found CV with invalid user ID:', cv.id, cv.userId);
      }
      return isValid;
    });
    
    return validatedCVs;
  } catch (error) {
    console.error('Error getting user CVs:', error);
    return [];
  }
};

// New function to check data integrity
export const validateDataIntegrity = (): void => {
  try {
    const allCVs = getCVsFromStorage();
    const users = JSON.parse(localStorage.getItem('cv_users') || '[]');
    
    console.log('Data integrity check:');
    console.log('Total users:', users.length);
    console.log('Total CVs:', allCVs.length);
    
    const orphanedCVs = allCVs.filter(cv => !validateUserId(cv.userId));
    if (orphanedCVs.length > 0) {
      console.warn('Found orphaned CVs (CVs without valid users):', orphanedCVs.length);
      orphanedCVs.forEach(cv => {
        console.warn('Orphaned CV:', cv.id, 'User ID:', cv.userId);
      });
    }
    
    users.forEach((user: any) => {
      const userCVCount = allCVs.filter(cv => cv.userId === user.id).length;
      console.log(`User ${user.name} (${user.id}): ${userCVCount} CVs`);
    });
  } catch (error) {
    console.error('Error during data integrity check:', error);
  }
};
