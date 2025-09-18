import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, LogOut, Calendar, Clock, User, Phone, Mail, FileText, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isEmployeeLoggedIn');
    if (!isLoggedIn) {
      navigate('/employee-login');
      return;
    }

    // Simulate loading bookings
    const loadBookings = () => {
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
      
      setBookings(mockBookings);
      setIsLoading(false);
    };

    loadBookings();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isEmployeeLoggedIn');
    navigate('/'); // Redirect to home page
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and view all bookings</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: 'Total Bookings', value: bookings.length, color: 'bg-blue-500' },
              { 
                title: 'Pending', 
                value: bookings.filter(b => b.status === 'Pending').length, 
                color: 'bg-yellow-500' 
              },
              { 
                title: 'Confirmed', 
                value: bookings.filter(b => b.status === 'Confirmed').length, 
                color: 'bg-green-500' 
              },
              { 
                title: 'Completed', 
                value: bookings.filter(b => b.status === 'Completed').length, 
                color: 'bg-purple-500' 
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
                        <TableRow 
                          key={booking.id} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => openBookingDetails(booking)}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div>{`${booking.name} ${booking.surname}`}</div>
                                <div className="text-xs text-gray-500">{booking.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium">{booking.service}</div>
                            <div className="text-xs text-gray-500">{`${booking.date} at ${booking.time}`}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>{booking.date}</span>
                              <Clock className="h-4 w-4 text-gray-400 ml-2" />
                              <span>{booking.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(booking.status)}`}>
                              {booking.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                openBookingDetails(booking);
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

        {/* Booking Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle>Booking Details</DialogTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsModalOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Client Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{`${selectedBooking.name} ${selectedBooking.surname}`}</p>
                          <div className="flex items-center text-sm text-gray-500 gap-1">
                            <Mail className="h-3.5 w-3.5" />
                            <span>{selectedBooking.email}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 gap-1">
                            <Phone className="h-3.5 w-3.5" />
                            <span>{selectedBooking.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Appointment Details</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Service</p>
                          <p className="font-medium">{selectedBooking.service}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(selectedBooking.status)}`}>
                            {selectedBooking.status}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="font-medium">{selectedBooking.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Time</p>
                          <p className="font-medium">{selectedBooking.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedBooking.message && (
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Client Message</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="whitespace-pre-line">{selectedBooking.message}</p>
                    </div>
                  </div>
                )}

                {selectedBooking.attachment && (
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Attachment</h3>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="text-sm">{selectedBooking.attachment}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadAttachment(selectedBooking.attachment!)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => {
                      // Handle action (e.g., confirm, reschedule, etc.)
                      console.log('Action taken on booking:', selectedBooking.id);
                    }}
                  >
                    Mark as {selectedBooking.status === 'Pending' ? 'Confirmed' : 'Completed'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
