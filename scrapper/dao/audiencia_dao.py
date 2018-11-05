"""
Projeto de Resolução de Problemas 2
AudiSP - Audiências Públicas de São Paulo

Autores:
Arthur Ferreira                         9277051
Bruno Tenório dos Santos                9277746
Matheus de Oliveira Lêu                 8802621
Matheus Ribeiro de Almeida Veneziani    9277638
Paulo Henrique Freitas Guimarães        9390361
Rafael Condez Gosson Pavarini           9360986

Supervisores:
Professor Doutor Fábio Nakano
Professor Doutor Marcelo Medeiros Eler

Referências:
Projetos da disciplina de Governo Aberto
https://github.com/EACH-Lab2017/ACH3778_Governo_Aberto

Professora Doutora Gisele da Silva Craveiro

Descrição:
Módulo responsável por fazer interações com audiências na base de dados
"""

import datetime


def get_last_audiencia(connection):
    """
    Recupera a última audiência inserida na base.
    Método deverá ser usado para conseguir vincular a chave quando for inserir o texto limpo na base.
    Usa a @connection para interação.
    """

    cursor = connection.cursor()

    # Recupera o último ID
    query = 'SELECT id FROM publicacao ORDER BY id DESC LIMIT 1'
    cursor.execute(query)
    
    id_ass = 0
    for(id) in cursor:
        id_ass = int(id[0])

    cursor.close()
    return id_ass



def get_data_ultima_audiencia(connection):
    """
    """

    cursor = connection.cursor()

    query = "SELECT MAX(data) AS 'data_pub' FROM publicacao ORDER BY data DESC"
    cursor.execute(query)

    data_pub_var = None
    for(data_pub) in cursor:
        data_pub_var = data_pub[0]
    
    print('DATA: {0}'.format(data_pub))

    cursor.close()
    return data_pub_var


def insere(audiencia, connection):
    """
    Insere a @audiencia na base de dados, usando a @connection.
    Retorna o ID da audiência inserida
    """

    cursor = connection.cursor()

    query = 'INSERT INTO publicacao(titulo, data, url_devcolab, texto) VALUES (%s, %s, %s, %s)'
    ass_tupla = (audiencia['title'], audiencia['data'], audiencia['url'], audiencia['text'])#.decode('utf8'))

    cursor.execute(query, ass_tupla)
    connection.commit()

    id_audiencia_inserida = get_last_audiencia(connection)

    return id_audiencia_inserida
