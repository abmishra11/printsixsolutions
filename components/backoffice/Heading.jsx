import React from "react";

export default function Heading({ title }) {
  return (
    <h2 className="text-2xl font-semibold text-slate-50 text-center md:text-left">
      {title}
    </h2>
  );
}
