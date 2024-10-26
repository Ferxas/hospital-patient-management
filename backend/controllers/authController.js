// controllers/authController.js
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemailer');
const crypto = require('crypto');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Función de registro de usuario con correo de bienvenida
exports.register = async (req, res) => {
    const { username, password, email, role } = req.body;

    try {
        // Verificar si el usuario o el correo ya existen
        const existingUser = await User.findByUsername(username);
        const existingEmail = await User.findByEmail(email);

        if (existingUser) return res.status(400).json({ message: "Username already taken" });
        if (existingEmail) return res.status(400).json({ message: "Email already in use" });

        // Crear el nuevo usuario
        const userId = await User.createUser({ username, password, email, role });

        // Enviar correo de bienvenida
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to the Hospital Patient Management System",
            html: `<p>Hello ${username},</p>
                   <p>Welcome! Your account has been successfully created with the role of ${role}.</p>
                   <p>Thank you for registering with us.</p>`
        });

        res.status(201).json({ message: "User registered successfully, welcome email sent", userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Función de inicio de sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.is_active) {
            return res.status(403).json({ message: "User is disabled. Contact the administrator." });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Incorrect password" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Función de restablecimiento de contraseña
exports.resetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = crypto.randomBytes(32).toString('hex');
        await User.saveResetToken(user.id, token);

        // Cambia el enlace para que apunte al frontend
        const resetLink = `http://localhost:5173/reset-password/${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. The link is valid for 1 hour.</p>`
        });

        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Nueva función `verifyResetToken` en `authController.js`
exports.verifyResetToken = async (token) => {
    try {
        const user = await User.findByResetToken(token);
        return user;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

// Función para actualizar la contraseña (después de la verificación del token)
exports.updatePassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Aquí debes verificar el token y asociarlo con el usuario
        const user = await exports.verifyResetToken(token); // Función que verifica el token y obtiene al usuario

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Encripta la nueva contraseña y actualízala en la base de datos
        await User.updatePassword(user.id, newPassword);

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};