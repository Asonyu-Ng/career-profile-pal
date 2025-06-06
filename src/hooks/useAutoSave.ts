
import { useEffect, useRef } from 'react';
import { CV } from '../types/cv';
import { saveCVToStorage } from '../utils/cvStorage';
import { validateUserId } from '../utils/idGenerator';

export const useAutoSave = (cv: CV, delay: number = 2000) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      // Enhanced validation before auto-saving
      if (!cv.userId) {
        console.warn('Cannot auto-save CV: No user ID');
        return;
      }

      if (!validateUserId(cv.userId)) {
        console.warn('Cannot auto-save CV: Invalid user ID:', cv.userId);
        return;
      }

      // Only auto-save if there's meaningful content
      if (cv.personalInfo.fullName || cv.experience.length > 0 || cv.education.length > 0) {
        const updatedCV = {
          ...cv,
          updatedAt: new Date().toISOString()
        };
        saveCVToStorage(updatedCV);
        console.log('CV auto-saved for user:', cv.userId);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [cv, delay]);
};
