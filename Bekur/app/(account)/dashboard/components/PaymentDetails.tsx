import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PaymentDetails() {
  const payment = {
    status: "Unpaid",
    amount: "75,000 ETB",
    method: "Telebirr",
    date: "Oct 10, 2025",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="text-sm md:text-base space-y-2">
        <p>
          <b className="text-sm md:text-base font-semibold">Status:</b>{" "}
          <span
            className={`${
              payment.status === "Paid"
                ? "text-green-500 bg-green-100 dark:text-green-400 dark:bg-gray-400/20 px-3 py-1 rounded-full"
                : "text-yellow-400 bg-yellow-100 dark:bg-gray-400/20 px-3 py-0.5 rounded-full"
            }`}
          >
            {payment.status}
          </span>
        </p>

        <p className="text-sm md:text-base font-semibold">
          Amount:{" "}
          <span className="text-green-600 dark:text-green-400 font-normal">
            {payment.amount}
          </span>
        </p>
        <p className="text-sm md:text-base font-semibold">
          Method: <span className="font-normal">{payment.method}</span>
        </p>
        <p className="text-sm md:text-base font-semibold">
          Date: <span className="font-normal">{payment.date}</span>
        </p>
      </CardContent>
    </Card>
  );
}
