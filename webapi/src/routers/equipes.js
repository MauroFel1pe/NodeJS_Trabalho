const multer = require("multer");
const path = require("path");

let upload = multer({
    dest: "upload/",
    storage: multer.diskStorage({
        destination : (req, file, callback) => {
            callback(null, "./upload");
        },
        filename : (req, file, callback) => {
            callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
    })
});

module.exports = function (app) {
    app.get("/equipes", function (resquest, response) {
        let equipesDao = new app.dao.equipesdao(app);
        equipesDao.listar(function (error, result) {
            if (error) {
                response.json({ error: { code: error.code, message: erro.sqlMessage }});
            } else {
                response.json({ equipes : result });
            }
        });
    });

    app.get("/equipes/:id", function (request, response) {
        let id = request.params.id;
        if (!id) {
            response.json({error: 1, message: "Equipe não localizada"})
        } else {
            let equipesDao = new app.dao.equipesdao(app);
            equipesDao.buscarPorId(id, function (error, result) {
                if (error) {
                    response.json({ error: { code: error.code, message: erro.sqlMessage }});
                } else {
                    response.json({ equipe : result[0] });
                }
            });
        }
    });

    app.post("/equipes", upload.single("pathEscudo"), function (request, response) {
        let equipe = {
            nome : request.body.nome,
            sigla : request.body.sigla,
            pontos : request.body.pontos,
            escudo : request.file ? request.file.path : request.body.escudo
        };
        if (!equipe.nome) {
            response.json({error : { code: 1, message: "Informe o nome da equipe"}});
        } else if (!equipe.sigla) {
            response.json({error : { code: 1, message: "Informe a sigla da equipe"}});
        } else {
            let equipesDao = new app.dao.equipesdao(app);
            equipesDao.inserir( equipe, function (error, result) {
                if (error) {
                    response.json({ error: { code: error.code, message: error.sqlMessage }});
                } else {
                    response.json({ result: {insertId : result.insertId}});
                }   
            });
        }
    });

    app.put("/equipes/:id", upload.single("pathEscudo"), function (request, response) {
        let equipe = {
            id : request.params.id,
            nome : request.body.nome,
            sigla : request.body.sigla,
            pontos : request.body.pontos,
            escudo : request.file ? request.file.path : request.body.escudo
        };
        if (!equipe.nome) {
            response.json({error : { code: 1, message: "Informe o nome da equipe"}});
        } else if (!equipe.sigla) {
            response.json({error : { code: 1, message: "Informe a sigla da equipe"}});
        } else {
            let equipesDao = new app.dao.equipesdao(app);
            equipesDao.alterar(equipe, function (error, result) {
                if (error) {
                    response.json({ error: { code: error.code, message: erro.sqlMessage }});
                } else {
                    response.json({ result : { changedRows : result.changedRows}});
                }
            });
        }
    });

    app.delete("/equipes/:id", function (request, response) {
        let id = request.params.id;
        let equipesDao = new app.dao.equipesdao(app);
        equipesDao.apagar(id, function (error, result) {
            if (error) {
                response.json({ error: { code: error.code, message: erro.sqlMessage }});
            } else {
                response.json({result : { affectedRows : result.affectedRows }});
            }
        });
    });
}