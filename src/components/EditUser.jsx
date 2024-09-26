import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser } from '../redux/UserSlice';

import './editUser.css'
import axios from 'axios';

const EditUser = () => {
    const { id } = useParams();
    const users = useSelector((state) => state.users.users);
    const currentUser = users.filter(user => user.id == id);
    const {name, email, phone} = currentUser[0];

    const [updateName, setUpdateName] = useState(name);
    const [updateEmail, setUpdateEmail] = useState(email);
    const [updatePhone, setUpdatePhone] = useState(phone);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(fetchUsers())
    //     // const data = axios.put('http://localhost:8000/user?id=3', {
    //     //     id: 3,
    //     //     name: 'Parham',
    //     //     email: 'alaki'
    //     // })
    //     // console.log(data)
    //   }, [dispatch])

    const handleUpdate = (e) => {
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
        console.log(updateName)
        dispatch(updateUser({
            id: id,
            name: updateName,
            email: updateEmail,
            phone: updatePhone
        }))
        navigate('/')
      }
    }
  return (
    <form onSubmit={handleUpdate} className="updateForm">
        <h2 className='title'>Update Form</h2>
        <div className="input-box">
            <input 
                type="text" 
                value={updateName}
                onChange={(e)=> setUpdateName(e.target.value)} 
                className="input-name"
                placeholder="Enter Contact Name..."
            />
        </div>
        <div className="input-box">
            <input 
                type="text" 
                value={updateEmail}
                onChange={(e)=> setUpdateEmail(e.target.value)} 
                className="input-email"
                placeholder="Enter Contact Email..."
            />
        </div>
        <div className="input-box">
            <input 
                type="text" 
                value={updatePhone}
                onChange={(e)=> setUpdatePhone(e.target.value)} 
                className="input-phone"
                placeholder="Enter Contact Phone..."
            />
        </div>
        <button type="submit" className="btn-submit">Update</button>
    </form>
  )
}

export default EditUser