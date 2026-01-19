"use client";

import { Card, CardContent } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type Applicant = {
  id: string;
  fullName: string;
  email: string;
  country_applying_to: string;
  status: string;
  createdAt: string;
  scholarshipApplications?: any[];
  phoneNumber?: string;
  hasPassport?: boolean;
};
import dateFormate from "@/utils/DateFormate";
import { adminAPI } from "@/utils/adminAPI";



export default function AllApplicantsPage() {
  const [search, setSearch] = useState("");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const res = await adminAPI.get("/apply");
        const data = await res.data.allApplications;
        setApplicants(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplicants();
  }, []);

  const filteredApplicants = applicants.filter((applicant) => {
    const term = search.toLowerCase();
    return (
      applicant.fullName.toLowerCase().includes(term) ||
      applicant.email.toLowerCase().includes(term) ||
      applicant.country_applying_to.toLowerCase().includes(term)
    );
  });

  async function updateApproval(applicationId: string, approved: boolean) {
    try {
      await axios.patch(`/api/admin/approve/${applicationId}`, {
        approved,
      });

      setApplicants((prev) =>
        prev.map((applicant) => {
          const primaryApplication = applicant.scholarshipApplications?.[0];
          if (primaryApplication?.id !== applicationId) return applicant;

          const updatedStatus = approved ? "APPROVED" : "IN_PROGRESS";
          return {
            ...applicant,
            scholarshipApplications: [
              { ...primaryApplication, status: updatedStatus },
            ],
          };
        })
      );

      setSelectedApplicant((prev) => {
        const primaryApplication = prev?.scholarshipApplications?.[0];
        if (!prev || primaryApplication?.id !== applicationId) return prev;

        const updatedStatus = approved ? "APPROVED" : "IN_PROGRESS";
        return {
          ...prev,
          scholarshipApplications: [
            { ...primaryApplication, status: updatedStatus },
          ],
        };
      });

      if (!approved) {
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating application:", error);
    }
  }

  function openDialog(applicant: Applicant) {
    setSelectedApplicant(applicant);
    setDialogOpen(true);
  }

  console.log(applicants);

  const motivationLetter = selectedApplicant?.scholarshipApplications?.[0]?.motivationLetter?.[0]?.content;


  return (
    <div className="max-h-screen p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">All Applicants</h2>
          <p className="text-sm text-muted-foreground">
            Track all student applications and their current status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search applicants..."
            className="w-[220px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" /> Search
          </Button>
        </div>
      </div>

      <Card className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card shadow-sm">
        <CardContent className="pt-6">
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
              {isLoading
                ? Array.from({ length: 10 }).map((_, idx) => (
                    <TableRow key={`skeleton-${idx}`}>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-40" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-36" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : filteredApplicants.map((applicant) => {
                    const primaryApplication =
                      applicant.scholarshipApplications?.[0];
                    const status = primaryApplication?.status;

                    return (
                      <TableRow key={applicant.id}>
                        <TableCell className="font-medium">
                          {applicant.fullName}
                        </TableCell>
                        <TableCell>{applicant.email}</TableCell>
                        <TableCell>{applicant.country_applying_to}</TableCell>
                        <TableCell>
                          <Badge
                            className={`px-3 py-1 rounded-full text-xs ${
                              status === "APPROVED" ||
                              status === "IN_PROGRESS"
                                ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                                : status === "SUBMITTED"
                                ? "bg-gray-400/10 text-gray-400 border border-gray-400/20"
                                : status === "REJECTED"
                                ? "bg-red-400/10 text-red-400 border border-red-400/20"
                                : ""
                            }`}
                          >
                            {status ?? "N/A"}
                          </Badge>
                        </TableCell>
                        <TableCell>{dateFormate(applicant.createdAt)}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            className="bg-blue-400"
                            onClick={() => openDialog(applicant)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {filteredApplicants.length === 0 && !isLoading && (
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
              Showing {filteredApplicants.length} of {applicants.length}{" "}
              applicants
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

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="w-[1300px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Application details</AlertDialogTitle>
            <AlertDialogDescription>
              Review the applicant information before deciding.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedApplicant && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  className={`px-3 py-1 rounded-full text-xs ${
                    selectedApplicant.scholarshipApplications?.[0]?.status === "APPROVED" ||
                    selectedApplicant.scholarshipApplications?.[0]?.status === "IN_PROGRESS"
                      ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                      : selectedApplicant.scholarshipApplications?.[0]?.status === "SUBMITTED"
                      ? "bg-gray-400/10 text-gray-400 border border-gray-400/20"
                      : selectedApplicant.scholarshipApplications?.[0]?.status === "REJECTED"
                      ? "bg-red-400/10 text-red-400 border border-red-400/20"
                      : ""
                  }`}
                >
                  {selectedApplicant.scholarshipApplications?.[0]?.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Full name</span>
                <span className="font-medium">
                  {selectedApplicant.fullName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{selectedApplicant.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Phone Number</span>
                <span className="font-medium">
                  {selectedApplicant.phoneNumber}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Country applying to
                </span>
                <span className="font-medium">
                  {selectedApplicant.country_applying_to}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Has Passport</span>
                <span className={selectedApplicant.hasPassport ? "text-green-500 font-medium" : "font-medium text-red-500"}>
                  {selectedApplicant.hasPassport ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date applied</span>
                <span className="font-medium">
                  {dateFormate(selectedApplicant.createdAt)}
                </span>
              </div>
            </div>
          )}

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Motivation Letter</h3>
            <div className="max-h-48 overflow-y-auto p-4 border border-gray-200 rounded-md bg-gray-50">
              <p className="whitespace-pre-wrap text-sm text-gray-700">
                {motivationLetter || "No motivation letter provided."}
              </p>
            </div>
          </div>
          
          <AlertDialogFooter className="flex items-center gap-5">
            <AlertDialogCancel className="rounded-full sm">
              Close
            </AlertDialogCancel>
            {selectedApplicant && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    updateApproval(
                      selectedApplicant.scholarshipApplications?.[0]?.id ?? "",
                      false
                    )
                  }
                  disabled={!selectedApplicant.scholarshipApplications?.[0]?.id}
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    updateApproval(
                      selectedApplicant.scholarshipApplications?.[0]?.id ?? "",
                      true
                    )
                  }
                  disabled={!selectedApplicant.scholarshipApplications?.[0]?.id}
                >
                  Approve
                </Button>
              </div>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
