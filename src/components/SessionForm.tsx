
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SessionFormProps {
  initialData?: {
    id?: string;
    data_hora?: string;
    tipo_sessao?: string;
    guest_email?: string;
    notas?: string;
    valor?: number;
    status_pagamento?: string;
    data_pagamento?: string;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const SessionForm = ({ initialData, onSubmit, onCancel }: SessionFormProps) => {
  const [formData, setFormData] = useState({
    data_hora: initialData?.data_hora || "",
    tipo_sessao: initialData?.tipo_sessao || "",
    guest_email: initialData?.guest_email || "",
    notas: initialData?.notas || "",
    valor: initialData?.valor?.toString() || "0",
    status_pagamento: initialData?.status_pagamento || "pendente",
    data_pagamento: initialData?.data_pagamento || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      valor: parseFloat(formData.valor),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="data_hora">Data e Hora</Label>
        <Input
          id="data_hora"
          type="datetime-local"
          value={formData.data_hora}
          onChange={(e) => setFormData({ ...formData, data_hora: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="tipo_sessao">Tipo de Sessão</Label>
        <Select 
          value={formData.tipo_sessao}
          onValueChange={(value) => setFormData({ ...formData, tipo_sessao: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="grupo">Grupo</SelectItem>
            <SelectItem value="avaliacao">Avaliação</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="guest_email">Email do Convidado</Label>
        <Input
          id="guest_email"
          type="email"
          value={formData.guest_email}
          onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="valor">Valor</Label>
        <Input
          id="valor"
          type="number"
          min="0"
          step="0.01"
          value={formData.valor}
          onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="status_pagamento">Status do Pagamento</Label>
        <Select 
          value={formData.status_pagamento}
          onValueChange={(value) => setFormData({ ...formData, status_pagamento: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="pago">Pago</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.status_pagamento === "pago" && (
        <div>
          <Label htmlFor="data_pagamento">Data do Pagamento</Label>
          <Input
            id="data_pagamento"
            type="datetime-local"
            value={formData.data_pagamento}
            onChange={(e) => setFormData({ ...formData, data_pagamento: e.target.value })}
          />
        </div>
      )}

      <div>
        <Label htmlFor="notas">Notas</Label>
        <Textarea
          id="notas"
          value={formData.notas}
          onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? "Atualizar" : "Criar"} Sessão
        </Button>
      </div>
    </form>
  );
};
