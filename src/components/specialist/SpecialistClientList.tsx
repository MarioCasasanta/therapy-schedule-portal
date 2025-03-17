
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Mail, Calendar, Phone } from "lucide-react";

interface Client {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  telefone?: string;
  // Add other client properties as needed
}

interface SpecialistClientListProps {
  especialistaId?: string;
}

export const SpecialistClientList = ({ especialistaId }: SpecialistClientListProps) => {
  const [clientList, setClientList] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch clients associated with the specialist from the database
      const { data, error } = await supabase
        .from('profiles') // Replace 'clients' with your actual table name
        .select('*')
        .eq('role', 'client'); // Assuming you have a 'role' column to differentiate clients

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        return data as Client[];
      } else {
        return [];
      }
    } catch (error: any) {
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadClients = async () => {
      try {
        const clients = await fetchClients();
        setClientList(clients);
      } catch (error: any) {
        console.error("Error loading clients:", error);
        setError(error.message);
      }
    };

    loadClients();
  }, []);

  if (loading) {
    return <div className="py-8 text-center">Carregando clientes...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">Erro: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Clientes</CardTitle>
        <CardDescription>
          Gerencie seus {clientList.length} clientes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {clientList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientList.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      {client.full_name || "Cliente sem nome"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      {client.email || "Sem email"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      {client.telefone || "Não informado"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {new Date(client.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link 
                      to={`/admin/clients/${client.id}`} 
                      className="text-primary hover:underline"
                    >
                      Ver detalhes
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            Nenhum cliente encontrado.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
