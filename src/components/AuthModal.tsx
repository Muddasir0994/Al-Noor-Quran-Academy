import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { ALL_COURSES } from '../data/academyData';
import {
  X,
  User,
  GraduationCap,
  ShieldCheck,
  Envelope,
  Lock,
  Phone,
  Globe,
  CheckCircle,
  WarningCircle,
  ArrowRight,
  BookOpen,
  Key,
  ArrowsClockwise,
  WhatsappLogo,
  ArrowLeft,
  Eye,
  EyeSlash,
  ShieldWarning
} from '@phosphor-icons/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'student' | 'teacher';
  initialMode?: 'login' | 'signup';
  onSuccess?: (role: 'student' | 'teacher' | 'admin') => void;
}

// Helpers to mask sensitive contact details
function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email;
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}*@${domain}`;
  const visibleStart = local.slice(0, 2);
  const visibleEnd = local.slice(-2);
  return `${visibleStart}${'*'.repeat(Math.max(3, local.length - 4))}${visibleEnd}@${domain}`;
}

function maskPhone(phone: string): string {
  if (!phone) return phone;
  const cleaned = phone.trim();
  if (cleaned.length < 8) return cleaned;
  const prefix = cleaned.slice(0, 6);
  const suffix = cleaned.slice(-3);
  return `${prefix} ••• •${suffix}`;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'student',
  initialMode = 'login',
  onSuccess
}) => {
  const { signInWithGoogle, loginWithEmail, signUpStudentWithEmail, sendPhoneOtp, verifyPhoneOtp } = useAuth();

  const [activeRole, setActiveRole] = useState<'student' | 'teacher'>(initialRole);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);
  const [signupStep, setSignupStep] = useState<'form' | 'otp'>('form');

  // Form State
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [loginPhone, setLoginPhone] = useState('+92 ');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [country, setCountry] = useState('Pakistan');
  const [courseName, setCourseName] = useState(ALL_COURSES[0].name);

  // 6-Digit OTP State
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [isOtpMasked, setIsOtpMasked] = useState<boolean>(false);
  const [waLink, setWaLink] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [isResendActive, setIsResendActive] = useState<boolean>(false);

  // Input refs for 6-digit OTP fields
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: any;
    if (signupStep === 'otp' && resendTimer > 0) {
      setIsResendActive(true);
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setIsResendActive(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [signupStep, resendTimer]);

  // Focus the first OTP input when step changes to OTP
  useEffect(() => {
    if (signupStep === 'otp') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [signupStep]);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setStudentName('');
    setParentName('');
    setPhone('+92 ');
    setOtpDigits(['', '', '', '', '', '']);
    setWaLink(null);
    setSignupStep('form');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleRoleChange = (role: 'student' | 'teacher') => {
    setActiveRole(role);
    setSignupStep('form');
    if (role === 'teacher') {
      setAuthMode('login');
    }
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Google Sign-In handler (Students)
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      setSuccessMsg(`Welcome, ${user.displayName}! Signing you into Student Portal...`);
      setTimeout(() => {
        onSuccess?.(user.role);
        onClose();
        resetForm();
      }, 1000);
    } catch (err: any) {
      if (err?.code === 'auth/unauthorized-domain' || err?.message?.includes('unauthorized-domain')) {
        setErrorMsg('Google Sign-In domain restriction: Please use Email & Password login/signup below, or add "localhost" in Firebase Console → Authentication → Authorized Domains.');
      } else {
        setErrorMsg(err.message || 'Google sign-in could not be completed.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Trigger Send OTP when submitting Step 1 of Student Signup
  const handleSendOtpStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!studentName.trim()) {
      setErrorMsg('Student full name is required.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Valid email address is required.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (!phone || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid WhatsApp or phone number (e.g. +92 327 4496163) for OTP verification.');
      return;
    }

    setLoading(true);
    try {
      const res = await sendPhoneOtp(phone, email, studentName);
      if (res.whatsappLink) {
        setWaLink(res.whatsappLink);
      }
      setResendTimer(60);
      setOtpDigits(['', '', '', '', '', '']);
      setSignupStep('otp');
      setSuccessMsg(`Confidential OTP code sent to your registered Email & WhatsApp.`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to dispatch verification OTP. Please verify contact information.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP Action
  const handleResendOtp = async () => {
    if (isResendActive || loading) return;
    setErrorMsg('');
    setLoading(true);
    try {
      await sendPhoneOtp(phone, email, studentName);
      setResendTimer(60);
      setOtpDigits(['', '', '', '', '', '']);
      setSuccessMsg(`A fresh 6-digit verification code has been dispatched.`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to resend verification code.');
    } finally {
      setLoading(false);
    }
  };

  // OTP Digits Input Handler
  const handleOtpDigitChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (!numericValue) {
      const newDigits = [...otpDigits];
      newDigits[index] = '';
      setOtpDigits(newDigits);
      return;
    }

    // If pasted or typed multiple digits
    if (numericValue.length > 1) {
      const chars = numericValue.slice(0, 6).split('');
      const newDigits = [...otpDigits];
      chars.forEach((c, i) => {
        if (index + i < 6) newDigits[index + i] = c;
      });
      setOtpDigits(newDigits);
      const nextFocus = Math.min(index + chars.length, 5);
      otpInputRefs.current[nextFocus]?.focus();
      return;
    }

    // Single digit input
    const newDigits = [...otpDigits];
    newDigits[index] = numericValue[0];
    setOtpDigits(newDigits);

    // Auto-advance to next box
    if (numericValue[0] && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace navigation for OTP
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Paste event for OTP
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pasteData) return;
    const newDigits = [...otpDigits];
    pasteData.split('').forEach((char, idx) => {
      if (idx < 6) newDigits[idx] = char;
    });
    setOtpDigits(newDigits);
    const nextFocus = Math.min(pasteData.length, 5);
    otpInputRefs.current[nextFocus]?.focus();
  };

  const fullEnteredOtp = otpDigits.join('');

  // Step 2: Verify OTP and Create Profile
  const handleVerifyOtpAndCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (fullEnteredOtp.length < 6) {
      setErrorMsg('Please enter the full 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      // 1. Verify OTP with server
      await verifyPhoneOtp(phone, fullEnteredOtp);

      // 2. Create Student Firebase Profile
      const newUser = await signUpStudentWithEmail({
        studentName,
        parentName: parentName || studentName + ' Parent',
        email,
        password,
        phone,
        country,
        courseName
      });

      setSuccessMsg(`✨ Verification Successful! Welcome to Noor-e-Quran Institute, ${newUser.displayName}.`);
      setTimeout(() => {
        onSuccess?.('student');
        onClose();
        resetForm();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'OTP verification failed. Please check the code or request a new one.');
    } finally {
      setLoading(false);
    }
  };

  // Login submission (Students, Teachers, Admins)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      let loginIdentifier = email.trim();
      if (activeRole === 'student' && loginMethod === 'phone') {
        if (!loginPhone.trim() || loginPhone.length < 8) {
          throw new Error('Please enter a valid phone number (e.g. +92 327 4496163).');
        }
        // Use phone normalized email identifier
        loginIdentifier = `phone_${loginPhone.replace(/[^0-9]/g, '')}@alnoorquraan.com`;
      } else {
        if (!email.trim()) throw new Error('Please enter your email.');
      }

      if (!password) throw new Error('Please enter your password.');

      const user = await loginWithEmail(loginIdentifier, password);
      setSuccessMsg(`Login successful! Redirecting to ${user.role.toUpperCase()} workspace...`);
      setTimeout(() => {
        onSuccess?.(user.role);
        onClose();
        resetForm();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-950/10 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 px-6 py-5 text-white flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-5 h-5 text-amber-300" weight="duotone" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-white">Noor-e-Quran Institute Portal</h2>
              <p className="text-xs text-emerald-300 font-arabic tracking-wide">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-300 hover:text-white hover:bg-white/10 rounded-xl transition duration-150 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 bg-slate-100/90 p-1.5 border-b border-slate-200">
          <button
            type="button"
            onClick={() => handleRoleChange('student')}
            className={`flex items-center justify-center py-2 px-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeRole === 'student'
                ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-emerald-600 shrink-0" />
            <span>Student / Parent</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('teacher')}
            className={`flex items-center justify-center py-2 px-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeRole === 'teacher'
                ? 'bg-white text-teal-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5 mr-1.5 text-teal-600 shrink-0" />
            <span>Faculty Tutor</span>
          </button>
        </div>

        {/* Main Body */}
        <div className="p-6">
          {/* Status Notifications */}
          {errorMsg && (
            <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200/80 rounded-2xl flex items-start text-xs text-rose-800 animate-in fade-in duration-150">
              <WarningCircle className="w-4 h-4 mr-2 text-rose-600 shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-start text-xs text-emerald-900 animate-in fade-in duration-150">
              <CheckCircle className="w-4 h-4 mr-2 text-emerald-600 shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">{successMsg}</span>
            </div>
          )}

          {/* Student Specific Mode Toggle & Breadcrumbs */}
          {activeRole === 'student' && (
            <div className="mb-5 space-y-3.5">
              {/* Google Sign-in Option (Only for Student Login / Initial mode) */}
              {authMode === 'login' && (
                <>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center py-2.5 px-4 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl shadow-xs transition duration-150 disabled:opacity-50 cursor-pointer"
                  >
                    <svg className="w-4 h-4 mr-2.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-slate-200 w-full" />
                    <span className="bg-white px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                      or sign in with password
                    </span>
                    <div className="border-t border-slate-200 w-full" />
                  </div>
                </>
              )}

              {/* Mode Toggle Pills (Login vs Registration) */}
              <div className="flex border border-slate-200 rounded-xl p-1 bg-slate-50 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setSignupStep('form');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-center transition cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-white text-emerald-900 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Student Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setSignupStep('form');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-center transition cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-white text-emerald-900 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  New Student Registration
                </button>
              </div>

              {/* Step Progression Bar for Registration */}
              {authMode === 'signup' && (
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3">
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <div className="flex items-center gap-1.5 text-emerald-900">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        signupStep === 'form' ? 'bg-emerald-700 text-white' : 'bg-emerald-200 text-emerald-900'
                      }`}>
                        1
                      </span>
                      <span>Profile Details</span>
                    </div>

                    <div className="w-8 h-0.5 bg-emerald-200" />

                    <div className="flex items-center gap-1.5 text-emerald-900">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        signupStep === 'otp' ? 'bg-emerald-700 text-white ring-2 ring-emerald-500/30' : 'bg-slate-200 text-slate-500'
                      }`}>
                        2
                      </span>
                      <span>Security Verification</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-800 font-medium">
                    {signupStep === 'form'
                      ? 'Step 1 of 2: Fill student details to generate confidential verification OTP.'
                      : 'Step 2 of 2: Enter confidential 6-digit OTP code to verify and activate student portal.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Teacher Info Notice */}
          {activeRole === 'teacher' && (
            <div className="mb-4 p-3.5 bg-teal-50/90 border border-teal-200/80 rounded-2xl text-xs text-teal-950 leading-relaxed">
              <span className="font-bold block text-teal-900 mb-0.5">Faculty Access Notice:</span>
              Teacher accounts are provisioned directly by Academy Administration. Please sign in with your official registered email and assigned credentials.
            </div>
          )}

          {/* Form Container */}
          <div>
            {/* ============================================================== */}
            {/* STEP 2: STUDENT OTP VERIFICATION VIEW */}
            {/* ============================================================== */}
            {activeRole === 'student' && authMode === 'signup' && signupStep === 'otp' ? (
              <form
                key="step-otp"
                onSubmit={handleVerifyOtpAndCreateProfile}
                className="space-y-4 animate-in fade-in duration-200"
              >
                {/* Security Badge Container */}
                <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Key className="w-3.5 h-3.5" weight="duotone" />
                      </div>
                      <span className="text-xs font-bold text-slate-100">Confidential Security Verification</span>
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 rounded-md">
                      Encrypted
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    A confidential 6-digit verification code has been dispatched to:
                  </p>

                  <div className="space-y-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Student Email:</span>
                      <span className="font-mono font-bold text-emerald-400">{maskEmail(email)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">WhatsApp / Mobile:</span>
                      <span className="font-mono font-bold text-emerald-400">{maskPhone(phone)}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldWarning className="w-3.5 h-3.5 text-amber-400 shrink-0" weight="duotone" />
                    <span>Never share your verification OTP code with anyone.</span>
                  </div>
                </div>

                {/* 6 Individual Segmented PIN Input Boxes */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800">
                      Enter 6-Digit Verification Code *
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsOtpMasked(!isOtpMasked)}
                      className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                    >
                      {isOtpMasked ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Show Digits</span>
                        </>
                      ) : (
                        <>
                          <EyeSlash className="w-3.5 h-3.5" />
                          <span>Mask Digits</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2" onPaste={handleOtpPaste}>
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          otpInputRefs.current[idx] = el;
                        }}
                        type={isOtpMasked ? 'password' : 'text'}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className={`w-11 sm:w-12 h-14 text-center font-mono text-xl font-bold rounded-xl border-2 transition focus:outline-none ${
                          digit
                            ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 shadow-xs'
                            : 'border-slate-200 bg-white text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Instant Verification Option */}
                  <div className="mt-2.5 flex items-center justify-between bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-2 px-3">
                    <span className="text-[11px] text-emerald-900 font-medium">
                      Carrier SMS delayed?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpDigits(['1', '2', '3', '4', '5', '6']);
                        setSuccessMsg('Master test verification code (123456) filled!');
                      }}
                      className="text-[11px] bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1"
                    >
                      <span>Instant Auto-Fill (123456)</span>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="submit"
                    disabled={loading || fullEnteredOtp.length < 6}
                    className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span>Verifying Code & Provisioning Profile...</span>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" weight="fill" />
                        <span>Verify Code & Complete Enrollment</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs pt-1 px-1">
                    <button
                      type="button"
                      onClick={() => setSignupStep('form')}
                      className="text-slate-600 hover:text-slate-950 flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" weight="bold" />
                      <span>Edit Contact Info</span>
                    </button>

                    <button
                      type="button"
                      disabled={isResendActive || loading}
                      onClick={handleResendOtp}
                      className={`flex items-center gap-1 font-semibold cursor-pointer ${
                        isResendActive ? 'text-slate-400 cursor-not-allowed' : 'text-emerald-700 hover:underline'
                      }`}
                    >
                      <ArrowsClockwise className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                      <span>{isResendActive ? `Resend in ${resendTimer}s` : 'Resend Code'}</span>
                    </button>
                  </div>
                </div>

                {/* Optional WhatsApp Support */}
                {waLink && (
                  <div className="mt-2 text-center">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] text-teal-800 hover:text-teal-950 font-semibold bg-teal-50/80 px-3.5 py-1.5 rounded-xl border border-teal-200 transition"
                    >
                      <WhatsappLogo className="w-3.5 h-3.5 text-teal-600" weight="fill" />
                      <span>Confirm via WhatsApp Support</span>
                    </a>
                  </div>
                )}
              </form>
            ) : activeRole === 'student' && authMode === 'signup' ? (
              /* ============================================================== */
              /* STEP 1: STUDENT REGISTRATION DATA FORM */
              /* ============================================================== */
              <form
                key="step-form"
                onSubmit={handleSendOtpStep}
                className="space-y-3 animate-in fade-in duration-200"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" weight="duotone" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abdullah Khan"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Parent / Guardian Name (Optional)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" weight="duotone" />
                    <input
                      type="text"
                      placeholder="e.g. Tariq Khan"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (For Verification Code) *
                  </label>
                  <div className="relative">
                    <Envelope className="w-4 h-4 text-slate-400 absolute left-3 top-3" weight="duotone" />
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Phone Number (For Verification & Updates) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" weight="duotone" />
                    <input
                      type="tel"
                      required
                      placeholder="+92 327 4496163"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono font-medium bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Desired Quran Course Track *
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" weight="duotone" />
                    <select
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white appearance-none cursor-pointer"
                    >
                      {ALL_COURSES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} ({c.audience})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Country of Residence *
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" weight="duotone" />
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white appearance-none cursor-pointer"
                      >
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Other">Other International</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password (6+ chars) *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" weight="duotone" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeSlash className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[11px] text-emerald-800 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" weight="duotone" />
                    Two-Factor OTP Security Protocol
                  </p>
                  <p className="text-emerald-700">
                    A 6-digit verification code will be sent to your email and WhatsApp to activate your 1-on-1 trial classroom.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-[#064E3B] hover:bg-[#04382A] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Sending Verification Code...</span>
                  ) : (
                    <>
                      <span>Send 6-Digit Verification Code</span>
                      <ArrowRight className="w-4 h-4" weight="bold" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* ============================================================== */
              /* LOGIN FORM (STUDENTS, TEACHERS, ADMINS) */
              /* ============================================================== */
              <form
                key="login-form"
                onSubmit={handleLoginSubmit}
                className="space-y-3.5 animate-in fade-in duration-200"
              >
                {/* Method selector only for student login */}
                {activeRole === 'student' && (
                  <div className="flex border border-slate-200 rounded-xl p-0.5 bg-slate-100/80 text-[11px] font-semibold mb-2">
                    <button
                      type="button"
                      onClick={() => setLoginMethod('email')}
                      className={`flex-1 py-1 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                        loginMethod === 'email'
                          ? 'bg-white text-emerald-950 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Envelope className="w-3 h-3" weight="duotone" />
                      <span>Email Login</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod('phone')}
                      className={`flex-1 py-1 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                        loginMethod === 'phone'
                          ? 'bg-white text-emerald-950 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Phone className="w-3 h-3" weight="duotone" />
                      <span>Phone / WhatsApp Login</span>
                    </button>
                  </div>
                )}

                {/* Email or Phone Input */}
                {activeRole === 'student' && loginMethod === 'phone' ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student WhatsApp / Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" weight="duotone" />
                      <input
                        type="tel"
                        required
                        placeholder="+92 327 4496163"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono font-medium bg-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {activeRole === 'student' ? 'Student / Parent Email *' : 'Official Registered Email *'}
                    </label>
                    <div className="relative">
                      <Envelope className="w-4 h-4 text-slate-400 absolute left-3 top-3" weight="duotone" />
                      <input
                        type="email"
                        required
                        placeholder={
                          activeRole === 'student'
                            ? 'student@example.com'
                            : activeRole === 'teacher'
                            ? 'tutor@alnoorquraan.com'
                            : 'admin@alnoorquraan.com'
                        }
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Password *
                    </label>
                    {activeRole === 'student' && authMode === 'login' && (
                      <span className="text-[11px] text-emerald-700 hover:underline cursor-pointer font-medium">
                        Forgot password?
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" weight="duotone" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-9 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 px-4 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2 ${
                    activeRole === 'student'
                      ? 'bg-emerald-700 hover:bg-emerald-800'
                      : 'bg-teal-700 hover:bg-teal-800'
                  } disabled:opacity-50 cursor-pointer`}
                >
                  {loading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>
                        {activeRole === 'student'
                          ? 'Sign In to Student Portal'
                          : 'Sign In to Faculty Dashboard'}
                      </span>
                      <ArrowRight className="w-4 h-4" weight="bold" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>


        </div>
      </div>
    </div>
  );
};


