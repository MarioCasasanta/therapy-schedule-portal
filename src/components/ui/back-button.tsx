
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

interface BackButtonProps {
  className?: string;
}

export const BackButton = ({ className }: BackButtonProps) => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Button 
      variant="ghost" 
      onClick={handleGoBack} 
      className={className}
      size="sm"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Voltar
    </Button>
  );
};
