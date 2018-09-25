import mysql.connector



def conecta(configuration):
    return mysql.connector.connect(**configuration)