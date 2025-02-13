
import { useState } from 'react';
import { Upload, File, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Document {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_type: string;
  created_at: string;
}

export const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Salvar metadados no banco
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          title: file.name,
          description: '',
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
        });

      if (dbError) throw dbError;

      toast({
        title: "Sucesso!",
        description: "Documento enviado com sucesso.",
      });

      // Recarregar lista de documentos
      loadDocuments();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar o documento.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const loadDocuments = async () => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os documentos.",
        variant: "destructive",
      });
      return;
    }

    setDocuments(data || []);
  };

  const handleDelete = async (id: string, filePath: string) => {
    try {
      // Deletar arquivo do storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Deletar registro do banco
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast({
        title: "Sucesso!",
        description: "Documento excluído com sucesso.",
      });

      // Atualizar lista
      loadDocuments();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o documento.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload de Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="document">Documento</Label>
              <Input
                id="document"
                type="file"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{doc.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <File className="h-8 w-8 text-gray-400" />
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const { data } = supabase.storage
                        .from('documents')
                        .getPublicUrl(doc.file_path);
                      window.open(data.publicUrl, '_blank');
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(doc.id, doc.file_path)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
