import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: false, password: false });

    const handleLogin = () => {
        const emailError = !email;
        const passwordError = !password;

        if (emailError || passwordError) {
            setError({ email: emailError, password: passwordError });
        } else {
            setError({ email: false, password: false });
            navigate('/dashboard'); // Redirige al dashboard
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="w-full max-w-md space-y-6 p-8 bg-neutral-900 rounded-lg">
                <h1 className="text-3xl font-bold">Sign in</h1>
                <p className="text-sm text-gray-400">
                    Log in to unlock tailored content and stay connected with your community.
                </p>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full p-2 rounded bg-neutral-800 text-white border ${
                            error.email ? 'border-red-500' : 'border-gray-700'
                        }`}
                    />
                    {error.email && (
                        <p className="text-red-500 text-sm mt-1">El campo de email es obligatorio.</p>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full p-2 rounded bg-neutral-800 text-white border ${
                            error.password ? 'border-red-500' : 'border-gray-700'
                        }`}
                    />
                    {error.password && (
                        <p className="text-red-500 text-sm mt-1">El campo de contraseña es obligatorio.</p>
                    )}
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full py-2 rounded bg-white text-black hover:bg-gray-200"
                >
                    Sign in
                </button>
                <p className="text-sm text-center">
                    Don't have an account? <a className="underline" href="#">Sign up</a>
                </p>
            </div>
        </div>
    );
}