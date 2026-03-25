import React, { useState } from 'react'
import { data } from 'react-router-dom'

const Form = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [password, setPassword] = useState('')

  const [users, setUsers] = useState([])   // <-- store array of objects

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create object
    const newUser = {
      name,
      age,
      email,
      dob,
      password
    }

    // Add to array
    setUsers([...users, newUser])

    // OPTIONAL: Send to API
    // fetch("http://localhost:5000/api/users", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newUser)
    // })
    //   .then(res => res.json())
    //   .then(data => console.log("Saved to API:", data))
    //   .catch(err => console.log(err))

    fetch('http://localhost:5000/api/users',{
        method:"post",
        headers:{"content-type":"application/json"},
        bofy:JSON.stringify(newUser)
    })
    .then(res=>res.json())
    .then(data)
    // Clear input fields
    setName('')
    setAge('')
    setEmail('')
    setDob('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Log-IN</h2>

        <label>Enter Your Name :</label>
        <input 
          type="text" 
          value={name}
          placeholder='Enter Your Name'
          onChange={(e) => setName(e.target.value)} 
        />

        <label>Enter Your Age :</label>
        <input 
          type="number"
          value={age}
          placeholder='Enter Your age'
          onChange={(e) => setAge(e.target.value)} 
        />

        <label>Enter Your Email :</label>
        <input 
          type="email"
          value={email}
          placeholder='example@gmail.com'
          onChange={(e) => setEmail(e.target.value)} 
        />

        <label>Enter Your DOB :</label>
        <input 
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)} 
        />

        <label>Enter Your Password :</label>
        <input 
          type="password"
          value={password}
          placeholder='At least 8 characters'
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit">Submit</button>
      </form>

      <hr />

      <h3>Stored Data (Array of Objects):</h3>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  )
}

export default Form;