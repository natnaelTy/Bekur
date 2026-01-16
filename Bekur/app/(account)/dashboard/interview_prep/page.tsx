"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Clock, MessageSquare, FileText } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function InterviewPrepPage() {
  const [progress, setProgress] = useState(45);
  const [scheduled, setScheduled] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [value, setValue] = React.useState("");



  function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

  const handleSchedule = () => {
    if (date) {
      setScheduled(true);
    }
  };

  const handleSubmitFeedback = () => {
    setFeedback("");
  };

  return (
    <div className="min-h-screen py-26 px-3 md:px-8">
      <h1 className="text-3xl font-bold mb-4">Interview Preparation</h1>
      <p className="mb-10 max-w-3xl">
        Prepare for your upcoming embassy or university interview. Below are
        your preparation steps, mock interview scheduler, and feedback section
        to help you succeed.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preparation Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Preparation Progress</CardTitle>
            <CardDescription>
              Complete the checklist below to boost your confidence.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} className="w-full" />
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500 w-4 h-4" /> Reviewed
                common visa questions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500 w-4 h-4" /> Prepared
                financial documents
              </li>
              <li className="flex items-center gap-2">
                <Clock className="text-yellow-500 w-4 h-4" /> Practicing
                confidence & body language
              </li>
              <li className="flex items-center gap-2">
                <Clock className="text-yellow-500 w-4 h-4" /> Researching
                university background
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* interview scheduler */}
        <Card>
          <CardHeader>
            <CardTitle>Mock Interview Scheduling</CardTitle>
            <CardDescription>
              Choose a date for your mock interview session.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                  Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="10:30:00"
                  onChange={(e) => setValue(e.target.value)}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>
            <Button
              disabled={!date}
              onClick={handleSchedule}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              Schedule Mock Interview
            </Button>

            {scheduled && (
              <div className="mt-4">
                <Badge variant="secondary" className="bg-green-700 text-white">
                  Scheduled for {new Date(formatDate(date)).toLocaleDateString()} at {value}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* document verification */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Document Verification</CardTitle>
            <CardDescription>
              Ensure all your documents are verified before your interview.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Passport Scan</span>
                <Badge className="bg-green-600 text-white">Verified</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span>Bank Statement</span>
                <Badge className="bg-yellow-500 text-white">Pending</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span>Invitation Letter</span>
                <Badge className="bg-green-600 text-white">Verified</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* feedback */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Interview Feedback</CardTitle>
            <CardDescription>
              Once you’ve completed your mock interview, leave notes or get
              advice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start gap-3">
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write feedback or reflections..."
                className="min-h-[100px]"
              />
            </div>
            <Button
              onClick={handleSubmitFeedback}
              disabled={!feedback}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
