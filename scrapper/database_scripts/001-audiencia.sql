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
