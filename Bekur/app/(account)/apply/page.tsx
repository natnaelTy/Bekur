"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";
import { getCountries } from "@/lib/Country";
import Flag from "@/app/components/Flag";
import { emoji } from "zod/v4";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

export default function ApplyPage() {
  const params = useParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    dateOfBirth: undefined as Date | undefined,
    purpose: "",
    hasPassport: "",
    transcript: null as File | null,
    photo: null as File | null,
  });
  const [countries, setCountries] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const { data: session, isPending, error } = useSession();
  const userId = session?.user?.id;

  const handleFileChange = (field: string, file: File | null) => {
    setFormData({ ...formData, [field]: file });
  };

  // fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const Flag = ({ emoji }: { emoji: string }) => (
    <span className="text-lg">{emoji}</span>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/api/search/${userId}`, {
        fullName: formData.fullName,
        phoneNumber: formData.phone,
        purpose: formData.purpose,
        passport: formData.hasPassport,
        country: formData.country,
        dateOfBirth: formData.dateOfBirth
          ? formData.dateOfBirth.toISOString()
          : undefined,
        email: formData.email,
      });

      toast.success("Application submitted successfully");
      setIsApplied(true);
    } catch (error) {
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("User ID:", userId);
  if (isApplied) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center dark:bg-gray-950 bg-gray-50 p-6">
        <h2 className="text-3xl font-semibold text-green-500 mb-4">
          🎉 Application Submitted!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-md">
          Thank you for applying. You’ll receive updates once your application
          is reviewed. You can track your progress on your dashboard.
        </p>
        <Button
          className="mt-6"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-3 flex justify-center py-26 relative overflow-hidden">
      <Card className="max-w-3xl w-full z-1 bg-white dark:bg-gray-950 shadow-xl border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            🎓 Apply for Scholarship / Event
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-1">
            Fill in your details carefully — you can only apply once.
          </p>
        </CardHeader>
        <div></div>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  className="mt-2 bg-gray-50 dark:bg-gray-900/50"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="mt-2 bg-gray-50 dark:bg-gray-900/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="mt-2 bg-gray-50 dark:bg-gray-900/50"
                />
              </div>

              {/* Birthday Date */}
              <div className="flex flex-col space-y-1.5">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger
                    asChild
                    className="mt-1 bg-gray-50 dark:bg-gray-900/50 dark:hover:bg-gray-800/50"
                  >
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dateOfBirth && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfBirth ? (
                        format(formData.dateOfBirth, "PPP")
                      ) : (
                        <span>Select your birthday</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-950">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfBirth}
                      onSelect={(date: any) =>
                        setFormData({ ...formData, dateOfBirth: date })
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Country */}
            <div>
              <Label>Country Applying To</Label>
              <Select
                value={formData.country}
                onValueChange={(val) =>
                  setFormData({ ...formData, country: val })
                }
              >
                <SelectTrigger className="mt-2 bg-gray-50 dark:bg-gray-900/50 w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-950">
                  {countries.map((country) => (
                    <SelectItem
                      className="hover:dark:bg-gray-900"
                      key={country.id}
                      value={country.name}
                    >
                      {Flag({ emoji: country.emoji })} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Purpose */}
            <div>
              <Label>Purpose of Applying</Label>
              <Select
                value={formData.purpose}
                onValueChange={(val) =>
                  setFormData({ ...formData, purpose: val })
                }
              >
                <SelectTrigger className="mt-2 bg-gray-50 dark:bg-gray-900/50 w-full">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-950">
                  <SelectItem className="hover:dark:bg-gray-900" value="study">
                    Study
                  </SelectItem>
                  <SelectItem className="hover:dark:bg-gray-900" value="work">
                    Work
                  </SelectItem>
                  <SelectItem className="hover:dark:bg-gray-900" value="event">
                    Event
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Passport */}
            <div>
              <Label>Do you have a passport?</Label>
              <Select
                value={formData.hasPassport}
                onValueChange={(val) =>
                  setFormData({ ...formData, hasPassport: val })
                }
              >
                <SelectTrigger className="mt-2 bg-gray-50 dark:bg-gray-900/50 w-full">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-950">
                  <SelectItem className="hover:dark:bg-gray-900" value="yes">
                    Yes
                  </SelectItem>
                  <SelectItem className="hover:dark:bg-gray-900" value="no">
                    No
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Upload Transcript</Label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg mt-2 cursor-pointer dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formData.transcript
                        ? formData.transcript.name
                        : "Click to upload transcript"}
                    </p>
                  </div>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        "transcript",
                        e.target.files?.[0] || null
                      )
                    }
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <Label>Upload Passport Photo</Label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg mt-2 cursor-pointer dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formData.photo
                        ? formData.photo.name
                        : "Click to upload passport photo"}
                    </p>
                  </div>
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange("photo", e.target.files?.[0] || null)
                    }
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={
                `w-full font-semibold text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 rounded-full` +
                (isSubmitting && "  cursor-not-allowed")
              }
            >
              {isSubmitting ? "" : "Submit Application"}
              {isSubmitting && <Spinner aria-setsize={5} className="h-5 w-5" />}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div
        style={{
          background:
            "radial-gradient(ellipse at center,rgba(0, 255, 68, 0.07),rgba(0, 255, 26, 0.09),rgba(255, 255, 255, 1))",
        }}
        className="absolute top-0 left-0 w-[500px] h-[550px] rounded-full blur-3xl opacity-80 skew-x-32 dark:hidden"
      ></div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at bottom,rgba(255, 0, 234, 0.12),rgba(255, 0, 234, 0.13),rgba(255, 255, 255, 1))",
        }}
        className="absolute bottom-0 left-0 w-[200px] h-[250px] rounded-full blur-3xl opacity-80 skew-x-32 dark:hidden"
      ></div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at top,rgba(0, 115, 255, 0.12),rgba(0, 132, 255, 0.09),rgba(255, 255, 255, 1))",
        }}
        className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-3xl opacity-80 dark:hidden"
      ></div>
    </div>
  );
}
