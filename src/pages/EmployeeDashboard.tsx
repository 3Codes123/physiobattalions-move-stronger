import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, LogOut, Calendar, Clock, User, Phone, Mail, FileText, X, Plus, Edit, Trash2, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BaseEmployee {
  id: string;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  photos: string[];
  serviceSince: string;
}

interface PhysiotherapistEmployee extends BaseEmployee {
  service: 'Physiotherapy';
  qualification: string;
  yearsOfExperience: string;
  workedAt: string;
}

interface FitnessEmployee extends BaseEmployee {
  service: 'Fitness';
  fitnessClubName: string;
  trainerName: string;
  achievements: string;
  mandatoryAgeGroup: string;
}

interface SportsEmployee extends BaseEmployee {
  service: 'Sports';
  trainerCoachName: string;
  achievements: string;
  mandatoryAgeGroup: string;
  specialFeatures: string;
}

type Employee = PhysiotherapistEmployee | FitnessEmployee | SportsEmployee;

interface Booking {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message?: string;
  attachment?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export default function EmployeeDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings');
  // Create a type for the form state that includes all possible fields
  type EmployeeFormState = {
    name: string;
    surname: string;
    service: '' | 'Physiotherapy' | 'Fitness' | 'Sports';
    address: string;
    phone: string;
    email: string;
    photos: string[];
    serviceSince: string;
    // Physiotherapy specific
    qualification: string;
    yearsOfExperience: string;
    workedAt: string;
    // Fitness specific
    fitnessClubName: string;
    trainerName: string;
    achievements: string;
    mandatoryAgeGroup: string;
    // Sports specific
    trainerCoachName: string;
    specialFeatures: string;
  };

  const [employeeForm, setEmployeeForm] = useState<EmployeeFormState>({
    name: '',
    surname: '',
    service: '',
    address: '',
    phone: '',
    email: '',
    photos: [],
    serviceSince: new Date().getFullYear().toString(),
    // Physiotherapy specific
    qualification: '',
    yearsOfExperience: '',
    workedAt: '',
    // Fitness specific
    fitnessClubName: '',
    trainerName: '',
    achievements: '',
    mandatoryAgeGroup: '',
    // Sports specific
    trainerCoachName: '',
    specialFeatures: ''
  });
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  const getInputClassName = (fieldName: string) => {
    const baseClasses = 'w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1';
    const errorClasses = 'border-red-500 focus:ring-red-500 ring-1 ring-red-500';
    const normalClasses = 'border-gray-300 focus:ring-primary-500';
    
    return `${baseClasses} ${(isFormSubmitted && formErrors[fieldName]) ? errorClasses : normalClasses}`;
  };

