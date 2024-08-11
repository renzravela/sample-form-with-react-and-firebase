import { useState, useRef } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";


const Form = () => {
  const form = useRef();
  const userCollectionRef = collection(db, 'users');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(userCollectionRef, {name: name, email: email})

    form.current.reset();
  }

  return (
    <form ref={form} onSubmit={handleSubmit} className="myForm w-6/12 grid grid-cols-1 gap-6 border-solid border-2 rounded p-5 shadow-lg">
      <h1 className="text-3xl font-bold mb-5">Form Example</h1>
      <label className="block text-start">
        <span className="text-gray-500">Name</span>
        <input
          type="text"
          name="name"
          onChange={(event) => {setName(event.target.value)}}
          className="form-input mt-1 block w-full rounded"
          placeholder="Name"
          required
        />
      </label>

      <label className="block text-start">
        <span className="text-gray-500">Email</span>
        <input
          type="email"
          name="email"
          onChange={(event) => {setEmail(event.target.value)}}
          className="form-input block mt-1 w-full rounded"
          placeholder="Email"
          required
        />
      </label>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
} 

export default Form
