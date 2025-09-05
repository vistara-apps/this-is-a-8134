import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Shield, 
  Users, 
  Download, 
  Upload, 
  Trash2, 
  Plus,
  Edit3,
  Phone,
  Mail,
  Crown
} from 'lucide-react';
import { userService } from '../services/userService';
import { stripeService } from '../services/stripe';

export function Settings({ onClose, className = '' }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [userData, setUserData] = useState(userService.getUserData());
  const [contacts, setContacts] = useState(userService.getContacts());
  const [showAddContact, setShowAddContact] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'contacts', label: 'Emergency Contacts', icon: Users },
    { id: 'subscription', label: 'Subscription', icon: Crown },
    { id: 'privacy', label: 'Privacy & Data', icon: Shield },
  ];

  const refreshData = () => {
    setUserData(userService.getUserData());
    setContacts(userService.getContacts());
  };

  const handleSettingChange = (key, value) => {
    const updatedUserData = { ...userData };
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      updatedUserData[parent] = { ...updatedUserData[parent], [child]: value };
    } else {
      updatedUserData[key] = value;
    }
    
    userService.saveUserData(updatedUserData);
    setUserData(updatedUserData);
  };

  const handleAddContact = (contactData) => {
    const newContact = userService.addContact(contactData);
    if (newContact) {
      setContacts(userService.getContacts());
      setShowAddContact(false);
    }
  };

  const handleUpdateContact = (contactId, updates) => {
    const updatedContact = userService.updateContact(contactId, updates);
    if (updatedContact) {
      setContacts(userService.getContacts());
      setEditingContact(null);
    }
  };

  const handleDeleteContact = (contactId) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      userService.deleteContact(contactId);
      setContacts(userService.getContacts());
    }
  };

  const handleExportData = () => {
    const data = userService.exportUserData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bailiwick-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (userService.importUserData(data)) {
            refreshData();
            alert('Data imported successfully!');
          } else {
            alert('Failed to import data. Please check the file format.');
          }
        } catch (error) {
          alert('Invalid file format. Please select a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      userService.clearAllData();
      refreshData();
      alert('All data has been cleared.');
    }
  };

  const handleManageSubscription = async () => {
    if (userData.subscription && userData.subscription.customerId) {
      try {
        await stripeService.createPortalSession(userData.subscription.customerId);
      } catch (error) {
        alert('Unable to open subscription management. Please contact support.');
      }
    } else {
      alert('No active subscription found.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-text-primary">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-accent text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-text-primary">Profile Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Default State
                    </label>
                    <select
                      value={userData.state}
                      onChange={(e) => handleSettingChange('state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      <option value="IL">Illinois</option>
                      <option value="GA">Georgia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Language Preference
                    </label>
                    <select
                      value={userData.languagePreference}
                      onChange={(e) => handleSettingChange('languagePreference', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-text-primary">App Preferences</h4>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={userData.settings?.autoLocation || false}
                      onChange={(e) => handleSettingChange('settings.autoLocation', e.target.checked)}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <span className="text-sm text-text-primary">Auto-detect location</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={userData.settings?.notifications || false}
                      onChange={(e) => handleSettingChange('settings.notifications', e.target.checked)}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <span className="text-sm text-text-primary">Enable notifications</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Recording Quality
                    </label>
                    <select
                      value={userData.settings?.recordingQuality || 'high'}
                      onChange={(e) => handleSettingChange('settings.recordingQuality', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="low">Low (saves storage)</option>
                      <option value="medium">Medium</option>
                      <option value="high">High (best quality)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'contacts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">Emergency Contacts</h3>
                  <button
                    onClick={() => setShowAddContact(true)}
                    className="flex items-center space-x-2 px-3 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Contact</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary">{contact.name}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1 text-sm text-text-secondary">
                              <Phone className="h-3 w-3" />
                              <span>{contact.phone}</span>
                            </div>
                            {contact.email && (
                              <div className="flex items-center space-x-1 text-sm text-text-secondary">
                                <Mail className="h-3 w-3" />
                                <span>{contact.email}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-text-secondary mt-1">{contact.relationship}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingContact(contact)}
                            className="p-1 text-text-secondary hover:text-accent transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteContact(contact.id)}
                            className="p-1 text-text-secondary hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'subscription' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-text-primary">Subscription</h3>
                
                {userData.premiumStatus ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Crown className="h-5 w-5 text-yellow-600" />
                      <h4 className="font-medium text-yellow-800">Premium Active</h4>
                    </div>
                    {userData.subscription && (
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>Plan: {userData.subscription.plan?.name}</p>
                        <p>Status: {userData.subscription.status}</p>
                        {userData.subscription.currentPeriodEnd && (
                          <p>Next billing: {new Date(userData.subscription.currentPeriodEnd).toLocaleDateString()}</p>
                        )}
                      </div>
                    )}
                    <button
                      onClick={handleManageSubscription}
                      className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                    >
                      Manage Subscription
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-text-primary mb-2">Free Plan</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      Upgrade to Premium for full access to all features.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
                    >
                      Upgrade Now
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-text-primary">Privacy & Data</h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Data Export</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Download all your data including settings, contacts, and interaction logs.
                    </p>
                    <button
                      onClick={handleExportData}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export Data</span>
                    </button>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Data Import</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Import previously exported data to restore your settings.
                    </p>
                    <label className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer">
                      <Upload className="h-4 w-4" />
                      <span>Import Data</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">Clear All Data</h4>
                    <p className="text-sm text-red-700 mb-3">
                      Permanently delete all your data from this device. This action cannot be undone.
                    </p>
                    <button
                      onClick={handleClearAllData}
                      className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Clear All Data</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Contact Modal */}
      {(showAddContact || editingContact) && (
        <ContactForm
          contact={editingContact}
          onSave={editingContact ? 
            (updates) => handleUpdateContact(editingContact.id, updates) : 
            handleAddContact
          }
          onClose={() => {
            setShowAddContact(false);
            setEditingContact(null);
          }}
        />
      )}
    </div>
  );
}

// Contact Form Component
function ContactForm({ contact, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    phone: contact?.phone || '',
    email: contact?.email || '',
    relationship: contact?.relationship || 'Family',
    isPrimary: contact?.isPrimary || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-text-primary">
            {contact ? 'Edit Contact' : 'Add Contact'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Phone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Relationship
            </label>
            <select
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Legal">Legal</option>
              <option value="Emergency">Emergency</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.isPrimary}
              onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
              className="rounded border-gray-300 text-accent focus:ring-accent"
            />
            <span className="text-sm text-text-primary">Primary emergency contact</span>
          </label>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-text-secondary rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
            >
              {contact ? 'Update' : 'Add'} Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
