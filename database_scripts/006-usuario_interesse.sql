CREATE TABLE usuario_interesse (
    fk_id_usuario INT NOT NULL
    ,fk_id_interesse INT NOT NULL
    ,FOREIGN KEY(fk_id_interesse) REFERENCES interesse(id)
    ,FOREIGN KEY(fk_id_usuario) REFERENCES usuario(id)
    ,PRIMARY KEY(fk_id_usuario, fk_id_interesse)
);