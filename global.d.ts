declare global {
  interface Window {
    __triggerRateLimit?: (resource: string, resetTime: number) => void;
  }
}

declare module "*.css";

export {};
