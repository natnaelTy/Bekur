"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export default function InterviewPrepPage() {
  const [progress, setProgress] = useState(45);
  const [scheduled, setScheduled] = useState(false);
  const [mockDate, setMockDate] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSchedule = () => {
    if (mockDate) {
      setScheduled(true);
    }
  };

  const handleSubmitFeedback = () => {
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-26 px-3 md:px-8">
      <h1 className="text-3xl font-bold mb-4">Interview Preparation</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-3xl">
        Prepare for your upcoming embassy or university interview. Below are your preparation
        steps, mock interview scheduler, and feedback section to help you succeed.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preparation Progress */}
        <Card className="bg-white dark:bg-gray-900">
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
                <CheckCircle2 className="text-green-500 w-4 h-4" /> Reviewed common visa questions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500 w-4 h-4" /> Prepared financial documents
              </li>
              <li className="flex items-center gap-2">
                <Clock className="text-yellow-500 w-4 h-4" /> Practicing confidence & body language
              </li>
              <li className="flex items-center gap-2">
                <Clock className="text-yellow-500 w-4 h-4" /> Researching university background
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Mock Interview Scheduler */}
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Mock Interview Scheduling</CardTitle>
            <CardDescription>
              Choose a date for your mock interview session.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <Input
                type="datetime-local"
                value={mockDate}
                onChange={(e) => setMockDate(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800"
              />
            </div>
            <Button
              disabled={!mockDate}
              onClick={handleSchedule}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Schedule Mock Interview
            </Button>

            {scheduled && (
              <div className="mt-4">
                <Badge variant="secondary" className="bg-green-700 text-white">
                  Scheduled for {format(new Date(mockDate), "PPPpp")}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* document verification */}
        <Card className="bg-white dark:bg-gray-900 lg:col-span-2">
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
        <Card className="bg-white dark:bg-gray-900 lg:col-span-2">
          <CardHeader>
            <CardTitle>Interview Feedback</CardTitle>
            <CardDescription>
              Once you’ve completed your mock interview, leave notes or get advice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start gap-3">
              <MessageSquare className="w-5 h-5 mt-2 text-blue-500" />
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write feedback or reflections..."
                className="min-h-[100px] bg-gray-100 dark:bg-gray-800"
              />
            </div>
            <Button
              onClick={handleSubmitFeedback}
              disabled={!feedback}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
