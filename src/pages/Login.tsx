import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backgroundLogin from '../assets/background_login.png';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const handleLogin = () => {
    let valid = true;
    let newError = { email: '', password: '' };

    if (!email) {
      newError.email = 'El correo es obligatorio.';
      valid = false;
    }
    if (!password) {
      newError.password = 'La contraseña es obligatoria.';
      valid = false;
    }
    setError(newError);

    if (valid) {
      navigate('/dashboard');
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-end"
      style={{ backgroundImage: `url(${backgroundLogin})` }}
    >
      <div className="w-full max-w-md p-8 bg-white/90 rounded-lg shadow-lg backdrop-blur-sm mr-20">
        <h1 className="text-3xl font-bold text-center text-[#3A88D0]">Iniciar Sesión</h1>
        <p className="text-sm text-center text-gray-700 mb-6">
          Ingresa tus credenciales para acceder a Chacki'y
        </p>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 rounded bg-gray-100 border ${error.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 rounded bg-gray-100 border ${error.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 rounded bg-[#60B4E4] hover:bg-[#3A88D0] text-white font-semibold transition"
        >
          Iniciar Sesión
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-[#3A88D0] underline cursor-pointer">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}