import NavComponent from "../../components/NavComponent";

export default function Dashboard({ setUsuario }) {
  return (
    <>
      <NavComponent setUsuario={setUsuario} />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center mt-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="sm:text-5xl text-3xl font-bold text-center font-geist tracking-tighter">
              Bem vindo ao Sistema de Compras!
            </h1>
            <p className="font-geist text-center">
              Para acessar as tabelas e valores, navegue pelo menu de navegação.
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
