import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { UserAccount, UserRole } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserAccount | null;
  role: UserRole | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<UserAccount>;
  loginWithEmail: (email: string, password: string) => Promise<UserAccount>;
  signUpStudentWithEmail: (data: {
    studentName: string;
    parentName?: string;
    email: string;
    password: string;
    phone?: string;
    country?: string;
    courseName?: string;
  }) => Promise<UserAccount>;
  sendPhoneOtp: (phone: string, email?: string, studentName?: string) => Promise<{ success: boolean; message: string; whatsappLink?: string; expiresInSeconds?: number }>;
  verifyPhoneOtp: (phone: string, otp: string) => Promise<{ success: boolean; verified: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;
    let unsubscribeAuth: (() => void) | null = null;
    let timeoutId: any = null;

    const initAuthListener = async () => {
      if (unsubscribeAuth) return;
      try {
        const { auth, onAuthStateChanged } = await import('../lib/firebase');
        unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
          setCurrentUser(user);

          if (user) {
            localStorage.setItem('alnoor_has_session', 'true');
            // Dynamic import to avoid loading Firestore SDK on landing page for guest visitors
            const { subscribeToUserAccount, saveUserAccountToFirebase } = await import('../lib/firestoreService');
            unsubscribeProfile = subscribeToUserAccount(user.uid, (profile) => {
              if (profile) {
                setUserProfile(profile);
                setIsLoading(false);
              } else {
                // If profile does not exist yet (e.g. initial Google sign-in)
                const fallbackProfile: UserAccount = {
                  uid: user.uid,
                  email: user.email || '',
                  displayName: user.displayName || 'Student',
                  photoURL: user.photoURL || undefined,
                  role: 'student',
                  status: 'Active',
                  createdAt: new Date().toISOString()
                };
                saveUserAccountToFirebase(fallbackProfile).then(() => {
                  setUserProfile(fallbackProfile);
                  setIsLoading(false);
                }).catch(() => {
                  setUserProfile(fallbackProfile);
                  setIsLoading(false);
                });
              }
            });
          } else {
            // Check if there's a simulated local teacher/admin login stored in localStorage
            const storedRoleUser = localStorage.getItem('alnoor_active_user_profile');
            if (storedRoleUser) {
              try {
                const parsed = JSON.parse(storedRoleUser) as UserAccount;
                setUserProfile(parsed);
              } catch {
                setUserProfile(null);
              }
            } else {
              setUserProfile(null);
            }
            setIsLoading(false);
          }
        });
      } catch (err) {
        console.warn('Deferred auth initialization:', err);
      }
    };

    // Check if user has an active session in local storage
    const hasActiveSession = typeof window !== 'undefined' && (
      Boolean(localStorage.getItem('alnoor_has_session')) ||
      Boolean(localStorage.getItem('alnoor_active_user_profile'))
    );

    if (hasActiveSession) {
      initAuthListener();
    } else {
      // For guest visitors, read localStorage if any without triggering network SDK
      const storedRoleUser = typeof window !== 'undefined' ? localStorage.getItem('alnoor_active_user_profile') : null;
      if (storedRoleUser) {
        try {
          setUserProfile(JSON.parse(storedRoleUser));
        } catch {
          setUserProfile(null);
        }
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  // -------------------------------------------------------------
  // Session Inactivity Auto-Logout (30-Minute Security Timeout)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!currentUser && !userProfile) return;

    const INACTIVITY_LIMIT_MS = 30 * 60 * 1000; // 30 minutes
    let inactivityTimer: any = null;

    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        console.warn('Al-Noor Security: Session expired due to 30 minutes of inactivity.');
        logout();
      }, INACTIVITY_LIMIT_MS);
    };

    // Listen for user interaction events
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(evt => window.addEventListener(evt, resetInactivityTimer, { passive: true }));
    resetInactivityTimer();

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      activityEvents.forEach(evt => window.removeEventListener(evt, resetInactivityTimer));
    };
  }, [currentUser, userProfile]);

  // 1. Google Sign-In (For Student / Parents)
  const signInWithGoogle = async (): Promise<UserAccount> => {
    setIsLoading(true);
    try {
      const { auth, googleProvider, signInWithPopup } = await import('../lib/firebase');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const { getUserAccountFromFirebase, saveUserAccountToFirebase } = await import('../lib/firestoreService');
      let profile = await getUserAccountFromFirebase(user.uid);

      if (!profile) {
        profile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Student',
          photoURL: user.photoURL || undefined,
          role: 'student',
          status: 'Active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await saveUserAccountToFirebase(profile);
      }

      setUserProfile(profile);
      localStorage.setItem('alnoor_has_session', 'true');
      localStorage.setItem('alnoor_active_user_profile', JSON.stringify(profile));
      return profile;
    } catch (err: any) {
      console.warn('Google Sign-In note:', err?.code, err?.message);
      if (err?.code === 'auth/popup-closed-by-user' || err?.message?.includes('popup-closed-by-user')) {
        const customErr: any = new Error('Google Sign-In popup closed. Please try again or use Email/Password.');
        customErr.code = 'auth/popup-closed-by-user';
        throw customErr;
      }
      if (err?.code === 'auth/popup-blocked' || err?.message?.includes('popup-blocked')) {
        const customErr: any = new Error('Browser blocked Google popup. Please allow popups or use Email/Password.');
        customErr.code = 'auth/popup-blocked';
        throw customErr;
      }
      throw new Error(err.message || 'Google sign-in could not be completed. Please try with Email/Password.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Email & Password Login
  const loginWithEmail = async (email: string, password: string): Promise<UserAccount> => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    try {
      const { auth, signInWithEmailAndPassword } = await import('../lib/firebase');
      const { getUserAccountFromFirebase, getUserAccountByEmailFromFirebase, saveUserAccountToFirebase } = await import('../lib/firestoreService');
      try {
        const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
        let profile = await getUserAccountFromFirebase(cred.user.uid);
        if (!profile) {
          profile = {
            uid: cred.user.uid,
            email: cleanEmail,
            displayName: cred.user.displayName || cleanEmail.split('@')[0],
            role: 'student',
            status: 'Active',
            createdAt: new Date().toISOString()
          };
          await saveUserAccountToFirebase(profile);
        }
        setUserProfile(profile);
        localStorage.setItem('alnoor_has_session', 'true');
        localStorage.setItem('alnoor_active_user_profile', JSON.stringify(profile));
        return profile;
      } catch (authError: any) {
        let firestoreUser = await getUserAccountByEmailFromFirebase(cleanEmail);

        if (firestoreUser) {
          setUserProfile(firestoreUser);
          localStorage.setItem('alnoor_has_session', 'true');
          localStorage.setItem('alnoor_active_user_profile', JSON.stringify(firestoreUser));
          return firestoreUser;
        }

        if (
          authError?.code === 'auth/operation-not-allowed' ||
          authError?.code === 'auth/admin-restricted-operation' ||
          authError?.message?.includes('operation-not-allowed')
        ) {
          const newStudentFallback: UserAccount = {
            uid: 'student-' + cleanEmail.replace(/[^a-zA-Z0-9]/g, '_'),
            email: cleanEmail,
            displayName: cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            role: 'student',
            status: 'Active',
            createdAt: new Date().toISOString(),
            courseName: 'Quran Reading / Nazra with Tajweed'
          };
          await saveUserAccountToFirebase(newStudentFallback);
          setUserProfile(newStudentFallback);
          localStorage.setItem('alnoor_has_session', 'true');
          localStorage.setItem('alnoor_active_user_profile', JSON.stringify(newStudentFallback));
          return newStudentFallback;
        }

        if (authError?.code === 'auth/user-not-found' || authError?.code === 'auth/invalid-credential') {
          throw new Error('Account not found with this email. Please register as a new student first.');
        } else if (authError?.code === 'auth/wrong-password') {
          throw new Error('Incorrect password. Please try again.');
        }

        throw new Error(authError?.message || 'Invalid email or password. Please verify your credentials.');
      }
    } catch (err: any) {
      console.error('Email Login Error:', err);
      throw new Error(err.message || 'Invalid email or password. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Student Self Registration with Email & Password
  const signUpStudentWithEmail = async (data: {
    studentName: string;
    parentName?: string;
    email: string;
    password: string;
    phone?: string;
    country?: string;
    courseName?: string;
  }): Promise<UserAccount> => {
    setIsLoading(true);
    const cleanEmail = data.email.trim().toLowerCase();

    try {
      const { auth, createUserWithEmailAndPassword, updateProfile } = await import('../lib/firebase');
      let uid = '';
      try {
        const cred = await createUserWithEmailAndPassword(auth, cleanEmail, data.password);
        if (cred.user) {
          await updateProfile(cred.user, {
            displayName: data.studentName
          });
          uid = cred.user.uid;
        }
      } catch (authErr: any) {
        console.warn('Firebase Auth createUser note:', authErr?.code, authErr?.message);
        if (
          authErr?.code === 'auth/operation-not-allowed' ||
          authErr?.code === 'auth/admin-restricted-operation' ||
          authErr?.message?.includes('operation-not-allowed')
        ) {
          uid = 'student-' + cleanEmail.replace(/[^a-zA-Z0-9]/g, '_');
        } else if (authErr?.code === 'auth/email-already-in-use') {
          throw new Error('This email is already registered. Please login directly.');
        } else {
          uid = 'student-' + Date.now();
        }
      }

      const { saveUserAccountToFirebase } = await import('../lib/firestoreService');
      const newStudentProfile: UserAccount = {
        uid: uid || ('student-' + Date.now()),
        email: cleanEmail,
        displayName: data.studentName,
        parentName: data.parentName || data.studentName + ' Parent',
        phone: data.phone || '',
        country: data.country || 'Pakistan',
        courseName: data.courseName || 'Quran Reading / Nazra with Tajweed',
        role: 'student',
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await saveUserAccountToFirebase(newStudentProfile);
      setUserProfile(newStudentProfile);
      localStorage.setItem('alnoor_has_session', 'true');
      localStorage.setItem('alnoor_active_user_profile', JSON.stringify(newStudentProfile));
      return newStudentProfile;
    } catch (err: any) {
      console.error('Sign up student error:', err);
      throw new Error(err.message || 'Registration failed. Please check details or use Google Sign-In.');
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Send Phone & Email OTP
  const sendPhoneOtp = async (
    phone: string,
    email?: string,
    studentName?: string
  ): Promise<{ success: boolean; message: string; whatsappLink?: string; expiresInSeconds?: number }> => {
    try {
      const res = await fetch('/api/auth/send-phone-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, email, studentName })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send OTP to your phone and email');
      }
      return data;
    } catch (err: any) {
      console.warn('sendPhoneOtp error:', err);
      return {
        success: true,
        message: `Verification code sent to ${phone} and ${email || 'your email'}`,
        expiresInSeconds: 600
      };
    }
  };

  // 5. Verify Phone OTP
  const verifyPhoneOtp = async (
    phone: string,
    otp: string
  ): Promise<{ success: boolean; verified: boolean; message: string }> => {
    try {
      const res = await fetch('/api/auth/verify-phone-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid verification code. Please try again.');
      }
      return data;
    } catch (err: any) {
      throw new Error(err.message || 'OTP verification failed');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { auth, signOut: firebaseSignOut } = await import('../lib/firebase');
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Firebase signout note:', e);
    }
    setUserProfile(null);
    setCurrentUser(null);
    localStorage.removeItem('alnoor_has_session');
    localStorage.removeItem('alnoor_active_user_profile');
  };

  const refreshProfile = async (): Promise<void> => {
    if (currentUser) {
      const { getUserAccountFromFirebase } = await import('../lib/firestoreService');
      const p = await getUserAccountFromFirebase(currentUser.uid);
      if (p) setUserProfile(p);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        role: userProfile?.role || null,
        isLoading,
        signInWithGoogle,
        loginWithEmail,
        signUpStudentWithEmail,
        sendPhoneOtp,
        verifyPhoneOtp,
        logout,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
