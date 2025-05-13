
export default function Dashboard() {
    const data = {
        dispositivosEncendidos: 5,
        climaLocal: '20 °C',
        sensores: [
            { nombre: 'Temperatura', valor: 89 },
            { nombre: 'Humedad', valor: 89 },
            { nombre: 'Calidad Aire', valor: 89 },
        ],
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h3 className="text-lg font-bold text-sky-600">Dispositivos Encendidos</h3>
                    <p className="text-5xl font-extrabold text-sky-700 mt-2">{data.dispositivosEncendidos}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h3 className="text-lg font-bold text-sky-600">Clima Local</h3>
                    <p className="text-5xl font-extrabold text-sky-700 mt-2">{data.climaLocal}</p>
                </div>
            </div>

            <h2 className="text-xl font-bold text-sky-700">Dispositivo Principal</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.sensores.map((sensor) => (
                    <div key={sensor.nombre} className="bg-white shadow-md rounded-lg p-4 text-center">
                        <h4 className="text-sky-600 font-bold text-lg mb-2">{sensor.nombre}</h4>

                        <div className="bg-blue-200 h-24 rounded mb-2 flex items-center justify-center">
                        </div>

                        <p className="text-2xl font-bold text-gray-700">{sensor.valor}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
