import React, { createContext, useEffect, useState } from "react";
import { GetToken, GetUser, GetUserById, SaveUser } from "../services/User";
import { json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserContext = createContext({user: null, setUser: null});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({id: 0, username: '', dtUserCreate: '', localizacao: '', descricao: ''});
    const navigate = useNavigate();
    useEffect(() => {
        const resetLogin = async () => {
            const usuarioStorage = GetToken();
            if (usuarioStorage === null) {
                toast.error("Você não logou no sistema", { position: 'top-left' });
                navigate("/");
            }else if(GetUser() !== null){
                const arrayToken = usuarioStorage.split('.');
                const tokenPayload = JSON.parse(atob(arrayToken[1]));
                const usuario = await GetUserById(tokenPayload.id);
                SaveUser(usuario.dados)
                console.log("GetUSer")
                console.log(usuario)
                const usuarioSt = GetUser();
                setUser((prevUser) => ({
                    ...prevUser,
                    ...JSON.parse(usuarioSt), // sobrescreve ou adiciona novas propriedades
                }));
                
            } 
            else {
                try {
                    const arrayToken = usuarioStorage.split('.');
                    const tokenPayload = JSON.parse(atob(arrayToken[1]));
                    const usuario = await GetUserById(tokenPayload.id);
                    console.log('Dados do usuário:', usuario);
                    setUser((prevUser) => ({
                        ...prevUser,
                        ...usuario.dados, // sobrescreve ou adiciona novas propriedades
                    }));
                } catch (error) {
                    console.error("Erro ao buscar o usuário:", error);
                }
            }
        };

        resetLogin();
    }, []); // Inclua `navigate` como dependência, pois é uma função externa
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;


