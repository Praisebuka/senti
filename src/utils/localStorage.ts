/**
 * Local Storage utility functions
 * Handles saving and managing auth data with automatic expiration
 */

const STORAGE_EXPIRY_KEY = (key: string) => `${key}_expiry`;
const EXPIRY_TIME_MINUTES = 10;
const EXPIRY_TIME_MS = EXPIRY_TIME_MINUTES * 60 * 1000; // 10 minutes

interface StorageData {
  [key: string]: any;
}

export const storageUtils = {
  /**
   * Save data to local storage with expiration time
   */
  saveWithExpiry: (key: string, data: StorageData) => {
    if (typeof window === "undefined") return;

    try {
      const expiryTime = new Date().getTime() + EXPIRY_TIME_MS;
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(STORAGE_EXPIRY_KEY(key), expiryTime.toString());

      // Set up timeout to auto-delete after 10 minutes
      setTimeout(() => {
        storageUtils.removeData(key);
      }, EXPIRY_TIME_MS);
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  },

  /**
   * Get data from local storage and check if it has expired
   */
  getWithExpiry: (key: string): StorageData | null => {
    if (typeof window === "undefined") return null;

    try {
      const item = localStorage.getItem(key);
      const expiryTime = localStorage.getItem(STORAGE_EXPIRY_KEY(key));

      if (!item || !expiryTime) {
        return null;
      }

      const now = new Date().getTime();
      const expiry = parseInt(expiryTime);

      if (now > expiry) {
        // Data has expired, delete it
        storageUtils.removeData(key);
        return null;
      }

      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return null;
    }
  },

  /**
   * Remove data and its expiry from local storage
   */
  removeData: (key: string) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(key);
      localStorage.removeItem(STORAGE_EXPIRY_KEY(key));
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
    }
  },

  /**
   * Clear all auth-related data
   */
  clearAuthData: () => {
    if (typeof window === "undefined") return;

    storageUtils.removeData("loginData");
    storageUtils.removeData("registrationData");
  },

  /**
   * Get remaining time before expiry (in seconds)
   */
  getRemainingTime: (key: string): number => {
    if (typeof window === "undefined") return 0;

    try {
      const expiryTime = localStorage.getItem(STORAGE_EXPIRY_KEY(key));
      if (!expiryTime) return 0;

      const now = new Date().getTime();
      const expiry = parseInt(expiryTime);
      const remaining = Math.max(0, Math.floor((expiry - now) / 1000));

      return remaining;
    } catch (error) {
      console.error(`Error getting remaining time: ${error}`);
      return 0;
    }
  },


   /**
   * Get data from local storage and check if it has expired
   */
  getAuthData: (key: string): StorageData | null => {
    if (typeof window === "undefined") return null;

    try {
      const item = localStorage.getItem(key);
      const expiryTime = localStorage.getItem(STORAGE_EXPIRY_KEY(key));

      if (!item || !expiryTime) {
        return null;
      }

      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return null;
    }
  }
};
