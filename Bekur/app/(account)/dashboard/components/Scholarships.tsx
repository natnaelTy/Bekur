import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Scholarships({ hasApplied }: { hasApplied: boolean }) {
  const related = [
    { name: "Japan MEXT Scholarship", deadline: "Dec 15, 2025" },
    { name: "Korea Global Scholarship", deadline: "Jan 10, 2026" },
  ];

  const suggested = [
    { name: "Turkish Government Scholarship", deadline: "Nov 30, 2025" },
    { name: "DAAD Germany Scholarship", deadline: "Dec 20, 2025" },
  ];

  const list = hasApplied ? related : suggested;

  return (
    <Card className="bg-white dark:bg-gray-950">
      <CardHeader>
        <CardTitle>{hasApplied ? "Related Scholarships" : "Suggested Scholarships"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {list.map((item) => (
          <div key={item.name} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-700 dark:text-gray-400">Deadline: {item.deadline}</p>
          </div>
        ))}
        {hasApplied && (
          <p className="text-sm text-gray-700 dark:text-gray-400 mt-3">
            Apply now to see personalized scholarships matched to your profile.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
