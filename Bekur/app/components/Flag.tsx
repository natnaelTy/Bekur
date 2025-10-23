"use client";
import twemoji from "twemoji";

export default function Flag({ emoji }: { emoji: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: twemoji.parse(emoji, { folder: "svg", ext: ".svg" }),
      }}
      className="inline-block w-5 h-5 align-middle"
    />
  );
}
