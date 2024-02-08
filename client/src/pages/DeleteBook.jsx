import axios from "axios"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import BackHomePage from "../components/BackHomePage";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate()


  const deleteBook = async () => {
    setLoading(true)
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  return (
    <div className='p-4'>
      <BackHomePage />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={deleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}
export default DeleteBook