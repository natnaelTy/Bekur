"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useSession } from "@/lib/auth-client";
import { Lock, Bell, CreditCard, HelpCircle, UserPen } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="space-y-6 py-28 dark:bg-gray-950 min-h-screen w-full">
      <div className="max-w-7xl px-4 w-full mx-auto dark:bg-gray-950">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal information, security, and preferences.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-4 items-start md:grid-cols-5 gap-3 bg-muted/30 rounded-xl">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 text-xs md:text-sm "
            >
              <UserPen className="w-2 h-2 md:w-4 md:h-4" /> Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center gap-2 text-xs md:text-sm "
            >
              <Lock className="w-2 h-2 md:w-4 md:h-4" /> Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2 text-xs md:text-sm "
            >
              <Bell className="w-2 h-2 md:w-4 md:h-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="flex items-center gap-2 text-xs md:text-sm "
            >
              <CreditCard className="w-2 h-2 md:w-4 md:h-4" /> Payments
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="flex items-center gap-2 text-xs md:text-sm "
            >
              <HelpCircle className="w-2 h-2 md:w-4 md:h-4" /> Support
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-6 bg-gray-50 dark:bg-gray-950"
            >
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="dark:bg-gray-950">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={user?.image}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback>
                          {user?.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-2">Full Name </Label>
                        <Input
                          placeholder="Enter full name"
                          defaultValue={user?.name || ""}
                        />
                      </div>
                      <div>
                        <Label className="mb-2">Phone Number</Label>
                        <Input placeholder="+251..." />
                      </div>
                      <div>
                        <Label className="mb-2">Country</Label>
                        <Input placeholder="Ethiopia" />
                      </div>
                      <div>
                        <Label className="mb-2">Language</Label>
                        <Input placeholder="English" />
                      </div>
                    </div>
                    <Button className="mt-4">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card className="dark:bg-gray-950">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="mb-2">Current Password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <Label className="mb-2">New Password</Label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <Button>Update Password</Button>

                    <Separator className="my-4" />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete Account</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="dark:bg-gray-950">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card className="dark:bg-gray-950">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Email Notifications</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>SMS Updates</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Newsletter Subscription</Label>
                      <Switch defaultChecked />
                    </div>
                    <Button className="mt-4">Save Preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payments Tab */}
              <TabsContent value="payments">
                <Card className="dark:bg-gray-950">
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      You can review your recent payments or download invoices.
                    </p>

                    <div className="border rounded-lg p-4">
                      <p>
                        Visa Application Fee -{" "}
                        <span className="text-green-600">Paid</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Date: 2025-09-12
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Amount: 5,000 ETB
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Support Tab */}
              <TabsContent value="support">
                <Card className="dark:bg-gray-950">
                  <CardHeader>
                    <CardTitle>Support</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Need help with your application or account? We’re here to
                      help.
                    </p>
                    <Button variant="outline">Contact Support</Button>
                    <Separator />
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>📄 Terms of Service</p>
                      <p>🔒 Privacy Policy</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
}
