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
Módulo de teste de execução
"""



# Módulos necessários
import datetime

from assembleia_dao import set_connection, insere
from get_assembleias import get_assembleias_publicas



# Variáveis
url = 'http://devcolab.each.usp.br/do/catalog.json?f[data][]=years_mais_5&q=audiencia+publica&per_page=5'
hoje = datetime.date(2010, 3, 20)



def main():
    """
    Método principal da aplicação
    """

    retorno = get_assembleias_publicas(base_date=hoje, url=url, starting_page=1, ending_page=10)
    
    
    # Escreve no arquivo
    for linha in retorno:
        try:
            insere(linha, set_connection(user='root', password='123456', db_name='audisp'))
        except Exception as e:
            print('{0}'.format(e.args[1]))



if(__name__ == '__main__'):
    main()
