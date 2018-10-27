CREATE TABLE senha (
    fk_id_usuario INT NOT NULL
    ,senha VARCHAR(255) NOT NULL
    ,FOREIGN KEY(fk_id_usuario) REFERENCES usuario(id)
    ,PRIMARY KEY(fk_id_usuario)
);