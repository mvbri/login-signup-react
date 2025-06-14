import StandardSection from "../components/StandardSection";
import HomeLayout from "../layout/HomeLayout";
import UserNavProfile from "../components/UserNavProfile";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchAddresses } from "../hooks/useFetchAddresses";
import { axiosInstance } from "../services/axios.config";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";

const UserAddresses = () => {
  const { addresses } = useFetchAddresses();
  const [addressState, setAddressState] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [isOpen, openModal, closeModal] = useModal(false);

  useEffect(() => {
    setAddressState(addresses);
  }, [addresses]);

  const notifySuccess = (noty, options = {}) => toast.success(noty, options);

  const notifyError = (noty, options = {}) => toast.error(noty, options);

  const handleDelete = async (id, name) => {
    openModal();
    setSelectedItem(id);
    setSelectedItemName(name);
  };

  const deleteItem = async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/address/${id}`);
      if (res.status === 200 || res.status === 201) {
        notifySuccess("¡Dirección eliminada con éxito!", {
          position: "top-center",
        });
        setAddressState((preAddress) =>
          preAddress.filter((item) => {
            return item._id != id;
          })
        );
      } else {
        throw new Error(`[${res.status}] ERROR en la solicitud`);
      }
    } catch (err) {
      notifyError("Ocurrió un error", {
        position: "top-center",
      });
      console.log(err);
    }
  };

  return (
    <HomeLayout>
      <StandardSection>
        <div className="flex flex-col md:flex-row gap-8 pt-8">
          <UserNavProfile />
          <div className="p-8 border rounded-md flex-1">
            <div className="flex flex-wrap justify-between">
              <h3 className="mb-4 text-gray-800 text-2xl md:text-3xl">
                Direcciones
              </h3>

              <ToastContainer />

              <Link
                to="/direcciones/crear"
                className="flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-1 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
              >
                AGREGAR NUEVA DIRECCIÓN
              </Link>
            </div>
            <div className="pt-8">
              {console.log(addressState)}
              {addressState.length > 0 ? (
                addressState.map((address, i) => (
                  <div key={i} className="flex items-start mb-4">
                    <ul>
                      <li>{address.name}</li>
                      <li>{address.parish}</li>
                      <li>{address.address}</li>
                      <li>{address.phone}</li>
                    </ul>
                    <Link to={`/direcciones/${address._id}/editar`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 stroke-gray-600 ml-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(address._id, address.name)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <Modal isOpen={isOpen} closeModal={closeModal}>
                      <div className="flex items-center justify-center size-full flex-col">
                        <h2 className="text-gray-950 mb-8 text-xl font-semibold">
                          ¿Está seguro que desea elimiar la siguiente dirección?{" "}
                          <br />
                          <span>{`"${
                            selectedItemName ? selectedItemName : ""
                          }" `}</span>
                        </h2>
                        <div className="flex self-end gap-3">
                          <button
                            className="bg-gray-400 w-fit py-1 px-4 rounded-md
 hover:bg-gray-500 text-white transition-all duration-300 ease-in"
                            onClick={closeModal}
                          >
                            Cerrar
                          </button>
                          <button
                            className="bg-secondary w-fit py-1 px-4 rounded-md
 hover:bg-secondary-accent text-white transition-all duration-300 ease-in"
                            onClick={() => deleteItem(selectedItem)}
                          >
                            Sí
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                ))
              ) : (
                <p>Todavía no has registrado ninguna dirección.</p>
              )}
            </div>
          </div>
        </div>
      </StandardSection>
    </HomeLayout>
  );
};

export default UserAddresses;
