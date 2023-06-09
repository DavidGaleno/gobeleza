import { CarrinhoCompras } from '../CarrinhoCompras'
import { ListaDesejos } from '../ListaDesejos'
import { MobileMenu } from '../MobileMenu'

//Images
import logo from '../../assets/logo.png'
import menuHamburguer from '../../assets/menuHamburguer.svg'
import carrinhoComprasIcon from '../../assets/carrinhoCompras.svg'
import listaDesejosIcon from '../../assets/listaDesejos.svg'
import { LoginIcon } from '../../components/LoginIcon'
import dashboard from '../../assets/dashboard.png'
import specialPassword from '../../assets/specialPassword.png'

import styles from './styles.module.css'
import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CarrinhoComprasContext } from '../../Context/CarrinhoComprasContext'
import { UsuariosContext } from '../../Context/UsuariosContext'
import { IUsuario } from '../../interfaces/IUsuario'

interface Props {
    setItensExibidos?: (itensExibidos: string) => void
    fixed?: boolean
    setFixed?: (fixed: boolean) => void
}

export const Header = ({ setItensExibidos, fixed, setFixed }: Props) => {
    const navigate = useNavigate()


    window.addEventListener("scroll", () => {
        if (window.scrollY > 0) return setFixed?.(true)
        return setFixed?.(false)
    })
    const { setLoggedAccount } = useContext(UsuariosContext)
    const [menuVisible, setMenuVisible] = useState(false)
    const [carrinhoComprasVisible, setCarrinhoComprasVisible] = useState(false)
    const [listaDesejosVisible, setListaDesejosVisible] = useState(false)
    const { carrinhoCompras } = useContext(CarrinhoComprasContext)
    const location = useLocation()
    return (
        <header className={fixed !== undefined ? fixed === true ? styles.fixed : styles.hide : ''}>
            <img className={styles.logo} src={logo} alt="Logo" />
            <MobileMenu setItensExibidos={setItensExibidos && setItensExibidos} visible={menuVisible} setVisible={setMenuVisible} />
            <CarrinhoCompras visible={carrinhoComprasVisible} setVisible={setCarrinhoComprasVisible} />
            <ListaDesejos visible={listaDesejosVisible} setVisible={setListaDesejosVisible} />
            <nav>
                <div className={styles.desktopMenu}>
                    {location.pathname === '/catalogo_itens' && <>
                        <a className={styles.filter} onClick={() => setItensExibidos?.('Produtos')}>Produtos</a>
                        <a className={styles.filter} onClick={() => setItensExibidos?.('Serviços')}>Serviços</a>
                        <Link color='gray' to={'/catalogo_saloes'}>Salões</Link>
                    </>
                    }
                    <Link color='gray' to={'/minha_conta_usuario'}>Minha Conta</Link>
                    <Link color='gray' onClick={() => setLoggedAccount({} as IUsuario)} to={'/'}>Sair</Link>

                </div>
                <LoginIcon fatherClass={`${styles.mobileMenu}`} image={menuHamburguer} alt='Menu' onClick={() => setMenuVisible(!menuVisible)} />
                {location.pathname === '/catalogo_itens' &&
                    <>
                        <div className={styles.carrinhoContainer}>
                            {carrinhoCompras.length > 0 &&
                                <div className={styles.counter} onClick={() => setCarrinhoComprasVisible(!carrinhoComprasVisible)}>
                                    <span className={styles.counterText}>{carrinhoCompras.length}X</span>
                                </div>
                            }
                            <LoginIcon fatherClass={`${styles.desktopIcon} ${styles.mobileIcon}`} image={carrinhoComprasIcon} alt='Carrinho de Compras' onClick={() => setCarrinhoComprasVisible(!carrinhoComprasVisible)} />
                        </div>
                        <LoginIcon fatherClass={`${styles.desktopIcon} ${styles.mobileIcon}`} image={listaDesejosIcon} alt='Lista de Desejos' onClick={() => setListaDesejosVisible(!listaDesejosVisible)} />
                    </>
                }
                {location.pathname === '/dashboard' &&
                    <>
                        <LoginIcon onClick={() => navigate('/dashboard')} fatherClass={`${styles.desktopIcon} ${styles.mobileIcon} `} image={dashboard} alt='Dashboard' />
                        <LoginIcon fatherClass={`${styles.desktopIcon} ${styles.mobileIcon} `} image={specialPassword} alt='Senha Acesso Especial' />
                    </>}

            </nav>
        </header>
    )
}