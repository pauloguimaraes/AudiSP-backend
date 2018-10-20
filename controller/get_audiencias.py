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
Módulo responsável por recuperar as audiencias com a finalidade de popular uma base de dados
"""



# Módulos necessários
import datetime
import json
import re
import requests
import string

from controller.util_audiencias import fit_pattern



def get_index(identify):
    """
    Limpa a @identify de forma a recuperar o identificador da audiencia
    """

    pedaco = identify.replace('/', '')
    return int(pedaco)



def filter_dates(base_date, suspects):
    """
    Filtra os @suspects, retornando as datas encontradas em uma lista que contém apenas aquelas maiores que @base_date
    """

    datas = []

    # Se existe algum texto nos suspeitos
    if(len(suspects) > 0):

        # Se a data é formada apenas por números
        if(len(suspects[0]) > 0):

            # Percorre todos
            for suspect in suspects[0]:
                try:
                    if not suspect:
                        continue
                    
                    # Quebra as possíveis datas nas /
                    date_numbers = re.split(r'\/', suspect)

                    dia = int(date_numbers[0])
                    mes = int(date_numbers[1])

                    # Padronizando as datas com 4 caracteres
                    if(len(date_numbers[2]) < 3):
                        date_numbers[2] = '20{0}'.format(date_numbers[2])

                    ano = int(date_numbers[2])

                    # Se o mes é maior que 12 ou o dia maior que 31 esse suspeito pode ser descartado
                    if(mes > 12 or dia > 31):
                        continue

                    builded_date = datetime.date(ano, mes, dia)

                    # Se a data encontrada estiver for maior que a base pode adicioná-la ao retorno
                    if(base_date <= builded_date):
                        datas.append(builded_date)

                except:
                    continue
        
        # Se a data tem o mês por extenso
        if(len(suspects[1]) > 0):

            # Meses por extenso
            meses = {'janeiro': 1, 'fevereiro': 2, 'março': 3, 'abril': 4, 'maio': 5, 'junho': 6, 'julho': 7, 'agosto': 8, 'setembro': 9, 'outubro': 10, 'novembro': 11, 'dezembro': 12}

            # Percorre as datas
            for suspect in suspects[1]:
                try:
                    if not suspect:
                        continue
                    
                    # Separa por espaço
                    date_numbers = re.split(' ', suspect)

                    # Busca o mês no texto
                    deve_parar = True
                    for mes in meses:
                        if(fit_pattern(suspect, mes)):
                            deve_parar = False
                            break
                    
                    # Se não encontrar mês no texto é porque não é uma data e pode continuar
                    if(deve_parar):
                        continue

                    dia = int(date_numbers[0])
                    mes = int(meses[date_numbers[2]])
                    ano = int(date_numbers[4])

                    builded_date = datetime.date(ano, mes, dia)

                    # Se a data encontrada estiver for maior que a base pode adicioná-la ao retorno
                    if(base_date <= builded_date):
                        datas.append(builded_date)
                except:
                    continue
        
        # Se alguma data foi encontrada retorna a lista
        if(len(datas) > 0):
            return datas

        return None



def clear_text(texto):
    """
    Método responsável por limpar o texto da audiência.
    Será útil para treinamento NLU
    """
    novo_texto = texto.upper()#.decode('utf-8').upper()
    novo_texto = re.sub(r'[' + ',.-;\+\=\_' + ']', ' ', novo_texto)#re.escape(string.punctuation) + ']', ' ', novo_texto)
    novo_texto = re.sub(r'\(\(.*?\)\)','',novo_texto) #remove as marcações no formato ((TITULO)) 
    novo_texto = re.sub(r'[\n\r]+', ' ',novo_texto)
    novo_texto = novo_texto.replace('Ç', 'C').replace('º', 'O').replace('ª', 'A')
    novo_texto = re.sub(r'[ÁÀÃÂÄ]', 'A', novo_texto)
    novo_texto = re.sub(r'[ÉÈẼÊË]', 'E', novo_texto)
    novo_texto = re.sub(r'[ÍÌĨÎÏ]', 'I', novo_texto)
    novo_texto = re.sub(r'[ÓÒÕÔÖ]', 'O', novo_texto)
    novo_texto = re.sub(r'[ÚÙŨÛÜ]', 'U', novo_texto)
    #novo_texto = novo_texto.encode('utf-8')
    return novo_texto



def get_audiencias_publicas(base_date, url, starting_page=1, ending_page=None):
    """
    Busca as audiencias públicas que irão ocorrer a partir da @base_date, usando a @url e iniciando da @starting_page e indo até o fim
    """

    res = []

    while True:

        if(ending_page is not None and starting_page > ending_page):
            break

        # Faz a requisição
        response = requests.get('{0}&page={1}'.format(url, starting_page))

        # Se tem resposta extrai a data
        if(response.status_code == 200):
            print(str(starting_page))
            data = json.loads(response.content)
        else:
            print("Falha!")
            break

        # Incrementa a página
        starting_page = starting_page + 1

        # Se não existem documentos na página, já encerrou a busca
        if(len(data['response']['docs']) <= 0):
            break

        audiencias = {}
        datas = {}
        links = {}
        
        # Percorre os documentos
        for nota in data['response']['docs']:
            tipo = str(nota['tipo_conteudo'])

            # Se for da Câmara, não nos importa
            if(fit_pattern(tipo, r'CÂMARA')):
                continue
            # Senão, devemos nos atentar 
            else:
                texto = str(nota['texto'])

                # Se encontra Audiência ou Pública no texto, é um caso a ser observado
                if(fit_pattern(texto, r'Audiência') or fit_pattern(texto, r'Pública')):
                    if(fit_pattern(texto, r'às')):
                        index = get_index(nota['id'])
                        audiencias[index] = nota
        
        # Percorre as audiências encontradas
        for audiencia in audiencias:
            links[audiencia] = 'http://devcolab.each.usp.br/do/{0}'.format(audiencias[audiencia]['id'])
            texto = str(audiencias[audiencia]['texto'])

            # Busca as datas no texto
            datas[audiencia] = [re.findall(r'\d{1,2}\/\d{1,2}\/\d{2,4}', texto)]+[re.findall(r'\d{1,2}\s\w+\s\w+\s\w+\s\d{2,4}', texto)]
            # Filtra as datas
            datas[audiencia] = filter_dates(base_date, datas[audiencia])

        # Percorre as audiências encontradas, para montar o objeto
        for audiencia in audiencias:
            objt = {}
            objt['title'] = audiencias[audiencia]['secretaria']
            str_texto = audiencias[audiencia]['texto'].strip()#.encode('utf8')
            objt['text'] = str_texto
            objt['text_limpo'] = clear_text(str_texto)
            objt['url'] = links[audiencia]

            # Se não foi encontrada data
            if not datas[audiencia]:
                objt['date'] = None
                
            # Se foi encontrada data
            else:
                data = str(datas[audiencia][0])
                objt['date'] = data
                
            res.append(objt)
    
    # Retorna as audiencias públicas
    return res


