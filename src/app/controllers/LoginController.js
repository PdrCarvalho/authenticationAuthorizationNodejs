import jwt from 'jsonwebtoken'; // importando a biblioteca JWT
import User from '../models/User'; // importando o model de usuario
import auth from '../../config/auth'; // importando as configurações do token

class LoginController {
  async store(req, res) {
    const { email, password } = req.body; // pegando os dados de usuario por desestruturação 
    const user = await User.findOne({ where: { email } }); // recuperando usuario do banco
    if (!user) { // checando a existencia do usuario
      return res.status(401).json({ error: 'User not exist' });
    }
    if (!(await user.checkPassword(password))) {  // checagem da senha foi feita no model de usuario pela 
      return res.status(401).json({ error: 'incorrect password' });
    }
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      toker: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}
export default new LoginController();
