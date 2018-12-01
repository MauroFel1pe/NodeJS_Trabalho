const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const consign = require("consign");

const jwt = require("jsonwebtoken");

require("dotenv").load();

app.set("jwt", jwt);

app.use(bodyParser.json());
app.use("/upload", express.static("upload"));

app.use("*",  function(request, response, next) {
    let liberarAcesso = (request.originalUrl == "/login" || 
                        (request.originalUrl == "/usuarios" && request.method == "POST") ||
                        request.originalUrl.search("upload") == 1);

    if (!liberarAcesso) {
        const token = request.body.token || request.query.token || request.headers["x-access-token"];

        if (!token) {
            response.json({ error: { code: 401, message: "Não autorizado"}});
        } else {
            jwt.verify(token, process.env.KEYJWT, (err, decode) => {
                if (err) {
                    response.json({ error: { code: 401, message: "Não autorizado"}});
                } else {
                    request.usuario_logado = decode;
                    liberarAcesso = true;
                }                
            });
        }
    }
    if (liberarAcesso) {
        next();
    }
});

consign({ cwd: "src"})
    .include("routers")
    .then("db")
    .then("dao")
    .into(app);

app.listen(8080, function() {
});