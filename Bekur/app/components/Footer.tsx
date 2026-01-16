import React from "react";

export default function Footer() {
  return (
    <footer className="border-t-1 px-4 py-6 md:px-20 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <p>
        Powered by{" "}
        <span className="font-medium">
          Ollama
        </span>{" "}
        and{" "}
        <span className="font-medium">
          GPT-OSS
        </span>
      </p>
      <p>
        Copyright &copy; {new Date().getFullYear()} Bekur. All right reserved.
      </p>
    </footer>
  );
}
