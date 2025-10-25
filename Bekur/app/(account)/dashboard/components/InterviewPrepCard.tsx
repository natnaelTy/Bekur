import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InterviewPrepCard() {
  return (
    <Card className="bg-white dark:bg-gray-950">
      <CardHeader>
        <CardTitle>Prepare for Interview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-900 dark:text-white font-semibold font-semibold">
          🗓 Interview Date:{" "}
          <span className="font-normal text-gray-500"> Nov 2, 2025</span>
        </p>
        <p className="text-gray-900 dark:text-white font-semibold">
          📍 Mode:{" "}
          <span className="font-normal text-gray-500">Online (Zoom)</span>
        </p>
        <p className="text-gray-900 dark:text-white font-semibold">💡 Tips:</p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-500 text-sm md:text-base font-normal">
          <li>Review your study motivation.</li>
          <li>Prepare common scholarship questions.</li>
          <li>Have your documents nearby.</li>
        </ul>
        <Button className="mt-3 w-full">Join Zoom Interview</Button>
      </CardContent>
    </Card>
  );
}
