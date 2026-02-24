import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Settings,
    GraduationCap
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Formations', href: '/dashboard/formations', icon: BookOpen },
    { name: 'Candidats', href: '/dashboard/candidats', icon: Users },
    { name: 'Établissements', href: '/dashboard/etablissements', icon: GraduationCap },
    { name: 'Paramètres', href: '/dashboard/parametres', icon: Settings },
];

export function Sidebar() {
    return (
        <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full transition-colors shrink-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">
                    <div className="bg-primary-600 text-white p-1.5 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5" />
                    </div>
                    <span>CFC<span className="text-primary-600">.</span>edu</span>
                </div>
            </div>

            <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Navigation
                </div>
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                            isActive
                                ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Centre de Formation Continue</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Version 1.0.0</p>
                </div>
            </div>
        </aside>
    );
}
