import React, { useState } from 'react';
import { X, Users, Check } from 'lucide-react';

export function ContactPicker({ contacts = [], onClose, onShare }) {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const toggleContact = (contactId) => {
    setSelectedContacts(prev => 
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleShare = () => {
    const selected = contacts.filter(contact => selectedContacts.includes(contact.id));
    onShare(selected);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md max-h-96 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold text-text-primary">Share with Contacts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
          {contacts.length === 0 ? (
            <p className="text-sm text-text-secondary text-center py-8">
              No emergency contacts configured. Add contacts in settings.
            </p>
          ) : (
            contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => toggleContact(contact.id)}
                className={`w-full flex items-center justify-between p-3 rounded-md border transition-all ${
                  selectedContacts.includes(contact.id)
                    ? 'border-accent bg-accent/10'
                    : 'border-gray-200 hover:border-accent/50'
                }`}
              >
                <div className="text-left">
                  <p className="font-medium text-text-primary">{contact.name}</p>
                  <p className="text-sm text-text-secondary">{contact.phone}</p>
                </div>
                {selectedContacts.includes(contact.id) && (
                  <Check className="h-5 w-5 text-accent" />
                )}
              </button>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-text-secondary rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={selectedContacts.length === 0}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
              selectedContacts.length > 0
                ? 'bg-accent text-white hover:bg-accent/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Share ({selectedContacts.length})
          </button>
        </div>
      </div>
    </div>
  );
}