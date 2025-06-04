
import { useEffect, useRef } from 'react';
import { CV } from '../types/cv';
import { saveCVToStorage } from '../utils/cvStorage';

export const useAutoSave = (cv: CV, delay: number = 2000) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (cv.personalInfo.fullName || cv.experience.length > 0 || cv.education.length > 0) {
        const updatedCV = {
          ...cv,
          updatedAt: new Date().toISOString()
        };
        saveCVToStorage(updatedCV);
        console.log('CV auto-saved');
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [cv, delay]);
};
