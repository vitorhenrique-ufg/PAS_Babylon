Date.prototype.convertaDateToStrDiaMesAno = function () {
    if (!this) return '';
    dia = this.getDate().toString().padStart(2, '0');
    mes = (this.getMonth() + 1).toString().padStart(2, '0');
    ano = this.getFullYear();
    return dia + '/' + mes + '/' + ano;
}

let batimentos = 80;

function gereBatimentosCardiacos() {
    const maximoBatimentos = 117;
    const minimoBatimentos = 85;
    const batimentosCardiacos = Math.random() * (maximoBatimentos - minimoBatimentos) + minimoBatimentos;
    return Math.floor(batimentosCardiacos);
}