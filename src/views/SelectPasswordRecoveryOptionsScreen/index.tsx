import { ActionButton } from "../../components/ActionButton"
import styles from './styles.module.css'
export const SelectPasswordRecoveryOptionsScreen = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Como Deseja Mudar sua Senha:</h1>
            <div className={styles.buttons}>
                <ActionButton path="/recuperar_senha_email" value="Email →" />
                <ActionButton path="/recuperar_senha_telefone" value="Telefone →" />
            </div>
                <ActionButton path="/" value="Voltar ←" />
        </div>
    )
}