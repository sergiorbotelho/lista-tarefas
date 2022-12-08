import './admin.css';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc, 
  updateDoc
} from 'firebase/firestore'

function Admin() {



  const [tarefaInput, setTarefaInput] = useState('');
  const [user, setUser] = useState({});
  const [tarefas, setTarefas] = useState([]);
  const [edit, setEdit] = useState([]);

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "tarefas");

        const q = query(tarefaRef, orderBy("created", 'desc'), where('userUid', '==', data?.uid))

        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })

          setTarefas(lista)
        })
      }
    }


    loadTarefas();
  }, [])

  async function handleRegister(e) {
    e.preventDefault();
    if (tarefaInput === '') {
      alert('Digite sua tarefa...')
      return
    }
    if(edit?.id){
      handleUpdateTarefa();
      return
    }
    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })

      .then(() => {
        console.log("TAREFA REGISTRADA");
        setTarefaInput('')
      })
      .catch((error) => {
        console.log("ERRO AO REGISTRAR " + error);
      })
  }

  async function logout() {
    await signOut(auth);
  }

  async function deleteTarefa(id) {
    const docRef = doc(db, 'tarefas', id);
    await deleteDoc(docRef);
  }
  async function updateTarefa(item) {
    setTarefaInput(item.tarefa);
    setEdit(item);
  }
  async function handleUpdateTarefa(){
    const docRef = doc(db, "tarefas", edit?.id);
    await updateDoc(docRef, {
      tarefa: tarefaInput
    })
    .then(()=>{
      setEdit({});
      setTarefaInput('');
    })
    .catch((error)=>{
      console.log("Erro ao editar: " + error);
      setEdit({});
      setTarefaInput('');
    })
  }

  return (
    <div className='admin-container'>
      <h1>Minhas tarefas</h1>
      <form className='form' onSubmit={handleRegister}>
        <textarea
          placeholder='Digite sua tarefa...'
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />
        {Object.keys(edit).length > 0 ? (
          <button className='btn-register' style={{backgroundColor: '#6add39'}} type='submit'>Atualizar tarefas</button>
        ) : (<button className='btn-register' type='submit'>Registrar tarefas</button>)}
      </form>
      {tarefas.map((item) => (
        <article className='list' key={item.id}>
          <p>{item.tarefa}</p>
          <div>
            <button onClick={() => updateTarefa(item)}>Editar</button>
            <button className='btn-delete' onClick={() => deleteTarefa(item.id)}>Concluir</button>
          </div>
        </article>
      )
      )}
      <button className='btn-logout' onClick={logout}>Sair</button>
    </div>
  )
}

export default Admin