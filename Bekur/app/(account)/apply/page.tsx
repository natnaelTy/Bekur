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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(9, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  dateOfBirth: z.date().optional(),
  hasPassport: z.enum(["yes", "no"] as const),
});

type ApplicationData = z.infer<typeof ApplicationSchema>;

export default function ApplyPage() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const [countries, setCountries] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const { data: session, isPending, error } = useSession();
  const userId = session?.user?.id;

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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ApplicationData>({
    resolver: zodResolver(ApplicationSchema),
  });

  const fetchRecommendations = async (data: ApplicationData) => {
    setLoadingRecommendations(true);
    const validation = ApplicationSchema.safeParse(data);

    const res = await fetch(
      "http://localhost:3000/api/admin/recommend-scholarships",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      }
    );

    const result = await res.json();

    setRecommendations(result.recommendations);

    if (result.recommendations.length === 0) {
      toast.info(result.message);
    }
    setLoadingRecommendations(false);
  };

  const submitApplication = async (data: ApplicationData) => {
    await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("Application submitted successfully!");
  };

  // loading state
  {
    loadingRecommendations && (
      <p className="text-sm text-gray-500">
        Finding best scholarships for you...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-3 flex justify-center py-26 relative overflow-hidden">
      <Card className="max-w-xl w-full z-1 bg-white dark:bg-gray-950 rounded-md border border-gray-100 dark:border-gray-900">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Apply for Scholarship
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-1">
            Fill in your details carefully — you can only apply once.
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(fetchRecommendations)}
            className="space-y-6"
          >
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  {...register("fullName")}
                  className="mt-2 bg-gray-50 dark:bg-gray-900/50"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register("email")}
                  className="mt-2 bg-gray-50 dark:bg-gray-900/50"
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  {...register("phone")}
                  required
                  className="mt-2 bg-gray-50 dark:bg-gray-900/50"
                />
                {errors.phone && (
                  <p className="text-red-600">{errors.phone.message}</p>
                )}
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
                        "w-full justify-start text-left font-normal"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watch("dateOfBirth")
                        ? format(watch("dateOfBirth") as Date, "PPP")
                        : "Select date of birth"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-950">
                    <Calendar
                      mode="single"
                      selected={watch("dateOfBirth")}
                      onSelect={(date) => setValue("dateOfBirth", date)}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateOfBirth && (
                  <p className="text-red-600">{errors.dateOfBirth.message}</p>
                )}
              </div>
            </div>

            {/* Country */}
            <div>
              <Label>Country Applying To</Label>
              <Select onValueChange={(val) => setValue("country", val)}>
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
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>

            {/* Passport */}
            <div>
              <Label>Do you have a passport?</Label>
              <Select
                onValueChange={(val) =>
                  setValue("hasPassport", val as "yes" | "no")
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
              {errors.hasPassport && (
                <p className="text-red-500 text-sm">
                  {errors.hasPassport.message}
                </p>
              )}
            </div>

            {/*            
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
            </div> */}
          </form>
          <button
            onClick={handleSubmit(fetchRecommendations)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Find Scholarships for Me
          </button>
        </CardContent>
      </Card>

      {/* Recommendations Drawer */}
      <Drawer
        direction="right"
        open={recommendations.length > 0}
        onOpenChange={(open) => {
          if (!open) setRecommendations([]);
        }}
      >
        <DrawerContent className="bg-gray-50 dark:bg-gray-950">
          <DrawerHeader>
            <DrawerTitle>Recommended Scholarships</DrawerTitle>
            <DrawerDescription>Select one to continue.</DrawerDescription>
          </DrawerHeader>
          <div className="no-scrollbar overflow-y-auto px-4">
            <div className="space-y-3 flex flex-col mb-10">
              {recommendations.map((scholarship) => (
                <label
                  key={scholarship.id}
                  className="flex flex-col items-start gap-3 p-3 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <input
                    type="radio"
                    name="selectedScholarship"
                    value={scholarship.id}
                    className="accent-blue-600"
                  />

                  <div>
                    <p className="font-medium">{scholarship.title}</p>
                    <p className="text-sm text-gray-600">
                      {scholarship.provider}
                    </p>
                    <p className="text-xs text-gray-500">
                      Deadline: {scholarship.deadline || "Not specified"}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-sm text-gray-600">
                      Match Score: <b>{scholarship.score}%</b>
                    </p>
                    
                    {scholarship.score >= 80 && (
                      <span className="text-green-600 text-xs">
                          High chance of acceptance
                      </span>
                    )}

                    {scholarship.score >= 60 && scholarship.score < 80 && (
                      <span className="text-yellow-600 text-xs">
                        Medium chance
                      </span>
                    )}

                    {scholarship.score < 60 && (
                      <span className="text-red-600 text-xs">Low chance</span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Background Effects */}
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
