import Pilha from './Pilha.js';

//Questão 1:
export function invertePalavra(palavra) {
    const pilha = new Pilha(palavra.length);
    for (let letra of palavra) {
        pilha.push(letra);
    }

    let invertida = '';
    while (!pilha.isEmpty()) {
        invertida += pilha.pop();
    }

    return invertida;
}

//Questão 2:
export class DuasPilhasCompartilhadas {
    constructor(size) {
        this.dados = new Array(size);
        this.topoA = -1;
        this.topoB = size;
    }

    éVaziaA() {
        return this.topoA === -1;
    }

    éVaziaB() {
        return this.topoB === this.dados.length;
    }

    empilhaA(valor) {
        if (this.topoA + 1 === this.topoB) {
            throw new Error("Stack Overflow: Vetor cheio");
        }
        this.topoA++;
        this.dados[this.topoA] = valor;
    }

    empilhaB(valor) {
        if (this.topoA + 1 === this.topoB) {
            throw new Error("Stack Overflow: Vetor cheio");
        }
        this.topoB--;
        this.dados[this.topoB] = valor;
    }

    desempilhaA() {
        if (this.éVaziaA()) {
            throw new Error("Stack Underflow A");
        }
        const valor = this.dados[this.topoA];
        this.topoA--;
        return valor;
    }

    desempilhaB() {
        if (this.éVaziaB()) {
            throw new Error("Stack Underflow B");
        }
        const valor = this.dados[this.topoB];
        this.topoB++;
        return valor;
    }
}

//Questão 3:
export function trocaTopoBase(pilha) {
    if (pilha.isEmpty() || pilha.length() === 1) {
        return;
    }

    const auxiliar = new Pilha(pilha.size);
    const topoOriginal = pilha.pop();

    while (pilha.length() > 1) {
        auxiliar.push(pilha.pop());
    }

    const base = pilha.pop();
    pilha.push(topoOriginal);

    while (!auxiliar.isEmpty()) {
        pilha.push(auxiliar.pop());
    }

    pilha.push(base);
}

//Questão 4:
export function decimalParaBinario(numero) {
    if (numero === 0) {
        return "0";
    }

    const pilha = new Pilha(32);

    while (numero > 0) {
        pilha.push(numero % 2);
        numero = Math.floor(numero / 2);
    }

    let binario = '';
    while (!pilha.isEmpty()) {
        binario += pilha.pop();
    }

    return binario;
}

//Questão 5:
export function verificaExpressao(expressao) {
    const pilha = new Pilha(expressao.length);

    for (const simbolo of expressao) {
        if (simbolo === '(' || simbolo === '[') {
            pilha.push(simbolo);
        } else if (simbolo === ')' || simbolo === ']') {
            if (pilha.isEmpty()) {
                return false;
            }
            const topo = pilha.top();
            if (
                (simbolo === ')' && topo !== '(') ||
                (simbolo === ']' && topo !== '[')
            ) {
                return false;
            }
            pilha.pop();
        }
    }
    return pilha.isEmpty();
}

//Questão 6:
const operadores = new Map([
  ["+", 1],
  ["-", 1],
  ["*", 2],
  ["/", 2],
  ["^", 3],
]);

export function infixaParaPosfixa(expressao) {
  const pilha = new Pilha(50);
  let saida = "";

  for (const token of expressao) {
    if (token === " ") continue;

    if (/[a-zA-Z0-9]/.test(token)) {
      saida += token;
    } else if (token === "(") {
      pilha.push(token);
    } else if (token === ")") {
      while (!pilha.isEmpty() && pilha.top() !== "(") {
        saida += pilha.top();
        pilha.pop();
      }
      pilha.pop();
    } else if (operadores.has(token)) {
      while (
        !pilha.isEmpty() &&
        pilha.top() !== "(" &&
        operadores.has(pilha.top()) &&
        operadores.get(token) <= operadores.get(pilha.top())
      ) {
        saida += pilha.top();
        pilha.pop();
      }
      pilha.push(token);
    }
  }

  while (!pilha.isEmpty()) {
    saida += pilha.top();
    pilha.pop();
  }

  return saida;
}

//Questão 7:
export function removeDuplicados(pilha) {
    const elementos = [];
    const vistos = new Set();

    while (!pilha.isEmpty()) {
        elementos.push(pilha.pop());
    }

    const resultado = new Pilha(elementos.length);

    for (let i = elementos.length - 1; i >= 0; i--) {
        const elemento = elementos[i];
        if (!vistos.has(elemento)) {
            vistos.add(elemento);
            resultado.push(elemento);
        }
    }

    return resultado;
}

//Questão 8:
export class PilhaDePratos {
    constructor(capacidade) {
        this.capacidade = capacidade;
        this.pratos = [[]];
    }

    empilha(valor) {
        let ultimaPilha = this.pratos[this.pratos.length - 1];
        if (ultimaPilha.length === this.capacidade) {
            ultimaPilha = [];
            this.pratos.push(ultimaPilha);
        }
        ultimaPilha.push(valor);
    }

    desempilha() {
        if (this.pratos.length === 0 || (this.pratos.length === 1 && this.pratos[0].length === 0)) {
            return null;
        }

        const ultimaPilha = this.pratos[this.pratos.length - 1];
        const valor = ultimaPilha.pop();

        if (ultimaPilha.length === 0 && this.pratos.length > 1) {
            this.pratos.pop();
        }

        return valor;
    }
}
