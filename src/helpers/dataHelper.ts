export const formattedCurrentDate = () => {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, "0");
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0"); // Os meses são indexados a partir de zero
    const ano = dataAtual.getFullYear();
    const hora = String(dataAtual.getHours()).padStart(2, "0");
    const minutos = String(dataAtual.getMinutes()).padStart(2, "0");
    
    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    return dataFormatada;
}