create database audisp;

USE audisp;

CREATE TABLE publicacao (
    id INT NOT NULL AUTO_INCREMENT
    ,titulo TEXT NOT NULL
    ,data DATETIME
    ,texto TEXT NOT NULL
    ,url_devcolab VARCHAR(255)
    ,PRIMARY KEY(id)
);


ALTER TABLE publicacao CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE publicacao DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE publicacao CHANGE texto texto TEXT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE UNIQUE INDEX un_url ON publicacao(url_devcolab);

CREATE TABLE publicacao_limpa (
    fk_id_publicacao INT NOT NULL
    ,texto TEXT NOT NULL
    ,processada BIT NOT NULL DEFAULT b'0'
    ,FOREIGN KEY(fk_id_publicacao) REFERENCES publicacao(id)
);


ALTER TABLE publicacao_limpa CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE publicacao_limpa DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE publicacao_limpa CHANGE texto texto TEXT CHARACTER SET utf8 COLLATE utf8_general_ci;

create table audiencia (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    id_publicacao int not null,
    data date,
    horario varchar(255),
    local varchar(255)
    FOREIGN KEY(id_publicacao) REFERENCES publicacao(id)
);

create table pauta (
    id int not null primary key AUTO_INCREMENT,
    nome varchar(255) not null
);

create table audienciaPauta (
    id_audiencia int not null,
    id_pauta int not null,
    FOREIGN KEY(id_audiencia) REFERENCES audiencia(id),
    FOREIGN KEY(id_pauta) REFERENCES pauta(id)
);

CREATE TABLE usuario (
    id INT NOT NULL AUTO_INCREMENT
    ,nome VARCHAR(512) NOT NULL
    ,email VARCHAR(255) NOT NULL 
    ,nascimento DATE
    ,hash_senha varchar(255) not null
    ,PRIMARY KEY(id)
);

CREATE TABLE interesse (
    id_usuario INT NOT NULL,
    id_pauta int NOT NULL,
    score int,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    FOREIGN KEY(id_pauta) REFERENCES pauta(id)
);