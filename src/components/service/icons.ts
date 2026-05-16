import {
  Lightbulb, Layers, Globe, Code2, Search, Palette,
  Shield, BarChart3, Map, Users, TrendingUp, Award, Clock,
  ShieldCheck, Eye, Zap, FileText, Star, CheckCircle2, ChevronDown,
  ArrowRight, ArrowUpRight,
  LayoutTemplate, Puzzle, Workflow, RefreshCw, Database, Lock, Sparkles,
  MonitorSmartphone, ShoppingCart, Gauge, GitBranch, Server,
  Smartphone, BrainCircuit, Target, MapPin, Link2, BarChart2,
  Settings, Pen, Grid, BookOpen, CreditCard, Monitor, Brush, Feather,
  Package,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Lightbulb, Layers, Globe, Code2, Search, Palette,
  Shield, BarChart3, Map, Users, TrendingUp, Award, Clock,
  ShieldCheck, Eye, Zap, FileText, Star, CheckCircle2, ChevronDown,
  ArrowRight, ArrowUpRight,
  LayoutTemplate, Puzzle, Workflow, RefreshCw, Database, Lock, Sparkles,
  MonitorSmartphone, ShoppingCart, Gauge, GitBranch, Server,
  Smartphone, BrainCircuit, Target, MapPin, Link2, BarChart2,
  Settings, Pen, Grid, BookOpen, CreditCard, Monitor, Brush, Feather,
  Package,
};

export function icon(name: string | null | undefined): LucideIcon {
  return ICONS[name ?? ""] ?? Sparkles;
}
