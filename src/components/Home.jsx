import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, addUser, deleteUser } from '../redux/UserSlice'
import UserItem from './UserItem'

import './home.css'
import axios from 'axios'

const Home = () => {
  
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const isLoading = useSelector((state) => state.users.isLoading)
  const error = useSelector((state) => state.users.error)
      
    useEffect(() => {
      dispatch(fetchUsers())
    }, [dispatch])
    
    console.log('users', users)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [term, setTerm] = useState('');

    const generateId = () => {
      const newId = Math.floor(Math.random() * 100)
      console.log(newId)
      for(let i=users.length; i>0; i--) {
        if(users[i-1]['id'] == newId) generateId()
      }
      return newId.toString()
    }  
    
    const searchHandler = (e) => {
      setTerm(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if(!name.trim()) {
        alert("Please enter a name")
      }
      else if(!email.trim()) {
        alert("Please enter an email")
      }
      else if(!phone.trim()) {
        alert("Please enter a phone number")
      }
      else {
        // addStudent(name.trim(), email.trim(), phone);
        const id = generateId()
        dispatch(addUser({
          id: id,
          name: name.trim(),
          email: email.trim(),
          phone: phone
        }))
        setName('');
        setEmail('');
        setPhone('');
      }
    }
  
    const deleteHandler = (id) => {
      console.log(id,'this element deleted')
      dispatch(deleteUser(id))
      // const newUsers = users.filter(user => user.id !== id);
      // users = newUsers;
    }

    return (
      <>
        <form onSubmit={handleSubmit} className="addForm">
            <div className="input-box">
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e)=> setName(e.target.value)}
                    className="input-name"
                    placeholder="Enter Contact Name..."
                />
            </div>
            <div className="input-box">
                <input 
                    type="text" 
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)}
                    className="input-email"
                    placeholder="Enter Contact Email..."
                />
            </div>
            <div className="input-box">
                <input 
                    type="text" 
                    value={phone} 
                    onChange={(e)=> setPhone(e.target.value)}
                    className="input-phone"
                    placeholder="Enter Contact Phone..."
                />
            </div>
            <button type="submit" className="btn-submit">Add</button>
            <div className="search-box">
                <input 
                    type="text" 
                    value={term} 
                    onChange={searchHandler}
                    className="input-search" 
                    placeholder="Search List..."
                />
            </div>
        </form>
        <div className='list'>
          {isLoading && <div className="loader"></div>}
          {error && `${error}`}
          {users && users
            .filter(({ name }) => name.includes(term))
            .map(({ id, name, email, phone }) => {
            return <UserItem key={id} id={id} name={name} email={email} phone={phone} searchTerm={term} onDelete={deleteHandler}/>
          })}
        </div>
      </>
    )
}

export default Home