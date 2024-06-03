import React,{useReducer,useState,useEffect} from 'react';
import { ReducerFunction,InitialValue } from './ReducerComponent';

export const Component  = () => {

    const [state,dispatch]=useReducer(ReducerFunction,InitialValue)
    const [form,setForm]=useState({name:"",mobile:"",email:""})
   const [popup,setPopup]=useState(false)
   const [editUser, setEditUser] = useState(null);

//getmethod
useEffect(()=>{
    const FetchData=async()=>{

      const response=await fetch("http://localhost:1100/form");
      if(response.ok){
        const data=await response.json();
        dispatch({type:"SetUser",payload:data})
      }

    }
    FetchData()
},[])


//post method
    const handleChange=(e)=>{
           const{name,value}=e.target 
           setForm({...form,[name]:value})
    }
   const handleSubmit=async(e)=>{
          e.preventDefault();

          try {
            const response= await fetch("http://localhost:1100/form",{
              method:"POST",
              headers:{"content-type":"Application/json"},
              body:JSON.stringify(form)

            })
            if(response.ok){
              const data=await response.json();
              dispatch({type:"AddUser",payload:data})
          setForm({ name: "", mobile: "", email: "" });  
            }
            
            
          } catch (error) {
            console.log("error")
          }
             
   }

  
   const handleDelete=async(index)=>{

    const UserId=state.User[index]._id;

    try {
      const response=await fetch(`http://localhost:1100/form/${UserId}`,{
        method:"delete",
      })
      if(response.ok){
        dispatch({type:"DeleteUser",payload:index})
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
     
   }

//update method
   const handleEdit = (user, index) => {
    setForm(user);
    setEditUser(index);
    setPopup(true);
};

const handleUpdate = async(e) => {
    e.preventDefault();

    const UserId=state.User[editUser]._id;
    try {
      const response=await fetch(`http://localhost:1100/form/${UserId}`,{
             method:"put",
             headers:{"content-Type":"application/json"},
             body:JSON.stringify(form),
      })

      if(response.ok){
        const Data=await response.json();
        dispatch({ type: "UpdateUser", payload: { index: editUser, user: Data } });
        setPopup(false);
        setForm({ name: "", mobile: "", email: "" });
        setEditUser(null);
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
   
};
   
  return(
    <div>
               
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="User Name"
                />
                <input
                    type="text"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Mobile"
                />
                <input
                    type="email"
                    name="email"
                  value={form.email}
                  onChange={handleChange}
                    placeholder="Email"
                />
            
       
  <div>
    <button type="button" onClick={handleSubmit}>
    Add User
    </button>
    </div>

    <div>
      <ul>
        {state.User.map((user,index)=>(
            <li key={index}>
                {user.name}-{user.mobile}-{user.email}
                <button onClick={() =>handleEdit(user, index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>delete</button>
            </li>
        ))}
      </ul>

    </div>
    <div>
      {popup&& (
      <div className="popup">
     
          <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="User Name"
          />
          <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile"
          />
          <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
          />
          <button onClick={handleUpdate}>Update User</button>
          <button type="button" onClick={() => setPopup(false)}>Close</button>
      
  </div>) 
        
      }
    </div>
    
</div>
   )

 }
