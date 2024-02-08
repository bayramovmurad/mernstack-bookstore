import { useState, useEffect } from "react";
import axios from 'axios';
import BackHomePage from "../components/BackHomePage";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    title: "",
    author: "",
    publishYear: ""
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Edit sayfası yüklendiğinde, ilgili kitabın bilgilerini getir
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        const bookDetails = response.data;
        setData(bookDetails);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleEditBook = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData({ ...data, [name]: value });
  };

  const saveEditedBook = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:5000/books/${id}`, data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <BackHomePage />
      <h3 className="text-center my-4 text-4xl">Edit Book Details</h3>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center flex-col border-2 border-red-500 w-96 mx-auto p-4 rounded-md gap-y-2">
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleEditBook}
            className="border p-3 text-xl outline-none border-blue-500"
            placeholder="Title"
          />
          <input
            type="text"
            name="author"
            value={data.author}
            onChange={handleEditBook}
            className="border p-3 text-xl outline-none border-blue-500"
            placeholder="Author"
          />
          <input
            type="text"
            name="publishYear"
            value={data.publishYear}
            onChange={handleEditBook}
            className="border p-3 text-xl outline-none border-blue-500"
            placeholder="Publish Year"
          />
          <button onClick={saveEditedBook} className="border text-xl outline-none border-blue-500">Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
