
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { InvoiceViewer } from "@/components/invoices/InvoiceViewer";

const ClientInvoices = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <ClientSidebar className="w-64 hidden md:block" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Faturas e Recibos</h1>
            <InvoiceViewer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientInvoices;