  const getSelectClassName = (fieldName: string) => {
    const baseClasses = 'w-full';
    const errorClasses = 'border-red-500 ring-1 ring-red-500';
    
    return `${baseClasses} ${(isFormSubmitted && formErrors[fieldName]) ? errorClasses : ''}`;
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isEmployeeLoggedIn');
    if (!isLoggedIn) {
      navigate('/employee-login');
      return;
    }

    // Simulate loading bookings
    const loadData = () => {
      // In a real app, you would fetch this from your backend
      const mockBookings: Booking[] = [
        {
          id: '1',
          name: 'John',
          surname: 'Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          date: '2024-03-15',
          time: '10:00 AM',
          service: 'Physiotherapy',
          message: 'Neck pain treatment needed',
          status: 'Confirmed'
        },
        {
          id: '2',
          name: 'Jane',
          surname: 'Smith',
          email: 'jane.smith@example.com',
          phone: '0987654321',
          date: '2024-03-16',
          time: '02:30 PM',
          service: 'Sports Massage',
          message: 'Post-marathon recovery',
          attachment: 'medical_report.pdf',
          status: 'Pending'
        },
        {
          id: '3',
          name: 'Robert',
          surname: 'Johnson',
          email: 'robert.j@example.com',
          phone: '5551234567',
          date: '2024-03-17',
          time: '11:15 AM',
          service: 'Rehabilitation',
          message: 'Knee surgery recovery',
          status: 'Completed'
        }
      ];
      
      const mockEmployees: Employee[] = [
        {
          id: 'e1',
          name: 'Sarah',
          surname: 'Williams',
          service: 'Physiotherapy',
          address: '123 Main St, Pune',
          phone: '9876543210',
          email: 'sarah.w@example.com',
          photos: [],
          serviceSince: '2015',
          qualification: 'MPT (Orthopedics)',
          yearsOfExperience: '9',
          workedAt: 'Apollo Hospital, Max Healthcare'
        },
        {
          id: 'e2',
          name: 'Mike',
          surname: 'Brown',
          service: 'Fitness',
          address: '456 Oak Ave, Pune',
          phone: '8765432109',
          email: 'mike.b@example.com',
          photos: [],
          serviceSince: '2018',
          fitnessClubName: 'Elite Fitness',
          trainerName: 'John Trainer',
          achievements: 'Certified Personal Trainer, 5+ years experience',
          mandatoryAgeGroup: '18-60'
        },
        {
          id: 'e3',
          name: 'Alex',
          surname: 'Johnson',
          service: 'Sports',
          address: '789 Sports Complex, Pune',
          phone: '7654321098',
          email: 'alex.j@example.com',
          photos: [],
          serviceSince: '2020',
          trainerCoachName: 'Alex Johnson',
          achievements: 'State Level Badminton Coach',
          mandatoryAgeGroup: '10-25',
          specialFeatures: 'Badminton, Table Tennis, Swimming'
        }
      ];
      
      setBookings(mockBookings);
      setEmployees(mockEmployees);
      setIsLoading(false);
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isEmployeeLoggedIn');
    navigate('/'); // Redirect to home page
  };

  const resetEmployeeForm = () => {
    setEmployeeForm({
      name: '',
      surname: '',
      service: '',
      address: '',
      phone: '',
      email: '',
      photos: [],
      serviceSince: '',
      // Reset all service-specific fields
      qualification: '',
      yearsOfExperience: '0',
      workedAt: '',
      fitnessClubName: '',
      trainerName: '',
      achievements: '',
      mandatoryAgeGroup: '',
      trainerCoachName: '',
      specialFeatures: ''
    });
    setPhotoPreviews([]);
    setSelectedEmployee(null);
    setPhotoError('');
    setFormErrors({});
    setIsFormSubmitted(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Clear any previous errors
    setPhotoError(null);

    // Check total photos won't exceed limit
    const totalPhotos = employeeForm.photos.length + files.length;
    if (totalPhotos > 2) {
      setPhotoError('Maximum of 2 photos allowed');
      return;
    }

    // Process each file
    const newPhotos: string[] = [];
    const newPreviews: string[] = [];
    let filesProcessed = 0;

    files.forEach(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setPhotoError('Please upload only image files (JPEG, PNG, etc.)');
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setPhotoError('Each image should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        newPhotos.push(base64String);
        newPreviews.push(base64String);
        filesProcessed++;

        // When all files are processed
        if (filesProcessed === files.length) {
          setEmployeeForm(prev => ({
            ...prev,
            photos: [...prev.photos, ...newPhotos].slice(0, 2) // Ensure max 2 photos
          }));
          setPhotoPreviews(prev => [...prev, ...newPreviews].slice(0, 2));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, boolean> = {};
    let isValid = true;

    // Basic info validation
    if (!employeeForm.name.trim()) { 
      errors.name = true; 
      isValid = false; 
    }
    if (!employeeForm.surname.trim()) { 
      errors.surname = true; 
      isValid = false; 
    }
    if (!employeeForm.phone.trim()) { 
      errors.phone = true; 
      isValid = false; 
    }
    if (!employeeForm.email.trim() || !/\S+@\S+\.\S+/.test(employeeForm.email)) { 
      errors.email = true; 
      isValid = false; 
    }
    if (!employeeForm.address.trim()) { 
      errors.address = true; 
      isValid = false; 
    }
    if (!employeeForm.service) { 
      errors.service = true; 
      isValid = false; 
    }
    if (!employeeForm.serviceSince) { 
      errors.serviceSince = true; 
      isValid = false; 
    }

    // Service specific validation
    if (employeeForm.service === 'Physiotherapy') {
      if (!employeeForm.qualification.trim()) { errors.qualification = true; isValid = false; }
      if (!employeeForm.yearsOfExperience.trim()) { errors.yearsOfExperience = true; isValid = false; }
      if (!employeeForm.workedAt.trim()) { errors.workedAt = true; isValid = false; }
    } else if (employeeForm.service === 'Fitness') {
      if (!employeeForm.fitnessClubName.trim()) { errors.fitnessClubName = true; isValid = false; }
      if (!employeeForm.trainerName.trim()) { errors.trainerName = true; isValid = false; }
      if (!employeeForm.mandatoryAgeGroup.trim()) { errors.mandatoryAgeGroup = true; isValid = false; }
    } else if (employeeForm.service === 'Sports') {
      if (!employeeForm.trainerCoachName.trim()) { errors.trainerCoachName = true; isValid = false; }
      if (!employeeForm.mandatoryAgeGroup.trim()) { errors.mandatoryAgeGroup = true; isValid = false; }
      if (!employeeForm.specialFeatures.trim()) { errors.specialFeatures = true; isValid = false; }
    }

    // Photo validation
    if (employeeForm.photos.length === 0) {
      setPhotoError('At least one photo is required');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    
    if (!validateForm()) {
      // Show all validation errors
      return;
    }

    // Create employee data based on service type
    let employeeData: Employee;
    const employeeId = selectedEmployee?.id || `e${Date.now()}`;
    
    const baseEmployee = {
      id: employeeId,
      name: employeeForm.name,
      surname: employeeForm.surname,
      address: employeeForm.address,
      phone: employeeForm.phone,
      email: employeeForm.email,
      photos: employeeForm.photos,
      serviceSince: employeeForm.serviceSince,
    };
    
    if (employeeForm.service === 'Physiotherapy') {
      employeeData = {
        ...baseEmployee,
        service: 'Physiotherapy',
        qualification: employeeForm.qualification || '',
        yearsOfExperience: employeeForm.yearsOfExperience || '0',
        workedAt: employeeForm.workedAt || ''
      } as const;
    } else if (employeeForm.service === 'Fitness') {
      employeeData = {
        ...baseEmployee,
        service: 'Fitness',
        fitnessClubName: employeeForm.fitnessClubName || '',
        trainerName: employeeForm.trainerName || '',
        achievements: employeeForm.achievements || '',
        mandatoryAgeGroup: employeeForm.mandatoryAgeGroup || ''
      } as const;
    } else {
      // Sports
      employeeData = {
        ...baseEmployee,
        service: 'Sports',
        trainerCoachName: employeeForm.trainerCoachName || '',
        achievements: employeeForm.achievements || '',
        mandatoryAgeGroup: employeeForm.mandatoryAgeGroup || '',
        specialFeatures: employeeForm.specialFeatures || ''
      } as const;
    }

    // Update or add employee
    if (selectedEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? employeeData : emp
      ));
    } else {
      setEmployees([...employees, employeeData]);
    }

    setIsEmployeeModalOpen(false);
    resetEmployeeForm();
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    // Create a form state that includes all possible fields with defaults
    const formState: EmployeeFormState = {
      name: employee.name,
      surname: employee.surname,
      service: employee.service,
      address: employee.address,
      phone: employee.phone,
      email: employee.email,
      photos: [...employee.photos],
      serviceSince: employee.serviceSince || new Date().getFullYear().toString(),
      // Set default values for all fields
      qualification: '',
      yearsOfExperience: '0',
      workedAt: '',
      fitnessClubName: '',
      trainerName: '',
      achievements: '',
      mandatoryAgeGroup: '',
      trainerCoachName: '',
      specialFeatures: ''
    };

    // Set service-specific fields based on the employee type
    if (employee.service === 'Physiotherapy' && 'qualification' in employee) {
      formState.qualification = employee.qualification;
      formState.yearsOfExperience = employee.yearsOfExperience.toString();
      formState.workedAt = employee.workedAt;
    } else if (employee.service === 'Fitness' && 'fitnessClubName' in employee) {
      formState.fitnessClubName = employee.fitnessClubName;
      formState.trainerName = employee.trainerName;
      formState.achievements = employee.achievements;
      formState.mandatoryAgeGroup = employee.mandatoryAgeGroup;
    } else if (employee.service === 'Sports' && 'trainerCoachName' in employee) {
      formState.trainerCoachName = employee.trainerCoachName;
      formState.achievements = employee.achievements;
      formState.mandatoryAgeGroup = employee.mandatoryAgeGroup;
      formState.specialFeatures = employee.specialFeatures;
    }

    setEmployeeForm(formState);
    setPhotoPreviews([...employee.photos]);
    setIsEmployeeModalOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    setIsDeleteModalOpen(false);
  };

  const downloadAttachment = (url: string) => {
    // In a real app, this would trigger the file download
    console.log('Downloading:', url);
    // window.open(url, '_blank');
    alert('Attachment download would start here: ' + url);
  };

  const openBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const RequiredIndicator = () => (
    <span className="text-red-500 ml-1">*</span>
  );

  const renderServiceSpecificFields = () => {
    switch (employeeForm.service) {
      case 'Physiotherapy':
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="qualification">Qualification<RequiredIndicator /></Label>
              <Input
                id="qualification"
                value={employeeForm.qualification}
                onChange={(e) => {
                  setEmployeeForm({...employeeForm, qualification: e.target.value});
                  if (isFormSubmitted) setFormErrors({...formErrors, qualification: !e.target.value.trim()});
                }}
                placeholder="e.g., BPT, MPT"
                className={getInputClassName('qualification')}
              />
              {isFormSubmitted && formErrors.qualification && (
                <p className="mt-1 text-sm text-red-500">Qualification is required</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="yearsOfExperience">Years of Experience<RequiredIndicator /></Label>
              <Input
                id="yearsOfExperience"
                type="number"
                min="0"
                value={employeeForm.yearsOfExperience}
                onChange={(e) => {
                  setEmployeeForm({...employeeForm, yearsOfExperience: e.target.value});
                  if (isFormSubmitted) setFormErrors({...formErrors, yearsOfExperience: !e.target.value.trim()});
                }}
                placeholder="Years of experience"
                className={getInputClassName('yearsOfExperience')}
              />
              {isFormSubmitted && formErrors.yearsOfExperience && (
                <p className="mt-1 text-sm text-red-500">Years of experience is required</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="workedAt">Worked At<RequiredIndicator /></Label>
              <Input
                id="workedAt"
                value={employeeForm.workedAt}
                onChange={(e) => {
                  setEmployeeForm({...employeeForm, workedAt: e.target.value});
                  if (isFormSubmitted) setFormErrors({...formErrors, workedAt: !e.target.value.trim()});
                }}
                placeholder="Previous workplace"
                className={getInputClassName('workedAt')}
              />
              {isFormSubmitted && formErrors.workedAt && (
                <p className="mt-1 text-sm text-red-500">Work experience is required</p>
              )}
            </div>
          </>
        );
      case 'Fitness':
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="fitnessClubName">Fitness Club Name<RequiredIndicator /></Label>
              <Input
                id="fitnessClubName"
                value={employeeForm.fitnessClubName}
                onChange={(e) => {
                  setEmployeeForm({...employeeForm, fitnessClubName: e.target.value});
                  if (isFormSubmitted) setFormErrors({...formErrors, fitnessClubName: !e.target.value.trim()});
                }}
                placeholder="Name of the fitness club"
                className={getInputClassName('fitnessClubName')}
              />
              {isFormSubmitted && formErrors.fitnessClubName && (
                <p className="mt-1 text-sm text-red-500">Fitness club name is required</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="trainerName">Trainer Name<RequiredIndicator /></Label>
              <Input
                id="trainerName"
                value={employeeForm.trainerName}
                onChange={(e) => {
                  setEmployeeForm({...employeeForm, trainerName: e.target.value});
                  if (isFormSubmitted) setFormErrors({...formErrors, trainerName: !e.target.value.trim()});
                }}
                placeholder="Full name of the trainer"
                className={getInputClassName('trainerName')}
              />
              {isFormSubmitted && formErrors.trainerName && (
                <p className="mt-1 text-sm text-red-500">Trainer name is required</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="achievements">Achievements</Label>
              <Textarea
                id="achievements"
                value={employeeForm.achievements}
                onChange={(e) => setEmployeeForm({...employeeForm, achievements: e.target.value})}
                placeholder="Notable achievements or certifications"
                className="min-h-[100px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="mandatoryAgeGroup">Mandatory Age Group<RequiredIndicator /></Label>
              <Input
                id="mandatoryAgeGroup"
                value={employeeForm.mandatoryAgeGroup}
                onChange={(e) => {
                  setEmployeeForm({...employeeForm, mandatoryAgeGroup: e.target.value});
                  if (isFormSubmitted) setFormErrors({...formErrors, mandatoryAgeGroup: !e.target.value.trim()});
                }}
                placeholder="e.g., 18-60"
                className={getInputClassName('mandatoryAgeGroup')}
              />
              {isFormSubmitted && formErrors.mandatoryAgeGroup && (
                <p className="mt-1 text-sm text-red-500">Age group is required</p>
              )}
            </div>
          </>
        );
      case 'Sports':
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="trainerCoachName">Trainer/Coach Name<RequiredIndicator /></Label>
              <Input
                id="trainerCoachName"
                value={employeeForm.trainerCoachName}
                onChange={(e) => {
                  setEmployeeForm({...employeeForm, trainerCoachName: e.target.value});
                  if (isFormSubmitted) setFormErrors({...formErrors, trainerCoachName: !e.target.value.trim()});
                }}
                placeholder="Full name of the trainer/coach"
                className={getInputClassName('trainerCoachName')}
              />
              {isFormSubmitted && formErrors.trainerCoachName && (
                <p className="mt-1 text-sm text-red-500">Trainer/Coach name is required</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="achievements">Achievements</Label>
              <Textarea
                id="achievements"
                value={employeeForm.achievements}
                onChange={(e) => setEmployeeForm({...employeeForm, achievements: e.target.value})}
                placeholder="Notable achievements or certifications"
                className="min-h-[100px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="mandatoryAgeGroup">Mandatory Age Group<RequiredIndicator /></Label>
              <Input
                id="mandatoryAgeGroup"
                value={employeeForm.mandatoryAgeGroup}
                onChange={(e) => {
                  setEmployeeForm({...employeeForm, mandatoryAgeGroup: e.target.value});
                  if (isFormSubmitted) setFormErrors({...formErrors, mandatoryAgeGroup: !e.target.value.trim()});
                }}
                placeholder="e.g., 18-60"
                className={getInputClassName('mandatoryAgeGroup')}
              />
              {isFormSubmitted && formErrors.mandatoryAgeGroup && (
                <p className="mt-1 text-sm text-red-500">Age group is required</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="specialFeatures">Special Features<RequiredIndicator /></Label>
              <Textarea
                id="specialFeatures"
                value={employeeForm.specialFeatures}
                onChange={(e) => {
                  setEmployeeForm({...employeeForm, specialFeatures: e.target.value});
                  if (isFormSubmitted) setFormErrors({...formErrors, specialFeatures: !e.target.value.trim()});
                }}
                placeholder="Special features or facilities"
                className={`min-h-[100px] ${isFormSubmitted && formErrors.specialFeatures ? 'border-red-500 ring-1 ring-red-500' : ''}`}
              />
              {isFormSubmitted && formErrors.specialFeatures && (
                <p className="mt-1 text-sm text-red-500">Special features are required</p>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setActiveTab('employees');
                setIsEmployeeModalOpen(true);
                resetEmployeeForm();
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
            <Button variant="outline" onClick={() => setIsLogoutModalOpen(true)} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Employees
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { title: 'Total Bookings', value: bookings.length, color: 'bg-blue-500' },
                    {
                      title: 'Pending',
                      value: bookings.filter((b) => b.status === 'Pending').length,
                      color: 'bg-yellow-500',
                    },
                    {
                      title: 'Confirmed',
                      value: bookings.filter((b) => b.status === 'Confirmed').length,
                      color: 'bg-green-500',
                    },
                    {
                      title: 'Completed',
                      value: bookings.filter((b) => b.status === 'Completed').length,
                      color: 'bg-purple-500',
                    },
                    {
                      title: 'Cancelled',
                      value: bookings.filter((b) => b.status === 'Cancelled').length,
                      color: 'bg-red-500',
                    },
                  ].map((stat, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className={`h-2 ${stat.color}`}></div>
                      <CardContent className="p-4">
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Bookings Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bookings.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Service</TableHead>
                              <TableHead>Date & Time</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {bookings.map((booking) => (
                              <TableRow key={booking.id}>
                                <TableCell className="font-medium">
                                  {booking.name} {booking.surname}
                                </TableCell>
                                <TableCell>{booking.service}</TableCell>
                                <TableCell>
                                  {booking.date} at {booking.time}
                                </TableCell>
                                <TableCell>
                                  <span
                                    className={`px-2 py-1 text-xs rounded-full ${
                                      booking.status === 'Confirmed'
                                        ? 'bg-green-100 text-green-800'
                                        : booking.status === 'Pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : booking.status === 'Completed'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {booking.status}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedBooking(booking);
                                      setIsModalOpen(true);
                                    }}
                                  >
                                    View Details
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <p className="text-lg">No bookings found</p>
                        <p className="text-sm mt-1">When bookings are made, they'll appear here</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>Employee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Photo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.length > 0 ? (
                      employees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                              {employee.photos && employee.photos.length > 0 ? (
                                <img 
                                  src={employee.photos[0]} 
                                  alt={`${employee.name} ${employee.surname}`} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    // Fallback to emoji if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.style.display = 'none';
                                    const fallback = document.createElement('div');
                                    fallback.className = 'text-xl';
                                    fallback.textContent = 
                                      employee.service === 'Physiotherapy' ? '👨‍⚕️' :
                                      employee.service === 'Fitness' ? '💪' : '⚽';
                                    target.parentNode?.insertBefore(fallback, target.nextSibling);
                                  }}
                                />
                              ) : (
                                <span className="text-xl">
                                  {employee.service === 'Physiotherapy' ? '👨‍⚕️' :
                                   employee.service === 'Fitness' ? '💪' : '⚽'}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {employee.name} {employee.surname}
                          </TableCell>
                          <TableCell>{employee.service}</TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-500">{employee.phone}</div>
                            <div className="text-xs text-gray-400">{employee.email}</div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">{employee.address}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditEmployee(employee)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  setIsDeleteModalOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          No employees found. Add your first employee to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Booking Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedBooking.name} {selectedBooking.surname}</h3>
                  <p className="text-sm text-gray-500">{selectedBooking.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>{selectedBooking.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span>{selectedBooking.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span>{selectedBooking.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span>{selectedBooking.service}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={selectedBooking.status}
                  onValueChange={(value) => {
                    setBookings(bookings.map(booking => 
                      booking.id === selectedBooking.id 
                        ? { ...booking, status: value as any }
                        : booking
                    ));
                    setSelectedBooking({
                      ...selectedBooking,
                      status: value as any
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">
                      <span className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                        Pending
                      </span>
                    </SelectItem>
                    <SelectItem value="Confirmed">
                      <span className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                        Confirmed
                      </span>
                    </SelectItem>
                    <SelectItem value="Completed">
                      <span className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Completed
                      </span>
                    </SelectItem>
                    <SelectItem value="Cancelled">
                      <span className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        Cancelled
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedBooking.message && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1">Message</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {selectedBooking.message}
                  </p>
                </div>
              )}

              {selectedBooking.attachment && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 w-full"
                    onClick={() => downloadAttachment(selectedBooking.attachment!)}
                  >
                    <Download className="h-4 w-4" />
                    Download Attachment
                  </Button>
                </div>
              )}
              
              <DialogFooter>
                <Button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4"
                >
                  OK
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Employee Form Modal */}
      <Dialog open={isEmployeeModalOpen} onOpenChange={setIsEmployeeModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEmployeeSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  value={employeeForm.name}
                  onChange={(e) => {
                    setEmployeeForm({...employeeForm, name: e.target.value});
                    if (isFormSubmitted) {
                      setFormErrors({...formErrors, name: !e.target.value.trim()});
                    }
                  }}
                  placeholder="First name"
                  className={getInputClassName('name')}
                />
                {isFormSubmitted && formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">First name is required</p>
                )}
              </div>
              <div>
                <Label htmlFor="surname">Last Name</Label>
                <Input
                  id="surname"
                  value={employeeForm.surname}
                  onChange={(e) => {
                    setEmployeeForm({...employeeForm, surname: e.target.value});
                    if (isFormSubmitted) {
                      setFormErrors({...formErrors, surname: !e.target.value.trim()});
                    }
                  }}
                  placeholder="Last name"
                  className={getInputClassName('surname')}
                />
                {isFormSubmitted && formErrors.surname && (
                  <p className="mt-1 text-sm text-red-500">Last name is required</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={employeeForm.phone}
                  onChange={(e) => {
                    setEmployeeForm({...employeeForm, phone: e.target.value});
                    if (isFormSubmitted) {
                      setFormErrors({...formErrors, phone: !e.target.value.trim()});
                    }
                  }}
                  placeholder="Phone number"
                  className={getInputClassName('phone')}
                />
                {isFormSubmitted && formErrors.phone && (
                  <p className="mt-1 text-sm text-red-500">Phone number is required</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={employeeForm.email}
                  onChange={(e) => {
                    setEmployeeForm({...employeeForm, email: e.target.value});
                    if (isFormSubmitted) {
                      const isValid = /\S+@\S+\.\S+/.test(e.target.value);
                      setFormErrors({...formErrors, email: !isValid});
                    }
                  }}
                  placeholder="Email address"
                  className={getInputClassName('email')}
                />
                {isFormSubmitted && formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">Valid email is required</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={employeeForm.address}
                onChange={(e) => {
                  setEmployeeForm({...employeeForm, address: e.target.value});
                  if (isFormSubmitted) {
                    setFormErrors({...formErrors, address: !e.target.value.trim()});
                  }
                }}
                placeholder="Full address"
                className={getInputClassName('address')}
              />
              {isFormSubmitted && formErrors.address && (
                <p className="mt-1 text-sm text-red-500">Address is required</p>
              )}
            </div>

            <div>
              <Label>Service Type</Label>
              <Select
                value={employeeForm.service}
                onValueChange={(value: 'Physiotherapy' | 'Fitness' | 'Sports') => {
                  setEmployeeForm({...employeeForm, service: value});
                  if (isFormSubmitted) {
                    setFormErrors({...formErrors, service: !value});
                  }
                }}
              >
                <SelectTrigger className={getSelectClassName('service')}>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Physiotherapy">Physiotherapy</SelectItem>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                </SelectContent>
                {isFormSubmitted && formErrors.service && (
                  <p className="mt-1 text-sm text-red-500">Please select a service type</p>
                )}
              </Select>
            </div>

            {/* Service Specific Fields - Only show when a service is selected */}
            {employeeForm.service && (
              <div className="border-t pt-4 mt-2">
                <h3 className="font-medium mb-4">{employeeForm.service} Details</h3>
                <div className="mb-4">
                  <Label htmlFor="serviceSince">Service Since (Year)</Label>
                  <Input
                    id="serviceSince"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={employeeForm.serviceSince}
                    onChange={(e) => {
                      setEmployeeForm({...employeeForm, serviceSince: e.target.value});
                      if (isFormSubmitted) {
                        setFormErrors({...formErrors, serviceSince: !e.target.value});
                      }
                    }}
                    placeholder="Year"
                    className={getInputClassName('serviceSince')}
                  />
                  {isFormSubmitted && formErrors.serviceSince && (
                    <p className="mt-1 text-sm text-red-500">Service year is required</p>
                  )}
                </div>
                {renderServiceSpecificFields()}
              </div>
            )}

            <div className="border-t pt-4">
              <Label>Photos (1-2 required)</Label>
              <div className="mt-2 flex flex-wrap gap-4">
                {/* Display existing photo previews */}
                {photoPreviews.map((preview, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transform translate-x-1/2 -translate-y-1/2 hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newPhotos = [...employeeForm.photos];
                        newPhotos.splice(index, 1);
                        setEmployeeForm({...employeeForm, photos: newPhotos});
                        const newPreviews = [...photoPreviews];
                        newPreviews.splice(index, 1);
                        setPhotoPreviews(newPreviews);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* Show upload button if we have less than 2 photos */}
                {photoPreviews.length < 2 && (
                  <div 
                    className={`w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer ${
                      photoError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-primary-500 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
                      fileInput.value = ''; // Reset input to allow re-uploading the same file
                      fileInput?.click();
                    }}
                  >
                    <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-xs text-gray-500 mt-1">
                      Add {photoPreviews.length === 0 ? '1-2' : '1 more'}
                    </span>
                  </div>
                )}
              </div>
              {photoError && <p className="text-sm text-red-500 mt-1">{photoError}</p>}
              
              <input
                id="photo-upload"
                name="photo-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
              />
              
              <p className={`mt-1 text-xs ${photoError ? 'text-red-600' : 'text-gray-500'}`}>
                {photoError || (
                  employeeForm.service === 'Physiotherapy' 
                    ? `Upload ${photoPreviews.length === 0 ? '1-2' : '1 more'} professional photo${photoPreviews.length === 0 ? 's' : ''} of the physiotherapist` 
                    : employeeForm.service === 'Fitness' 
                      ? `Upload ${photoPreviews.length === 0 ? '1-2' : '1 more'} photo${photoPreviews.length === 0 ? 's' : ''} of the fitness club`
                      : `Upload ${photoPreviews.length === 0 ? '1-2' : '1 more'} photo${photoPreviews.length === 0 ? 's' : ''} of the sports club`
                )}
              </p>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsEmployeeModalOpen(false);
                  setPhotoError(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="w-full"
              >
                {selectedEmployee ? 'Update' : 'Add'} Employee
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This will permanently delete the employee record. This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => selectedEmployee && handleDeleteEmployee(selectedEmployee.id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Modal */}
      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to logout?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoutModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
