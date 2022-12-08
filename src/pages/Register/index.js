import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConnection';
import { useNavigate } from 'react-router-dom';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function handleRegister(e) {
    e.preventDefault();
    if (email && password) {

      await createUserWithEmailAndPassword(auth, email, password)
      .then(()=>{
        console.log("Cadastro realizado com sucesso");
        navigate('/admin', {replace: true});
      })
      .catch((error)=>{
        console.log("Erro no cadastro: " + error);
      })
    }
    else {
      alert("preencha todos os campos!")
    }
  }
  return (
    <div className='home-container'>
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta</span>

      <form className='form' onSubmit={handleRegister}>
        <input type="email"
          placeholder='Digite seu e-mail:'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password"
          autoComplete='false'
          placeholder='******'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      <Link to='/' className='button-link'>
        Não possui uma conta? Faça o login!
      </Link>
    </div>
  )
}

export default Register