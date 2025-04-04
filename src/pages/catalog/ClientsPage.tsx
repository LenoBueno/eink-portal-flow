import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Client {
  id: string;
  name: string;
  type: "Pessoa Física" | "Pessoa Jurídica";
  phone: string;
  mobile: string;
  email: string;
}

const ClientsPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "João Silva",
      type: "Pessoa Física",
      phone: "(11) 2222-3333",
      mobile: "(11) 99999-8888",
      email: "joao.silva@email.com",
    },
    {
      id: "2",
      name: "Maria Oliveira",
      type: "Pessoa Física",
      phone: "(11) 3333-4444",
      mobile: "(11) 98888-7777",
      email: "maria.oliveira@email.com",
    },
    {
      id: "3",
      name: "Tecidos Ltda",
      type: "Pessoa Jurídica",
      phone: "(11) 4444-5555",
      mobile: "(11) 97777-6666",
      email: "contato@tecidos.com.br",
    }
  ]);

  const handleEdit = (id: string) => {
    navigate(`/dashboard/clientes/editar/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const handleNewClient = () => {
    navigate("/dashboard/clientes/novo");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button 
          onClick={handleNewClient}
          className="bg-black hover:bg-black/90 text-white"
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      <div className="bg-white rounded-md shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium">Nome</th>
              <th className="text-left p-4 font-medium">Tipo</th>
              <th className="text-left p-4 font-medium">Telefone</th>
              <th className="text-left p-4 font-medium">Celular</th>
              <th className="text-left p-4 font-medium">E-mail</th>
              <th className="text-right p-4 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b hover:bg-muted/50">
                <td className="p-4">{client.name}</td>
                <td className="p-4">{client.type}</td>
                <td className="p-4">{client.phone}</td>
                <td className="p-4">{client.mobile}</td>
                <td className="p-4">{client.email}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => handleEdit(client.id)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      onClick={() => handleDelete(client.id)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-muted-foreground">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsPage; 