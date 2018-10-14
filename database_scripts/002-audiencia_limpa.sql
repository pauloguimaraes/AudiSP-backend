CREATE TABLE audiencia_limpa (
    fk_id_audiencia INT NOT NULL
    ,texto TEXT NOT NULL
    ,processada BIT NOT NULL DEFAULT b'0'
    ,FOREIGN KEY(fk_id_audiencia) REFERENCES audiencia(id)
);


ALTER TABLE audiencia_limpa CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE audiencia_limpa DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE audiencia_limpa CHANGE texto texto TEXT CHARACTER SET utf8 COLLATE utf8_general_ci;

