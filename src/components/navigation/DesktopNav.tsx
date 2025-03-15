
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
      <a href="#about" className="text-sage-600 hover:text-sage-800 transition-colors">
        Sobre
      </a>
      
      {user && isAdmin && (
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
