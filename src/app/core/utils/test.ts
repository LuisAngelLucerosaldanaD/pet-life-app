
const Caminar = (): Promise<any> => {
    return new Promise((response, reject) => {
        response('Caminando...');
    });
}

const Decansar = (): Promise<any> => {
    return new Promise((response, reject) => {
        response('Descansando...');
    });
}

const TomarAgua = (): Promise<any> => {
    return new Promise((response, reject) => {
        response('Tomando Agua...');
    });
}

const actividades = async () => {
    await Caminar();
   
    await Decansar();

    await TomarAgua();

}