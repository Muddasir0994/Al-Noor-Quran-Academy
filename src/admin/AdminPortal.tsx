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
  PenNib,
  Crop,
  UploadSimple,
  User
} from '@phosphor-icons/react';
import { BlogEditor } from './BlogEditor';
import { ImageCropModal } from '../components/ImageCropModal';

interface AdminPortalProps {
  isOpen?: boolean;
  onClose?: () => void;
  courses?: Course[];
  onRefreshCourses?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen = true,
  onClose,
  courses = [],
  onRefreshCourses = () => {}
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
  const [adminCourses, setAdminCourses] = useState<Course[]>(courses || []);
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

  // Image Cropper State for Tutor Photos
  const [isTutorCropOpen, setIsTutorCropOpen] = useState(false);
  const [rawTutorImage, setRawTutorImage] = useState<string>('');

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
    photoUrl?: string;
    bio?: string;
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
    photoUrl: '',
    bio: '',
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

  // Sync courses prop with local adminCourses
  useEffect(() => {
    if (courses && courses.length > 0) {
      setAdminCourses(courses);
    }
  }, [courses]);

  // Fetch admin data on token change
  useEffect(() => {
    if (token && isOpen) {
      fetchAdminData();
    }
  }, [token, isOpen]);

  // Auto-logout after 30 minutes of inactivity
  useEffect(() => {
    if (!token) return;

    let timeoutId: NodeJS.Timeout;
    const INACTIVITY_LIMIT_MS = 30 * 60 * 1000;

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

      const [statsRes, leadsRes, enrRes, stuRes, tutRes, coursesRes, notifRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/leads', { headers }),
        fetch('/api/admin/enrollments', { headers }),
        fetch('/api/admin/students', { headers }),
        fetch('/api/admin/tutors', { headers }),
        fetch('/api/admin/courses', { headers }),
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
      const coursesData = await coursesRes.json();
      const notifData = await notifRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (leadsData.success) setLeads(leadsData.leads);
      if (enrData.success) setEnrollments(enrData.enrollments);
      if (stuData.success) setStudents(stuData.students);
      if (tutData.success) setTutors(tutData.tutors);
      if (coursesData.success && coursesData.courses?.length > 0) setAdminCourses(coursesData.courses);
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
    } catch (e) {}
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

  // Tutor Photo File Selection
  const handleTutorPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setRawTutorImage(reader.result as string);
      setIsTutorCropOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Tutor Save
  const handleSaveTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTutor) {
        const res = await fetch(`/api/admin/tutors/${editingTutor.id}`, {
          method: 'PATCH',
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
            studentsCapacity: 15,
            activeStudentsCount: 0,
            phone: tutorForm.phone,
            email: tutorForm.email,
            photoUrl: tutorForm.photoUrl,
            bio: tutorForm.bio,
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

  // Course Save (Fixed & Synchronized)
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.name) return;

    try {
      if (editingCourse) {
        const updatedCourse = { ...editingCourse, ...courseForm } as Course;
        setAdminCourses(prev => prev.map(c => c.id === editingCourse.id ? updatedCourse : c));

        await fetch(`/api/admin/courses/${editingCourse.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(courseForm)
        });
      } else {
        const newCourse: Course = {
          id: `c-${Date.now()}`,
          name: courseForm.name || 'New Course',
          slug: courseForm.slug || `course-${Date.now()}`,
          arabicName: courseForm.arabicName || '',
          category: (courseForm.category as any) || 'kids',
          shortDescription: courseForm.shortDescription || '',
          description: courseForm.description || courseForm.shortDescription || '',
          audience: courseForm.audience || 'Kids & Adults',
          duration: courseForm.duration || '3 - 6 Months',
          classesPerWeek: courseForm.classesPerWeek || '4 - 5 Days / Week',
          feePKR: courseForm.feePKR || 3500,
          feeUSD: courseForm.feeUSD || 35,
          featured: courseForm.featured ?? true,
          status: 'active',
          highlights: courseForm.highlights || ['1-on-1 Personalized Classes']
        };

        setAdminCourses(prev => [...prev, newCourse]);

        await fetch('/api/admin/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(courseForm)
        });
      }

      onRefreshCourses();
      setIsAddingCourse(false);
      setEditingCourse(null);
    } catch (err) {
      console.error('Course save error:', err);
    }
  };

  const handleDeleteCourse = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    setAdminCourses(prev => prev.filter(c => c.id !== id));
    try {
      await fetch(`/api/admin/courses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {}
    onRefreshCourses();
  };

  const openWhatsAppForLead = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/[^0-9+]/g, '').replace('+', '');
    const msg = encodeURIComponent(`Assalam-o-Alaikum ${lead.parentName || lead.studentName}! This is Noor E Quran Institute regarding your free trial inquiry for ${lead.courseName}.`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  if (isOpen === false) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-7xl h-[92vh] bg-[#FCFBF8] border border-[#E8E0D1] rounded-sm shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Editorial Navigation Bar */}
        <header className="px-6 py-4 bg-[#0B332D] text-[#F8F5EE] border-b border-[#B79A62]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#07221E] border border-[#B79A62]/40 flex items-center justify-center text-[#B79A62]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B79A62]">
                ACADEMY ADMINISTRATION
              </p>
              <h1 className="font-editorial text-xl text-[#F8F5EE] font-semibold">
                Noor E Quran Command Studio
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 border border-[#B79A62]/40 text-[#E8E0D1] hover:text-white hover:border-[#B79A62] text-xs font-sans font-semibold rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <SignOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-[#E8E0D1]/70 hover:text-white transition-colors cursor-pointer"
              title="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Container */}
        {!token ? (
          /* ADMIN LOGIN SCREEN */
          <div className="flex-1 flex items-center justify-center p-6 bg-[#F8F5EE]">
            <div className="w-full max-w-md bg-[#FCFBF8] border border-[#E8E0D1] p-8 rounded-sm shadow-lg space-y-6">
              <div className="text-center space-y-1.5">
                <div className="w-12 h-12 bg-[#0B332D] text-[#B79A62] rounded-sm mx-auto flex items-center justify-center mb-3 border border-[#B79A62]/40">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="font-editorial text-3xl text-[#0B332D] font-bold">Admin Authorization</h2>
                <p className="text-xs text-gray-500 font-sans">
                  Sign in with verified institutional credentials to access student admissions, faculty records, and curriculum settings.
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-sans rounded-sm">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-sans font-bold text-gray-700 mb-1">Administrator Email</label>
                  <input
                    type="email"
                    required
                    placeholder="admin@alnoorquranacademy.com"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#E8E0D1] rounded-sm text-xs font-sans bg-[#F8F5EE] focus:outline-none focus:border-[#0B332D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold text-gray-700 mb-1">Admin Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#E8E0D1] rounded-sm text-xs font-sans bg-[#F8F5EE] focus:outline-none focus:border-[#0B332D]"
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-sans text-gray-600">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded-xs text-[#0B332D]"
                    />
                    <span>Stay signed in for 30 days</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full py-3 bg-[#0B332D] text-[#F8F5EE] text-xs font-sans font-semibold uppercase tracking-wider rounded-sm hover:bg-[#07221E] transition-all cursor-pointer shadow-xs"
                >
                  {loggingIn ? 'Verifying...' : 'Authenticate as Administrator'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex overflow-hidden">
            
            {/* Sidebar Navigation */}
            <aside className="w-56 bg-[#F8F5EE] border-r border-[#E8E0D1] p-4 flex flex-col justify-between shrink-0">
              <div className="space-y-1.5">
                {[
                  { id: 'overview', label: 'Overview & Stats', icon: ShieldCheck },
                  { id: 'leads', label: 'Trial Leads', icon: Users, badge: leads.filter(l => l.status === 'New Lead').length },
                  { id: 'enrollments', label: 'Enrollments', icon: UserCheck, badge: enrollments.filter(e => e.status === 'New Application').length },
                  { id: 'students', label: 'Students Directory', icon: GraduationCap },
                  { id: 'tutors', label: 'Tutors & Faculty', icon: Certificate },
                  { id: 'courses', label: 'Course Programs', icon: BookOpen },
                  { id: 'blog', label: 'Blog & Articles', icon: PenNib }
                ].map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-sans rounded-sm transition-all cursor-pointer ${
                        active
                          ? 'bg-[#0B332D] text-[#F8F5EE] font-bold shadow-xs'
                          : 'text-gray-700 hover:bg-[#E8E0D1]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${active ? 'text-[#B79A62]' : 'text-gray-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && item.badge > 0 ? (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-xs bg-[#B79A62] text-[#07221E]">
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#E8E0D1] text-[11px] font-sans text-gray-500 space-y-1">
                <p>Status: <strong className="text-emerald-700">Authenticated</strong></p>
                <p>Live Tutors: <strong>{tutors.length}</strong></p>
                <p>Active Courses: <strong>{adminCourses.length}</strong></p>
              </div>
            </aside>

            {/* Main Studio Viewport */}
            <main className="flex-1 overflow-y-auto p-6 bg-[#FCFBF8]">
              
              {/* TAB 1: OVERVIEW & STATS */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#0B332D] font-bold">Executive Overview</h3>
                    <p className="text-xs text-gray-500 font-sans">Real-time performance indicators and academic lead conversions.</p>
                  </div>

                  {stats && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: 'Total Inquiries / Leads', value: stats.totalLeads, color: 'text-[#0B332D]' },
                        { label: 'New Trial Requests', value: stats.newTrialRequests, color: 'text-[#B79A62]' },
                        { label: 'Active Students', value: stats.activeStudents, color: 'text-emerald-700' },
                        { label: 'Conversion Rate', value: `${stats.conversionRate}%`, color: 'text-[#0B332D]' }
                      ].map((card, idx) => (
                        <div key={idx} className="p-5 bg-[#F8F5EE] border border-[#E8E0D1] rounded-sm space-y-1">
                          <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-gray-500">{card.label}</p>
                          <p className={`font-editorial text-3xl font-bold ${card.color}`}>{card.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick Shortcuts */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="p-5 bg-[#F8F5EE] border border-[#E8E0D1] rounded-sm text-left hover:border-[#B79A62] transition-colors cursor-pointer space-y-1"
                    >
                      <h4 className="font-editorial text-xl text-[#0B332D] font-bold">Review Trial Inquiries ({leads.length})</h4>
                      <p className="text-xs text-gray-600 font-sans">Contact parents, schedule 1-on-1 trial slots, and assign teachers.</p>
                    </button>

                    <button
                      onClick={() => setActiveTab('courses')}
                      className="p-5 bg-[#F8F5EE] border border-[#E8E0D1] rounded-sm text-left hover:border-[#B79A62] transition-colors cursor-pointer space-y-1"
                    >
                      <h4 className="font-editorial text-xl text-[#0B332D] font-bold">Manage Courses ({adminCourses.length})</h4>
                      <p className="text-xs text-gray-600 font-sans">Update fees, duration, syllabus structure, and titles.</p>
                    </button>

                    <button
                      onClick={() => setActiveTab('blog')}
                      className="p-5 bg-[#F8F5EE] border border-[#E8E0D1] rounded-sm text-left hover:border-[#B79A62] transition-colors cursor-pointer space-y-1"
                    >
                      <h4 className="font-editorial text-xl text-[#0B332D] font-bold">Write Articles &amp; Guides</h4>
                      <p className="text-xs text-gray-600 font-sans">Create SEO guides with interactive image cropping and framing.</p>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: TRIAL LEADS */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F8F5EE] p-4 rounded-sm border border-[#E8E0D1]">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#0B332D] font-bold">Trial Inquiries &amp; Leads</h3>
                      <p className="text-xs text-gray-500 font-sans">Track incoming applications and coordinate trials via WhatsApp.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={leadStatusFilter}
                        onChange={e => setLeadStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-[#E8E0D1] bg-[#FCFBF8] rounded-sm text-xs font-sans text-gray-700 cursor-pointer"
                      >
                        <option value="all">All Statuses</option>
                        <option value="New Lead">New Leads</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Trial Scheduled">Trial Scheduled</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-[#FCFBF8] rounded-sm border border-[#E8E0D1] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-[#F8F5EE] text-[#0B332D] font-bold uppercase tracking-wider border-b border-[#E8E0D1] text-[10px]">
                          <tr>
                            <th className="p-3.5">Student / Parent</th>
                            <th className="p-3.5">Course</th>
                            <th className="p-3.5">Slot &amp; Country</th>
                            <th className="p-3.5">Tutor Pref</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E0D1]/60">
                          {leads
                            .filter(l => leadStatusFilter === 'all' || l.status === leadStatusFilter)
                            .map(lead => (
                              <tr key={lead.id} className="hover:bg-[#F8F5EE]/50 transition-colors">
                                <td className="p-3.5">
                                  <div className="font-bold text-[#0B332D]">{lead.studentName}</div>
                                  <div className="text-[10px] text-gray-500">{lead.parentName ? `Parent: ${lead.parentName}` : lead.phone}</div>
                                </td>
                                <td className="p-3.5 font-semibold text-[#0B332D]">{lead.courseName}</td>
                                <td className="p-3.5">
                                  <div>{lead.timeSlot}</div>
                                  <div className="text-[10px] text-gray-500">{lead.country}</div>
                                </td>
                                <td className="p-3.5 text-gray-600">{lead.tutorGender}</td>
                                <td className="p-3.5">
                                  <select
                                    value={lead.status}
                                    onChange={e => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                    className="px-2 py-1 text-xs border border-[#E8E0D1] rounded-sm bg-[#F8F5EE] text-[#0B332D] font-bold cursor-pointer"
                                  >
                                    <option value="New Lead">New Lead</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Trial Scheduled">Trial Scheduled</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Not Interested">Not Interested</option>
                                    <option value="Closed">Closed</option>
                                  </select>
                                </td>
                                <td className="p-3.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => openWhatsAppForLead(lead)}
                                      className="px-2.5 py-1 bg-[#25D366] text-white rounded-sm text-xs font-bold flex items-center gap-1 cursor-pointer"
                                      title="WhatsApp"
                                    >
                                      <WhatsappLogo className="w-3.5 h-3.5" weight="fill" />
                                      <span>Chat</span>
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
                  <div className="bg-[#F8F5EE] p-4 rounded-sm border border-[#E8E0D1]">
                    <h3 className="font-editorial text-2xl text-[#0B332D] font-bold">Official Student Enrollments</h3>
                    <p className="text-xs text-gray-500 font-sans">Formal registration applications and tutor assignments.</p>
                  </div>

                  <div className="bg-[#FCFBF8] rounded-sm border border-[#E8E0D1] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-[#F8F5EE] text-[#0B332D] font-bold uppercase tracking-wider border-b border-[#E8E0D1] text-[10px]">
                          <tr>
                            <th className="p-3.5">Student</th>
                            <th className="p-3.5">Course</th>
                            <th className="p-3.5">Assigned Tutor</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E0D1]/60">
                          {enrollments.map(enr => (
                            <tr key={enr.id} className="hover:bg-[#F8F5EE]/50 transition-colors">
                              <td className="p-3.5">
                                <div className="font-bold text-[#0B332D]">{enr.studentName}</div>
                                <div className="text-[10px] text-gray-500">{enr.phone}</div>
                              </td>
                              <td className="p-3.5 font-semibold text-[#0B332D]">{enr.courseName}</td>
                              <td className="p-3.5 text-gray-700">
                                {enr.assignedTutorName || (
                                  <span className="text-gray-400 italic">Unassigned (Pref: {enr.tutorPreference})</span>
                                )}
                              </td>
                              <td className="p-3.5">
                                <span className="px-2 py-0.5 text-[10px] font-bold rounded-xs bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  {enr.status}
                                </span>
                              </td>
                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => setSelectedEnrollment(enr)}
                                  className="p-1.5 text-gray-700 hover:text-[#0B332D] cursor-pointer"
                                  title="View Application"
                                >
                                  <Eye className="w-4 h-4" />
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

              {/* TAB 4: STUDENTS DIRECTORY */}
              {activeTab === 'students' && (
                <div className="space-y-4">
                  <div className="bg-[#F8F5EE] p-4 rounded-sm border border-[#E8E0D1]">
                    <h3 className="font-editorial text-2xl text-[#0B332D] font-bold">Active Students Directory</h3>
                    <p className="text-xs text-gray-500 font-sans">Review active Quran learners, schedules, and progress logs.</p>
                  </div>

                  <div className="bg-[#FCFBF8] rounded-sm border border-[#E8E0D1] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-[#F8F5EE] text-[#0B332D] font-bold uppercase tracking-wider border-b border-[#E8E0D1] text-[10px]">
                          <tr>
                            <th className="p-3.5">Student</th>
                            <th className="p-3.5">Course</th>
                            <th className="p-3.5">Assigned Tutor</th>
                            <th className="p-3.5">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E0D1]/60">
                          {students.map(stu => (
                            <tr key={stu.id} className="hover:bg-[#F8F5EE]/50 transition-colors">
                              <td className="p-3.5 font-bold text-[#0B332D]">{stu.studentName}</td>
                              <td className="p-3.5 text-gray-700">{stu.courseName}</td>
                              <td className="p-3.5 text-gray-700">{stu.tutorName || 'Not Assigned'}</td>
                              <td className="p-3.5">
                                <span className="px-2 py-0.5 text-[10px] font-bold rounded-xs bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  {stu.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: TUTORS & FACULTY WITH PHOTO CROP */}
              {activeTab === 'tutors' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F8F5EE] p-4 rounded-sm border border-[#E8E0D1]">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#0B332D] font-bold">Faculty &amp; Tutors Directory</h3>
                      <p className="text-xs text-gray-500 font-sans">Manage certified male and female scholars, credentials, and pictures.</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingTutor(null);
                        setTutorForm({
                          name: '',
                          gender: 'Male',
                          specialization: '',
                          qualification: 'Shahadat-ul-Aalamia / Certified Qari',
                          availability: 'Flexible (Morning / Evening)',
                          phone: '+92 327 4496163',
                          email: '',
                          password: '',
                          photoUrl: '',
                          bio: '',
                          status: 'Available'
                        });
                        setIsAddingTutor(true);
                      }}
                      className="px-4 py-2 bg-[#0B332D] text-[#F8F5EE] text-xs font-sans font-semibold uppercase tracking-wider rounded-sm hover:bg-[#07221E] flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#B79A62]" weight="bold" />
                      <span>Add Faculty Member</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutors.map(tutor => (
                      <div key={tutor.id} className="p-5 bg-[#F8F5EE] border border-[#E8E0D1] rounded-sm space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-sm overflow-hidden border border-[#E8E0D1] bg-[#FCFBF8] shrink-0">
                            {tutor.photoUrl ? (
                              <img src={tutor.photoUrl} alt={tutor.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <User className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#B79A62]">
                              {tutor.gender} Teacher
                            </span>
                            <h4 className="font-editorial text-xl text-[#0B332D] font-bold">{tutor.name}</h4>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 font-sans">{tutor.specialization}</p>

                        <div className="pt-2 border-t border-[#E8E0D1] text-[11px] font-sans text-gray-500 space-y-1">
                          <p>Availability: <strong>{tutor.availability || tutor.availableTimings}</strong></p>
                          <p>Contact: <strong>{tutor.phone}</strong></p>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => {
                              setEditingTutor(tutor);
                              setTutorForm({
                                name: tutor.name,
                                gender: tutor.gender,
                                specialization: tutor.specialization,
                                qualification: tutor.qualification,
                                availability: tutor.availability || tutor.availableTimings || 'Flexible',
                                phone: tutor.phone,
                                email: tutor.email,
                                password: '',
                                photoUrl: tutor.photoUrl || '',
                                bio: tutor.bio || '',
                                status: tutor.status
                              });
                              setIsAddingTutor(true);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-[#0B332D] hover:text-[#B79A62] cursor-pointer"
                          >
                            <PencilSimple className="w-3.5 h-3.5" />
                            <span>Edit Profile &amp; Picture</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: COURSES MANAGEMENT (FIXED & FULLY FUNCTIONAL) */}
              {activeTab === 'courses' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F8F5EE] p-4 rounded-sm border border-[#E8E0D1]">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#0B332D] font-bold">Course Programs Management</h3>
                      <p className="text-xs text-gray-500 font-sans">Manage curricula, syllabus milestones, tuition fees, and descriptions.</p>
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
                          highlights: ['1-on-1 Attention', 'Tajweed Focus']
                        });
                        setIsAddingCourse(true);
                      }}
                      className="px-4 py-2 bg-[#0B332D] text-[#F8F5EE] text-xs font-sans font-semibold uppercase tracking-wider rounded-sm hover:bg-[#07221E] flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#B79A62]" weight="bold" />
                      <span>Add Course</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adminCourses.map(course => (
                      <div key={course.id} className="p-6 bg-[#F8F5EE] border border-[#E8E0D1] rounded-sm space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            {course.arabicName && (
                              <p className="font-arabic text-xs text-gray-500 mb-0.5">{course.arabicName}</p>
                            )}
                            <h4 className="font-editorial text-2xl text-[#0B332D] font-bold">{course.name}</h4>
                          </div>
                          <span className="text-xs font-sans font-bold text-[#0B332D] bg-[#FCFBF8] px-2.5 py-1 rounded-sm border border-[#E8E0D1]">
                            PKR {course.feePKR?.toLocaleString()} / ${course.feeUSD}
                          </span>
                        </div>

                        <p className="text-xs text-gray-600 font-sans leading-relaxed">{course.shortDescription}</p>

                        <div className="text-xs font-sans text-gray-500 pt-2 border-t border-[#E8E0D1] flex items-center gap-4">
                          <span>⏱️ {course.duration}</span>
                          <span>📅 {course.classesPerWeek}</span>
                        </div>

                        <div className="pt-2 flex items-center justify-end gap-3">
                          <button
                            onClick={() => {
                              setEditingCourse(course);
                              setCourseForm({
                                name: course.name,
                                slug: course.slug,
                                arabicName: course.arabicName || '',
                                shortDescription: course.shortDescription,
                                description: course.description,
                                audience: course.audience,
                                duration: course.duration,
                                classesPerWeek: course.classesPerWeek,
                                feePKR: course.feePKR,
                                feeUSD: course.feeUSD,
                                featured: course.featured
                              });
                              setIsAddingCourse(true);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-[#0B332D] hover:text-[#B79A62] cursor-pointer"
                          >
                            <PencilSimple className="w-3.5 h-3.5" />
                            <span>Edit Course</span>
                          </button>

                          <button
                            onClick={() => handleDeleteCourse(course.id, course.name)}
                            className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-red-600 hover:text-red-800 cursor-pointer"
                          >
                            <Trash className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: BLOG & ESSAYS */}
              {activeTab === 'blog' && (
                <BlogEditor />
              )}

            </main>
          </div>
        )}

        {/* Add/Edit Tutor Modal with Photo Upload & Cropping */}
        {isAddingTutor && (
          <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#FCFBF8] border border-[#E8E0D1] rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 bg-[#0B332D] text-[#F8F5EE] flex items-center justify-between border-b border-[#B79A62]/30">
                <h3 className="font-editorial text-xl font-semibold">
                  {editingTutor ? 'Edit Faculty Profile' : 'Add New Faculty Member'}
                </h3>
                <button onClick={() => setIsAddingTutor(false)} className="text-gray-300 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveTutor} className="p-6 space-y-4 overflow-y-auto text-xs font-sans">
                {/* Photo Upload & Preview Card */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">Tutor Portrait Picture</label>
                  <div className="flex items-center gap-4 p-3 bg-[#F8F5EE] border border-[#E8E0D1] rounded-sm">
                    <div className="w-16 h-16 rounded-sm overflow-hidden border border-[#E8E0D1] bg-[#FCFBF8] shrink-0">
                      {tutorForm.photoUrl ? (
                        <img src={tutorForm.photoUrl} alt="Tutor preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <User className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B332D] text-[#F8F5EE] text-xs font-semibold rounded-sm hover:bg-[#07221E] cursor-pointer">
                        <UploadSimple className="w-3.5 h-3.5 text-[#B79A62]" />
                        <span>Upload &amp; Frame Picture</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleTutorPhotoSelect}
                          className="hidden"
                        />
                      </label>
                      {tutorForm.photoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setRawTutorImage(tutorForm.photoUrl || '');
                            setIsTutorCropOpen(true);
                          }}
                          className="block text-[11px] font-semibold text-[#0B332D] hover:underline cursor-pointer"
                        >
                          Re-crop / Re-frame Picture
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Qari Muhammad Bilal"
                    value={tutorForm.name}
                    onChange={e => setTutorForm({ ...tutorForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Gender</label>
                    <select
                      value={tutorForm.gender}
                      onChange={e => setTutorForm({ ...tutorForm, gender: e.target.value as any })}
                      className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                    >
                      <option value="Male">Male Scholar</option>
                      <option value="Female">Female Scholar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Status</label>
                    <select
                      value={tutorForm.status}
                      onChange={e => setTutorForm({ ...tutorForm, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                    >
                      <option value="Available">Available</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tajweed Mastery, Hifz, Noorani Qaida"
                    value={tutorForm.specialization}
                    onChange={e => setTutorForm({ ...tutorForm, specialization: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    placeholder="Shahadat-ul-Aalamia / Certified Qari"
                    value={tutorForm.qualification}
                    onChange={e => setTutorForm({ ...tutorForm, qualification: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="tutor@noorequran.com"
                      value={tutorForm.email}
                      onChange={e => setTutorForm({ ...tutorForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+92 327 4496163"
                      value={tutorForm.phone}
                      onChange={e => setTutorForm({ ...tutorForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E0D1] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingTutor(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0B332D] text-[#F8F5EE] font-semibold uppercase tracking-wider rounded-sm hover:bg-[#07221E] cursor-pointer"
                  >
                    Save Faculty Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add/Edit Course Modal */}
        {isAddingCourse && (
          <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#FCFBF8] border border-[#E8E0D1] rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 bg-[#0B332D] text-[#F8F5EE] flex items-center justify-between border-b border-[#B79A62]/30">
                <h3 className="font-editorial text-xl font-semibold">
                  {editingCourse ? 'Edit Course Program' : 'Add Course Program'}
                </h3>
                <button onClick={() => setIsAddingCourse(false)} className="text-gray-300 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCourse} className="p-6 space-y-4 overflow-y-auto text-xs font-sans">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Course Name *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.name || ''}
                    onChange={e => setCourseForm({ ...courseForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Arabic Title</label>
                  <input
                    type="text"
                    placeholder="القاعدة النورانية"
                    value={courseForm.arabicName || ''}
                    onChange={e => setCourseForm({ ...courseForm, arabicName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm font-arabic focus:outline-none focus:border-[#0B332D]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={courseForm.shortDescription || ''}
                    onChange={e => setCourseForm({ ...courseForm, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Monthly Fee (PKR)</label>
                    <input
                      type="number"
                      value={courseForm.feePKR || 3500}
                      onChange={e => setCourseForm({ ...courseForm, feePKR: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Monthly Fee (USD)</label>
                    <input
                      type="number"
                      value={courseForm.feeUSD || 35}
                      onChange={e => setCourseForm({ ...courseForm, feeUSD: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={courseForm.duration || '3 - 6 Months'}
                      onChange={e => setCourseForm({ ...courseForm, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Classes / Week</label>
                    <input
                      type="text"
                      value={courseForm.classesPerWeek || '4 - 5 Days / Week'}
                      onChange={e => setCourseForm({ ...courseForm, classesPerWeek: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E8E0D1] bg-[#F8F5EE] rounded-sm focus:outline-none focus:border-[#0B332D]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E0D1] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingCourse(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0B332D] text-[#F8F5EE] font-semibold uppercase tracking-wider rounded-sm hover:bg-[#07221E] cursor-pointer"
                  >
                    Save Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tutor Image Cropper Modal */}
        <ImageCropModal
          isOpen={isTutorCropOpen}
          imageSrc={rawTutorImage}
          title="Frame Faculty Portrait Picture"
          initialAspectRatio="1:1"
          onClose={() => setIsTutorCropOpen(false)}
          onCropComplete={(cropped) => {
            setTutorForm(prev => ({ ...prev, photoUrl: cropped }));
          }}
        />

      </div>
    </div>
  );
};
