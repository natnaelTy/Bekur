"use client";

import { useState } from "react";
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

export default function ApplyPage() {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleFileChange = (field: string, file: File | null) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 1500));
      setIsApplied(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-3 flex justify-center py-26">
      <Card className="max-w-3xl w-full dark:bg-gray-950 shadow-xl border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            🎓 Apply for Scholarship / Event
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Fill in your details carefully — you can only apply once.
          </p>
        </CardHeader>

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
                />
              </div>

              {/* Birthday Date */}
              <div className="flex flex-col space-y-1.5">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
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
                  <PopoverContent className="w-auto p-0 bg-gray-50 dark:bg-gray-950">
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">🇺🇸 USA</SelectItem>
                  <SelectItem value="Canada">🇨🇦 Canada</SelectItem>
                  <SelectItem value="UK">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="Germany">🇩🇪 Germany</SelectItem>
                  <SelectItem value="UAE">🇦🇪 UAE</SelectItem>
                  <SelectItem value="Saudi Arabia">🇸🇦 Saudi Arabia</SelectItem>
                  <SelectItem value="Japan">🇯🇵 Japan</SelectItem>
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="study">Study</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Upload Transcript</Label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
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
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
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
              disabled={isSubmitting}
              className={cn(
                "w-full font-semibold text-white",
                isSubmitting && "opacity-70 cursor-not-allowed"
              )}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
