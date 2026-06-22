const Usuario = require('../models/usuario')
const {Sequelize} = require('sequelize')
const crypto = require('crypto')

class UsuarioController{
    static async register(req, res){
        try {
            const { nome, email, senha } = req.body
            
            // Validar dados recebidos
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    success: false,
                    message: "Nome, email e senha são obrigatórios"
                })
            }

            // Criar hash da senha
            let accessKey = email+senha
            let hash = crypto.createHash('sha256').update(accessKey)
            accessKey = hash.digest('hex')

            // Verificar se email já existe
            let usuarioExiste = await Usuario.findOne({where: {email: email}})
            if(usuarioExiste){
                return res.status(400).json({
                    success: false,
                    message: "Email já cadastrado"
                })
            }

            // Criar novo usuário
            let newUser = await Usuario.create({nome, email, accessKey})
            res.status(201).json({
                success: true,
                message: "Usuário cadastrado com sucesso",
                usuario: {
                    id: newUser.id,
                    nome: newUser.nome,
                    email: newUser.email
                }
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Erro ao cadastrar usuário",
                error: error.message
            })
        }
    }

    static async authenticate(req, res) {
        try {
            const {email, senha} = req.body
            
            if (!email || !senha) {
                return res.status(400).json({
                    success: false,
                    message: "Email e senha são obrigatórios"
                })
            }

            // Criar hash da senha para comparar com banco
            let accessKey = email+senha
            let hash = crypto.createHash('sha256').update(accessKey)
            accessKey = hash.digest('hex')

            // Buscar usuário no banco
            let uLogin = await Usuario.findOne({where: { email, accessKey }})

            if (!uLogin) {
                return res.status(401).json({
                    success: false,
                    message: "Email ou senha inválidos"
                })
            }

            // Gerar token para o usuário
            let t = uLogin.email + '-' + Math.random()
            let tokenHash = crypto.createHash("sha256")
            tokenHash.update(t)
            let tokenValue = tokenHash.digest("hex")
            
            // Definir expiração do token (1 hora)
            let timeLife = new Date()
            timeLife.setHours(timeLife.getHours()+1) 
            
            // Salvar token no banco
            uLogin.token = tokenValue
            uLogin.timeLife = timeLife
            await uLogin.save()

            res.status(200).json({
                success: true,
                message: "Autenticado com sucesso",
                token: tokenValue,
                timeLife: timeLife,
                usuario: {
                    id: uLogin.id,
                    nome: uLogin.nome,
                    email: uLogin.email
                }
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Erro na autenticação",
                error: error.message
            })
        }
    }

    static async ValidateToken(req, res, next){
        try {
            // Buscar token no header Authorization
            let key = req.headers.authorization
            if (key == undefined){
                return res.status(401).json({
                    success: false,
                    message: "Token não fornecido"
                })
            }
            
            // Verificar se token é válido
            let usuario = await Usuario.findOne({where: {token: key}})

            if (!usuario){
                return res.status(401).json({
                    success: false,
                    message: "Token inválido"
                })
            }
            
            // Continuar para próxima função
            req.user = usuario
            next()
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Erro na validação do token",
                error: error.message
            })
        }
    }
}

module.exports = UsuarioController
