let batimentos = 80;

window.addEventListener('load', () => {
    habiliteTooltips(document);
});

Date.prototype.convertaDateToStrDiaMesAno = function () {
    if (!this) return '';
    dia = this.getDate().toString().padStart(2, '0');
    mes = (this.getMonth() + 1).toString().padStart(2, '0');
    ano = this.getFullYear();
    return dia + '/' + mes + '/' + ano;
}

function gereBatimentosCardiacos() {
    const maximoBatimentos = 117;
    const minimoBatimentos = 85;
    const batimentosCardiacos = Math.random() * (maximoBatimentos - minimoBatimentos) + minimoBatimentos;
    return Math.floor(batimentosCardiacos);
}

async function postJSON(optionsFetch) {
    const { url, data, method } = optionsFetch

    const options = 
        {
            method: method || 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data || {})
        }

    const response = await fetch(url, options);
    const json = await response.json();
    return json;
}

function habiliteTooltips(container) {
    let habilite = (theme) => {
        let cssselector = theme ? `[data-bs-toggle="tooltip-${theme}"]` : '[data-bs-toggle="tooltip"]';
        let list = container.querySelectorAll(cssselector);
        tippy(list, {
            appendTo: () => document.body,
            content(reference) {
                const title = reference.getAttribute('title')
                reference.removeAttribute('title')
                return title
            },
            arrow: false,
            allowHTML: true,
            animation: 'fade',
            offset: [0, 0],
            theme: theme
        });
    };
    habilite();
    //habilite('danger');
    //habilite('warning');
    //habilite('success');
    //habilite('info');
}