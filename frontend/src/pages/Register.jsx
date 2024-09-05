import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../service/api';

const Register = ({ setIsLogin }) => {
	const [fullname, setFullname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [classNum, setClassNum] = useState(1);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (password.length > 8) {
			setError('Пароль должен быть не менее 8 символов');
			return;
		}
		try {
			const res = await axiosInstance.post('/create-account', {
				firstname: fullname,
				lastname: lastname,
				email,
				password,
				classNum,
			});
			localStorage.setItem('token', res.data.accessToken);
			console.log(res);
			setLoading(false);
			navigate('/');
		} catch (error) {
			if (error.response.data.message) setError(error.response.data.message);
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
				<h1 className='text-3xl font-bold mb-6 text-center'>Регистрация</h1>
				<p className='text-red-600 font-medium text-center'>{error}</p>
				<form className='space-y-6' onSubmit={submitHandler}>
					<div>
						<label htmlFor='name' className='block text-lg font-medium mb-2'>
							Имя
						</label>
						<input
							type='text'
							id='name'
							value={fullname}
							onChange={(e) => setFullname(e.target.value)}
							name='firstname'
							placeholder='Введите ваше имя'
							className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<div>
						<label
							htmlFor='lastname'
							className='block text-lg font-medium mb-2'
						>
							Фамилие
						</label>
						<input
							type='text'
							id='lastname'
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
							name='lastname'
							placeholder='Введите ваше фамилие'
							className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<div>
						<label htmlFor='email' className='block text-lg font-medium mb-2'>
							Электронная почта
						</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							name='email'
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
							name='password'
							placeholder='Введите ваш пароль'
							className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<label htmlFor='classNum' className='block text-lg font-medium mb-2'>
						Выберите свой класс
					</label>
					<select
						name='classNum'
						id='classNum'
						onChange={(e) => setClassNum(e.target.value)}
						value={classNum}
						className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-0'
					>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='4'>4</option>
						<option value='5'>5</option>
						<option value='6'>6</option>
						<option value='7'>7</option>
						<option value='8'>8</option>
						<option value='9'>9</option>
						<option value='10'>10</option>
						<option value='11'>11</option>
					</select>
					<button
						type='submit'
						className='w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					>
						{loading ? 'Загруска...' : 'Зарегистрироваться'}
					</button>
				</form>
				<p className='mt-4 text-center text-gray-400'>
					Уже есть аккаунт?{' '}
					<span
						className='text-blue-400 hover:underline cursor-pointer'
						onClick={() => setIsLogin(false)}
					>
						Войти
					</span>
				</p>
			</div>
		</div>
	);
};

export default Register;
