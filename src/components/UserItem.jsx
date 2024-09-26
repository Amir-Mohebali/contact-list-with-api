import { MdEdit, MdDelete  } from "react-icons/md";

import './UserItem.css'
import { Link } from "react-router-dom";

const UserItem = ({ id, name, email, phone, searchTerm, onDelete }) => {

  const index = name.indexOf(searchTerm);
  return (
    <div className='item'>
      <div className="info">
        {!searchTerm 
          ? <h5>{name}</h5>
          : <h5>
              <span>
                {name.slice(0,index)}
              </span>
              <span style={{background: '#f40157'}}>
                {name.slice(index, index + searchTerm.length)}
              </span>
              <span>
                {name.slice(index + searchTerm.length)}
              </span>
            </h5>
        }
        <p>{email}</p>
        <p>{phone}</p>
      </div>
      <div className="controls">
        <Link to={`/edit/${id}`}>
          <MdEdit />
        </Link>
        <MdDelete onClick={()=> onDelete(id)}/>
      </div>
    </div>
  )
}

export default UserItem