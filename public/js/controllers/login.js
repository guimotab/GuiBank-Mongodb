var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mostraSenha from "../utils/mostraSenha.js";
import { hashSenha } from "../utils/criptografaSenha.js";
import { verificaCampos } from "../utils/verificaCampos.js";
import { UsuariosApi } from "../services/UsuariosApi.js";
import { InformacoesUsuario } from "../models/InformacoesUsuario.js";
(() => __awaiter(void 0, void 0, void 0, function* () {
    const contas = yield UsuariosApi.get();
    const login = document.getElementById('form');
    const botaoSubmit = document.getElementById('botao-submit');
    const CPF = document.getElementById('cpf');
    const campoSenha = document.getElementById('campo-senha');
    const olho = document.querySelector('[data-id]');
    olho.addEventListener("mousedown", (evento) => {
        let clicouOlho = evento.target;
        mostraSenha.verSenha(clicouOlho);
    });
    olho.addEventListener("mouseup", (evento) => {
        let clicouOlho = evento.target;
        mostraSenha.fecharSenha(clicouOlho);
    });
    CPF.addEventListener('blur', (evento) => {
        const erroCpfObg = document.getElementById("erro-cpf-obrigatorio");
        const erroCpfInv = document.getElementById("erro-cpf-invalido");
        const erroCpfExi = document.getElementById("erro-cpf-existe");
        const erroCpfEsc = document.getElementById("erro-cpf-escrita");
        verificaCampos.verificaCampoCpfLogin(CPF, erroCpfObg, erroCpfInv, erroCpfExi, erroCpfEsc, contas);
    });
    campoSenha.addEventListener('blur', (evento) => {
        const erroSenhaObg = document.getElementById("erro-senha-obrigatorio");
        const erroSenhaEsc = document.getElementById("erro-senha-escrita");
        const erroSenhaInv = document.getElementById("erro-senha-invalido");
        verificaCampos.verificaCampoSenhaLogin(campoSenha, erroSenhaObg, erroSenhaEsc, erroSenhaInv);
    });
    login.addEventListener('submit', (evento) => __awaiter(void 0, void 0, void 0, function* () {
        evento.preventDefault();
        const cpf = CPF.value;
        const senha = campoSenha.value;
        const usuarioEncontrado = contas.find((elemento) => elemento.cpf == cpf);
        if (usuarioEncontrado) {
            const usuario = new InformacoesUsuario(usuarioEncontrado);
            if (hashSenha.verificaSenha(usuario.senha) == senha) {
                botaoSubmit.innerHTML = `
                <div class="mx-12 h-7 w-7 border-4 border-cor-carregamento border-t-white rounded-full animate-spin">
                </div>`;
                botaoSubmit.className = ' text-white text-lg font-medium bg-cor-terciaria py-1 px-2.5 w-fit rounded-2xl';
                usuario.logado = true;
                yield UsuariosApi.put(contas, usuario.id, usuario.devolveInformacoes());
                window.location.href = `./home.html?id=${usuario.id}`;
            }
            else {
                throw new Error("Senha Incorreta");
            }
        }
    }));
}))();
