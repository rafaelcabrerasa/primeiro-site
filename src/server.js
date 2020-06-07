const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})


//configurar caminhos da minha aplicação
//pagina inicial
//req: requisição
//res: resposta
server.get("/", (req, res) => {
    
    return res.render("index.html", {title: "um titulo"})
})


server.get("/create-point", (req, res) => {

    //re.query: query strings da nossa url

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: o corpo do nosso formulario
    //console.log(req.body)

    //inserir dados no bnco de dados
    //2-inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.nome,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)
    
    
})


server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html",{total: 0})
    }


    //3-consultar os dados da tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length

        //motrar a pagina html com os dados do banco de dados
        return res.render("search-results.html",{places: rows, total: total})
        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    
})


//ligar o servidor
server.listen(3000)
