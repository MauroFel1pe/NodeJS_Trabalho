class usuariosdao {
    constructor (app) {
        this._app = app;
    };

    listar( callback ) {
        let conn = this._app.db.connection();
        conn.query("select id, nome, usuario from usuarios", callback);
        conn.end();
    }

    inserir( usuario, callback) {
        let conn = this._app.db.connection();
        conn.query("insert into usuarios set ?", usuario, callback);
        conn.end();
    };

    buscar( usuario, callback) {
        let conn = this._app.db.connection();
        conn.query("select * from usuarios where nome = ?", usuario, callback);
        conn.end();
    }
}

module.exports = function () {
    return usuariosdao;
}