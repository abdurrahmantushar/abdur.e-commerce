import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

export const Footer=()=> {
  return (
    <footer className=" sticky bottom-0 bg-gray-700">
        <div className="container mx-auto  p-4 flex justify-between">
            © All Rights Reserved 2026
        <div className=" flex gap-2.5 ">
            <FaFacebook  className=" text-xl hover:bg-gray-400 hover:rounded-3xl"/>
            <AiFillInstagram  className="text-xl hover:bg-gray-400 hover:rounded-3xl"/>
            <FaLinkedin className=" text-xl hover:bg-gray-400 hover:rounded-3xl"/>
        </div>
        </div>
    </footer>
  )
}
