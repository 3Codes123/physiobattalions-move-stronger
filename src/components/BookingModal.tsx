import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { servicesData, ServiceProvider } from "@/data/servicesData";

export type BookingServiceType = "physiotherapy" | "fitness" | "sports";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectService?: BookingServiceType;
}

const serviceOptions: { value: BookingServiceType; label: string; description: string }[] = [
  {
    value: "physiotherapy",
    label: "Physiotherapy",
    description: "Professional therapy sessions for rehabilitation and pain management",
  },
  {
    value: "fitness",
    label: "Elite Fitness Club",
    description: "Premium fitness training and wellness center",
  },
  {
    value: "sports",
    label: "Champion Sports Academy",
    description: "Professional sports training for all levels",
  },
];

const getProvidersByType = (type: BookingServiceType) =>
  servicesData.filter((s) => s.type === type);

export default function BookingModal({ open, onOpenChange, preselectService = "physiotherapy" }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: user info + OTP
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  // Step 2: select service + provider
  const [serviceType, setServiceType] = useState<BookingServiceType>(preselectService);
  const providers = useMemo(() => getProvidersByType(serviceType), [serviceType]);
  const [providerId, setProviderId] = useState<string>(providers[0]?.id ?? "");

  // Step 3: date & time
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);

  const selectedProvider: ServiceProvider | undefined = useMemo(
    () => providers.find((p) => p.id === providerId) ?? providers[0],
    [providers, providerId]
  );

  const timeSlots = useMemo(() => {
    // For physiotherapists: use defined timeSlots; for others, create sample slots
    if (selectedProvider?.type === "physiotherapy") {
      return selectedProvider.timeSlots.map((ts) => ({
        id: `${ts.start}-${ts.end}`,
        label: `${ts.start} - ${ts.end}`,
        available: ts.capacity > 0,
      }));
    }
    const genericSlots = [
      { start: "08:00", end: "10:00" },
      { start: "10:00", end: "12:00" },
      { start: "13:00", end: "15:00" },
      { start: "17:00", end: "19:00" },
    ];
    return genericSlots.map((ts, i) => ({
      id: `${ts.start}-${ts.end}`,
      label: `${ts.start} - ${ts.end}`,
      // Alternate availability to demonstrate UI
      available: i % 2 === 0,
    }));
  }, [selectedProvider]);

  const canProceedStep1 = firstName && lastName && phone && email && otpVerified;
  const canProceedStep2 = serviceType && providerId;
  const canProceedStep3 = date && timeSlot;

  const resetState = () => {
    setStep(1);
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setServiceType(preselectService);
    setProviderId("");
    setDate(undefined);
    setTimeSlot(null);
    setUploadFiles([]);
  };

  const handleClose = (value: boolean) => {
    if (!value) {
      resetState();
    }
    onOpenChange(value);
  };

  const handleSendOtp = () => {
    if (!email) return;
    setOtpSent(true);
    // In real app, call backend to send OTP
    // Here we simulate OTP "123456"
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      setOtpVerified(true);
    } else {
      setOtpVerified(false);
      alert("Invalid OTP. Try 123456 for demo.");
    }
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadFiles(files);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
          <DialogDescription>
            Step {step} of 3
          </DialogDescription>
        </DialogHeader>

        {/* Stepper indicator */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className={`flex-1 text-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>User Info</div>
          <div className="w-8 h-[2px] bg-muted mx-2" />
          <div className={`flex-1 text-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>Select Service</div>
          <div className="w-8 h-[2px] bg-muted mx-2" />
          <div className={`flex-1 text-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>Date & Time</div>
        </div>

        {/* Step 1: User info + OTP */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Name</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
              </div>
              <div>
                <Label htmlFor="lastName">Surname</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 9876543210" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>OTP Verification</Label>
              <div className="flex items-center gap-2">
                <Button type="button" variant="secondary" onClick={handleSendOtp} disabled={!email || otpSent}>
                  {otpSent ? "OTP Sent" : "Send OTP"}
                </Button>
                <InputOTP maxLength={6} value={otp} onChange={(v) => setOtp(v)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <Button type="button" onClick={handleVerifyOtp} disabled={!otpSent}>
                  Verify
                </Button>
                {otpVerified && <span className="text-green-600 text-sm">Verified</span>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="uploads">Upload photos (optional)</Label>
              <Input id="uploads" type="file" accept="image/*" multiple onChange={handleFiles} />
              {uploadFiles.length > 0 && (
                <div className="text-xs text-muted-foreground">{uploadFiles.length} file(s) selected</div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Select Service + Provider */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Choose a Service</Label>
              <Select value={serviceType} onValueChange={(val: BookingServiceType) => setServiceType(val)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{s.label}</span>
                        <span className="text-xs text-muted-foreground">{s.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select Provider</Label>
              <Select value={providerId} onValueChange={(v) => setProviderId(v)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.type === "physiotherapy" && (
                        <div className="flex flex-col">
                          <span className="font-medium">{p.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {(p as any).qualification} • {(p as any).experience} yrs exp
                          </span>
                        </div>
                      )}
                      {p.type === "fitness" && (
                        <div className="flex flex-col">
                          <span className="font-medium">{p.name}</span>
                          <span className="text-xs text-muted-foreground">Owner: {(p as any).owner}</span>
                        </div>
                      )}
                      {p.type === "sports" && (
                        <div className="flex flex-col">
                          <span className="font-medium">{p.name}</span>
                          <span className="text-xs text-muted-foreground">Owner: {(p as any).owner}</span>
                        </div>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProvider && (
              <div className="rounded-md border p-3 text-sm space-y-1">
                <div className="font-medium">Provider Details</div>
                {selectedProvider.type === "physiotherapy" && (
                  <div>
                    <div>{(selectedProvider as any).qualification} • {(selectedProvider as any).experience} yrs exp</div>
                    <div>Worked at: {(selectedProvider as any).workedAt.join(", ")}</div>
                    <div>Available: {(selectedProvider as any).availability.hours}</div>
                    <div>Address: {(selectedProvider as any).address}</div>
                  </div>
                )}
                {selectedProvider.type === "fitness" && (
                  <div>
                    <div>Owner: {(selectedProvider as any).owner}</div>
                    <div>Available: {(selectedProvider as any).availableTime}</div>
                    <div>Age Group: {(selectedProvider as any).ageGroup}</div>
                    <div>Address: {(selectedProvider as any).address}</div>
                  </div>
                )}
                {selectedProvider.type === "sports" && (
                  <div>
                    <div>Owner: {(selectedProvider as any).owner}</div>
                    <div>Available: {(selectedProvider as any).availableTime}</div>
                    <div>Age Group: {(selectedProvider as any).ageGroup}</div>
                    <div>Address: {(selectedProvider as any).address}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label>Select Date</Label>
              <div className="mt-2">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </div>
              {date && <div className="text-sm text-muted-foreground mt-1">Selected: {format(date, "PPP")}</div>}
            </div>

            <div className="space-y-2">
              <Label>Select Time</Label>
              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 bg-green-500 rounded-sm" /> Available</span>
                <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 bg-red-500 rounded-sm" /> Booked</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {timeSlots.map((slot) => {
                  const isSelected = timeSlot === slot.id;
                  const cls = slot.available
                    ? `border-green-500 text-green-700 hover:bg-green-50 ${isSelected ? "bg-green-100" : ""}`
                    : `border-red-500 text-red-700 bg-red-50 cursor-not-allowed`;
                  return (
                    <button
                      key={slot.id}
                      className={`border rounded-md px-3 py-2 text-sm text-left ${cls}`}
                      disabled={!slot.available}
                      onClick={() => setTimeSlot(slot.id)}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <Button variant="secondary" onClick={() => (step === 1 ? handleClose(false) : setStep((s) => (s - 1) as any))}>
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            {step < 3 && (
              <Button onClick={() => setStep((s) => (s + 1) as any)} disabled={(step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)}>
                Continue
              </Button>
            )}
            {step === 3 && (
              <Button onClick={() => { alert("Booked! (demo)"); handleClose(false); }} disabled={!canProceedStep3}>Confirm Booking</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
