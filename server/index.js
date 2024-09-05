require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const generateJWTToken = require('./helpers/generateToken');
const { authenticateToken } = require('./middleware/auth');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4040;

app.use(
	cors({
		origin: '*',
	})
);
app.use(express.json());
app.get('/', (req, res) => {
	return res.status(200).json({
		message: 'Backend working',
	});
});

app.post('/create-account', async (req, res) => {
	console.log(req.body);
	try {
		const { firstname, lastname, email, password, classNum } = req.body;
		if (!firstname || !lastname || !email || !password || !classNum) {
			return res.status(400).json({
				message: 'Все поля нужно заполнить !!!',
			});
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: 'Email уже используется другим пользователем !!!' });
		}
		const user = new User({ firstname, lastname, email, password, classNum });
		await user.save();
		const accessToken = generateJWTToken(user._id);
		console.log(accessToken);

		return res.status(201).json({
			message: 'Аккаунт создан',
			user,
			accessToken,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова',
		});
	}
});

app.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({
				message: 'Все поля нужно заполнить !!!',
			});
		}

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(400).json({ message: 'Пользователь не найден !!!' });
		}
		if (existingUser.password != password) {
			return res.status(400).json({ message: 'Не верный пароль !!!' });
		}
		const accessToken = generateJWTToken(existingUser);
		return res.status(201).json({
			message: 'Войдено в систему',
			user: existingUser,
			accessToken,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова',
		});
	}
});

app.get('/get-user-info', authenticateToken, async (req, res) => {
	try {
		const { user } = req.user;
		console.log(user);
		const $user = await User.findById(user);
		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден',
			});
		}
		return res.status(200).json({
			message: 'Пользователь найден',
			user: $user,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова',
		});
	}
});

app.post('/add-book', authenticateToken, async (req, res) => {
	try {
		const { user } = req.user;
		const { studentsData } = req.body;

		let $user = await User.findById(user);

		if (!$user) {
			return res.status(400).json({ message: 'Пользователь не найден' });
		}
		studentsData.forEach((studentData) => {
			const { student, bookNumbers } = studentData;
			$user.books.push({
				student,
				bookNumbers,
			});
		});
		await $user.save();

		res.status(200).json({ message: 'Данные успешно сохранены' });
	} catch (error) {
		console.error('Ошибка сохранения данных:', error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

app.listen(PORT, () => {
	console.log(`Server has been started on PORT http://localhost:${PORT}`);
	mongoose
		.connect(process.env.MONGO_URL)
		.then(() => {
			console.log('DB connected');
		})
		.catch((error) => {
			console.log(`DB error ${error}`);
		});
});
