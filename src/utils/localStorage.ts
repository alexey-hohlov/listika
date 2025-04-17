export const getLocalStorage = (key: string, defaultValue: any = null) => {
  const storedValue = localStorage.getItem(key);
  try {
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error('Error parsing JSON from localStorage', error);
    return defaultValue;
  }
};

export const setLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};
