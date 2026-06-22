const express = require("express")
const UsuarioController = require("../controllers/usuario_controller")
const TarefaController = require("../controllers/auth/tarefa_controller")

function Routes(app) {
    // Rota publica - verifica se API está online
    app.get("/", (req, res) => { 
        res.status(200).json({
            success: true,
            message: "API de Gerenciamento de Tarefas",
            version: "1.0.0"
        })
    })

    // Rotas de autenticacao
    app.post("/register", (req, res) => { UsuarioController.register(req, res)})
    app.post("/authenticate", (req, res) => { UsuarioController.authenticate(req, res)})

    // Rotas de tarefas - todas com autenticacao
    let authRoutes = express.Router()
    authRoutes.use(async (req, res, next) => { 
        await UsuarioController.ValidateToken(req, res, next)
    })
    
    authRoutes.get("/", (req, res) => { TarefaController.index(req, res)})
    authRoutes.get('/tarefa/:id', (req, res) => { TarefaController.show(req, res)})
    authRoutes.post('/tarefa', (req, res) => { TarefaController.register(req, res)})
    authRoutes.put('/tarefa/:id', (req, res) => { TarefaController.update(req, res)})
    authRoutes.patch('/tarefa/:id/status', (req, res) => { TarefaController.patch(req, res)})
    authRoutes.delete('/tarefa/:id', (req, res) => { TarefaController.delete(req, res)})
    
    app.use("/auth", authRoutes)
}

module.exports = Routes
