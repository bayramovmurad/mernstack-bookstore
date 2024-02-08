import { useState } from "react"
import axios from 'axios'
import BackHomePage from "../components/BackHomePage";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";


const CreateBook = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    author: "",
    publishYear: ""
  });
  const navigate = useNavigate();


  const handleCreateBook = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData({ ...data, [name]: value });
  };


  const addCreateBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/books', data);
      setLoading(false);
      navigate("/")

      setData({
        title: "",
        author: "",
        publishYear: ""
      });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <BackHomePage />
      <h3 className="text-center my-4 text-4xl">Show book details</h3>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center flex-col border-2 border-red-500 w-96 mx-auto p-4 rounded-md gap-y-2">
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleCreateBook}
            className="border p-3 text-xl outline-none border-blue-500"
            placeholder="Title"
          />
          <input
            type="text"
            name="author"
            value={data.author}
            onChange={handleCreateBook}
            className="border p-3 text-xl outline-none border-blue-500"
            placeholder="Author"
          />
          <input
            type="text"
            name="publishYear"
            value={data.publishYear}
            onChange={handleCreateBook}
            className="border p-3 text-xl outline-none border-blue-500"
            placeholder="Publish Year"
          />
          <button onClick={addCreateBook} className="border text-xl outline-none border-blue-500">Add</button>
        </div>
      )};
    </div>

  )

}
export default CreateBook