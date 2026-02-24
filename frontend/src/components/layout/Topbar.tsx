import * as React from 'react';
import { Menu, Bell, Sun, Moon, User } from 'lucide-react';
import { Button } from '../ui/Button';

export function Topbar() {
    const [isDark, setIsDark] = React.useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header className="h-16 flex items-center justify-between px-4 lg:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 z-10 transition-colors">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
                <div className="font-semibold text-lg hidden md:block">
                    <span className="text-primary-600">CFC</span> Dashboard
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
                </Button>
                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold ml-2 cursor-pointer border border-primary-200 dark:border-primary-800">
                    <User className="h-4 w-4" />
                </div>
            </div>
        </header>
    );
}
