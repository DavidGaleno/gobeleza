//Images
import logo from '../../assets/logo.png'
import googleIcon from '../../assets/google-icon.png'
import appleIcon from '../../assets/apple-icon.png'

//CSS
import styles from './styles.module.css'

//Components
import { Input } from '../../components/Input'
import { SubText } from '../../components/SubText'
import { ActionButton } from '../../components/ActionButton'
import { LoginIcon } from '../../components/LoginIcon'
import { Line } from '../../components/Line'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'


const loginScreenSchema = z.object({
  login: z.string().nonempty('*Obrigatório'),
  password: z.string().nonempty('*Obrigatório').min(8, 'A senha tem no mínimo 8 caracteres')
})

export const LoginScreen = () => {
  const navigate = useNavigate()

  type loginScreenType = z.infer<typeof loginScreenSchema>
  const loginScreenUseForm = useForm<loginScreenType>({
    resolver: zodResolver(loginScreenSchema)
  })
  const enviar = (data: loginScreenType) => {
    console.log(data)
    navigate('/catalogo_saloes')
  }
  const { handleSubmit, formState: { errors } } = loginScreenUseForm
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="GoBeleza" />
      <FormProvider {...loginScreenUseForm}>
        <form onSubmit={handleSubmit(enviar)} className={styles.form}>
          <Input error={errors.login?.message} registerName='login' type='text' placeholder="Digite seu Email ou CPF" />
          <Input error={errors.password?.message} registerName='password' type='password' placeholder="Digite sua senha" />
          <SubText path='/recuperar_senha_opcoes' value='Esqueceu a senha?' />
          <ActionButton value="Confirmar →" />
          <div className={styles.loginIcons}>
            <div className={styles.line}></div>
            <Line />
            <LoginIcon image={googleIcon} alt={"Google"} />
            <LoginIcon image={appleIcon} alt={"Apple"} />
            <Line />
          </div>
          <SubText path='/cadastrar_opcoes' value='Ainda não tem uma conta? Cadastre-se' />
        </form>
      </FormProvider>
    </div>
  )
}