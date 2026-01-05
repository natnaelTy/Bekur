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
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";

type Applicant = {
  id: string;
  fullName: string;
  email: string;
  country_applying_to: string;
  status: string;
  createdAt: string;
  scholarshipApplications?: any[];
};
import dateFormate from "@/utils/DateFormate";




export default function LatestApplicantsPage() {
  const [search, setSearch] = useState("");
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    async function fetchApplicants() {
      const res = await axios.get("/api/admin/apply");
      const data = await res.data.allApplications;
      setApplicants(data);
    }

    fetchApplicants();
  }, []);

  async function handleApprove(applicantId: string) {
    try {
      await axios.patch(`/api/admin/approve/${applicantId}`, {
        approved: true
      });
    } catch (error) {
      console.error("Error approving applicant:", error);
    }
  }


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
                <TableHead>Country Applying To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell className="font-medium">
                    {applicant.fullName}
                  </TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.country_applying_to}</TableCell>
                  <TableCell>
                    {(() => {
                      const status = applicant.scholarshipApplications?.[0]?.status;
                      return (
                        <Badge
                          className={`px-3 py-1 rounded-full text-xs ${status === "APPROVED" || status === "IN_PROGRESS"
                            ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                            : status === "SUBMITTED"
                            ? "bg-gray-400/10 text-gray-400 border border-gray-400/20"
                            : status === "REJECTED"
                            ? "bg-red-400/10 text-red-400 border border-red-400/20"
                            : ""
                          }`}
                        >
                          {status}
                        </Badge>
                      );
                    })()}
                  </TableCell>
                  <TableCell>{dateFormate(applicant.createdAt)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(applicant.scholarshipApplications?.[0]?.id)}
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
              {applicants.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-gray-500"
                  >
                    No applicants found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
            <span>
              Showing {applicants.length} of {applicants.length} applicants
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Previous
              </Button>
              <Button size="sm" variant="outline">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
