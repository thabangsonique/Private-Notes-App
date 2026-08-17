import React from "react";

export default function GlobalHeader({ name, title }) {
  return (
    <div>
      <h1 className="xl:text-5xl font-bold">{name}</h1>
      <p className="text-base text-text-muted font-semibold mt-3 mb-15">
        {title}
      </p>
    </div>
  );
}
