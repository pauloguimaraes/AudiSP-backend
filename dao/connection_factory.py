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
Módulo responsável por fazer conexões com banco de dados
"""



# Módulos necessários
import mysql.connector



def conecta(configuration):
    """
    Retorna uma conexão MySQL usando a @configuration
    """
    return mysql.connector.connect(**configuration)



def set_connection(server='localhost', user='root', password='123456', db_name='audisp'):
    """
    Estabelece uma conexão com a base de dados @db_name presente em @server, usando @user e @password
    """
    configuration = {}
    configuration['user'] = user
    configuration['password'] = password
    configuration['host'] = server
    configuration['database'] =db_name
    configuration['raise_on_warnings'] = True

    return conecta(configuration)



def close(connection):
    """
    Encerra a @connection
    """
    connection.close()