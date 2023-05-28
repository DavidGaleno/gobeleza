//Images
import logo from '../../assets/logo.png'
import menuHamburguer from '../../assets/menuHamburguer.svg'
import carrinhoCompras from '../../assets/carrinhoCompras.svg'
import listaDesejos from '../../assets/listaDesejos.svg'
import { LoginIcon } from '../../components/LoginIcon'
import batom from '../../assets/batom.png'
import maquiagem from '../../assets/maquiagem.png'
//CSS
import styles from './styles.module.css'

//React Libraries
import { useState } from 'react'

import { MobileMenu } from '../../components/MobileMenu'
import { CarrinhoCompras } from '../../components/CarrinhoCompras'
import { Title } from '../../components/Title'
import { ListaDesejos } from '../../components/ListaDesejos'
import { Item } from '../../components/Item'


export const ProductCatalogScreen = () => {
    console.log(window.outerWidth)
    const [menuVisible, setMenuVisible] = useState(false)
    const [carrinhoComprasVisible, setCarrinhoComprasVisible] = useState(false)
    const [listaDesejosVisible, setListaDesejosVisible] = useState(false)
    return (
        <div className={styles.container}>
            <header>
                <img className={styles.logo} src={logo} alt="Logo" />
                <MobileMenu visible={menuVisible} setVisible={setMenuVisible} />
                <CarrinhoCompras visible={carrinhoComprasVisible} setVisible={setCarrinhoComprasVisible} />
                <ListaDesejos visible={listaDesejosVisible} setVisible={setListaDesejosVisible} />
                <nav>
                    <div className={styles.desktopMenu}>
                        <a href="#">Produtos</a>
                        <a href="#">Serviços</a>
                        <a href="#">Minha Conta</a>
                        <a href="#">Sair</a>
                    </div>
                    <LoginIcon fatherClass={`${styles.mobileMenu}`} image={menuHamburguer} alt='Menu' onClick={() => setMenuVisible(!menuVisible)} />
                    <LoginIcon fatherClass={`${styles.desktopIcon}`} image={carrinhoCompras} alt='Carrinho de Compras' onClick={() => setCarrinhoComprasVisible(!carrinhoComprasVisible)} />
                    <LoginIcon fatherClass={`${styles.desktopIcon}`} image={listaDesejos} alt='Lista de Desejos' onClick={() => setListaDesejosVisible(!listaDesejosVisible)} />
                </nav>
            </header>
            <main>
                <Title value="Catálogo de Produtos" />
                <div className={styles.itens}>
                    <Item image={batom} alt="Batom" nome="Batom" preco={9.99} />
                    <Item image={maquiagem} alt="Maquiagem" nome="Maquiagem" preco={29.99} />
                    <Item image={batom} alt="Batom" nome="Batom" preco={9.99} />
                    <Item image={maquiagem} alt="Maquiagem" nome="Maquiagem" preco={29.99} />
                    <Item image={batom} alt="Batom" nome="Batom" preco={9.99} />
                    <Item image={maquiagem} alt="Maquiagem" nome="Maquiagem" preco={29.99} />
                    <Item image={batom} alt="Batom" nome="Batom" preco={9.99} />
                    <Item image={maquiagem} alt="Maquiagem" nome="Maquiagem" preco={29.99} />
                </div>
            </main>
        </div>
    )
}