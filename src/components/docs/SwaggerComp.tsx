"use client";

import React from "react";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import "./_styles/swagger-custom.css";
const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false
});
export default function SwaggerComp() {
  return (
    <div className="text-white p-5">
      <h2 className="text-2xl font-bold mb-4">API Documentation</h2>

      <div className="rounded-xl overflow-hidden border border-white/20 backdrop-blur p-4 text-white">
        <SwaggerUI url="swagger.json" />
      </div>
    </div>
  );
}
