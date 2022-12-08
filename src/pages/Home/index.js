import React, { useState } from 'react'
import './home.css';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConnection';
import { useNavigate } from 'react-router-dom';
function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function handleLogin(e) {
        e.preventDefault();
        if (email && password) {

            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin',{replace: true});
                    console.log("Logado");
                })
                .catch((error) => {
                    console.log("Erro no cadastro: " + error);
                })
        }
        else {
            alert("preencha todos os campos!")
        }
    }
    return (
        <div className='home-container'>
            <h1>Lista de tarefas</h1>
            <span>Gerencie sua agenda de forma fácil</span>

            <form className='form' onSubmit={handleLogin}>
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
                <button type="submit">Acessar</button>
            </form>
            <Link to='register' className='button-link'>
                Não possui uma conta? Cadastre-se
            </Link>
        </div>
    )
}

export default Home