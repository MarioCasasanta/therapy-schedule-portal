
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface Client {
  id: string;
  full_name: string;
  email: string;
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
    return <div>Loading clients...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Client List</h2>
      {clientList.length > 0 ? (
        <ul>
          {clientList.map((client) => (
            <li key={client.id}>
              <Link to={`/admin/clients/${client.id}`}>
                {client.full_name} ({client.email})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No clients found.</div>
      )}
    </div>
  );
};
