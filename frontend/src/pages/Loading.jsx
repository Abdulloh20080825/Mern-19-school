import React from 'react';

const Loading = () => {
	return (
		<div className='flex items-center justify-center h-screen bg-gray-900'>
			<div className='flex flex-col items-center'>
				<div className='w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin'></div>
				<p className='mt-4 text-white text-lg'>Loading...</p>
			</div>
		</div>
	);
};

export default Loading;
