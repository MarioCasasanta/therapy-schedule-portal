
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";

interface DesktopNavProps {
  user: any;
  profile: any;
  handleLogout: () => Promise<void>;
}

export const DesktopNav = ({ user, profile, handleLogout }: DesktopNavProps) => {
  const isAdmin = profile?.role === 'admin';

  return (
    <div className="hidden md:flex items-center space-x-8">
      <a href="#services" className="text-sage-600 hover:text-sage-800 transition-colors">
        Serviços
      </a>
      <a href="#about" className="text-sage-600 hover:text-sage-800 transition-colors">
        Sobre
      </a>
      <a href="#testimonials" className="text-sage-600 hover:text-sage-800 transition-colors">
        Depoimentos
      </a>
      <a href="#contact" className="text-sage-600 hover:text-sage-800 transition-colors">
        Contato
      </a>
      
      {user && profile && isAdmin && (
        <Link to="/dashboard" className="text-sage-600 hover:text-sage-800 transition-colors">
          Dashboard
        </Link>
      )}
      
      {user ? (
        <UserMenu user={user} profile={profile} handleLogout={handleLogout} />
      ) : (
        <Link 
          to="/auth" 
          className="bg-sage-500 text-white px-6 py-2 rounded-md hover:bg-sage-600 transition-colors"
        >
          Entrar
        </Link>
      )}
    </div>
  );
};
