var likesList = [{ nome: 'Saúde', id: 'saude' }, { nome: 'Educação', id: 'educacao' }, { nome: 'Meio Ambiente', id: 'meioambiente' }, { nome: 'Gastos Públicos', id: 'gastospublicos' }];


function getUserLikes(req) {
    return new Promise(
        (resolve, reject) => {
            resolve(likesList);
        });
};

module.exports = {
    getUserLikes: getUserLikes
};