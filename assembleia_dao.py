


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
    cursor.close()
    connection.close()
