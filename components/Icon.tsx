
import React from 'react';
import { 
  Droplets, 
  Stethoscope, 
  Trash2, 
  Home, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Users,
  MessageSquare,
  Globe,
  Facebook,
  Instagram,
  Share2,
  ExternalLink,
  Send,
  Heart
} from 'lucide-react';

const icons = {
  Droplets,
  Stethoscope,
  Trash2,
  Home,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Users,
  MessageSquare,
  Globe,
  Facebook,
  Instagram,
  Share2,
  ExternalLink,
  Send,
  Heart
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 24 }) => {
  const LucideIcon = (icons as any)[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} size={size} />;
};
