
import { CV } from '../types/cv';

export const saveCVToStorage = (cv: CV): void => {
  const existingCVs = getCVsFromStorage();
  const updatedCVs = existingCVs.filter(existingCV => existingCV.id !== cv.id);
  updatedCVs.push(cv);
  localStorage.setItem('user_cvs', JSON.stringify(updatedCVs));
};

export const getCVsFromStorage = (): CV[] => {
  const stored = localStorage.getItem('user_cvs');
  return stored ? JSON.parse(stored) : [];
};

export const getCVById = (id: string): CV | undefined => {
  const cvs = getCVsFromStorage();
  return cvs.find(cv => cv.id === id);
};

export const deleteCVFromStorage = (id: string): void => {
  const cvs = getCVsFromStorage();
  const filteredCVs = cvs.filter(cv => cv.id !== id);
  localStorage.setItem('user_cvs', JSON.stringify(filteredCVs));
};

export const getUserCVs = (userId: string): CV[] => {
  const allCVs = getCVsFromStorage();
  return allCVs.filter(cv => cv.userId === userId);
};
