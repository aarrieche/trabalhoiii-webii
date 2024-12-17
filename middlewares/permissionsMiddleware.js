const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.verifyPermission = (moduleName) => {
  return async (req, res, next) => {
    const { userId } = req.cookies;

    const permission = await prisma.permission.findFirst({
      where: { userId, module: { name: moduleName } },
    });

    if (!permission) {
      return res.render('error', { message: `SEM PERMISSÃO PARA ACESSAR O ${moduleName}` });
    }

    next();
  };
};
