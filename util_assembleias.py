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
Módulo com utilidades do projeto
"""



# Módulos necessários
import re



def fit_pattern(text, pattern):
    """
    Busca o @pattern no @text, retornando se o encontrou ou não.
    """

    if(re.search(pattern, text) is None):
        return False
    return True