"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  AlertTriangle,
  Upload,
  X,
  Lock,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

export default function PaymentPage() {
  const [status, setStatus] = useState("Applied");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const totalPayment = 250000;
  const priorPayment = 5000;
  const remainingPayment = totalPayment - priorPayment;

  const bankAccounts: Record<string, string> = {
    "Commercial Bank of Ethiopia": "1000456789000 (CBE)",
    "Awash Bank": "1234567890123 (Awash)",
    Telebirr: "0900-555-222",
  };

  const paymentHistory = [
    {
      id: 1,
      date: "2025-08-12",
      method: "Telebirr",
      amount: "5,000 ETB",
      status: "Completed",
    },
    {
      id: 2,
      date: "2025-10-01",
      method: "Awash Bank",
      amount: "5,000 ETB",
      status: "Pending",
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setPreview(null);
  };

  const renderPaymentButton = () => {
    if (status === "Applied") {
      return (
        <Button
          disabled
          className="w-full bg-muted text-muted-foreground cursor-not-allowed rounded-full"
        >
          <Lock className="mr-2 h-4 w-4" />
          Pay for Visa Appointment
        </Button>
      );
    }

    if (status === "Accepted") {
      return (
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
          Pay for Visa Appointment (5,000 ETB)
        </Button>
      );
    }

    if (status === "Interview Passed") {
      return (
        <div className="flex flex-col gap-3">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full">
            Complete Remaining Payment ({remainingPayment.toLocaleString()} ETB)
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="px-3 md:px-6 lg:px-10 w-full min-h-screen py-26 ">
        <h1 className="text-3xl font-bold mb-6 text-left">Payment Details</h1>

        <Card className="mx-auto border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <CreditCard className="w-5 h-5 text-blue-500" />
              Payment Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Payment Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="mb-1">
                  Application Status
                </p>
                <Badge
                  variant="outline"
                  className={`${
                    status === "Interview Passed"
                      ? "bg-green-100 text-green-700 px-3"
                      : status === "Accepted"
                      ? "bg-blue-100 text-blue-700 px-3"
                      : "bg-gray-100 text-gray-700 px-3"
                  }`}
                >
                  {status}
                </Badge>
              </div>
              <div>
                <p>
                  Total Payment
                </p>
                <p className="font-semibold">
                  {totalPayment.toLocaleString()} ETB
                </p>
              </div>
              <div>
                <p>
                  Prior Payment
                </p>
                <p className="text-green-600 font-semibold">
                  {priorPayment.toLocaleString()} ETB
                </p>
              </div>
              <div>
                <p>Remaining</p>
                <p className="text-yellow-600 font-semibold">
                  {remainingPayment.toLocaleString()} ETB
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-6 border-t">
              <p className="font-semibold mb-2">Select Payment Method</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "Telebirr",
                  "Commercial Bank of Ethiopia",
                  "Awash Bank",
                  "Chapa Pay",
                ].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer ${
                      selectedMethod === method
                        ? "border-blue-600"
                        : ""
                    }`}
                  >
                    <Checkbox
                      checked={selectedMethod === method}
                      onCheckedChange={() =>
                        setSelectedMethod(
                          selectedMethod === method ? null : method
                        )
                      }
                    />
                    <span className="text-sm">{method}</span>
                  </label>
                ))}
              </div>

              {/* Bank Info */}
              {selectedMethod &&
                selectedMethod !== "Chapa Pay" &&
                bankAccounts[selectedMethod] && (
                  <div className="mt-4 p-3 rounded-md border-1">
                    <p className="text-sm">
                      Please make your payment to:
                    </p>
                    <p className="font-semibold mt-3 flex flex-col gap-1">
                      <span>
                        Account Number: {bankAccounts[selectedMethod]}
                      </span>
                      <span className="font-semibold">
                        Account Name: Natnael Taye Hagota
                      </span>
                      <span className="text-xs md:text-sm font-medium text-amber-400 mt-5 flex items-center gap-1">
                       <AlertTriangle className="inline-block size-4"/> Make sure to screenshot or save the payment
                        confirmation.
                      </span>
                    </p>
                  </div>
                )}
            </div>

            {/* File Uploader */}
            <div className="pt-6 border-t">
              <p className="font-semibold mb-3">Upload Screenshot or Invoice</p>

              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                {!file ? (
                  <>
                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
                    >
                      Choose File
                    </label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    {preview && (
                      <Image
                        src={preview}
                        alt="Preview"
                        width={160}
                        height={160}
                        className="rounded-md border border-gray-200"
                      />
                    )}
                    <p className="text-sm">{file.name}</p>
                    <div className="flex gap-3">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white text-sm"
                        onClick={() => alert("Mock upload complete!")}
                      >
                        Submit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleFileRemove}
                        className="flex items-center gap-1"
                      >
                        <X className="w-4 h-4" /> Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">{renderPaymentButton()}</div>
          </CardContent>
        </Card>

        {/* Note */}
        <div className="mt-10 mx-auto mb-6 bg-red-400/5 text-red-700 text-sm rounded-lg p-3">
          <AlertTriangle className="inline w-4 h-4 mr-1" />
          If you fail your interview, you don’t need to pay again for the second
          round. If you pass and don’t complete the remaining payment, your
          acceptance letter will not be released.
        </div>

        {/* Payment History */}
        <div className="px-4 py-2 w-full rounded-md border mx-auto mt-10">
          <p className="font-semibold mb-3">Payment History</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.date}</TableCell>
                  <TableCell>{p.method}</TableCell>
                  <TableCell>{p.amount}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        p.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
