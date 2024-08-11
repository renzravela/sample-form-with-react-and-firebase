import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const Data = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [opeUpdateModal, setOpenUpdateModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const userCollectionRef = collection(db, "users");
    const [selectedUser, setSelectedUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

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

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        setStatus('User deleted successfully!');
        setOpenDeleteModal(false);
    }

    const updateUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await updateDoc(userDoc, {name, email});
        setStatus('User updated successfully!');
        setOpenUpdateModal(false);
    }

    if(loading){
        return <p className="mt-5 text-center">Loading...</p>
    }

    if(error){
        return <p className="mt-5 text-center">Error: {error}</p>
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
                        <button onClick={() => {setOpenUpdateModal(true); setSelectedUser(user); setName(user.name); setEmail(user.email)}} className="bg-green-500 mr-1 update-btn">Update</button>
                        <button onClick={() => {setOpenDeleteModal(true); setSelectedUser(user);}} className="bg-red-700 delete-btn mt-1">Remove</button>
                    </div>
                );
            })}

            <Dialog open={openDeleteModal} onClose={setOpenDeleteModal} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                Deactivate account
                            </DialogTitle>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                Are you sure you want to deactivate your account? All of your data will be permanently removed.
                                This action cannot be undone.
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            onClick={() => {deleteUser(selectedUser.id)}}
                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        >
                            Deactivate
                        </button>
                        <button
                            type="button"
                            data-autofocus
                            onClick={() => setOpenDeleteModal(false)}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Cancel
                        </button>
                        </div>
                    </DialogPanel>
                    </div>
                </div>
            </Dialog>

            <Dialog open={opeUpdateModal} onClose={setOpenUpdateModal} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100-200 sm:mx-0 sm:h-10 sm:w-10">
                            <PencilSquareIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                Edit User
                            </DialogTitle>
                            <div className="mt-2">
                                <label className="block text-start">
                                    <span className="text-gray-500">Name</span>
                                    <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(event) => {setName(event.target.value)}}
                                    className="form-input mt-1 block w-full rounded"
                                    placeholder="Name"
                                    required
                                    />
                                </label>
                                <label className="block text-start">
                                    <span className="text-gray-500">Email</span>
                                    <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={(event) => {setEmail(event.target.value)}}
                                    className="form-input mt-1 block w-full rounded"
                                    placeholder="Email"
                                    required
                                    />
                                </label>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            onClick={() => {updateUser(selectedUser.id)}}
                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                        >
                            Confirm
                        </button>
                        <button
                            type="button"
                            data-autofocus
                            onClick={() => {setOpenUpdateModal(false)}}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Cancel
                        </button>
                        </div>
                    </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default Data;
