
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { File, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DocumentCardProps {
  id: string;
  title: string;
  file_path: string;
  onDelete: (id: string, filePath: string) => void;
}

export const DocumentCard = ({ id, title, file_path, onDelete }: DocumentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
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
                  .getPublicUrl(file_path);
                window.open(data.publicUrl, '_blank');
              }}
            >
              Download
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(id, file_path)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
