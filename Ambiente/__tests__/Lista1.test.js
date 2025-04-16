import { 
    invertePalavra, 
    DuasPilhasCompartilhadas, 
    trocaTopoBase, 
    decimalParaBinario, 
    verificaExpressao, 
    infixaParaPosfixa, 
    removeDuplicados, 
    PilhaDePratos 
} from "../src/Lista1";

import Pilha from "../src/Pilha"; 


test("Questão 1: inverter palavra ABACAXI", () => {
    const palavra = "ABACAXI";
    const resultado = invertePalavra(palavra);
    expect(resultado).toBe("IXACABA");
});

test("Questão 2: duas pilhas compartilhadas - A = 123456789 e B = inverso de A", () => {
    const pilhas = new DuasPilhasCompartilhadas(18);
    const dados = [1,2,3,4,5,6,7,8,9];

    for (let num of dados) {
        pilhas.empilhaA(num);
    }

    for (let num of dados.slice().reverse()) {
        pilhas.empilhaB(num);
    }

    const saidaA = [];
    while (!pilhas.éVaziaA()) {
        saidaA.push(pilhas.desempilhaA());
    }

    const saidaB = [];
    while (!pilhas.éVaziaB()) {
        saidaB.push(pilhas.desempilhaB());
    }

    expect(saidaA).toEqual([9,8,7,6,5,4,3,2,1]);
    expect(saidaB).toEqual([1,2,3,4,5,6,7,8,9]);
});

test("Questão 3: trocar topo e base da pilha", () => {
    const pilha = new Pilha(5);
    [1,2,3,4,5].forEach(num => pilha.push(num));

    trocaTopoBase(pilha);

    const resultado = [];
    while (!pilha.isEmpty()) {
        resultado.push(pilha.pop());
    }

    expect(resultado).toEqual([1,4,3,2,5]);
});

test("Questão 4: conversão decimal para binário", () => {
    expect(decimalParaBinario(0)).toBe("0");
    expect(decimalParaBinario(2)).toBe("10");
    expect(decimalParaBinario(5)).toBe("101");
    expect(decimalParaBinario(10)).toBe("1010");
    expect(decimalParaBinario(255)).toBe("11111111");
});

test("Questão 5: expressão bem-formada", () => {
    expect(verificaExpressao("[ ( ) [ ( ) ] ] ( )")).toBe(true);
    expect(verificaExpressao("( ( ) ]")).toBe(false);
    expect(verificaExpressao("([([])])")).toBe(true);
    expect(verificaExpressao("[ ( [ ) ]")).toBe(false);
});

test("Questão 6: conversão de expressão infixa para posfixa", () => {
    expect(infixaParaPosfixa("(a+(b*c))")).toBe("abc*+");
    expect(infixaParaPosfixa("((a+b)*(z+x))")).toBe("ab+zx+*");
    expect(infixaParaPosfixa("((a+t)*((b+(a+c))^(c+d)))")).toBe("at+bac++cd+^*");
    expect(infixaParaPosfixa("a+b*c-d")).toBe("abc*+d-");
    expect(infixaParaPosfixa("(a+b)+c/d")).toBe("ab+cd/+");
    expect(infixaParaPosfixa("a*b-(c-d)+e")).toBe("ab*cd--e+");
});

test("Questão 7: remover duplicados da pilha", () => {
    const pilha = new Pilha(10);
    [3, 7, 3, 2, 7, 1, 4, 2].forEach(num => pilha.push(num));

    const novaPilha = removeDuplicados(pilha);

    const resultado = [];
    while (!novaPilha.isEmpty()) {
        resultado.push(novaPilha.pop());
    }

    expect(resultado).toEqual([4, 1, 2, 7, 3]);
});

test("Questão 8: Pilha de Pratos", () => {
    const pratos = new PilhaDePratos(3);

    pratos.empilha(5);
    pratos.empilha(10);
    pratos.empilha(15);
    pratos.empilha(20);

    expect(pratos.desempilha()).toBe(20);
    expect(pratos.desempilha()).toBe(15);
    expect(pratos.desempilha()).toBe(10);
    expect(pratos.desempilha()).toBe(5);
    expect(pratos.desempilha()).toBe(null);
});
