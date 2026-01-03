import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  } as any, // <--- Adding 'as any' fixes the red line error
};

export default nextConfig;