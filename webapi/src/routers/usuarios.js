module.exports = function (app) {
    app.get("/usuarios", function (request, response) {
        let usuarioDao = new app.dao.usuariosdao(app);
        usuarioDao.listar( function (error, result) {
            if (error) {
                response.json({ error: { code: error.code, message: error.sqlMessage }});
            } else {
                response.json({ usuarios: result });
            }
        });
    });

    app.post("/usuarios", function (request, response) {
        let usuario = {
            nome: request.body.nome,
            usuario: request.body.usuario,
            senha: request.body.senha
        };
        if (!usuario.nome) {
            response.json({error: { code: 1, message: "Informe o seu nome"}});
        } else if (!usuario.usuario) {
            response.json({error: { code: 1, message: "Informe o nome do usuário que deseja cadastrar"}});
        } else if (!usuario.senha) {
            response.json({error: { code: 1, message: "Informe uma senha"}});
        } else {
            let usuarioDao = new app.dao.usuariosdao(app);
            usuarioDao.inserir( usuario, 
                function (error, result) {
                    if (error) {
                        response.json({ error: { code: error.code, message: error.sqlMessage }});
                    } else {
                        response.json({ result: { insertId: result.insertId }});
                    }
                });
        }
    });

    app.post("/login", function (request, response) {
        let usuario = request.body.usuario;
        let senha = request.body.senha;
        if (!usuario) {
            response.json({ error: {code: 1, message: "Usuário não informado"}});
        } else if (!senha) {
            response.json({ error: {code: 1, message: "Senha não informada"}});
        } else {
            let usuarioDao = new app.dao.usuariosdao(app);
            usuarioDao.buscar(usuario, function (error, result) {
                if (error) {
                    response.json({ error : { code: error.code, mesage: error.sqlMessage }});
                } else if (!result || result.length < 1 ) {
                    response.json({ error : { code: 1, message: "Usuário não localizado"}});
                } else {
                    let dados = result[0];
                    if (dados.senha != senha) {
                        response.json({ error: {code: 1, message: "Senha inválida"}});
                    } else {
                        const payload = {
                            usuario : {
                                id: dados.id,
                                nome: dados.nome,
                                usuario: dados.usuario 
                            }
                        };
                        const jwt = app.get("jwt");
                        const token = jwt.sign(payload, process.env.KEYJWT, {expiresIn: 60*60*24});
                        response.json({ result : { token } });
                    }
                }
            });
        }
    });
};