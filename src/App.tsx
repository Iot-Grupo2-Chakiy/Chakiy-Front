import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Dispositivos from './pages/Dispositivos';
import Rutinas from './pages/Rutinas';
import Historial from './pages/Historial.tsx';
import Login from './pages/Login';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <div className="w-full h-full flex">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/*"
                    element={
                        <div className="w-full h-full flex">
                            <Sidebar />
                            <div className="flex flex-col flex-1">
                                <Topbar />
                                <main className="p-6 bg-gray-100 overflow-y-auto flex-1">
                                    <Routes>
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/dispositivos" element={<Dispositivos />} />
                                        <Route path="/rutinas" element={<Rutinas />} />
                                        <Route path="/historial" element={<Historial />} />
                                    </Routes>
                                </main>
                            </div>
                        </div>
                    }
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;