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
Módulo responsável por fazer interações com audiências limpas na base de dados
"""



def insere(id_audiencia, audiencia, connection):
    """
    Insere a @audiencia na base de dados de audiências limpas, usando a @connection.
    Usa a @id_audiencia como chave estrangeira para inserção.
    """

    cursor = connection.cursor()

    query = 'INSERT INTO audiencia_limpa(fk_id_audiencia, texto) VALUES(%s, %s)'
    tupla = (id_audiencia, audiencia['text_limpo'].decode('utf-8'))

    cursor.execute(query, tupla)
    connection.commit()

    cursor.close()
    connection.close()