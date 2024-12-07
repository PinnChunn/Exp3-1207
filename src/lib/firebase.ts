import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC16ekl_0eR4RarphTPMXt64bHQZrgrWkk",
  authDomain: "exp32024.firebaseapp.com",
  projectId: "exp32024",
  storageBucket: "exp32024.firebasestorage.app",
  messagingSenderId: "581668076921",
  appId: "1:581668076921:web:9b08c9b3f64ef43a3083a8",
  measurementId: "G-NNQ94XM1CT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure Google Provider with more specific settings
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline'
});

// Add additional scopes for Google OAuth
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Auth functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user) {
      console.log('👤 User signed in successfully:', result.user.email);
      return { user: result.user, error: null };
    }
    return { user: null, error: 'No user data received' };
  } catch (error: any) {
    console.error('❌ Sign in error:', error);
    return { user: null, error: error.message };
  }
};

// Mock Analytics helper functions
export const logUserActivity = {
  memberLogin: (userId: string, method: string) => {
    console.log('Member login:', { userId, method, timestamp: new Date().toISOString() });
  },
  
  memberRegister: (userId: string, userDetails: any) => {
    console.log('Member register:', { userId, userDetails, timestamp: new Date().toISOString() });
  },

  memberUpdate: (userId: string, updatedFields: string[]) => {
    console.log('Member update:', { userId, updatedFields, timestamp: new Date().toISOString() });
  },

  viewEvent: (eventId: string, eventTitle: string, userId?: string) => {
    console.log('View event:', { 
      eventId, 
      eventTitle, 
      userId: userId || 'anonymous', 
      timestamp: new Date().toISOString() 
    });
  },

  registerEvent: (eventId: string, userId: string, eventDetails: any) => {
    console.log('Register event:', { 
      eventId, 
      userId,
      eventDetails,
      timestamp: new Date().toISOString() 
    });
  },

  shareEvent: (eventId: string, shareMethod: string, userId?: string) => {
    console.log('Share event:', { 
      eventId, 
      shareMethod, 
      userId: userId || 'anonymous', 
      timestamp: new Date().toISOString() 
    });
  },

  pageView: (pageName: string, userId?: string) => {
    console.log('Page view:', { 
      pageName, 
      userId: userId || 'anonymous', 
      timestamp: new Date().toISOString() 
    });
  },

  userInteraction: (interactionType: string, details: any, userId?: string) => {
    console.log('User interaction:', {
      interactionType,
      details,
      userId: userId || 'anonymous',
      timestamp: new Date().toISOString()
    });
  }
};

// Error handling
export const handleFirebaseError = (error: any) => {
  const errorDetails = {
    code: error.code,
    message: error.message,
    timestamp: new Date().toISOString()
  };
  
  console.error('Firebase operation failed:', errorDetails);
  
  switch (error.code) {
    case 'auth/popup-closed-by-user':
      return { ...errorDetails, userMessage: '登入視窗被關閉，請重試' };
    case 'auth/popup-blocked':
      return { ...errorDetails, userMessage: '請允許彈出視窗以完成登入' };
    case 'auth/unauthorized-domain':
      return { ...errorDetails, userMessage: '此網域未被授權，請聯繫管理員' };
    default:
      return { ...errorDetails, userMessage: '發生錯誤，請重試' };
  }
};

// Auth state observer
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('👤 User is signed in:', user.uid);
  } else {
    console.log('👋 User is signed out');
  }
});

// Export all necessary functions and variables
export type { User } from 'firebase/auth';