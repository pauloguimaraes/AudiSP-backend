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

import controller.file_manipulation as fileman
import dao.connection_factory as conn
import dao.audiencia_dao as audienciadao
import dao.audiencia_limpa_dao as audilimpadao
from controller.get_audiencias import get_audiencias_publicas



# Variáveis
url = 'http://devcolab.each.usp.br/do/catalog.json?q=audiencia+publica&sort=data+desc&per_page=5'
hoje = datetime.date(2013, 3, 20)



def main():
    """
    Método principal da aplicação
    """
    maxrange = 5000
    upLimit = 0
    jump = 30
    for x in range(0,maxrange,jump):
        if(x > maxrange):
            break
        if(x + jump > maxrange):
            upLimit = maxrange
        else:
            upLimit = x+jump
        retorno = get_audiencias_publicas(base_date=hoje, url=url, starting_page=x, ending_page=upLimit)
        contador = 0
        for linha in retorno:
            try:
                contador+=1
                connection = conn.set_connection(server='localhost', user='root', password='123456', db_name='audisp')
            
                id_inserido = audienciadao.insere(linha, connection)
                fileman.write_audiencia('./output/sujos/{0}.txt'.format(id_inserido), linha['text'])#.decode('utf-8'))
            
            except Exception as e:
                print(str(x) + " up "+str(upLimit)+" count sujo "+str(contador))
                fileman.write_audiencia('./output/sujos/{0}.txt'.format(id_inserido), linha['text'])
                print('{0}'.format(str(e)))#e.args[1]))
				
            try:
                audilimpadao.insere(id_inserido, linha, connection)
                fileman.write_audiencia('./output/limpos/{0}.txt'.format(id_inserido), linha['text_limpo'])#.decode('utf-8'))

            except Exception as e:
                print(str(x) + " up "+str(upLimit)+" count limpo "+str(contador))
                print('{0}'.format(str(e)))#e.args[1]))
                conn.close(connection)
        del retorno


if(__name__ == '__main__'):
    main()
