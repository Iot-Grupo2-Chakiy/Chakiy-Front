import { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import IoTDevicesService from '../services/IoTDevicesService';
import type { IoTDeviceResponse } from '@/utils/responseInterfaces';

export default function Dashboard() {
    const [weatherData, setWeatherData] = useState({
        temperatura: 'Cargando...',
        humedad: 'Cargando...',
    });
    const [dispositivosEncendidos, setDispositivosEncendidos] = useState(0);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

        const fetchAndLogWeatherData = async (latitude: number, longitude: number) => {
            const params = {
                latitude,
                longitude,
                hourly: ["temperature_2m", "relative_humidity_2m"],
                current: ["temperature_2m", "relative_humidity_2m"],
                forecast_days: 1,
            };
            const url = "https://api.open-meteo.com/v1/forecast";

            try {
                const responses = await fetchWeatherApi(url, params);
                const response = responses[0];
                console.log("Test")
                const utcOffsetSeconds = response.utcOffsetSeconds();
                const current = response.current()!;

                const currentWeather = {
                    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                    temperature2m: current.variables(0)!.value(),
                    relativeHumidity2m: current.variables(1)!.value(),
                };

                setWeatherData({
                    temperatura: `${currentWeather.temperature2m.toFixed(2)} °C`,
                    humedad: `${currentWeather.relativeHumidity2m} %`,
                });
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };


    useEffect(() => {
        const fetchDispositivosEncendidos = async () => {
            try {
                const dispositivos = await IoTDevicesService.getAllIoTDevices() as IoTDeviceResponse[];
                console.log('Datos obtenidos del backend:', dispositivos);

                const encendidos = dispositivos.filter((device) => device.estado === true).length;
                setDispositivosEncendidos(encendidos);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };

        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setUserLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (error) => {
                        console.error('Error fetching user location:', error);
                        // Use hardcoded location if geolocation fails
                        setUserLocation({
                            latitude: 40.7128,
                            longitude: -74.0060,
                        });
                    },
                    { timeout: 10000 }
                );
            } else {
                console.warn('Geolocation is not supported by this browser.');
                setUserLocation({
                    latitude: 40.7128,
                    longitude: -74.0060,
                });
            }
        };

        const intervalId = setInterval(() => {
            if (userLocation) {
                fetchAndLogWeatherData(userLocation.latitude, userLocation.longitude);
            }
            fetchDispositivosEncendidos();
        }, 3000);

        getUserLocation();

        return () => clearInterval(intervalId);
    }, [userLocation]);

    const data = {
        dispositivosEncendidos,
        climaLocal: weatherData.temperatura,
        humedadLocal: weatherData.humedad,
        sensores: [
            { nombre: 'Temperatura', valor: 89 },
            { nombre: 'Humedad', valor: 89 },
            { nombre: 'Calidad Aire', valor: 89 },
        ],
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h3 className="text-lg font-bold text-sky-600">Dispositivos Encendidos</h3>
                    <p className="text-5xl font-extrabold text-sky-700 mt-2">{data.dispositivosEncendidos}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h3 className="text-lg font-bold text-sky-600">Temperatura Local</h3>
                    <p className="text-5xl font-extrabold text-sky-700 mt-2">{data.climaLocal}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h3 className="text-lg font-bold text-sky-600">Humedad Local</h3>
                    <p className="text-5xl font-extrabold text-sky-700 mt-2">{data.humedadLocal}</p>
                </div>
            </div>

            <h2 className="text-xl font-bold text-sky-700">Datos de los sensores en tu hogar</h2>

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