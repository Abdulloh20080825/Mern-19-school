import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = () => {
	const [isLogin, setIsLogin] = useState(false);
	return (
		<>
			{isLogin ? (
				<Register setIsLogin={setIsLogin} />
			) : (
				<Login setIsLogin={setIsLogin} />
			)}
		</>
	);
};

export default Auth;
