import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backgroundLogin from '../assets/background_login.png';

function isStrongPassword(password: string) {
  // Al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    passwordMatch: '',
    passwordStrength: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '', passwordMatch: '', passwordStrength: '' });
  };

  const handleRegister = () => {
    let valid = true;
    let newError = {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordMatch: '',
      passwordStrength: '',
    };

    if (!form.nombre) {
      newError.nombre = 'El nombre es obligatorio.';
      valid = false;
    }
    if (!form.email) {
      newError.email = 'El correo es obligatorio.';
      valid = false;
    }
    if (!form.password) {
      newError.password = 'La contraseña es obligatoria.';
      valid = false;
    } else if (!isStrongPassword(form.password)) {
      newError.passwordStrength = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.';
      valid = false;
    }
    if (!form.confirmPassword) {
      newError.confirmPassword = 'Confirma tu contraseña.';
      valid = false;
    }
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      newError.passwordMatch = 'Las contraseñas no coinciden.';
      valid = false;
    }

    setError(newError);

    if (valid) {
      // Aquí iría la lógica de registro (API, etc.)
      navigate('/login');
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-end"
      style={{ backgroundImage: `url(${backgroundLogin})` }}
    >
      <div className="w-full max-w-md p-8 bg-white/90 rounded-lg shadow-lg backdrop-blur-sm mr-20">
        <h1 className="text-3xl font-bold text-center text-[#3A88D0]">Crear Cuenta</h1>
        <p className="text-sm text-center text-gray-700 mb-6">
          Regístrate para acceder a Chacki’y
        </p>

        <div className="mb-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-100 border ${error.nombre ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error.nombre && <p className="text-red-500 text-sm mt-1">{error.nombre}</p>}
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-100 border ${error.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-100 border ${(error.password || error.passwordStrength) ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
          {error.passwordStrength && <p className="text-red-500 text-sm mt-1">{error.passwordStrength}</p>}
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-100 border ${(error.confirmPassword || error.passwordMatch) ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error.confirmPassword && <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>}
          {error.passwordMatch && <p className="text-red-500 text-sm mt-1">{error.passwordMatch}</p>}
        </div>

        <button
          onClick={handleRegister}
          className="w-full py-2 rounded bg-[#60B4E4] hover:bg-[#3A88D0] text-white font-semibold transition"
        >
          Registrarse
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-[#3A88D0] underline cursor-pointer">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}