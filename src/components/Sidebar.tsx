import { useState } from 'react';
import {
    LayoutDashboard,
    Server,
    Repeat,
    Clock,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { title: 'Dispositivos', path: '/dispositivos', icon: Server },
    { title: 'Rutinas', path: '/rutinas', icon: Repeat },
    { title: 'Historial', path: '/historial', icon: Clock },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`h-screen bg-sky-400 text-white p-4 transition-all duration-300 flex flex-col ${
                collapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className="flex items-center justify-between mb-8 w-full">
                {!collapsed && (
                    <div className="text-2xl font-bold pl-1">Chacki’y</div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-white p-1 focus:outline-none"
                    aria-label="Toggle Sidebar"
                >
                    {collapsed ? (
                        <ChevronRight className="w-6 h-6" />
                    ) : (
                        <ChevronLeft className="w-6 h-6" />
                    )}
                </button>
            </div>

            <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.title}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded font-semibold transition-colors w-full ${
                                isActive
                                    ? 'bg-sky-700 text-white'
                                    : 'hover:bg-sky-500 text-white'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
