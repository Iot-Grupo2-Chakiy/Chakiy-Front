import { useNavigate } from 'react-router-dom';

export default function Topbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí podrías limpiar tokens si los usaras
        navigate('/login');
    };

    return (
        <div className="bg-sky-500 text-white flex justify-between items-center px-6 py-3 shadow">
            <h1 className="text-2xl font-bold">Chacki’y</h1>
            <button
                onClick={handleLogout}
                className="bg-slate-700 hover:bg-slate-800 px-4 py-2 rounded"
            >
                Cerrar Sesión
            </button>
        </div>
    );
}
