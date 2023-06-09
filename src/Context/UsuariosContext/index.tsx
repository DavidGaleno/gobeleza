import { ReactNode, createContext, useState } from "react";
import { IUsuariosContext } from "../../interfaces/IUsuariosContext";
import { IUsuario } from "../../interfaces/IUsuario";
import { ICompra } from "../../interfaces/ICompra";
import { ISpecialPasswordUser } from "../../interfaces/ISpecialPassword";

export const UsuariosContext = createContext<IUsuariosContext>({} as IUsuariosContext)
UsuariosContext.displayName = 'UsuariosContext'
interface Props {
    children: ReactNode
}
export const UsuariosContextProvider: React.FC<Props> = ({ children }: Props) => {
    const [specialPasswordUser, setSpecialPasswordUser] = useState<ISpecialPasswordUser[]>([{
        userId: 1,
        userEmail: 'davidgaleno@gmail.com',
        specialPassword: '1111111111111111',
        tipoConta: 'Lojista',
        salao: 'corEUnha'
    },
    {
        userId: 2,
        userEmail: 'gerente@gmail.com',
        specialPassword: '2222222222222222',
        tipoConta: 'Gerente',
        salao: 'corEUnha'
    }
    ])
    const [usuarios, setUsuarios] = useState<IUsuario[]>([
        {
            id: 1,
            email: 'davidgaleno@gmail.com',
            nome: 'David Galeno',
            cpf: '086.477.891-05',
            endereco: 'QNJ 35 Lote 2',
            complemento: 'Casa 1',
            numero: 'S/N',
            password: '123123123',
            sexo: 'Masculino',
            telefone: '(42)94002-8922',
            tipoConta: 'Cliente'
        },
        {
            id: 2,
            email: 'gerente@gmail.com',
            nome: 'David Galeno',
            cpf: '086.477.891-05',
            endereco: 'QNJ 35 Lote 2',
            complemento: 'Casa 1',
            numero: 'S/N',
            password: '123123123',
            sexo: 'Masculino',
            telefone: '(42)94002-8922',
            tipoConta: 'Gerente'
        }
    ])
    const [loggedAccount, setLoggedAccount] = useState<IUsuario>({} as IUsuario)


    const [compras, setCompras] = useState<ICompra[]>([
        {
            id: 1,
            compras: [{
                nome: "Batom",
                quantidade: 1,
                valor: 9.99,
                categoria: "produto"
            },
            {
                nome: "Barbeador",
                quantidade: 2,
                valor: 199.98,
                categoria: "produto"
            },
            {
                nome: "Maquiagem",
                quantidade: 1,
                valor: 29.99,
                categoria: "produto"

            }],
            email: "davidgaleno@gmail.com",
            nome: "David Galeno",
            valor: 239.96
        },
        {
            id: 2,
            compras: [{
                nome: "Manicure",
                quantidade: 1,
                valor: 49.99,
                categoria: "servico"
            },
            {
                nome: "Lavar Cabelo",
                quantidade: 2,
                valor: 89.98,
                categoria: "servico"
            },
            {
                nome: "Pintar Cabelo",
                quantidade: 1,
                valor: 29.99,
                categoria: "servico"

            }],
            email: "davidgaleno@gmail.com",
            nome: "David Galeno",
            valor: 239.96
        }
    ])
    return (
        <UsuariosContext.Provider value={{ usuarios, setUsuarios, loggedAccount, setLoggedAccount, compras, setCompras, specialPasswordUser, setSpecialPasswordUser }}>
            {children}
        </UsuariosContext.Provider>
    )
}