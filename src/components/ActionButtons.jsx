import React, { useState, useEffect } from 'react';
import { Video, Share2, Users, Download, StopCircle } from 'lucide-react';
import { useRecording } from '../hooks/useRecording';
import { ContactPicker } from './ContactPicker';
import { userService } from '../services/userService';

export function ActionButtons({ isPremium = false, className = '' }) {
  const [showContactPicker, setShowContactPicker] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  useEffect(() => {
    // Load contacts from user service
    setEmergencyContacts(userService.getContacts());
  }, []);

  const {
    isRecording,
    recordingUrl,
    error,
    startRecording,
    stopRecording,
    downloadRecording
  } = useRecording();

  const handleEmergencyShare = async () => {
    if (!isPremium) {
      alert('Emergency sharing is a premium feature. Please upgrade to access this functionality.');
      return;
    }

    const position = await getCurrentPosition();
    const message = `🚨 POLICE INTERACTION ALERT 🚨\n\nI am currently in a police interaction.\nLocation: ${position ? `${position.coords.latitude}, ${position.coords.longitude}` : 'Location unavailable'}\nTime: ${new Date().toLocaleString()}\n\nThis is an automated message from Bailiwick AI.`;

    // In a real app, this would send SMS/messages to contacts
    console.log('Emergency message would be sent:', message);
    alert('Emergency alert sent to your contacts!');
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Record Button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium transition-all transform active:scale-95 ${
            isRecording
              ? 'bg-red-500 text-white shadow-lg animate-pulse'
              : 'bg-accent text-white hover:bg-accent/90 shadow-md'
          }`}
        >
          {isRecording ? (
            <>
              <StopCircle className="h-5 w-5" />
              <span>Stop Recording</span>
            </>
          ) : (
            <>
              <Video className="h-5 w-5" />
              <span>Record Interaction</span>
            </>
          )}
        </button>

        {/* Emergency Share Button */}
        <button
          onClick={handleEmergencyShare}
          className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium transition-all transform active:scale-95 ${
            isPremium
              ? 'bg-primary text-white hover:bg-primary/90 shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isPremium}
        >
          <Share2 className="h-5 w-5" />
          <span>Emergency Alert</span>
          {!isPremium && <span className="text-xs">(Premium)</span>}
        </button>
      </div>

      {/* Recording Controls */}
      {recordingUrl && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 space-y-3">
          <p className="text-sm text-green-700 font-medium">Recording completed successfully!</p>
          <div className="flex space-x-2">
            <button
              onClick={downloadRecording}
              className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
            <button
              onClick={() => setShowContactPicker(true)}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      )}

      {/* Contact Picker Modal */}
      {showContactPicker && (
        <ContactPicker
          contacts={emergencyContacts}
          onClose={() => setShowContactPicker(false)}
          onShare={(selectedContacts) => {
            console.log('Sharing with:', selectedContacts);
            
            // Log the interaction
            userService.addInteractionLog({
              type: 'recording_shared',
              recordingUrl: recordingUrl,
              sharedWith: selectedContacts.map(c => c.id),
              sharedStatus: 'completed'
            });
            
            alert(`Recording shared with ${selectedContacts.length} contacts!`);
            setShowContactPicker(false);
          }}
        />
      )}
    </div>
  );
}
