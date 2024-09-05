import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Peaupels from './pages/Peaupels';
import Admin from './pages/Admin';
import { useEffect, useState } from 'react';
import axiosInstance from './service/api';
import Loading from './pages/Loading';
import Auth from './pages/Auth';

const App = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (!token) {
			navigate('/auth');
			return;
		}

		const getUserInfo = async () => {
			try {
				const res = await axiosInstance.get('/get-user-info');
				setUser(res.data.user);
				console.log(res);
			} catch (err) {
				console.error('Error fetching user info:', err);
				navigate('/auth');
			}
		};

		getUserInfo();
	}, [token, navigate]);

	if (token && !user) {
		return <Loading />;
	}

	return (
		<div className='bg-gray-900 min-h-screen'>
			<Routes>
				<Route path='/auth' element={<Auth />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
			{token && user && (
				<div className='mt-14'>
					<Routes>
						<Route path='/' element={<Navbar user={user} />}>
							<Route path='/' element={<Home />} />
							<Route path='/admin' element={<Admin />} />
							<Route path='/peauples' element={<Peaupels user={user} />} />
						</Route>
					</Routes>
				</div>
			)}
		</div>
	);
};

export default App;
