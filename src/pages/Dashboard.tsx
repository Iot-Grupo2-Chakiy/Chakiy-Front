import { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import IoTDevicesService from '../services/IoTDevicesService';
import type { IoTDeviceResponse } from '@/utils/responseInterfaces';
import EdgeService from "@/services/EdgeService.ts";
import GaugeChart from 'react-gauge-chart';

export default function Dashboard() {
    const [weatherData, setWeatherData] = useState({
        temperatura: 'Cargando...',
        humedad: 'Cargando...',
    });
    const [dispositivosEncendidos, setDispositivosEncendidos] = useState(0);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [sensorData, setSensorData] = useState({
        temperatura: 0,
        humedad: 0,
        calidadAire: 0,
    });
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

// Obtener ubicación una sola vez al montar
useEffect(() => {
    console.log('Fetching user location...');
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
                setUserLocation({
                    latitude: 40.7128,
                    longitude: -74.0060,
                });
            },
            { timeout: 10000 }
        );
    } else {
        setUserLocation({
            latitude: 40.7128,
            longitude: -74.0060,
        });
    }
}, []);

useEffect(() => {
    if (!userLocation) return;

    const intervalId = setInterval(() => {
        fetchAndLogWeatherData(userLocation.latitude, userLocation.longitude);
    }, 3000);

    fetchAndLogWeatherData(userLocation.latitude, userLocation.longitude);

    return () => clearInterval(intervalId);
}, [userLocation]); // <-- solo depende de userLocation

  useEffect(() => {
      const fetchDispositivosEncendidos = async () => {
          try {
              console.log('Fetching IoT devices...');
              const dispositivos = await IoTDevicesService.getAllIoTDevices() as IoTDeviceResponse[];
              console.log('IoT devices fetched:', dispositivos);

              const encendidos = dispositivos.filter((device) => device.estado === true).length;
              console.log('Number of devices turned on:', encendidos);
              setDispositivosEncendidos(encendidos);

              const mainDevice = dispositivos.find((device) => device.isMainDevice);
              console.log('Main device:', mainDevice);

              if (mainDevice) {
                  const record = await EdgeService.getLatestHealthRecord(mainDevice.name);

                  const sanitizedHumidifierInfo = record.humidifier_info.replace(/'/g, '"');
                  const info = JSON.parse(sanitizedHumidifierInfo);

                  // Solo actualizamos sensorData si estaba vacío (para evitar loops)
                  if (
                      sensorData.temperatura === 0 &&
                      sensorData.humedad === 0 &&
                      sensorData.calidadAire === 0
                  ) {
                      setSensorData({
                          temperatura: info.temperature || 0,
                          humedad: info.humidity || 0,
                          calidadAire: info.ICA || 0,
                      });
                  }
              } else {
                  setSensorData({ temperatura: 0, humedad: 0, calidadAire: 0 });
              }
          } catch (error) {
              console.error('Error fetching devices:', error);
          }
      };

      if (
          sensorData.temperatura === 0 &&
          sensorData.humedad === 0 &&
          sensorData.calidadAire === 0
      ) {
          fetchDispositivosEncendidos();
      }
  }, []);

    const data = {
        dispositivosEncendidos,
        climaLocal: weatherData.temperatura,
        humedadLocal: weatherData.humedad,
        sensores: [
            { nombre: 'Temperatura', valor: sensorData.temperatura },
            { nombre: 'Humedad', valor: sensorData.humedad },
            { nombre: 'Calidad Aire', valor: sensorData.calidadAire },
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

                        <GaugeChart
                          id={`gauge-${sensor.nombre.toLowerCase().replace(/\s/g, '-')}`}
                          nrOfLevels={20}
                          arcPadding={0.05}
                          animate={false}
                          needleTransitionDuration={0}
                          percent={
                            sensor.nombre === 'Temperatura'
                              ? Math.min(sensor.valor / 50, 1)
                              : sensor.nombre === 'Humedad'
                              ? Math.min(sensor.valor / 100, 1)
                              : Math.min(sensor.valor / 500, 1)
                          }
                          textColor="#00000000"
                          colors={['#f0f0f0', '#007bff']}
                          needleColor="#3b82f6"
                          needleBaseColor="#3b82f6"
                        />

                        <p className="text-2xl font-bold text-gray-700">{sensor.valor}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}