import { ReactNode } from "react";

interface ThemeWrapperProps {
  children: ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <div className="font-body text-white bg-[#121212]">
      {children}
    </div>
  );
}
