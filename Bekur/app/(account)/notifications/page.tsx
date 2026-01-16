"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, FileText, CreditCard, GraduationCap, Check } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Application Submitted",
      message: "Your application for a scholarship in Germany has been received successfully.",
      category: "application",
      time: new Date(Date.now() - 1000 * 60 * 60 * 3),
      read: false,
    },
    {
      id: 2,
      title: "Visa Interview Scheduled",
      message:
        "Your visa interview has been scheduled for November 12 at 10:00 AM. Please arrive 30 minutes early.",
      category: "interview",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: false,
    },
    {
      id: 3,
      title: "Payment Reminder",
      message:
        "Please complete your remaining payment of 20,000 ETB to receive your acceptance letter.",
      category: "payment",
      time: new Date(Date.now() - 1000 * 60 * 60 * 26),
      read: true,
    },
    {
      id: 4,
      title: "New Scholarship Match Found",
      message:
        "We found new scholarships in the Netherlands that match your profile! Check them out.",
      category: "application",
      time: new Date(Date.now() - 1000 * 60 * 60 * 50),
      read: true,
    },
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      }))
    );
  };

  const getIcon = (category: string) => {
    switch (category) {
      case "application":
        return <FileText className="text-blue-500 w-5 h-5" />;
      case "payment":
        return <CreditCard className="text-yellow-500 w-5 h-5" />;
      case "interview":
        return <GraduationCap className="text-green-500 w-5 h-5" />;
      default:
        return <Bell className="text-gray-500 w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto w-full py-26 lg:py-30 px-3 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button
          variant="outline"
          onClick={handleMarkAllAsRead}
          className="border-gray-700"
        >
          <Check className="w-4 h-4 mr-2" /> Mark all as read
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>Stay up to date with your application journey.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-start gap-3 py-4 transition-all ${
                notif.read
                  ? "opacity-70"
                  : "rounded-lg px-3"
              }`}
            >
              {getIcon(notif.category)}
              <div className="flex-1">
                <h3 className="font-semibold text-base">{notif.title}</h3>
                <p className="text-sm">
                  {notif.message}
                </p>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span>{formatDistanceToNow(notif.time, { addSuffix: true })}</span>
                  {!notif.read && (
                    <Badge variant="secondary" className="bg-blue-600 text-white">
                      New
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
