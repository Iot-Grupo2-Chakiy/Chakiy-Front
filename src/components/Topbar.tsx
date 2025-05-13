export default function Topbar() {
    return (
        <header className="bg-sky-400 h-14 flex items-center justify-end px-6 shadow-md">
            <button
                onClick={() => alert('Sesión cerrada')}
                className="bg-sky-700 hover:bg-sky-800 text-white font-semibold px-4 py-2 rounded"
            >
                Cerrar Sesión
            </button>
        </header>
    );
}