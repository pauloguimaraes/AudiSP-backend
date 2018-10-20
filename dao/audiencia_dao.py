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



def get_last_audiencia(connection):
    """
    Recupera a última audiência inserida na base.
    Método deverá ser usado para conseguir vincular a chave quando for inserir o texto limpo na base.
    Usa a @connection para interação.
    """

    cursor = connection.cursor()

    # Recupera o último ID
    query = 'SELECT id FROM audiencia ORDER BY id DESC LIMIT 1'
    cursor.execute(query)
    
    id_ass = 0
    for(id) in cursor:
        id_ass = int(id[0])

    cursor.close()
    return id_ass

def get_assembleia_list(limit, connection):
    cursor = connection.cursor();
    query =  'SELECT '



def insere(audiencia, connection):
    """
    Insere a @audiencia na base de dados, usando a @connection.
    Retorna o ID da audiência inserida
    """

    cursor = connection.cursor()

    query = 'INSERT INTO audiencia(titulo, data_audi, url_devcolab, texto) VALUES (%s, %s, %s, %s)'
    ass_tupla = (audiencia['title'], audiencia['date'], audiencia['url'], audiencia['text'])#.decode('utf8'))

    cursor.execute(query, ass_tupla)
    connection.commit()

    id_audiencia_inserida = get_last_audiencia(connection)

    return id_audiencia_inserida
