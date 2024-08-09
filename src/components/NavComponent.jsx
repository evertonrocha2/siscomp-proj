import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { getAuth, signOut } from "firebase/auth";

export default function NavComponent({ setUsuario }) {
  const [menuAberto, setMenuAberto] = useState(true);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUsuario(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMenuAberto(false);
      } else {
        setMenuAberto(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };
  return (
    <div>
      <div className="flex justify-around sm:flex-row flex-col items-center bg-[#07070B]">
        <div
          className="sm:hidden block text-gray-300 py-4"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <nav className={`text-gray-300 ${menuAberto ? "block" : "hidden"}`}>
          <ul className="sm:flex-row flex-col flex items-center justify-around gap-20">
            <div className="flex sm:flex-row flex-col items-center">
              <li className="py-8 px-4 hover:text-[#A9FFB7] transition-all">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="py-8 px-4 hover:text-[#A9FFB7] transition-all">
                <Link to="/fornecedores">Fornecedores</Link>
              </li>
              <li className="py-8 px-4 hover:text-[#A9FFB7] transition-all">
                <Link to="/contatos">Contatos</Link>
              </li>
              <li className="py-8 px-4 hover:text-[#A9FFB7] transition-all">
                <Link to="/cotacoes">Cotações</Link>
              </li>
              <li className="py-8 px-4 hover:text-[#A9FFB7] transition-all">
                <Link to="/produtos">Produtos</Link>
              </li>
            </div>
            <div className="flex items-center justify-center gap-2">
              <IoMdLogOut size={24} color="#ACFFAF" />
              <li
                className="cursor-pointer  hover:text-[#A9FFB7] transition-all"
                onClick={handleLogout}
              >
                Sair
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}
