import { tipoItemEnum } from "../Enuns/tipoItemEnum"

export interface Iitem {
    id: number,
    nome: string
    preco: number
    imagem: string
    listaDesejos: boolean
    carrinhoCompras: boolean
    quantidadeEstoque?: number
    dataHorarioAgendamento?: string[]
    dataHorarioEscolhidos?: string[]
    categoria: tipoItemEnum
    quantidadeCarrinho: number
    avaliacaoMedia: number
}