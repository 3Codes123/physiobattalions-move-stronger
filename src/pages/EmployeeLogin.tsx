import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

export default function EmployeeLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Hardcoded credentials for demo purposes
  const EMPLOYEE_CREDENTIALS = {
    username: 'employee',
    password: 'physio123'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (username === EMPLOYEE_CREDENTIALS.username && password === EMPLOYEE_CREDENTIALS.password) {
        // Set the flag in localStorage
        localStorage.setItem('isEmployeeLoggedIn', 'true');
        
        // Force a state update by dispatching a storage event
        window.dispatchEvent(new Event('storage'));
        
        // Navigate to dashboard
        navigate('/employee-dashboard', { replace: true });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid username or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md relative pt-16">
        <Button 
          variant="outline" 
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 text-sm"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center mt-2">Employee Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the employee dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-sm text-center text-gray-500">
              Demo credentials: employee / physio123
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
