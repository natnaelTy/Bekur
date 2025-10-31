"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search } from "lucide-react";

type Applicant = {
  id: string;
  name: string;
  email: string;
  country: string;
  status: "Pending" | "Accepted" | "Rejected";
  appliedDate: string;
};

export default function LatestApplicantsPage() {
  const [search, setSearch] = useState("");
  const applicants: Applicant[] = [
    {
      id: "1",
      name: "Natnael Taye",
      email: "natitaye316@gmail.com",
      country: "Canada",
      status: "Accepted",
      appliedDate: "2025-10-30",
    },
    {
      id: "2",
      name: "Sara Mekonnen",
      email: "sara.mekonnen@example.com",
      country: "Germany",
      status: "Pending",
      appliedDate: "2025-10-28",
    },
    {
      id: "3",
      name: "Abdul Rahman",
      email: "abdul.rahman@example.com",
      country: "UAE",
      status: "Rejected",
      appliedDate: "2025-10-25",
    },
  ];

  const filtered = applicants.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-h-screen p-6">
      <Card className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card  shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Latest Applicants
              </CardTitle>
              <CardDescription>
                Track the newest student applications and their current status.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search applicants..."
                className="w-[200px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" /> Search
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell className="font-medium">
                    {applicant.name}
                  </TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.country}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        applicant.status === "Accepted"
                          ? "default"
                          : applicant.status === "Pending"
                          ? "secondary"
                          : "destructive"
                      }
                      className="px-2 py-1 rounded-full text-xs"
                    >
                      {applicant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{applicant.appliedDate}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No applicants found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
            <span>Showing {filtered.length} of {applicants.length} applicants</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Previous</Button>
              <Button size="sm" variant="outline">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
