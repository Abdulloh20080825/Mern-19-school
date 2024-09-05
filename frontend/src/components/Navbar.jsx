import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import HModal from './hModal';

const Navbar = ({ user }) => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const onLogoutHandler = () => {
		localStorage.clear();
		navigate('/login');
	};

	useEffect(() => {
		if (!token) {
			navigate('/login');
		}
	}, [token, navigate]);

	return (
		<>
			<header className='fixed top-0 w-full bg-black text-white shadow-lg p-4'>
				<div className='container mx-auto flex justify-between items-center'>
					{user ? (
						<div className='text-sm md:text-2xl font-bold'>
							<a
								href='#'
								className='hover:text-gray-400 transition duration-300'
							>
								Привет, {user.firstname} {user.lastname}
							</a>
						</div>
					) : (
						<div>Загрузка...</div>
					)}

					<nav>
						<ul className='hidden md:flex space-x-5'>
							<li className='hover:text-gray-400 transition duration-300'>
								<NavLink to='/'>Главная</NavLink>
							</li>
							<li className='hover:text-gray-400 transition duration-300'>
								<NavLink to='/peauples'>Ученики</NavLink>
							</li>
							<li className='hover:text-gray-400 transition duration-300'>
								<button onClick={onLogoutHandler}>Выйти</button>
							</li>
						</ul>
					</nav>

					<div className='block md:hidden'>
						<button
							className='text-gray-300 focus:outline-none'
							onClick={() => setIsOpen(true)}
						>
							<RxHamburgerMenu />
						</button>
					</div>
					<HModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
						<ul className='flex  md:hidden space-x-5'>
							<li
								className='hover:text-gray-400 transition duration-300'
								onClick={() => setIsOpen(false)}
							>
								<NavLink to='/'>Главная</NavLink>
							</li>
							<li
								className='hover:text-gray-400 transition duration-300'
								onClick={() => setIsOpen(false)}
							>
								<NavLink to='/peauples'>Ученики</NavLink>
							</li>
							<li className='hover:text-gray-400 transition duration-300'>
								<button
									onClick={() => {
										onLogoutHandler();
										setIsOpen(false);
									}}
								>
									Выйти
								</button>
							</li>
						</ul>
					</HModal>
				</div>
			</header>
			<Outlet />
		</>
	);
};

export default Navbar;
