
// Generate a simple UUID-like string to prevent ID collisions
export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  const extraRandom = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomPart}-${extraRandom}`;
};

// Validate if a user ID exists in the users storage
export const validateUserId = (userId: string): boolean => {
  try {
    const users = JSON.parse(localStorage.getItem('cv_users') || '[]');
    return users.some((user: any) => user.id === userId);
  } catch (error) {
    console.error('Error validating user ID:', error);
    return false;
  }
};

// Generate a unique user ID that doesn't conflict with existing ones
export const generateUniqueUserId = (): string => {
  let newId: string;
  let attempts = 0;
  const maxAttempts = 10;
  
  do {
    newId = generateUniqueId();
    attempts++;
    
    if (attempts > maxAttempts) {
      console.warn('Multiple attempts to generate unique user ID');
      break;
    }
  } while (validateUserId(newId));
  
  console.log('Generated new user ID:', newId);
  return newId;
};
