
import React from 'react';
import { Check, X } from "lucide-react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Benefit {
  id: string;
  name: string;
  available: boolean;
  icon?: React.ReactNode;
  description?: string;
}

interface SubscriptionPlanCardProps {
  name: string;
  description: string;
  price: number;
  benefits: Benefit[];
  isHighlighted?: boolean;
  onSelectPlan: () => void;
  buttonText?: string;
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  name,
  description,
  price,
  benefits,
  isHighlighted = false,
  onSelectPlan,
  buttonText = "Selecionar plano"
}) => {
  return (
    <Card className={`relative h-full flex flex-col ${isHighlighted ? 'shadow-lg ring-2 ring-primary/20' : 'shadow'}`}>
      {isHighlighted && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-sm font-medium py-1 px-4 rounded-full">
          Mais popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">R$ {price.toFixed(2)}</span>
          <span className="text-gray-500 ml-2">/mês</span>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {benefits.map((benefit) => (
            <li key={benefit.id} className="flex items-start">
              {benefit.available ? (
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              )}
              <span className={`${!benefit.available ? 'text-gray-400' : 'text-gray-700'}`}>
                {benefit.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSelectPlan} 
          className="w-full"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPlanCard;
