
import { User, Settings, LogOut, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserMenuProps {
  user: any;
  profile: any;
  handleLogout: () => Promise<void>;
}

export const UserMenu = ({ user, profile, handleLogout }: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src={profile?.avatar_url} />
          <AvatarFallback className="bg-sage-100 text-sage-600">
            {profile?.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/perfil" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/minhas-sessoes" className="flex items-center w-full">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Minhas Sessões</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/configuracoes" className="flex items-center w-full">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
