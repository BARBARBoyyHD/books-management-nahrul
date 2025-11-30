declare module "swagger-ui-react" {
  import * as React from "react";

  interface SwaggerUIProps {
    url?: string;
    spec?: object;
    docExpansion?: "none" | "list" | "full";
    layout?: string;
    deepLinking?: boolean;
    // add more props if needed
  }

  const SwaggerUI: React.FC<SwaggerUIProps>;
  export default SwaggerUI;
}
