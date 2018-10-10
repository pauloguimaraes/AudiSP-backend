


from connection_factory import conecta



def set_connection(user='root', password='123456', db_name='audisp'):
    configuration = {}
    configuration['user'] = user
    configuration['password'] = password
    configuration['host'] = 'localhost'
    configuration['database'] =db_name
    configuration['raise_on_warnings'] = True

    return conecta(configuration)


def insere(assembleia, connection):
    cursor = connection.cursor()
    query = 'INSERT INTO audiencia(titulo, data_audi, url_devcolab, texto) VALUES (%s, %s, %s, %s)'
    ass_tupla = (assembleia['title'], assembleia['date'], assembleia['url'], assembleia['text'].decode('utf8'))

    # print(assembleia['text'].decode('utf8'))
    cursor.execute(query, ass_tupla)

    connection.commit()

    query = 'SELECT id FROM audiencia ORDER BY id DESC LIMIT 1'
    cursor.execute(query)
    
    id_ass = 0
    for(id) in cursor:
        id_ass = int(id[0])

    cursor.close()

    cursor = connection.cursor()

    query_1 = 'INSERT INTO audiencia_limpa(fk_id_audiencia, texto) VALUES(%s, %s)'
    # print(assembleia['text_limpo'].decode('utf-8'))
    ass_tupla_1 = (id_ass, assembleia['text_limpo'].decode('utf-8'))

    cursor.execute(query_1, ass_tupla_1)
    connection.commit()

    cursor.close()
    connection.close()
