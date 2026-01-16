import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InterviewPrepCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prepare for Interview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="font-semibold">
          🗓 Interview Date:{" "}
          <span className="font-normal"> Nov 2, 2025</span>
        </p>
        <p className="font-semibold">
          📍 Mode:{" "}
          <span className="font-normal">Online (Zoom)</span>
        </p>
        <p className="font-semibold">💡 Tips:</p>
        <ul className="list-disc list-inside text-sm md:text-base font-normal">
          <li>Review your study motivation.</li>
          <li>Prepare common scholarship questions.</li>
          <li>Have your documents nearby.</li>
        </ul>
        <Button className="mt-3 w-full">Join Zoom Interview</Button>
      </CardContent>
    </Card>
  );
}
