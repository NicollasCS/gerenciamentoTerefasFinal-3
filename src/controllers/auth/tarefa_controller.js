const Tarefa = require('../../models/tarefa')
const {Sequelize} = require('sequelize')

class TarefaController{
    static async index(req, res){
        try {
            // Buscar todas as tarefas do usuário logado
            const tarefas = await Tarefa.findAll({
                where: { usuarioID: req.user.id }
            })
            
            res.status(200).json({
                success: true,
                count: tarefas.length,
                tarefas: tarefas
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Erro ao listar tarefas",
                error: error.message
            })
        }
    }

    static async show(req, res){
        try {
            const {id} = req.params
            // Buscar tarefa específica que pertence ao usuário
            let tarefa = await Tarefa.findOne({
                where: {id, usuarioID: req.user.id}
            })

            if (!tarefa) {
                return res.status(404).json({
                    success: false,
                    message: "Tarefa não encontrada"
                })
            }

            res.status(200).json({
                success: true,
                tarefa: tarefa
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Erro ao buscar tarefa",
                error: error.message
            })
        }
    }

    static async register(req, res){
        try {
            const { nome } = req.body

            if (!nome) {
                return res.status(400).json({
                    success: false,
                    message: "Nome da tarefa é obrigatório"
                })
            }

            // Criar nova tarefa com status inicial "criado"
            let tarefa = await Tarefa.create({
                nome: nome,
                usuarioID: req.user.id,
                status: 'criado'
            })

            res.status(201).json({
                success: true,
                message: "Tarefa criada com sucesso",
                tarefa: tarefa
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Erro ao criar tarefa",
                error: error.message
            })
        }
    }

    static async update(req, res){ 
        try {
            const {id} = req.params
            const {nome} = req.body
            
            // Buscar tarefa do usuário
            let tarefa = await Tarefa.findOne({
                where: {id, usuarioID: req.user.id}
            })

            if (!tarefa) {
                return res.status(404).json({
                    success: false,
                    message: "Tarefa não encontrada"
                })
            }

            // Atualizar nome se fornecido
            if (nome) tarefa.nome = nome

            await tarefa.save()

            res.status(200).json({
                success: true,
                message: "Tarefa atualizada com sucesso",
                tarefa: tarefa
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Erro ao atualizar tarefa",
                error: error.message
            })
        }
    }

    static async patch(req, res){ 
        try {
            const {id} = req.params
            const {status} = req.body

            if (!status) {
                return res.status(400).json({
                    success: false,
                    message: "Status é obrigatório"
                })
            }

            // Buscar tarefa do usuário
            let tarefa = await Tarefa.findOne({
                where: {id, usuarioID: req.user.id}
            })

            if (!tarefa) {
                return res.status(404).json({
                    success: false,
                    message: "Tarefa não encontrada"
                })
            }

            const statusAntigo = tarefa.status
            const statusValidos = ['criado', 'em_desenvolvimento', 'concluido']

            // Validar se status é válido
            if (!statusValidos.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: `Status inválido. Valores permitidos: ${statusValidos.join(', ')}`
                })
            }

            // Validar transição de status
            let transicaoValida = false

            if (status == "em_desenvolvimento" && statusAntigo == "criado") {
                transicaoValida = true
            } else if (status == "concluido" && statusAntigo == "em_desenvolvimento") {
                transicaoValida = true
            } else if (status == statusAntigo) {
                return res.status(400).json({
                    success: false,
                    message: "A tarefa já possui este status"
                })
            }

            if (!transicaoValida) {
                return res.status(400).json({
                    success: false,
                    message: `Transição inválida: de '${statusAntigo}' para '${status}'`,
                    transicoesPossiveis: {
                        "criado": ["em_desenvolvimento"],
                        "em_desenvolvimento": ["concluido"],
                        "concluido": []
                    }
                })
            }

            tarefa.status = status
            await tarefa.save()

            res.status(200).json({
                success: true,
                message: "Status atualizado com sucesso",
                tarefa: tarefa
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Erro ao atualizar status da tarefa",
                error: error.message
            })
        }
    }

    static async delete(req, res){
        try {
            const { id } = req.params
            let tarefa = await Tarefa.findByPk(id)

            if (!tarefa) {
                return res.status(404).json({
                    success: false,
                    message: "Tarefa não encontrada"
                })
            }

            // Verificar se tarefa pertence ao usuário
            if (tarefa.usuarioID !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: "Você não tem permissão para deletar esta tarefa"
                })
            }

            await tarefa.destroy()

            res.status(200).json({
                success: true,
                message: "Tarefa deletada com sucesso"
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Erro ao deletar tarefa",
                error: error.message
            })
        }
    }
}

module.exports = TarefaController
