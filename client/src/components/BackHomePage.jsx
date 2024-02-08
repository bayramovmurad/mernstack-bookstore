import { BsArrowLeft } from "react-icons/bs"
import { Link } from "react-router-dom"

const BackHomePage = ({ destination = '/' }) => {
    return (
        <div className="flex m-4">
            <Link
                to={destination}
                className='bg-sky-800 text-white px-4 py-2 rounded-md w-fit'
            >

                <BsArrowLeft className="text-2xl" />

            </Link>
        </div>
    )
}
export default BackHomePage