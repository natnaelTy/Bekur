import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t-1 border-gray-200 dark:border-gray-900 px-4 py-6 md:px-20 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <p className="text-gray-800 dark:text-white">
        Powered by{" "}
        <span className="font-medium text-gray-900 dark:text-white">
          Mistral
        </span>{" "}
        and{" "}
        <span className="font-medium text-gray-900 dark:text-white">
          Langflow
        </span>
      </p>
      <p>
        Copyright &copy; {new Date().getFullYear()} Bekur. All right reserved.
      </p>
    </footer>
  );
}
