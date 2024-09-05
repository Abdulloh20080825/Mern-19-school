import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../service/api';

const Login = ({ setIsLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!email || !password) {
			setError('Нужно заполнить все поля');
			return;
		}
		try {
			const res = await axiosInstance.post('/login', {
				email,
				password,
			});
			localStorage.setItem('token', res.data.accessToken);
			setLoading(false);
			navigate('/');
		} catch (error) {
			console.log(error);
			if (error.response.data.message) {
				setError(error.response.data.message);
			}
			setLoading(false);
		}
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/');
		}
	}, []);

	return (
		<div className='bg-gray-900 text-white min-h-screen flex items-center justify-center'>
			<div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-3xl font-bold mb-6 text-center'>Вход</h1>
				<p className='text-red-600 font-medium text-center'>{error}</p>
				<form className='space-y-6' onSubmit={submitHandler}>
					<div>
						<label htmlFor='email' className='block text-lg font-medium mb-2'>
							Электронная почта
						</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Введите вашу электронную почту'
							className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<div>
						<label
							htmlFor='password'
							className='block text-lg font-medium mb-2'
						>
							Пароль
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Введите ваш пароль'
							className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<button
						type='submit'
						className='w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					>
						{loading ? 'Загрузка...' : 'Войти'}
					</button>
				</form>
				<p className='mt-4 text-center text-gray-400'>
					Нет аккаунта?{' '}
					<span
						className='text-blue-400 hover:underline cursor-pointer'
						onClick={() => setIsLogin(true)}
					>
						Зарегистрируйтесь
					</span>
				</p>
			</div>
		</div>
	);
};

export default Login;
