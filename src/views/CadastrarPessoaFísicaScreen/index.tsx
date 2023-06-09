//Images
import logo from '../../assets/logo.png'
import { ActionButton } from '../../components/ActionButton'
import { Input } from '../../components/Input'
import { useForm, FormProvider } from 'react-hook-form'
import styles from './styles.module.css'
import { Select } from '../../components/Select'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { UsuariosContext } from '../../Context/UsuariosContext'
import { IUsuario } from '../../interfaces/IUsuario'


export const CadastrarPessoaFisica = () => {

  const { setUsuarios, usuarios } = useContext(UsuariosContext)

  const navigate = useNavigate()

  const cadastroPessoaFisicaSchema = z.object({
    email: z.string().trim().nonempty('*Obrigatório').email('Formato de Email inválido').transform(email => email.toLocaleLowerCase()).refine(email => email.endsWith('@gmail.com') || email.endsWith('@hotmail.com') || email.endsWith('@outlook.com'), {
      message: 'O Email deve terminar com @outlook.com, @gmail.com ou @hotmail.com'
    }).refine(email => {
      const usuario = usuarios.find(usuario => usuario.email === email)
      if (usuario) return false
      return true
    }, {
      message: 'Email Já Cadastrado'
    }),
    cpf: z.string().nonempty('*Obrigatório').transform(cpf => cpf.toLocaleLowerCase().trim()),
    nome: z.string().nonempty('*Obrigatório').transform(nome => nome.toLocaleLowerCase().trim()),
    telefone: z.string().nonempty('*Obrigatório').transform(telefone => telefone.toLocaleLowerCase().trim()),
    sexo: z.string().nonempty('*Obrigatório'),
    endereco: z.string().nonempty('*Obrigatório').transform(endereco => endereco.toLocaleLowerCase().trim()),
    complemento: z.string().nonempty('*Obrigatório').transform(complemento => complemento.toLocaleLowerCase().trim()),
    numero: z.string().nonempty('*Obrigatório').transform(numero => numero.trim()),
    password: z.string().nonempty('*Obrigatório').min(8, 'A senha precisa ter no mínimo 8 caracteres').transform(password => password.trim()),
    passwordMatch: z.string().nonempty('*Obrigatório').min(8, 'A senha precisa ter no mínimo 8 caracteres').transform(password => password.trim()),
  }).refine(data => data.password === data.passwordMatch, {
    path: ['passwordMatch'],
    message: 'As duas senhas não correspondem'
  })


  type CadastroPessoaFisicaType = z.infer<typeof cadastroPessoaFisicaSchema>


  const cadastroPessoaJuridicaUseForm = useForm<CadastroPessoaFisicaType>({
    resolver: zodResolver(cadastroPessoaFisicaSchema)
  })



  const { handleSubmit, formState: { errors } } = cadastroPessoaJuridicaUseForm
  const cadastrar = (data: CadastroPessoaFisicaType) => {
    const { passwordMatch, ...usuario } = data
    setUsuarios((prevUsuarios: IUsuario[]) => [...prevUsuarios, { ...usuario, id: prevUsuarios.length + 1, tipoConta: 'Cliente' }])
    navigate('/')
  }



  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="GoBeleza" />
      <FormProvider {...cadastroPessoaJuridicaUseForm} >
        <form onSubmit={handleSubmit(cadastrar)} className={styles.form}>
          <Input value='' error={errors.email?.message} registerName={'email'} type='text' placeholder="Digite seu Email" mask="email" />
          <Input value='' error={errors.cpf?.message} registerName={'cpf'} type='text' placeholder="Digite seu CPF" mask='cpf' />
          <Input value='' error={errors.nome?.message} registerName={'nome'} type='text' placeholder="Digite seu Nome" />
          <Input value='' error={errors.telefone?.message} registerName={'telefone'} type='text' placeholder="Digite seu Telefone" mask="phoneNumber" />
          <Select value='' fatherClass={styles.select} registerName={'sexo'} label='Selecione seu Sexo' options={['masculino', 'feminino']} />
          <div className={styles.endereco}>
            <Input value='' error={errors.endereco?.message} registerName={'endereco'} type='text' placeholder="Endereço" />
            <Input value='' error={errors.complemento?.message} registerName={'complemento'} type='text' placeholder="Complemento" />
            <Input value='' error={errors.numero?.message} registerName={'numero'} type='text' placeholder="Número ou S/N" />
          </div>
          <Input value='' error={errors.password?.message} registerName={'password'} type='password' placeholder="Digite sua senha" />
          <Input value='' error={errors.passwordMatch?.message} registerName={'passwordMatch'} type='password' placeholder="Confirme sua senha" />
          <div className={styles.buttons}>
            <ActionButton type="submit" value="Confirmar →" />
            <ActionButton type="button" value="Voltar ←" path='/cadastrar_opcoes' />
          </div>
        </form>
      </FormProvider>
    </div >
  )
}