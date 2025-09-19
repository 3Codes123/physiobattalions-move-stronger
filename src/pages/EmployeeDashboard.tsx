import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, LogOut, Calendar, Clock, User, Phone, Mail, FileText, X, Plus, Edit, Trash2, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Employee {
  id: string;
  name: string;
  surname: string;
  service: 'Physiotherapy' | 'Fitness' | 'Sports';
  address: string;
  phone: string;
  email: string;
  photo?: string; // Base64 string of the photo
}

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
  const [employeeForm, setEmployeeForm] = useState<Omit<Employee, 'id'>>({ 
    name: '', 
    surname: '', 
    service: 'Physiotherapy', 
    address: '',
    phone: '',
    email: '',
    photo: ''
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
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
          email: 'sarah.w@example.com'
        },
        {
          id: 'e2',
          name: 'Mike',
          surname: 'Brown',
          service: 'Fitness',
          address: '456 Oak Ave, Pune',
          phone: '8765432109',
          email: 'mike.b@example.com'
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
      service: 'Physiotherapy', 
      address: '',
      phone: '',
      email: '',
      photo: ''
    });
    setPhotoPreview(null);
    setSelectedEmployee(null);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear any previous errors
    setPhotoError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setPhotoError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPhotoPreview(base64String);
      setEmployeeForm(prev => ({ ...prev, photo: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate photo
    if (!employeeForm.photo) {
      setPhotoError('A photo is required');
      return;
    }
    
    if (selectedEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? { ...employeeForm, id: selectedEmployee.id } : emp
      ));
    } else {
      // Add new employee
      const newEmployee: Employee = {
        ...employeeForm,
        id: `e${Date.now()}`
      };
      setEmployees([...employees, newEmployee]);
    }
    setIsEmployeeModalOpen(false);
    resetEmployeeForm();
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEmployeeForm({
      name: employee.name,
      surname: employee.surname,
      service: employee.service as 'Physiotherapy' | 'Fitness' | 'Sports',
      address: employee.address,
      phone: employee.phone,
      email: employee.email,
      photo: employee.photo || ''
    });
    setPhotoPreview(employee.photo || null);
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
                              {employee.photo ? (
                                <img 
                                  src={employee.photo} 
                                  alt={`${employee.name} ${employee.surname}`} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    // Fallback to emoji if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const fallback = document.createElement('div');
                                    fallback.className = 'text-gray-400 text-xl';
                                    fallback.textContent = 
                                      employee.service === 'Physiotherapy' ? '👨‍⚕️' : 
                                      employee.service === 'Fitness' ? '💪' : '⚽';
                                    target.parentNode?.insertBefore(fallback, target.nextSibling);
                                  }}
                                />
                              ) : (
                                <div className="text-gray-400 text-xl">
                                  {employee.service === 'Physiotherapy' ? '👨‍⚕️' : 
                                   employee.service === 'Fitness' ? '💪' : '⚽'}
                                </div>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEmployee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEmployeeSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  value={employeeForm.name}
                  onChange={(e) => setEmployeeForm({...employeeForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Last Name</Label>
                <Input
                  id="surname"
                  value={employeeForm.surname}
                  onChange={(e) => setEmployeeForm({...employeeForm, surname: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={employeeForm.email}
                onChange={(e) => setEmployeeForm({...employeeForm, email: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={employeeForm.phone}
                onChange={(e) => setEmployeeForm({...employeeForm, phone: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Select
                value={employeeForm.service}
                onValueChange={(value) => setEmployeeForm({...employeeForm, service: value as any})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Physiotherapy">Physiotherapy</SelectItem>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">
                {employeeForm.service === 'Physiotherapy' 
                  ? 'Physiotherapist Photo' 
                  : employeeForm.service === 'Fitness' 
                    ? 'Fitness Club Photo' 
                    : 'Sports Club Photo'}
              </Label>
              <div className="mt-1 flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-2xl">
                      {employeeForm.service === 'Physiotherapy' ? '👨‍⚕️' : 
                       employeeForm.service === 'Fitness' ? '💪' : '⚽'}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {photoPreview ? 'Change' : 'Upload'}
                  </label>
                  <input
                    id="photo-upload"
                    name="photo-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  {photoPreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoPreview(null);
                        setEmployeeForm(prev => ({ ...prev, photo: '' }));
                      }}
                      className="ml-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <p className={`mt-1 text-xs ${photoError ? 'text-red-600' : 'text-gray-500'}`}>
                {photoError || (
                  employeeForm.service === 'Physiotherapy' 
                    ? 'Upload a professional photo of the physiotherapist (required)' 
                    : employeeForm.service === 'Fitness' 
                      ? 'Upload the Fitness Club logo or photo (required)'
                      : 'Upload the Sports Club logo or photo (required)'
                )}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={employeeForm.address}
                onChange={(e) => setEmployeeForm({...employeeForm, address: e.target.value})}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsEmployeeModalOpen(false);
                setPhotoError(null);
              }}>
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={!employeeForm.photo}
                className={!employeeForm.photo ? 'opacity-70 cursor-not-allowed' : ''}
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
