export class ExtratoMain {
    static constroiExtrato(usuario, extratoUl) {
        const sectionExtrato = document.getElementById("section-extratos");
        let adicionado = false;
        try {
            if (!usuario.transacoes.length) {
                throw Error;
            }
            else {
                usuario.transacoes.slice().reverse().forEach((elemento) => {
                    extratoUl.innerHTML += this.criaExtrato(elemento.periodo.dia, this.posicaoArray, usuario);
                    const extratoLi = document.getElementById(`li-extratos-${this.posicaoArray}`);
                    if (elemento.periodo.tipos.length > 3 && !adicionado) {
                        adicionado = true;
                        sectionExtrato.className += " overflow-y-scroll";
                    }
                    for (let i = elemento.periodo.tipos.length - 1; i >= 0; i--) {
                        extratoLi.innerHTML += this.adicionaLiExtrato(elemento.periodo.tipos[i], elemento.periodo.valores[i], elemento.periodo.horarios[i]);
                    }
                    this.posicaoArray++;
                });
            }
        }
        catch (_a) {
            extratoUl.innerHTML = `
                <h3 class="text-lg font-medium">Não há extratos no momento...</h3>`;
        }
    }
    static criaExtrato(mesDia, posicaoArray, usuario) {
        this.contagem++;
        let divisaoDias = '<div class="w-full h-0.5 bg-cor-cinza_transparente"></div>';
        if (this.contagem == usuario.transacoes.length) {
            divisaoDias = "";
        }
        // <img src=${srcImagem} alt=${altImagem} width="30" heigth="10">
        const adicionaExtrato = `
        <li class="flex flex-col gap-4" id="dias-extratos">
            <h4 class="text-cor-cinza_claro text-base font-medium">${mesDia}</h4>
            <div class="flex flex-col gap-4" id="li-extratos-${posicaoArray}">
                
            </div>
        </li>
        ${divisaoDias}`;
        return adicionaExtrato;
    }
    static adicionaLiExtrato(tipoExtrato, valor, horario) {
        let imgExtrato = "";
        let altExtrato = "";
        if (tipoExtrato == "Transferência Enviada" || tipoExtrato == "Transferência Recebida") {
            imgExtrato = "../img/transferenciaEnviada-icone.svg";
            altExtrato = "transferenciaEnviada-ícone";
        }
        else if (tipoExtrato == "Saque") {
            imgExtrato = "../img/saqueRealizado.svg";
            altExtrato = "saque-ícone";
        }
        else if (tipoExtrato == "Depósito") {
            imgExtrato = "../img/depositoRealizado-icone.svg";
            altExtrato = "depósito-ícone";
        }
        const liExtrato = `
        <div class="flex gap-3 items-center">
            <div class="p-2.5 bg-cor-terciaria rounded-full">
            <img src=${imgExtrato} alt=${altExtrato} class="w-6 h-6">
            </div>
            <div class="flex w-full justify-between">
                <div>
                    <p id="nome" class="text-cor-cinza_escuro text-base font-semibold">${tipoExtrato}</p>
                    <p id="nome-pessoal" class="text-cor-cinza_claro">${horario}</p>
                </div>
                <p class="text-cor-cinza_escuro text-base font-semibold">R$${valor.replace('.', ',')}</p>
            </div>
        </div>`;
        return liExtrato;
    }
}
ExtratoMain.posicaoArray = 0;
ExtratoMain.contagem = 0;
