import React, { useState, useEffect } from 'react';
import {
  Lead,
  EnrollmentApplication,
  Student,
  Tutor,
  Course,
  SystemNotification,
  DashboardStats,
  LeadStatus,
  EnrollmentStatus,
  StudentStatus,
  TutorStatus
} from '../types';
import {
  Lock,
  SignOut,
  Users,
  UserCheck,
  BookOpen,
  MagnifyingGlass,
  Funnel,
  WhatsappLogo,
  Envelope,
  Plus,
  PencilSimple,
  Trash,
  CheckCircle,
  Clock,
  Globe,
  Certificate,
  Bell,
  Eye,
  X,
  FileText,
  FloppyDisk,
  ArrowsClockwise,
  PhoneCall,
  Calendar,
  CaretRight,
  ShieldCheck,
  GraduationCap,
  PenNib
} from '@phosphor-icons/react';
import { BlogEditor } from './BlogEditor';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onRefreshCourses: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  courses,
  onRefreshCourses
}) => {
  // Auth state
  const [token, setToken] = useState<string>(() => {
    return localStorage.getItem('alnoor_admin_token') || sessionStorage.getItem('alnoor_admin_token') || '';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Active view tab in admin
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'enrollments' | 'students' | 'tutors' | 'courses' | 'blog' | 'notifications'>('overview');

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentApplication[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Filter & search states
  const [searchTerm, setSearchTerm] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [enrollmentStatusFilter, setEnrollmentStatusFilter] = useState<string>('all');
  const [studentStatusFilter, setStudentStatusFilter] = useState<string>('all');

  // Selected item modal/drawer
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentApplication | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Tutor modal state
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  const [isAddingTutor, setIsAddingTutor] = useState(false);
  const [tutorForm, setTutorForm] = useState<{
    name: string;
    gender: 'Male' | 'Female';
    specialization: string;
    qualification: string;
    availability: string;
    phone: string;
    email: string;
    password?: string;
    status: TutorStatus;
  }>({
    name: '',
    gender: 'Male',
    specialization: '',
    qualification: 'Shahadat-ul-Aalamia / Certified Qari',
    availability: 'Morning & Evening',
    phone: '+92 327 4496163',
    email: '',
    password: '',
    status: 'Available'
  });

  // Course modal state
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    name: '',
    slug: '',
    arabicName: '',
    shortDescription: '',
    description: '',
    audience: 'Kids & Beginners',
    duration: '3 - 6 Months',
    classesPerWeek: '4 - 5 Days / Week',
    feePKR: 3500,
    feeUSD: 35,
    featured: true,
    status: 'active',
    highlights: []
  });

  // Fetch admin data on token change
  useEffect(() => {
    if (token && isOpen) {
      fetchAdminData();
    }
  }, [token, isOpen]);

  // Industry Standard: Auto-logout after 30 minutes of inactivity
  useEffect(() => {
    if (!token) return;

    let timeoutId: NodeJS.Timeout;
    const INACTIVITY_LIMIT_MS = 30 * 60 * 1000; // 30 minutes

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleLogout();
        setLoginError('Your session has expired due to 30 minutes of inactivity. Please sign in again.');
      }, INACTIVITY_LIMIT_MS);
    };

    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(evt => window.addEventListener(evt, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      activityEvents.forEach(evt => window.removeEventListener(evt, resetTimer));
    };
  }, [token]);

  const fetchAdminData = async () => {
    setLoadingData(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, leadsRes, enrRes, stuRes, tutRes, notifRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/leads', { headers }),
        fetch('/api/admin/enrollments', { headers }),
        fetch('/api/admin/students', { headers }),
        fetch('/api/admin/tutors', { headers }),
        fetch('/api/admin/notifications', { headers })
      ]);

      if (statsRes.status === 401) {
        handleLogout();
        return;
      }

      const statsData = await statsRes.json();
      const leadsData = await leadsRes.json();
      const enrData = await enrRes.json();
      const stuData = await stuRes.json();
      const tutData = await tutRes.json();
      const notifData = await notifRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (leadsData.success) setLeads(leadsData.leads);
      if (enrData.success) setEnrollments(enrData.enrollments);
      if (stuData.success) setStudents(stuData.students);
      if (tutData.success) setTutors(tutData.tutors);
      if (notifData.success) setNotifications(notifData.notifications);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid admin credentials');
      }

      setToken(data.token);
      if (rememberMe) {
        localStorage.setItem('alnoor_admin_token', data.token);
        sessionStorage.removeItem('alnoor_admin_token');
      } else {
        sessionStorage.setItem('alnoor_admin_token', data.token);
        localStorage.removeItem('alnoor_admin_token');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {
      // ignore
    }
    setToken('');
    localStorage.removeItem('alnoor_admin_token');
    sessionStorage.removeItem('alnoor_admin_token');
    setSelectedLead(null);
    setSelectedEnrollment(null);
    setSelectedStudent(null);
  };

  // Status updates
  const updateLeadStatus = async (leadId: string, status: LeadStatus) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => (l.id === leadId ? data.lead : l)));
        if (selectedLead && selectedLead.id === leadId) setSelectedLead(data.lead);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addLeadNote = async (leadId: string) => {
    if (!newNoteText.trim()) return;
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: newNoteText, author: 'Admin' })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => (l.id === leadId ? data.lead : l)));
        setSelectedLead(data.lead);
        setNewNoteText('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateEnrollment = async (id: string, updates: Partial<EnrollmentApplication>) => {
    try {
      const res = await fetch(`/api/admin/enrollments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        setEnrollments(prev => prev.map(e => (e.id === id ? data.enrollment : e)));
        if (selectedEnrollment && selectedEnrollment.id === id) setSelectedEnrollment(data.enrollment);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addEnrollmentNote = async (id: string) => {
    if (!newNoteText.trim()) return;
    try {
      const res = await fetch(`/api/admin/enrollments/${id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: newNoteText, author: 'Admin' })
      });
      const data = await res.json();
      if (data.success) {
        setEnrollments(prev => prev.map(e => (e.id === id ? data.enrollment : e)));
        setSelectedEnrollment(data.enrollment);
        setNewNoteText('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addStudentNote = async (id: string) => {
    if (!newNoteText.trim()) return;
    try {
      const res = await fetch(`/api/admin/students/${id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: newNoteText, author: 'Admin' })
      });
      const data = await res.json();
      if (data.success) {
        setStudents(prev => prev.map(s => (s.id === id ? data.student : s)));
        setSelectedStudent(data.student);
        setNewNoteText('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Tutor Save
  const handleSaveTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Forward directly to authenticated backend API endpoint
      if (editingTutor) {
        const res = await fetch(`/api/admin/tutors/${editingTutor.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(tutorForm)
        });
        const data = await res.json();
        if (data.success) {
          setTutors(prev => prev.map(t => (t.id === editingTutor.id ? data.tutor : t)));
        } else {
          setTutors(prev => prev.map(t => (t.id === editingTutor.id ? { ...t, ...tutorForm } : t)));
        }
      } else {
        const res = await fetch('/api/admin/tutors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(tutorForm)
        });
        const data = await res.json();
        if (data.success) {
          setTutors(prev => [...prev, data.tutor]);
        } else {
          const newT: Tutor = {
            id: 'tut-' + Date.now(),
            name: tutorForm.name,
            gender: tutorForm.gender,
            qualification: tutorForm.qualification,
            specialization: tutorForm.specialization,
            languages: ['Urdu', 'English', 'Arabic'],
            experienceYears: 5,
            availableTimings: tutorForm.availability,
            availability: tutorForm.availability,
            studentsCapacity: 15,
            activeStudentsCount: 0,
            phone: tutorForm.phone,
            email: tutorForm.email,
            status: tutorForm.status,
            createdAt: new Date().toISOString()
          };
          setTutors(prev => [...prev, newT]);
        }
      }
      setIsAddingTutor(false);
      setEditingTutor(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Course Save
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        const res = await fetch(`/api/admin/courses/${editingCourse.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(courseForm)
        });
        const data = await res.json();
        if (data.success) {
          onRefreshCourses();
          fetchAdminData();
        }
      } else {
        const res = await fetch('/api/admin/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(courseForm)
        });
        const data = await res.json();
        if (data.success) {
          onRefreshCourses();
          fetchAdminData();
        }
      }
      setIsAddingCourse(false);
      setEditingCourse(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        onRefreshCourses();
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // WhatsApp launcher helper
  const openWhatsAppForLead = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Assalam-o-Alaikum ${lead.parentName || lead.studentName},\n\n` +
      `This is Al-Noor Quraan Academy Coordinator regarding the 3-Day Free Trial request for ${lead.studentName}.\n\n` +
      `Course: ${lead.courseName}\n` +
      `Preferred Tutor: ${lead.tutorGender}\n` +
      `Preferred Time: ${lead.timeSlot}\n\n` +
      `We would like to confirm your schedule and assign your certified tutor. Are you available for a quick discussion?`
    );
    window.open(`https://wa.me/${cleanPhone || '923274496163'}?text=${text}`, '_blank');
  };

  const openWhatsAppForEnrollment = (enr: EnrollmentApplication) => {
    const cleanPhone = (enr.phone || enr.parentPhone).replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Assalam-o-Alaikum ${enr.parentName || enr.studentName},\n\n` +
      `Al-Noor Quraan Academy has reviewed your admission application for ${enr.studentName} (${enr.courseName}).\n\n` +
      `Preferred Timing: ${enr.timeSlot}\n` +
      `Tutor: ${enr.assignedTutorName || enr.tutorPreference}\n\n` +
      `Please let us know your convenient start date.`
    );
    window.open(`https://wa.me/${cleanPhone || '923274496163'}?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-7xl bg-[#F8F9FA] rounded-2xl shadow-2xl border border-emerald-900/30 overflow-hidden my-4 min-h-[85vh] flex flex-col">
        
        {/* Top Admin Header */}
        <div className="bg-[#043629] text-white px-4 sm:px-6 py-4 flex items-center justify-between border-b border-[#D4A72C]/40 bg-islamic-pattern shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md border border-[#D4A72C]/40 flex items-center justify-center shrink-0">
              <img src="/logo.webp" alt="Al-Noor Logo" width={40} height={40} loading="lazy" decoding="async" className="w-full h-full object-contain" onError={(e) => { const target = e.currentTarget; target.onerror = null; target.src = '/logo.png'; }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-heading font-bold text-white">
                  Al-Noor Academy Management System
                </h2>
                <span className="bg-[#D4A72C]/20 text-[#D4A72C] text-[11px] font-semibold px-2 py-0.5 rounded border border-[#D4A72C]/40 hidden sm:inline">
                  Admin Portal v1.0
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Lead Management • Free Trials • Enrollments • Tutors • Notifications
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={fetchAdminData}
                disabled={loadingData}
                className="p-2 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors cursor-pointer"
                title="Refresh Data"
              >
                <ArrowsClockwise className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} weight="bold" />
              </button>
            )}
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-red-900/80 hover:bg-red-800 text-red-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <SignOut className="w-3.5 h-3.5" weight="duotone" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" weight="bold" />
            </button>
          </div>
        </div>

        {/* Auth Guard View */}
        {!token ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-islamic-subtle">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200 text-center space-y-6">
              
              <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-md border border-[#D4A72C]/40 flex items-center justify-center mx-auto">
                <img src="/logo.webp" alt="Al-Noor Logo" width={64} height={64} loading="lazy" decoding="async" className="w-full h-full object-contain" onError={(e) => { const target = e.currentTarget; target.onerror = null; target.src = '/logo.png'; }} />
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-[#064E3B]">
                  Academy Staff Login
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Enter authorized administrator credentials to access the portal.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium text-left">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Admin Email / Username
                  </label>
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-600 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded text-[#064E3B] focus:ring-[#064E3B]"
                    />
                    <span>Remember me on this device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-bold bg-[#064E3B] text-white hover:bg-[#043629] active:scale-95 transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {loggingIn ? 'Authenticating...' : 'Sign In to Admin Portal'}
                </button>
              </form>



            </div>
          </div>
        ) : (
          /* Logged In Dashboard Area */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Admin Nav Tabs */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto shrink-0 py-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#064E3B] text-[#D4A72C]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4" weight="duotone" />
                <span>Overview KPIs</span>
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'leads'
                    ? 'bg-[#064E3B] text-[#D4A72C]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4" weight="duotone" />
                <span>Trial Leads ({leads.length})</span>
                {leads.filter(l => l.status === 'New Lead').length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {leads.filter(l => l.status === 'New Lead').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('enrollments')}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'enrollments'
                    ? 'bg-[#064E3B] text-[#D4A72C]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" weight="duotone" />
                <span>Enrollments ({enrollments.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'students'
                    ? 'bg-[#064E3B] text-[#D4A72C]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <UserCheck className="w-4 h-4" weight="duotone" />
                <span>Students Directory ({students.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('tutors')}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'tutors'
                    ? 'bg-[#064E3B] text-[#D4A72C]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Certificate className="w-4 h-4" weight="duotone" />
                <span>Tutors ({tutors.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'courses'
                    ? 'bg-[#064E3B] text-[#D4A72C]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="w-4 h-4" weight="duotone" />
                <span>Courses ({courses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('blog')}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'blog'
                    ? 'bg-[#064E3B] text-[#D4A72C]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <PenNib className="w-4 h-4" weight="duotone" />
                <span>Blog CMS</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-[#064E3B] text-[#D4A72C]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Bell className="w-4 h-4" weight="duotone" />
                <span>System Logs</span>
              </button>
            </div>

            {/* Main Content Area by Tab */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              
              {/* TAB 1: OVERVIEW KPIS */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* 5 KPI Metric Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
                        <span>Total Trial Leads</span>
                        <Users className="w-4 h-4 text-[#064E3B]" weight="duotone" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stats?.totalLeads ?? leads.length}</p>
                      <span className="text-[11px] text-emerald-600 font-semibold">Registered Inquiries</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm bg-amber-50/40">
                      <div className="flex items-center justify-between text-amber-900 text-xs mb-1">
                        <span>New Trial Requests</span>
                        <ShieldCheck className="w-4 h-4 text-amber-600" weight="duotone" />
                      </div>
                      <p className="text-2xl font-bold text-amber-900">{stats?.newTrialRequests ?? 0}</p>
                      <span className="text-[11px] text-amber-700 font-semibold">Requires WhatsApp Followup</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
                        <span>Active Students</span>
                        <UserCheck className="w-4 h-4 text-[#064E3B]" weight="duotone" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stats?.activeStudents ?? students.length}</p>
                      <span className="text-[11px] text-emerald-600 font-semibold">In Regular 1-on-1 Classes</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
                        <span>Enrollment Apps</span>
                        <FileText className="w-4 h-4 text-[#064E3B]" weight="duotone" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stats?.newEnrollments ?? enrollments.length}</p>
                      <span className="text-[11px] text-gray-500">Pending Review</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
                        <span>Trial Conversion</span>
                        <Certificate className="w-4 h-4 text-[#D4A72C]" weight="duotone" />
                      </div>
                      <p className="text-2xl font-bold text-[#064E3B]">{stats?.conversionRate ?? 67}%</p>
                      <span className="text-[11px] text-emerald-600 font-semibold">Trial to Student Ratio</span>
                    </div>
                  </div>

                  {/* Recent Actions & Quick Links */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Recent Trial Requests */}
                    <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-bold text-base text-gray-900 flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#064E3B]" weight="duotone" />
                          <span>Latest Free Trial Inquiries</span>
                        </h3>
                        <button
                          onClick={() => setActiveTab('leads')}
                          className="text-xs font-semibold text-[#064E3B] hover:underline cursor-pointer"
                        >
                          View All Leads →
                        </button>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {leads.slice(0, 4).map(lead => (
                          <div key={lead.id} className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">{lead.studentName}</span>
                                <span className="text-[11px] text-gray-500 font-normal">({lead.country})</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-0.5">
                                Course: <strong className="text-[#064E3B]">{lead.courseName}</strong> • {lead.timeSlot} • Tutor: {lead.tutorGender}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                lead.status === 'New Lead' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {lead.status}
                              </span>
                              <button
                                onClick={() => openWhatsAppForLead(lead)}
                                className="p-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a] cursor-pointer"
                                title="Open WhatsApp"
                              >
                                <WhatsappLogo className="w-4 h-4" weight="fill" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Shortcuts */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-[#064E3B] text-white p-5 rounded-2xl shadow-sm border border-[#D4A72C]/40 bg-islamic-pattern space-y-3">
                        <span className="text-xs font-bold text-[#D4A72C] uppercase tracking-wider">Quick Actions</span>
                        <h4 className="font-heading font-bold text-base text-white">Academy Hotlines</h4>
                        <p className="text-xs text-emerald-200">
                          Direct WhatsApp links for coordinator communications:
                        </p>
                        <div className="space-y-2 pt-1 text-xs">
                          <a
                            href="https://wa.me/923274496163"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-100"
                          >
                            <span>Primary WhatsApp: <strong>0327-4496163</strong></span>
                            <WhatsappLogo className="w-4 h-4 text-[#25D366]" weight="fill" />
                          </a>
                          <a
                            href="https://wa.me/923360796786"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-100"
                          >
                            <span>Secondary Line: <strong>0336-0796786</strong></span>
                            <PhoneCall className="w-4 h-4 text-[#D4A72C]" weight="duotone" />
                          </a>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-gray-200 text-xs text-gray-600 space-y-2">
                        <div className="flex items-center justify-between font-bold text-gray-800">
                          <span>Available Certified Tutors</span>
                          <span className="text-[#064E3B]">{tutors.filter(t => t.status === 'Available').length} Ready</span>
                        </div>
                        <p className="text-[11px]">
                          Male and Female tutors are ready to take on new students across UK, US, and Asian time slots.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: TRIAL LEADS MANAGEMENT */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  {/* Search and Filters Bar */}
                  <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="relative w-full sm:w-72">
                      <MagnifyingGlass className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search student, phone, country..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#064E3B]"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <span className="text-gray-500 whitespace-nowrap">Filter Status:</span>
                      <select
                        value={leadStatusFilter}
                        onChange={e => setLeadStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:border-[#064E3B] cursor-pointer"
                      >
                        <option value="all">All Statuses</option>
                        <option value="New Lead">New Lead</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Trial Scheduled">Trial Scheduled</option>
                        <option value="Trial Started">Trial Started</option>
                        <option value="Trial Completed">Trial Completed</option>
                        <option value="Converted">Converted</option>
                        <option value="Not Interested">Not Interested</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  {/* Leads Table */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#064E3B]/10 text-[#064E3B] font-bold text-xs uppercase tracking-wider border-b border-gray-200">
                          <tr>
                            <th className="p-3.5">Student / Parent</th>
                            <th className="p-3.5">Course</th>
                            <th className="p-3.5">Tutor & Timing</th>
                            <th className="p-3.5">Country / Contact</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {leads
                            .filter(l => {
                              const matchesSearch =
                                l.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                l.phone.includes(searchTerm) ||
                                l.country.toLowerCase().includes(searchTerm.toLowerCase());
                              const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
                              return matchesSearch && matchesStatus;
                            })
                            .map(lead => (
                              <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="p-3.5">
                                  <div className="font-bold text-gray-900">{lead.studentName}</div>
                                  <div className="text-[11px] text-gray-500">Parent: {lead.parentName}</div>
                                </td>
                                <td className="p-3.5">
                                  <span className="font-semibold text-[#064E3B]">{lead.courseName}</span>
                                </td>
                                <td className="p-3.5">
                                  <div className="text-gray-800">{lead.timeSlot}</div>
                                  <div className="text-[11px] text-gray-500">Pref: {lead.tutorGender}</div>
                                </td>
                                <td className="p-3.5">
                                  <div className="font-semibold text-gray-900">{lead.phone}</div>
                                  <div className="text-[11px] text-gray-500">{lead.country}</div>
                                </td>
                                <td className="p-3.5">
                                  <select
                                    value={lead.status}
                                    onChange={e => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                    className={`px-2 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                                      lead.status === 'New Lead'
                                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                                        : lead.status === 'Converted'
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                        : 'bg-blue-50 text-blue-800 border-blue-200'
                                    }`}
                                  >
                                    <option value="New Lead">New Lead</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Trial Scheduled">Trial Scheduled</option>
                                    <option value="Trial Started">Trial Started</option>
                                    <option value="Trial Completed">Trial Completed</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Not Interested">Not Interested</option>
                                    <option value="Closed">Closed</option>
                                  </select>
                                </td>
                                <td className="p-3.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => setSelectedLead(lead)}
                                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                                      title="View Details & Notes"
                                    >
                                      <Eye className="w-4 h-4" weight="duotone" />
                                    </button>
                                    <button
                                      onClick={() => openWhatsAppForLead(lead)}
                                      className="p-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a] cursor-pointer"
                                      title="WhatsApp Student"
                                    >
                                      <WhatsappLogo className="w-4 h-4" weight="fill" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ENROLLMENTS */}
              {activeTab === 'enrollments' && (
                <div className="space-y-4">
                  <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between gap-3 text-xs">
                    <div className="relative w-full sm:w-72">
                      <MagnifyingGlass className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search student or phone..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#064E3B]"
                      />
                    </div>

                    <select
                      value={enrollmentStatusFilter}
                      onChange={e => setEnrollmentStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white cursor-pointer"
                    >
                      <option value="all">All Applications</option>
                      <option value="New Application">New Application</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Approved">Approved</option>
                      <option value="Tutor Assigned">Tutor Assigned</option>
                      <option value="Active">Active</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#064E3B]/10 text-[#064E3B] font-bold text-xs uppercase tracking-wider border-b border-gray-200">
                          <tr>
                            <th className="p-3.5">Student / Parent</th>
                            <th className="p-3.5">Course</th>
                            <th className="p-3.5">Assigned Tutor</th>
                            <th className="p-3.5">Schedule</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {enrollments
                            .filter(e => {
                              const matchesSearch =
                                e.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                e.phone.includes(searchTerm);
                              const matchesStatus =
                                enrollmentStatusFilter === 'all' || e.status === enrollmentStatusFilter;
                              return matchesSearch && matchesStatus;
                            })
                            .map(enr => (
                              <tr key={enr.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="p-3.5">
                                  <div className="font-bold text-gray-900">{enr.studentName}</div>
                                  <div className="text-[11px] text-gray-500">Phone: {enr.phone}</div>
                                </td>
                                <td className="p-3.5 font-semibold text-[#064E3B]">{enr.courseName}</td>
                                <td className="p-3.5">
                                  {enr.assignedTutorName ? (
                                    <span className="font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                      {enr.assignedTutorName}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400 text-xs italic">Unassigned (Pref: {enr.tutorPreference})</span>
                                  )}
                                </td>
                                <td className="p-3.5">{enr.timeSlot}</td>
                                <td className="p-3.5">
                                  <select
                                    value={enr.status}
                                    onChange={e => updateEnrollment(enr.id, { status: e.target.value as EnrollmentStatus })}
                                    className="px-2 py-1 rounded-lg text-xs font-bold border bg-gray-50 cursor-pointer"
                                  >
                                    <option value="New Application">New Application</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Trial Recommended">Trial Recommended</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Tutor Assigned">Tutor Assigned</option>
                                    <option value="Active">Active</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>
                                </td>
                                <td className="p-3.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => setSelectedEnrollment(enr)}
                                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                                      title="View Details"
                                    >
                                      <Eye className="w-4 h-4" weight="duotone" />
                                    </button>
                                    <button
                                      onClick={() => openWhatsAppForEnrollment(enr)}
                                      className="p-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a] cursor-pointer"
                                      title="WhatsApp"
                                    >
                                      <WhatsappLogo className="w-4 h-4" weight="fill" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: STUDENTS DIRECTORY */}
              {activeTab === 'students' && (
                <div className="space-y-4">
                  <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between gap-3 text-xs">
                    <div className="relative w-full sm:w-72">
                      <MagnifyingGlass className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search student or course..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#064E3B]"
                      />
                    </div>
                    <div className="text-gray-500">
                      Total Active: <strong>{students.filter(s => s.status === 'Active').length}</strong>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#064E3B]/10 text-[#064E3B] font-bold text-xs uppercase tracking-wider border-b border-gray-200">
                          <tr>
                            <th className="p-3.5">Student</th>
                            <th className="p-3.5">Course</th>
                            <th className="p-3.5">Assigned Tutor</th>
                            <th className="p-3.5">Timing & Country</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {students
                            .filter(s => s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || s.courseName.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(stu => (
                              <tr key={stu.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="p-3.5">
                                  <div className="font-bold text-gray-900">{stu.studentName}</div>
                                  <div className="text-[11px] text-gray-500">{stu.phone}</div>
                                </td>
                                <td className="p-3.5 font-semibold text-[#064E3B]">{stu.courseName}</td>
                                <td className="p-3.5">{stu.tutorName || 'Not Assigned'}</td>
                                <td className="p-3.5">
                                  <div>{stu.preferredTime}</div>
                                  <div className="text-[11px] text-gray-500">{stu.country}</div>
                                </td>
                                <td className="p-3.5">
                                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                    {stu.status}
                                  </span>
                                </td>
                                <td className="p-3.5 text-right">
                                  <button
                                    onClick={() => setSelectedStudent(stu)}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                                    title="View Notes & Progress"
                                  >
                                    <Eye className="w-4 h-4" weight="duotone" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: TUTORS */}
              {activeTab === 'tutors' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#064E3B]">Academy Tutors Directory</h3>
                      <p className="text-xs text-gray-600">Manage certified male & female teachers and specializations.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingTutor(null);
                        setTutorForm({
                          name: '',
                          gender: 'Male',
                          specialization: '',
                          qualification: 'Shahadat-ul-Aalamia / Certified Qari',
                          availability: 'Flexible',
                          phone: '+92 327 4496163',
                          email: '',
                          password: '',
                          status: 'Available'
                        });
                        setIsAddingTutor(true);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#064E3B] text-white hover:bg-[#043629] flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#D4A72C]" weight="bold" />
                      <span>Add Tutor</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tutors.map(tutor => (
                      <div key={tutor.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              tutor.gender === 'Female' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {tutor.gender} Teacher
                            </span>
                            <h4 className="font-heading font-bold text-base text-gray-900 mt-1">{tutor.name}</h4>
                          </div>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            tutor.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {tutor.status}
                          </span>
                        </div>

                        <p className="text-xs text-gray-600">{tutor.specialization}</p>

                        <div className="text-xs text-gray-500 pt-1 space-y-1 border-t border-gray-100">
                          <div>🕒 {tutor.availability}</div>
                          <div>📞 {tutor.phone}</div>
                          <div>👥 Active Students: <strong>{tutor.activeStudentsCount}</strong></div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => {
                              setEditingTutor(tutor);
                              setTutorForm({
                                name: tutor.name,
                                gender: tutor.gender,
                                specialization: tutor.specialization,
                                qualification: tutor.qualification || 'Certified Qari / Islamic Scholar',
                                availability: tutor.availability || tutor.availableTimings || 'Flexible',
                                phone: tutor.phone,
                                email: tutor.email || `${tutor.name.toLowerCase().replace(/\s+/g, '')}@alnoorquraan.com`,
                                password: '',
                                status: tutor.status
                              });
                              setIsAddingTutor(true);
                            }}
                            className="text-xs font-semibold text-[#064E3B] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <PencilSimple className="w-3.5 h-3.5" weight="duotone" />
                            <span>Edit Tutor</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: COURSES MANAGEMENT */}
              {activeTab === 'courses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#064E3B]">Course Programs Management</h3>
                      <p className="text-xs text-gray-600">Manage titles, syllabus, duration, and tuition fee displays.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingCourse(null);
                        setCourseForm({
                          name: '',
                          slug: `course-${Date.now()}`,
                          arabicName: '',
                          shortDescription: '',
                          description: '',
                          audience: 'Kids & Beginners',
                          duration: '3 - 6 Months',
                          classesPerWeek: '4 - 5 Days / Week',
                          feePKR: 3500,
                          feeUSD: 35,
                          featured: true,
                          status: 'active',
                          highlights: ['1-on-1 Classes', 'Tajweed Focus']
                        });
                        setIsAddingCourse(true);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#064E3B] text-white hover:bg-[#043629] flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#D4A72C]" weight="bold" />
                      <span>Add Course</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map(course => (
                      <div key={course.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-arabic text-xs text-[#064E3B] font-bold bg-emerald-50 px-2 py-0.5 rounded">
                              {course.arabicName}
                            </span>
                            <h4 className="font-heading font-bold text-base text-gray-900 mt-1">{course.name}</h4>
                          </div>
                          <span className="text-xs font-bold text-[#064E3B] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                            PKR {course.feePKR.toLocaleString()} / ${course.feeUSD}
                          </span>
                        </div>

                        <p className="text-xs text-gray-600">{course.shortDescription}</p>

                        <div className="text-xs text-gray-500 flex items-center gap-4">
                          <span>⏱️ {course.duration}</span>
                          <span>📅 {course.classesPerWeek}</span>
                        </div>

                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[11px] text-gray-400">Audience: {course.audience}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingCourse(course);
                                setCourseForm(course);
                                setIsAddingCourse(true);
                              }}
                              className="text-xs font-semibold text-[#064E3B] hover:underline cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="text-xs text-red-600 hover:underline cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: BLOG CMS */}
              {activeTab === 'blog' && (
                <BlogEditor />
              )}

              {/* TAB 7: NOTIFICATIONS */}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-[#064E3B]">Transactional Event Notifications</h3>
                    <span className="text-xs text-gray-500">Auto-sent email notifications log</span>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                    {notifications.map(notif => (
                      <div key={notif.id} className="p-4 space-y-1 text-xs sm:text-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">{notif.subject}</span>
                          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                            {notif.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{notif.content}</p>
                        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                          <span>Recipient: {notif.recipient}</span>
                          <span>{new Date(notif.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Lead Detail & Private Notes Drawer / Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-6">
              <div className="bg-[#064E3B] text-white p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-white">Lead Details & Private Notes</h3>
                  <p className="text-xs text-emerald-200">ID: {selectedLead.id}</p>
                </div>
                <button onClick={() => setSelectedLead(null)} className="text-emerald-200 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" weight="bold" />
                </button>
              </div>

              <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto text-xs sm:text-sm">
                <div className="bg-gray-50 p-3 rounded-xl space-y-1.5 border border-gray-200">
                  <p><strong>Student:</strong> {selectedLead.studentName}</p>
                  <p><strong>Parent:</strong> {selectedLead.parentName}</p>
                  <p><strong>Course:</strong> {selectedLead.courseName}</p>
                  <p><strong>WhatsApp / Phone:</strong> {selectedLead.phone}</p>
                  <p><strong>Country:</strong> {selectedLead.country}</p>
                  <p><strong>Preferred Timing:</strong> {selectedLead.timeSlot} (Tutor: {selectedLead.tutorGender})</p>
                  <p><strong>Submitted At:</strong> {new Date(selectedLead.createdAt).toLocaleString()}</p>
                </div>

                {/* Status Switcher */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Update Status:</label>
                  <select
                    value={selectedLead.status}
                    onChange={e => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs cursor-pointer"
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Trial Scheduled">Trial Scheduled</option>
                    <option value="Trial Started">Trial Started</option>
                    <option value="Trial Completed">Trial Completed</option>
                    <option value="Converted">Converted (Moves to Active Students)</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Notes log */}
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Private Admin Notes:</h4>
                  <div className="space-y-2">
                    {selectedLead.notes.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No notes added yet.</p>
                    ) : (
                      selectedLead.notes.map(n => (
                        <div key={n.id} className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/80 text-xs">
                          <p className="text-gray-800">{n.text}</p>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            {n.author} • {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Add private note (e.g. Trial scheduled for Monday 5pm)..."
                      value={newNoteText}
                      onChange={e => setNewNoteText(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                    />
                    <button
                      onClick={() => addLeadNote(selectedLead.id)}
                      className="px-3 py-1.5 bg-[#064E3B] text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
                <button
                  onClick={() => openWhatsAppForLead(selectedLead)}
                  className="px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <WhatsappLogo className="w-4 h-4" weight="fill" />
                  <span>Open WhatsApp</span>
                </button>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enrollment Detail Modal */}
        {selectedEnrollment && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-6">
              <div className="bg-[#064E3B] text-white p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-white">Enrollment Application</h3>
                  <p className="text-xs text-emerald-200">ID: {selectedEnrollment.id}</p>
                </div>
                <button onClick={() => setSelectedEnrollment(null)} className="text-emerald-200 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" weight="bold" />
                </button>
              </div>

              <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto text-xs sm:text-sm">
                <div className="bg-gray-50 p-3 rounded-xl space-y-1.5 border border-gray-200">
                  <p><strong>Student:</strong> {selectedEnrollment.studentName}</p>
                  <p><strong>Parent:</strong> {selectedEnrollment.parentName} ({selectedEnrollment.parentPhone})</p>
                  <p><strong>Course:</strong> {selectedEnrollment.courseName}</p>
                  <p><strong>Country:</strong> {selectedEnrollment.country}</p>
                  <p><strong>Timing:</strong> {selectedEnrollment.timeSlot}</p>
                  {selectedEnrollment.additionalNotes && (
                    <p><strong>Applicant Notes:</strong> {selectedEnrollment.additionalNotes}</p>
                  )}
                </div>

                {/* Tutor Assignment */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Assign Tutor:</label>
                  <select
                    value={selectedEnrollment.assignedTutorId || ''}
                    onChange={e => {
                      const tutorId = e.target.value;
                      const tutor = tutors.find(t => t.id === tutorId);
                      updateEnrollment(selectedEnrollment.id, {
                        assignedTutorId: tutorId,
                        assignedTutorName: tutor ? tutor.name : ''
                      });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs cursor-pointer"
                  >
                    <option value="">-- Select Tutor --</option>
                    {tutors.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.gender}) — {t.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Switcher */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Application Status:</label>
                  <select
                    value={selectedEnrollment.status}
                    onChange={e => updateEnrollment(selectedEnrollment.id, { status: e.target.value as EnrollmentStatus })}
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs cursor-pointer"
                  >
                    <option value="New Application">New Application</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Trial Recommended">Trial Recommended</option>
                    <option value="Approved">Approved</option>
                    <option value="Tutor Assigned">Tutor Assigned</option>
                    <option value="Active">Active</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Notes log */}
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Private Notes:</h4>
                  <div className="space-y-1.5">
                    {selectedEnrollment.notes.map(n => (
                      <div key={n.id} className="p-2 rounded-lg bg-amber-50 text-xs border border-amber-200">
                        <p>{n.text}</p>
                        <span className="text-[10px] text-gray-400 block mt-0.5">{n.author}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add note..."
                      value={newNoteText}
                      onChange={e => setNewNoteText(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                    />
                    <button
                      onClick={() => addEnrollmentNote(selectedEnrollment.id)}
                      className="px-3 py-1.5 bg-[#064E3B] text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t flex justify-end">
                <button
                  onClick={() => setSelectedEnrollment(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Student Progress Detail Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-6">
              <div className="bg-[#064E3B] text-white p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-white">{selectedStudent.studentName}</h3>
                  <p className="text-xs text-emerald-200">{selectedStudent.courseName}</p>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="text-emerald-200 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" weight="bold" />
                </button>
              </div>

              <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto text-xs sm:text-sm">
                <div className="bg-gray-50 p-3 rounded-xl space-y-1 border border-gray-200">
                  <p><strong>Parent:</strong> {selectedStudent.parentName}</p>
                  <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                  <p><strong>Country:</strong> {selectedStudent.country}</p>
                  <p><strong>Assigned Tutor:</strong> {selectedStudent.tutorName || 'Not set'}</p>
                  <p><strong>Preferred Time:</strong> {selectedStudent.preferredTime}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Lesson Progress & Logs:</h4>
                  {selectedStudent.notes.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No progress notes yet.</p>
                  ) : (
                    selectedStudent.notes.map(n => (
                      <div key={n.id} className="p-2 rounded-lg bg-emerald-50 text-xs border border-emerald-200">
                        <p>{n.text}</p>
                        <span className="text-[10px] text-gray-400 block mt-0.5">{n.author}</span>
                      </div>
                    ))
                  )}

                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Add lesson progress log (e.g. Completed Lesson 4 with good Tajweed)..."
                      value={newNoteText}
                      onChange={e => setNewNoteText(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                    />
                    <button
                      onClick={() => addStudentNote(selectedStudent.id)}
                      className="px-3 py-1.5 bg-[#064E3B] text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Log
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t flex justify-end">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Tutor Modal */}
        {isAddingTutor && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-6">
              <div className="bg-[#064E3B] text-white p-5 flex items-center justify-between">
                <h3 className="font-heading font-bold text-base text-white">
                  {editingTutor ? 'Edit Tutor Profile' : 'Add New Certified Tutor'}
                </h3>
                <button onClick={() => setIsAddingTutor(false)} className="text-emerald-200 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" weight="bold" />
                </button>
              </div>

              <form onSubmit={handleSaveTutor} className="p-5 space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tutor Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Qari Muhammad Abdullah"
                    value={tutorForm.name}
                    onChange={e => setTutorForm({ ...tutorForm, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Gender</label>
                    <select
                      value={tutorForm.gender}
                      onChange={e => setTutorForm({ ...tutorForm, gender: e.target.value as 'Male' | 'Female' })}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                    <select
                      value={tutorForm.status}
                      onChange={e => setTutorForm({ ...tutorForm, status: e.target.value as TutorStatus })}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs cursor-pointer"
                    >
                      <option value="Available">Available</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Unavailable">Unavailable</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tajweed Specialist, Hifz Coach, Noorani Qaida"
                    value={tutorForm.specialization}
                    onChange={e => setTutorForm({ ...tutorForm, specialization: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Availability Slots</label>
                  <input
                    type="text"
                    placeholder="e.g. Morning & Evening (PKT/EST)"
                    value={tutorForm.availability}
                    onChange={e => setTutorForm({ ...tutorForm, availability: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Official Login Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="tutor@alnoorquraan.com"
                      value={tutorForm.email}
                      onChange={e => setTutorForm({ ...tutorForm, email: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Teacher Account Password *</label>
                    <input
                      type="text"
                      required
                      placeholder="Set a secure password"
                      value={tutorForm.password || ''}
                      onChange={e => setTutorForm({ ...tutorForm, password: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+92 327 4496163"
                    value={tutorForm.phone}
                    onChange={e => setTutorForm({ ...tutorForm, phone: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingTutor(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#064E3B] text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Save Tutor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add/Edit Course Modal */}
        {isAddingCourse && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-6">
              <div className="bg-[#064E3B] text-white p-5 flex items-center justify-between">
                <h3 className="font-heading font-bold text-base text-white">
                  {editingCourse ? 'Edit Course Program' : 'Add Course Program'}
                </h3>
                <button onClick={() => setIsAddingCourse(false)} className="text-emerald-200 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" weight="bold" />
                </button>
              </div>

              <form onSubmit={handleSaveCourse} className="p-5 space-y-3 text-xs sm:text-sm max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Course Name</label>
                  <input
                    type="text"
                    required
                    value={courseForm.name}
                    onChange={e => setCourseForm({ ...courseForm, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Arabic Title</label>
                  <input
                    type="text"
                    value={courseForm.arabicName || ''}
                    onChange={e => setCourseForm({ ...courseForm, arabicName: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={courseForm.shortDescription}
                    onChange={e => setCourseForm({ ...courseForm, shortDescription: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Monthly Fee (PKR)</label>
                    <input
                      type="number"
                      value={courseForm.feePKR}
                      onChange={e => setCourseForm({ ...courseForm, feePKR: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Monthly Fee (USD)</label>
                    <input
                      type="number"
                      value={courseForm.feeUSD}
                      onChange={e => setCourseForm({ ...courseForm, feeUSD: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={courseForm.duration}
                      onChange={e => setCourseForm({ ...courseForm, duration: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Classes / Week</label>
                    <input
                      type="text"
                      value={courseForm.classesPerWeek}
                      onChange={e => setCourseForm({ ...courseForm, classesPerWeek: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingCourse(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#064E3B] text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Save Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
