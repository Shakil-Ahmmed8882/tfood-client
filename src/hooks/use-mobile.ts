

import * as React from "react";

const MOBILE_BREAKPOINT = 1280; // Below this width, isMobile should be true

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth < MOBILE_BREAKPOINT);

  React.useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", updateIsMobile);
    updateIsMobile(); // Ensure it runs once on mount

    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  console.log("___________>>>>isMobile<<<<", isMobile);

  return isMobile; // ✅ Correct return based on the screen width
}
