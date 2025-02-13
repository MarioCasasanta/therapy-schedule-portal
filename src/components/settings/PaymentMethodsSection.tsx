
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { SystemConfigController } from "@/controllers/SystemConfigController";
import type { PaymentMethodsConfig } from "@/types/system-config";

type PaymentMethod = "pix" | "credit_card" | "bank_transfer";

export function PaymentMethodsSection({ 
  initialMethods, 
  onUpdate 
}: { 
  initialMethods: PaymentMethodsConfig;
  onUpdate: (methods: PaymentMethodsConfig) => void;
}) {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsConfig>(initialMethods);

  const handlePaymentMethodUpdate = async (method: PaymentMethod, enabled: boolean) => {
    try {
      const updatedMethods = enabled
        ? [...paymentMethods.methods, method]
        : paymentMethods.methods.filter(m => m !== method);

      await SystemConfigController.update("payment_methods", { methods: updatedMethods });
      const newConfig = { methods: updatedMethods };
      setPaymentMethods(newConfig);
      onUpdate(newConfig);
      toast({
        title: "Sucesso",
        description: "Métodos de pagamento atualizados.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar métodos de pagamento",
        description: error.message,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Métodos de Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="pix">PIX</Label>
          <Switch
            id="pix"
            checked={paymentMethods.methods.includes("pix")}
            onCheckedChange={(checked) => handlePaymentMethodUpdate("pix", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="credit_card">Cartão de Crédito</Label>
          <Switch
            id="credit_card"
            checked={paymentMethods.methods.includes("credit_card")}
            onCheckedChange={(checked) => handlePaymentMethodUpdate("credit_card", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="bank_transfer">Transferência Bancária</Label>
          <Switch
            id="bank_transfer"
            checked={paymentMethods.methods.includes("bank_transfer")}
            onCheckedChange={(checked) => handlePaymentMethodUpdate("bank_transfer", checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
