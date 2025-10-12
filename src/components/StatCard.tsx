import { LucideIcon, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  iconBg?: string;
}

const StatCard = ({ title, value, change, icon: Icon, iconBg = 'bg-accent/10' }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${iconBg}`}>
            <Icon size={24} className="text-accent" />
          </div>
          <button className="p-1 hover:bg-muted rounded transition-smooth">
            <MoreVertical size={18} className="text-muted-foreground" />
          </button>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold mb-2">{value}</h3>
          <p className={`text-sm font-medium ${isPositive ? 'stat-positive' : 'stat-negative'}`}>
            {isPositive ? '+' : ''}{change}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;