CREATE TABLE usuario (
    id INT NOT NULL AUTO_INCREMENT
    ,nome VARCHAR(512) NOT NULL
    ,email VARCHAR(255) NOT NULL
    ,nascimento DATE
    ,PRIMARY KEY(id)
);