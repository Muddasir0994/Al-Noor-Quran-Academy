import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, ShieldWarning, User, ArrowLeft, SignIn, ShieldCheck } from '@phosphor-icons/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'teacher' | 'admin' | 'any';
  onRequireAuth: (role?: 'student' | 'teacher', mode?: 'login' | 'signup') => void;
  onBackToLanding: () => void;
  onGoToStudentPortal?: () => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = 'any',
  onRequireAuth,
  onBackToLanding,
  onGoToStudentPortal
}) => {
  const { currentUser, userProfile, isLoading } = useAuth();

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-[#FAF9F5]">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-[#064E3B] animate-pulse mb-4">
          <ShieldCheck className="w-6 h-6 text-[#D4A72C]" weight="duotone" />
        </div>
        <p className="font-heading font-extrabold text-lg text-[#064E3B]">
          Verifying Academy Credentials...
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Securing session with Al-Noor Academy authentication servers.
        </p>
      </div>
    );
  }

  // 2. Not Logged In
  if (!currentUser) {
    const roleLabel = requiredRole === 'teacher' ? 'Faculty Member / Teacher' : requiredRole === 'admin' ? 'Administrator' : 'Enrolled Student or Parent';
    
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FAF9F5]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-emerald-950/10 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-[#064E3B] shadow-xs">
            <Lock className="w-8 h-8 text-[#D4A72C]" weight="duotone" />
          </div>

          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#064E3B] bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
              Protected Academy Area
            </span>
            <h2 className="text-2xl font-heading font-extrabold text-[#064E3B] mt-3">
              Authentication Required
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              To access this portal, please log in with your verified <strong>{roleLabel}</strong> account.
            </p>
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => onRequireAuth(requiredRole === 'teacher' ? 'teacher' : 'student', 'login')}
              className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm gold-gradient-btn text-[#064E3B] shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <SignIn className="w-4 h-4 text-[#064E3B]" weight="bold" />
              <span>Log In to Access Portal</span>
            </button>

            <button
              onClick={onBackToLanding}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-gray-600 hover:text-[#064E3B] hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" weight="bold" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Role Mismatch Verification
  const userRole = userProfile?.role || 'student';

  if (requiredRole !== 'any' && requiredRole !== userRole) {
    // Admin has access to everything
    if (userRole !== 'admin') {
      return (
        <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FAF9F5]">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-red-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600 shadow-xs">
              <ShieldWarning className="w-8 h-8 text-red-600" weight="duotone" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-800 bg-red-100 px-3 py-1 rounded-full border border-red-300">
                Access Restricted
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-gray-900 mt-3">
                Role Permission Required
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                You are currently signed in as <strong>{userProfile?.displayName}</strong> ({userRole}). This portal requires <strong>{requiredRole}</strong> authorization.
              </p>
            </div>

            <div className="pt-2 space-y-2.5">
              {onGoToStudentPortal && userRole === 'student' && (
                <button
                  onClick={onGoToStudentPortal}
                  className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm gold-gradient-btn text-[#064E3B] shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#064E3B]" weight="duotone" />
                  <span>Go to My Student Portal</span>
                </button>
              )}

              <button
                onClick={onBackToLanding}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-gray-600 hover:text-[#064E3B] hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" weight="bold" />
                <span>Return to Homepage</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // 4. Authorized — render protected dashboard/room
  return <>{children}</>;
};
