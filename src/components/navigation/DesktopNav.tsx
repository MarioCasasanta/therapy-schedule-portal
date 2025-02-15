
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";

interface DesktopNavProps {
  user: any;
  profile: any;
  handleLogout: () => Promise<void>;
}

export const DesktopNav = ({ user, profile, handleLogout }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <a href="#" className="text-sage-600 hover:text-sage-800 transition-colors" onClick={(e) => {
        e.preventDefault();
        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
      }}>
        Serviços
      </a>
      <a href="#" className="text-sage-600 hover:text-sage-800 transition-colors" onClick={(e) => {
        e.preventDefault();
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
      }}>
        Sobre
      </a>
      <a href="#" className="text-sage-600 hover:text-sage-800 transition-colors" onClick={(e) => {
        e.preventDefault();
        document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' });
      }}>
        Depoimentos
      </a>
      <a href="#" className="text-sage-600 hover:text-sage-800 transition-colors" onClick={(e) => {
        e.preventDefault();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      }}>
        Contato
      </a>
      {user && profile?.role === 'admin' && (
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
