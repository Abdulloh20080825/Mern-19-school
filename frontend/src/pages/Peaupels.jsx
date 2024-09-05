import React, { useState } from 'react';
import { books } from '../constants/bookData';
import axiosInstance from '../service/api';

const Peaupels = ({ user }) => {
	const [students, setStudents] = useState(user?.books || []);
	const [newStudent, setNewStudent] = useState('');
	const [numbers, setNumbers] = useState(
		user?.books?.reduce((acc, cur) => {
			acc[cur.student] = cur.bookNumbers || [];
			return acc;
		}, {}) || {}
	);

	const bookTitles = books.filter((x) => x.query === user.classNum);
	const classBooks = bookTitles.length > 0 ? bookTitles[0].books : [];
	const handleAddStudent = (e) => {
		e.preventDefault();
		if (newStudent.trim() !== '') {
			setStudents([
				...students,
				{
					student: newStudent.trim(),
					bookNumbers: Array(classBooks.length).fill(''),
				},
			]);
			setNumbers((prevNumbers) => ({
				...prevNumbers,
				[newStudent.trim()]: Array(classBooks.length).fill(''),
			}));
			setNewStudent('');
		}
	};
	const handleNumberChange = (student, index, value) => {
		const sanitizedValue = value === '' || /^\d+$/.test(value) ? value : '';
		setNumbers((prevNumbers) => ({
			...prevNumbers,
			[student]: prevNumbers[student].map((num, i) =>
				i === index ? sanitizedValue : num
			),
		}));
	};
	const handleSave = async () => {
		const savedData = students.map((student) => ({
			student: student.student || student,
			bookNumbers: numbers[student.student || student],
		}));

		try {
			const response = await axiosInstance.post('/add-book', {
				studentsData: savedData,
			});
			console.log('Данные сохранены:', response.data);
		} catch (error) {
			console.error('Ошибка при сохранении данных:', error);
		}
	};

	return (
		<div className='bg-gray-900 text-white min-h-screen p-6 overflow-scroll'>
			<h1 className='text-xl sm:text-3xl font-bold mb-6'>
				Список учеников и номера книг {user.classNum} класса
			</h1>
			<form
				onSubmit={handleAddStudent}
				className='mb-6 flex flex-col sm:flex-row'
			>
				<input
					type='text'
					value={newStudent}
					onChange={(e) => setNewStudent(e.target.value)}
					placeholder='Введите имя ученика'
					className='p-2 bg-gray-800 border border-gray-700 rounded-lg w-full sm:w-auto mb-4 sm:mb-0'
					required
				/>
				<button
					type='submit'
					className='sm:ml-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full sm:w-auto'
				>
					Добавить ученика
				</button>
			</form>

			{/* Render existing students or newly added students */}
			{classBooks.length > 0 ? (
				<div className='overflow-auto'>
					<table className='min-w-full bg-gray-800 rounded-lg'>
						<thead>
							<tr>
								<th className='p-4 border-b border-gray-700 border-r'>
									Ученик
								</th>
								{classBooks.map((book, index) => (
									<th
										key={index}
										className='p-4 border-b border-r border-gray-700'
									>
										{book}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{students.map((student, rowIndex) => (
								<tr key={rowIndex}>
									<td className='p-4 border-b border-gray-700 border-r text-sm'>
										{student.student || student}
									</td>
									{classBooks.map((_, bookIndex) => (
										<td
											key={bookIndex}
											className='p-4 border-b border-r border-gray-700'
										>
											<input
												type='text'
												value={
													numbers[student.student || student]?.[bookIndex] || ''
												}
												onChange={(e) =>
													handleNumberChange(
														student.student || student,
														bookIndex,
														e.target.value
													)
												}
												className='bg-gray-800 text-white outline-none border border-gray-600 rounded-md p-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
											/>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p className='text-red-500'>Книги для этого класса не найдены.</p>
			)}

			<div className='mt-6'>
				<button
					onClick={handleSave}
					className='p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg w-full sm:w-auto'
				>
					Сохранить
				</button>
			</div>
		</div>
	);
};

export default Peaupels;
