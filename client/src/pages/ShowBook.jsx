import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackHomePage from "../components/BackHomePage";

const ShowBook = () => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({})

  const { id } = useParams();

  useEffect(() => {
    getShowBookData();
  }, [])

  const getShowBookData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/books/${id}`);
      setBook(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
        <BackHomePage />
      <h3 className="text-center my-4 text-4xl">Show book details</h3>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center flex-col border-2 border-red-500 w-96 mx-auto p-4 rounded-md">
            <div className='my-4'>
              <span className='text-x1 mr-4 text-gray-500'>Id:</span>
              <span className="font-bold"> {book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-x1 mr-4 text-gray-500'>Title:</span>
              <span className="font-bold"> {book.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-x1 mr-4 text-gray-500'>Author:</span>
              <span className="font-bold">{book.author}</span>
            </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Create Time:</span>
            <span className="font-bold">{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Last Update Time:</span>
            <span className="font-bold">{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
export default ShowBook