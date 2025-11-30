import SwaggerComp from "@/components/docs/SwaggerComp";
import React from "react";

export default function page() {
  return (
    <section className="min-h-screen flex justify-center items-center w-full">
      <div className="w-full h-auto mb-4 mt-[100px] p-4">
        <SwaggerComp />
      </div>
    </section>
  );
}
