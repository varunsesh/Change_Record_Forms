import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const Title = ()=>{
    return <h1>Change Record Form</h1>
}

export const Forms = ()=> {
    const [username, setUserName] = useState("");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
  
    const handleSubmit = event => {
      event.preventDefault();
  
      const data = {
        username: username,
        title: title, 
        summary: summary
      };
  
      axios.post('http://127.0.0.1:5000/', data)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });
  
      // reset state
      setUserName("");
      setTitle("");
      setSummary("");
      window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Username<br/>
            <input type="text" value={username} onChange={e => setUserName(e.target.value)}></input>
            </label>
            <br /><br />
            <label>Title<br/>
            <textarea name="title" cols="50" rows="5" value={title} onChange={e => setTitle(e.target.value)}></textarea>
            </label><br /><br />
            <label>Summary
            <br />
            <textarea name="summary" cols="50" rows="20" value={summary}onChange={e => setSummary(e.target.value)}>
                Enter some text...
            </textarea>
            </label><br/><br/>
            <input type="submit"></input>
            
        </form>
    );
};

export const View = ()=>{
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setData(response.data);
        console.log(response.data)
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchData();
    
  }, []);

  return (
    <center><div>
         <table>
         <thead>
           <tr>
             <th>CR_ID</th>
             <th>Name</th>
             <th>Title</th>
             <th>Date</th>
             <th>Status</th>
           </tr>
         </thead>
         <tbody>
           {data.map((item) => (
             <tr key={item.id}>
               <td>{item.id}</td>
               <td>{item.username}</td>
               <td>{item.title}</td>
               <td>{item.date}</td>
               <td>None</td>
             </tr>
           ))}
         </tbody>
       </table>
    </div></center>
  )
}










