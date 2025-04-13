
import { BackButton } from "@/components/ui/back-button";
import { PropsWithChildren } from "react";

interface PageLayoutProps {
  showBackButton?: boolean;
  className?: string;
}

export const PageLayout = ({
  children,
  showBackButton = true,
  className = "",
}: PropsWithChildren<PageLayoutProps>) => {
  return (
    <div className={`container mx-auto px-4 ${className}`}>
      {showBackButton && (
        <div className="py-4">
          <BackButton />
        </div>
      )}
      {children}
    </div>
  );
};
