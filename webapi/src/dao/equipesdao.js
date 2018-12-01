class equipesdao {
    constructor (app) {
        this._app = app;
    }

    listar( callback ) {
        let conn = this._app.db.connection();
        conn.query("select * from equipes order by pontos desc", callback);
        conn.end();
    }

    buscarPorId( id, callback ) {
        let conn = this._app.db.connection();
        conn.query("select * from equipes where id = ? ",  id, callback );
        conn.end();
    }

    inserir( equipe, callback ) {
        let conn = this._app.db.connection();
        conn.query("insert equipes set ?", equipe, callback);
        conn.end();
    }

    alterar( equipe, callback ) {
        let conn = this._app.db.connection();
        conn.query("update equipes set ? where id = ?", [ equipe, equipe.id ], callback );
        conn.end();
    }

    apagar( id, callback ) {
        let conn = this._app.db.connection();
        conn.query("delete from equipes where id = ?", id, callback );
        conn.end();
    }
}

module.exports = function () {
    return equipesdao;
}