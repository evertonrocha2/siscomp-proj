import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import {
  BadgePlus,
  Contact,
  DollarSign,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareOff,
  PointerIcon,
  ShoppingBag,
  Users,
} from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from "./../infra/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function NavComponent({ setUsuario }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(null);
  const [blocked, setBlocked] = useState(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        if (userData?.isAdmin && userData?.blocked) {
          setBlocked(false);
          alert("Você não pode bloquear administradores!");
          return;
        }
        setIsAdmin(userData?.isAdmin);
        setBlocked(userData?.blocked);
      }
    };
    checkUserStatus();
  }, []);

  useEffect(() => {
    if (blocked) {
      navigate("/blocked");
    }
  }, [blocked, navigate]);

  if (isAdmin === null || blocked === null) {
    return <div></div>;
  }

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

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };
  return (
    <div>
      {isAdmin ? (
        <div>
          <div>
            <Menu
              onClick={toggleMenu}
              className="h-8 w-8 sm:hidden block mx-auto mt-8"
            />
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-500 ${
                menuAberto ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={toggleMenu}
            ></div>

            <nav
              className={`text-slate-900 transition-all  duration-500 sm:hidden fixed flex w-[60%] z-30 px-2 py-8 left-0 top-0 h-full flex-col items-center bg-white border-r border-slate-300 ${
                menuAberto ? "block" : "hidden"
              }`}
            >
              <Menu onClick={toggleMenu} className="h-8 w-8 mb-8" />

              <ul className="flex-col flex items-center justify-around gap-20">
                <div className="flex flex-col gap-6">
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link
                      className="flex items-center gap-2 font-semibold"
                      to="/"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link
                      className="flex items-center gap-2 font-semibold"
                      to="/fornecedores"
                    >
                      <Users className="h-4 w-4" />
                      Fornecedores
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link
                      className="flex items-center gap-2 font-semibold"
                      to="/contatos"
                    >
                      <Contact className="h-4 w-4" />
                      Contatos
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link
                      className="flex items-center gap-2 font-semibold"
                      to="/cotacoes"
                    >
                      <DollarSign className="h-4 w-4" />
                      Cotações
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link
                      className="flex items-center gap-2 font-semibold"
                      to="/produtos"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Produtos
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link
                      className="flex items-center gap-2 font-semibold"
                      to="/cadastros"
                    >
                      <MessageSquareOff className="h-4 w-4" />
                      Cadastros
                    </Link>
                  </li>
                </div>
              </ul>
              <LogOut
                onClick={handleLogout}
                className="h-6 w-6 text-slate-900 mt-auto sm:hidden"
              />
            </nav>
          </div>
          <div className="hidden bg-white fixed sm:flex w-14 px-2 py-12 left-0 top-0 h-full flex-col items-center bg-transparent border-r border-slate-300">
            <nav className={`text-slate-900 transition-all duration-500 `}>
              <ul className=" flex-col flex items-center justify-around gap-20">
                <div className="flex  flex-col items-center gap-16">
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link to="/">
                      <LayoutDashboard className="h-4 w-4" />
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link to="/fornecedores">
                      <Users className="h-4 w-4" />
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link to="/contatos">
                      <Contact className="h-4 w-4" />
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link to="/cotacoes">
                      <DollarSign className="h-4 w-4" />
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link to="/produtos">
                      <ShoppingBag className="h-4 w-4" />
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link
                      className="hover:text-[#A9FFB7] transition-all"
                      to="/cadastros"
                    >
                      <MessageSquareOff className="h-4 w-4" />
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link to="/requisicoes">
                      <BadgePlus className="h-4 w-4" />
                    </Link>
                  </li>
                </div>
              </ul>
            </nav>
            <LogOut
              onClick={handleLogout}
              className="h-4 w-4 cursor-pointer transition-all hover:text-slate-600 text-slate-900 mt-auto"
            />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Menu
              onClick={toggleMenu}
              className="h-8 w-8 sm:hidden block mx-auto mt-8 bg-white"
            />

            <nav
              className={`text-slate-900 transition-all duration-500 sm:hidden fixed flex w-[60%] z-30 px-2 py-8 left-0 top-0 h-full flex-col items-center bg-white border-r border-slate-300 ${
                menuAberto ? "block" : "hidden"
              }`}
            >
              <Menu onClick={toggleMenu} className="h-8 w-8 mb-8" />

              <ul className="flex-col flex items-center justify-around gap-20">
                <div className="flex flex-col gap-6">
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link
                      className="flex items-center gap-2 font-semibold"
                      to="/"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link
                      className="flex items-center gap-2 font-semibold"
                      to="/requisicoes"
                    >
                      <BadgePlus className="h-4 w-4" />
                      Requisições
                    </Link>
                  </li>
                </div>
              </ul>
              <LogOut
                onClick={handleLogout}
                className="h-6 w-6 text-slate-900 mt-auto sm:hidden"
              />
            </nav>
          </div>
          <div className="hidden bg-white fixed sm:flex w-14 px-2 z-50 py-12 left-0 top-0 h-full flex-col items-center  border-r border-slate-300">
            <nav className={`text-slate-900 transition-all duration-500 `}>
              <ul className=" flex-col flex items-center justify-around gap-20">
                <div className="flex  flex-col items-center gap-16">
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link
                      className="flex items-center gap-2 font-semibold"
                      to="/dashboard"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                    </Link>
                  </li>
                  <li className="hover:text-[#A9FFB7] transition-all">
                    <Link to="/requisicoes">
                      <BadgePlus className="h-4 w-4" />
                    </Link>
                  </li>
                </div>
              </ul>
            </nav>
            <LogOut
              onClick={handleLogout}
              className="h-4 w-4 cursor-pointer transition-all hover:text-slate-600 text-slate-900 mt-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
