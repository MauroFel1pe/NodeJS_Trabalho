CREATE DATABASE Clubes;

CREATE TABLE usuarios (
    id integer not null auto_increment primary key,
    nome varchar(50) not null,
    usuario varchar(20) not null,
    senha varchar(50) not null
);

CREATE TABLE equipes (
    id integer not null auto_increment primary key,
    nome varchar(100) not null,
    sigla varchar(5) not null,
    pontos integer,
    escudo varchar(50)
);