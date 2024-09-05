const Home = () => {
	return (
		<div className='bg-gray-900 text-white min-h-screen'>
			<header className='bg-gray-800 p-6 shadow-lg'>
				<h1 className='text-xl sm:text-4xl font-bold text-center'>
					Добро пожаловать в 19 школу
				</h1>
			</header>

			<main className='container mx-auto p-6'>
				<section className='my-12 text-center'>
					<h2 className='text-3xl font-semibold mb-6'>Наши достижения</h2>
					<p className='text-lg text-gray-300 mb-4'>
						За последние несколько лет наши ученики достигли значительных
						успехов в учебе, выигрывая призы на региональных и национальных
						конкурсах. Мы гордимся своими выпускниками, которые поступают в
						престижные университеты по всему миру.
					</p>
					<img
						src='https://via.placeholder.com/600x300'
						alt='Достижения школы'
						className='mx-auto rounded-lg shadow-md'
					/>
				</section>

				<section className='my-12 text-center'>
					<h2 className='text-3xl font-semibold mb-6'>Наши Школа</h2>
					<p className='text-lg text-gray-300 mb-4'>
						В нашей школе мы гордимся высоким качеством образования и уникальной
						атмосферой, способствующей всестороннему развитию учеников. Наша
						цель — создать поддерживающую и вдохновляющую среду, где каждый
						ребенок может раскрыть свои таланты и достичь успехов. Мы предлагаем
						современные учебные программы, квалифицированный персонал и широкие
						возможности для участия в разнообразных кружках и секциях. В нашей
						школе учёба сочетается с активной социальной жизнью, что позволяет
						нашим ученикам не только хорошо учиться, но и расти как личность.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						<img
							src='https://via.placeholder.com/300x200'
							alt='Программы обучения'
							className='rounded-lg shadow-md'
						/>
						<img
							src='https://via.placeholder.com/300x200'
							alt='Дополнительные курсы'
							className='rounded-lg shadow-md'
						/>
						<img
							src='https://via.placeholder.com/300x200'
							alt='Индивидуальные занятия'
							className='rounded-lg shadow-md'
						/>
					</div>
				</section>
			</main>

			<footer className='bg-gray-800 p-6 text-center'>
				<p>
					&copy; 2024 19 школа. Мой резюме{' '}
					<a
						href='https://rezume-ashen.vercel.app/'
						className='text-sky-600 underline'
					>
						тут
					</a>
					.
				</p>
			</footer>
		</div>
	);
};

export default Home;
