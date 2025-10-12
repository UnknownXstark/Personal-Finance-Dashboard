import { Search, Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">Welcome back, {userName}</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Here's an overview of all of your balances.
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
          <Search size={20} className="text-muted-foreground" />
        </button>
        
        <button className="p-2 hover:bg-muted rounded-lg transition-smooth relative">
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
        
        <Avatar className="h-10 w-10 bg-accent cursor-pointer">
          <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default DashboardHeader;
