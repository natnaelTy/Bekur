import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApplicationDetails() {
  const appData = {
    fullName: "Natnael Taye",
    program: "Computer Science",
    university: "Tokyo University",
    dateApplied: "Oct 5, 2025",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm md:text-base">
          <p className="text-sm md:text-base font-semibold">
          Full name:{" "}
          <span className="font-normal">
            {appData.fullName}
          </span>
        </p>
        <p className="text-sm md:text-base font-semibold">
          Program: <span className="font-normal">{appData.program}</span>
        </p>
        <p className="text-sm md:text-base font-semibold">
          University: <span className="font-normal">{appData.university}</span>
        </p>
        <p className="text-sm md:text-base font-semibold">
          Date Applied: <span className="font-normal">{appData.dateApplied}</span>
        </p>
      </CardContent>
    </Card>
  );
}
