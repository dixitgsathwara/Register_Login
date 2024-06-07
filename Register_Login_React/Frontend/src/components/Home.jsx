import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const MyComponent = () => {
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  if(!token){
    window.location.href = '/register';
  }
  const navigate=useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const logout=()=>{
    localStorage.clear();
    navigate('/');
  }
  const fetchData = async () => {
    try {
      let axiosConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
      }
      };
      const response = await axios.get('http://localhost:5000/user/home', axiosConfig);
    
    if (response.status !== 200) {
      window.location.href = '/';
      throw new Error('Network response was not ok ' + response.statusText);
    }
    
      const data = response.data;
      setData(data);
      console.log(data); 
    } catch (error) {
      window.location.href = '/';
      console.error('There has been a problem with your fetch operation:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 
  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {data ? (
        <pre>
          Username:{JSON.stringify(data.name, null, 2)}<br/>
          Email:{JSON.stringify(data.email, null, 2)}<br/>
          <button style={{color:"white",width:"150px",margin:"10px",outline:"none",borderRadius:"5px",cursor:"pointer"}} onClick={logout}>Logout</button>
        </pre>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  
  );
};

export default MyComponent;
