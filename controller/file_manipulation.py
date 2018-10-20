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
Módulo de interação com arquivos
"""



# Módulos necessários
import json



def write_audiencia(arquivo, audiencia):
    """
    Escreve a @audiencia no @arquivo
    """
    try:
        with open(arquivo, 'w', encoding='latin-1') as obj_file:
            obj_file.write(audiencia)
    except:
        with open(arquivo, 'w', encoding='utf-8') as obj_file:
            obj_file.write(audiencia)