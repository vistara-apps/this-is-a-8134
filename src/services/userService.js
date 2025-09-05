// User management service for Bailiwick AI
export class UserService {
  constructor() {
    this.storageKey = 'bailiwick_user_data';
    this.contactsKey = 'bailiwick_contacts';
    this.interactionLogsKey = 'bailiwick_interaction_logs';
  }

  // User data management
  getUserData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : this.getDefaultUserData();
    } catch (error) {
      console.error('Error loading user data:', error);
      return this.getDefaultUserData();
    }
  }

  getDefaultUserData() {
    return {
      userId: `user_${Date.now()}`,
      state: 'CA',
      languagePreference: 'english',
      premiumStatus: false,
      subscription: null,
      createdAt: new Date().toISOString(),
      settings: {
        autoLocation: true,
        notifications: true,
        recordingQuality: 'high'
      }
    };
  }

  saveUserData(userData) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  }

  updateUserState(state) {
    const userData = this.getUserData();
    userData.state = state;
    userData.updatedAt = new Date().toISOString();
    return this.saveUserData(userData);
  }

  updateLanguagePreference(language) {
    const userData = this.getUserData();
    userData.languagePreference = language;
    userData.updatedAt = new Date().toISOString();
    return this.saveUserData(userData);
  }

  updatePremiumStatus(isPremium, subscription = null) {
    const userData = this.getUserData();
    userData.premiumStatus = isPremium;
    userData.subscription = subscription;
    userData.updatedAt = new Date().toISOString();
    return this.saveUserData(userData);
  }

  // Contact management
  getContacts() {
    try {
      const contacts = localStorage.getItem(this.contactsKey);
      return contacts ? JSON.parse(contacts) : this.getDefaultContacts();
    } catch (error) {
      console.error('Error loading contacts:', error);
      return this.getDefaultContacts();
    }
  }

  getDefaultContacts() {
    return [
      {
        id: 'emergency_1',
        name: 'Emergency Contact',
        phone: '+1-555-0123',
        email: 'emergency@example.com',
        relationship: 'Family',
        isPrimary: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'legal_1',
        name: 'Legal Aid',
        phone: '+1-555-0456',
        email: 'legal@example.com',
        relationship: 'Legal',
        isPrimary: false,
        createdAt: new Date().toISOString()
      }
    ];
  }

  saveContacts(contacts) {
    try {
      localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
      return true;
    } catch (error) {
      console.error('Error saving contacts:', error);
      return false;
    }
  }

  addContact(contact) {
    const contacts = this.getContacts();
    const newContact = {
      ...contact,
      id: `contact_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    return this.saveContacts(contacts) ? newContact : null;
  }

  updateContact(contactId, updates) {
    const contacts = this.getContacts();
    const index = contacts.findIndex(c => c.id === contactId);
    if (index !== -1) {
      contacts[index] = {
        ...contacts[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return this.saveContacts(contacts) ? contacts[index] : null;
    }
    return null;
  }

  deleteContact(contactId) {
    const contacts = this.getContacts();
    const filteredContacts = contacts.filter(c => c.id !== contactId);
    return this.saveContacts(filteredContacts);
  }

  // Interaction logs management
  getInteractionLogs() {
    try {
      const logs = localStorage.getItem(this.interactionLogsKey);
      return logs ? JSON.parse(logs) : [];
    } catch (error) {
      console.error('Error loading interaction logs:', error);
      return [];
    }
  }

  addInteractionLog(logData) {
    const logs = this.getInteractionLogs();
    const newLog = {
      logId: `log_${Date.now()}`,
      userId: this.getUserData().userId,
      timestamp: new Date().toISOString(),
      ...logData
    };
    logs.unshift(newLog); // Add to beginning
    
    // Keep only last 50 logs to prevent storage bloat
    const trimmedLogs = logs.slice(0, 50);
    
    try {
      localStorage.setItem(this.interactionLogsKey, JSON.stringify(trimmedLogs));
      return newLog;
    } catch (error) {
      console.error('Error saving interaction log:', error);
      return null;
    }
  }

  // Utility methods
  clearAllData() {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.contactsKey);
      localStorage.removeItem(this.interactionLogsKey);
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  exportUserData() {
    return {
      userData: this.getUserData(),
      contacts: this.getContacts(),
      interactionLogs: this.getInteractionLogs(),
      exportedAt: new Date().toISOString()
    };
  }

  importUserData(data) {
    try {
      if (data.userData) this.saveUserData(data.userData);
      if (data.contacts) this.saveContacts(data.contacts);
      if (data.interactionLogs) {
        localStorage.setItem(this.interactionLogsKey, JSON.stringify(data.interactionLogs));
      }
      return true;
    } catch (error) {
      console.error('Error importing user data:', error);
      return false;
    }
  }
}

export const userService = new UserService();
