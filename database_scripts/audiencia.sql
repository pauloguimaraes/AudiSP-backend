USE audisp;

CREATE TABLE audiencia (
    id INT NOT NULL AUTO_INCREMENT
    ,titulo TEXT NOT NULL
    ,data_audi DATETIME
    ,texto TEXT NOT NULL
    ,url_devcolab VARCHAR(255)
    ,PRIMARY KEY(id)
);


ALTER TABLE audiencia CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE audiencia DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE audiencia CHANGE texto texto TEXT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE audiencia_limpa (
    fk_id_audiencia INT NOT NULL
    ,texto TEXT NOT NULL
    ,processada BIT NOT NULL DEFAULT b'0'
    ,FOREIGN KEY(fk_id_audiencia) REFERENCES audiencia(id)
);


ALTER TABLE audiencia_limpa CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE audiencia_limpa DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE audiencia_limpa CHANGE texto texto TEXT CHARACTER SET utf8 COLLATE utf8_general_ci;

