const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).render('error', { message: 'Credenciais inválidas.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).render('error', { message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: '1h' });

    res.cookie('userId', user.id, { httpOnly: true });
    res.cookie('token', token, { httpOnly: true });

    return res.redirect('/'); 
  } catch (error) {
    console.error(error);
    return res.status(500).render('error', { message: 'Erro interno no servidor.' });
  }
};
