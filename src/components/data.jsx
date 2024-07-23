import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Data = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const userCollectionRef = collection(db, "users");

    useEffect(() => {
        const getUser = async () => {
            try{
                const data = await getDocs(userCollectionRef);
                setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            }catch (err){
                setError(err.message)
            }finally{
                setLoading(false)
            }

        };

        getUser();
    }, [userCollectionRef]);

    if(loading){
        return <p className="mt-5">Loading...</p>
    }

    if(error){
        return <p className="mt-5">Error: {error}</p>
    }

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        setStatus('User deleted successfully!');
    }

    return (
        <>
            <div><p className="mt-5">{status}</p></div>
            {users.map((user, index) => {
                return (
                    <div key={user.id} className="item border-solid border-2 rounded p-5 shadow-lg">
                        <div>
                            <small>Item {index + 1}</small>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </div>
                        <button className="bg-green-500 mr-1 update-btn">Update</button>
                        <button onClick={() => {deleteUser(user.id)}} className="bg-red-700 delete-btn mt-1">Delete</button>
                    </div>
                );
            })}
        </>
    );
};

export default Data;
