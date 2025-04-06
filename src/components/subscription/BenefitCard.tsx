
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, icon }) => {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default BenefitCard;
