import No from './No.js';

// Questão 1:
export class PilhaEncadeada {
    constructor() {
        this.topo = null;
        this.tamanho = 0;
    }

    push(dado) {
        const novoNo = new No(dado);
        novoNo.proximo = this.topo;
        this.topo = novoNo;
        this.tamanho++;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack Underflow");
        }
        const dado = this.topo.dado;
        this.topo = this.topo.proximo;
        this.tamanho--;
        return dado;
    }

    top() {
        if (this.isEmpty()) {
            return null;
        }
        return this.topo.dado;
    }

    isEmpty() {
        return this.topo === null;
    }

    length() {
        return this.tamanho;
    }

    clear() {
        this.topo = null;
        this.tamanho = 0;
    }

    toArray() {
        const resultado = [];
        let atual = this.topo;
        while (atual !== null) {
            resultado.push(atual.dado);
            atual = atual.proximo;
        }
        return resultado;
    }

}

//Questão 2:
export class FilaEncadeada {
    constructor() {
        this.inicio = null;
        this.fim = null;
        this.tamanho = 0;
    }

    enqueue(dado) {
        const novoNo = new No(dado);
        if (this.isEmpty()) {
            this.inicio = novoNo;
        } else {
            this.fim.proximo = novoNo;
        }
        this.fim = novoNo;
        this.tamanho++;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue Underflow");
        }
        const dado = this.inicio.dado;
        this.inicio = this.inicio.proximo;
        if (this.inicio === null) {
            this.fim = null;
        }
        this.tamanho--;
        return dado;
    }

    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.inicio.dado;
    }

    isEmpty() {
        return this.inicio === null;
    }

    length() {
        return this.tamanho;
    }

    clear() {
        this.inicio = null;
        this.fim = null;
        this.tamanho = 0;
    }

    toArray() {
        const resultado = [];
        let atual = this.inicio;
        while (atual !== null) {
            resultado.push(atual.dado);
            atual = atual.proximo;
        }
        return resultado;
    }
}

// Questão 3:
export class ListaArrayNos {
    constructor(size) {
        this.nos = new Array(size).fill(null);
        this.head = -1;
        this.proximoLivre = 0;
    }

    add(dado) {
        if (this.proximoLivre >= this.nos.length) {
            throw new Error("Lista cheia");
        }

        const novoIndice = this.proximoLivre;
        this.nos[novoIndice] = { dado, proximo: this.head };
        this.head = novoIndice;

        for (let i = novoIndice + 1; i < this.nos.length; i++) {
            if (this.nos[i] === null) {
                this.proximoLivre = i;
                return;
            }
        }

        this.proximoLivre = this.nos.length; 
    }

    toArray() {
        const resultado = [];
        let atual = this.head;
        while (atual !== -1) {
            resultado.push(this.nos[atual].dado);
            atual = this.nos[atual].proximo;
        }
        return resultado;
    }

    isEmpty() {
        return this.head === -1;
    }

    length() {
        let atual = this.head;
        let count = 0;
        while (atual !== -1) {
            count++;
            atual = this.nos[atual].proximo;
        }
        return count;
    }

    clear() {
        this.nos.fill(null);
        this.head = -1;
        this.proximoLivre = 0;
    }
}

// Questão 4: 
export function inverterLista(lista) {
    let anterior = null;
    let atual = lista.head.proximo;
    let proximo = null;

    while (atual !== null) {
        proximo = atual.proximo;
        atual.proximo = anterior;
        anterior = atual;
        atual = proximo;
    }

    lista.head.proximo = anterior;
}

// Questão 5:
export function embaralharLista(lista) {
    const elementos = [];
    let atual = lista.head.proximo;

    while (atual !== null) {
        elementos.push(atual.dado);
        atual = atual.proximo;
    }

    for (let i = elementos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [elementos[i], elementos[j]] = [elementos[j], elementos[i]];
    }

    lista.clear();
    for (let i = elementos.length - 1; i >= 0; i--) {
        lista.add(elementos[i]);
    }
}

// Questão 6: 
export class ListaDeCaracteres {
    constructor(texto = "") {
        this.head = new No(); 

        let atual = this.head;
        for (const char of texto) {
            const novoNo = new No(char);
            atual.proximo = novoNo;
            atual = novoNo;
        }
    }

    toString() {
        let resultado = "";
        let atual = this.head.proximo;
        while (atual !== null) {
            resultado += atual.dado;
            atual = atual.proximo;
        }
        return resultado;
    }

    length() {
        let count = 0;
        let atual = this.head.proximo;
        while (atual !== null) {
            count++;
            atual = atual.proximo;
        }
        return count;
    }

    substring(a, b) {
        if (a < 0 || b < a || b >= this.length()) {
            throw new Error("Intervalo inválido");
        }

        const novaLista = new ListaDeCaracteres();
        let atual = this.head.proximo;
        let pos = 0;
        let novoAtual = novaLista.head;

        while (atual !== null) {
            if (pos >= a && pos <= b) {
                const novoNo = new No(atual.dado);
                novoAtual.proximo = novoNo;
                novoAtual = novoNo;
            }
            atual = atual.proximo;
            pos++;
        }

        return novaLista;
    }
}

// Questão 7:
export function resolverJosephus(n, k) {
    if (n <= 0 || k <= 0) {
        throw new Error("Parâmetros inválidos");
    }

    let primeiro = new No(1);
    let atual = primeiro;
    for (let i = 2; i <= n; i++) {
        atual.proximo = new No(i);
        atual = atual.proximo;
    }
    atual.proximo = primeiro; 

    let anterior = atual;
    atual = primeiro;

    while (atual !== atual.proximo) {
        for (let i = 1; i < k; i++) {
            anterior = atual;
            atual = atual.proximo;
        }
        anterior.proximo = atual.proximo;
        atual = anterior.proximo;
    }

    return atual.dado;
}

// Questão 8: 
export class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }

    toString() {
        return `${this.nome} (${this.idade})`;
    }
}

export class ListaDePessoas {
    constructor() {
        this.head = new No(); 
    }

    adicionar(pessoa) {
        const novoNo = new No(pessoa);
        novoNo.proximo = this.head.proximo;
        this.head.proximo = novoNo;
    }

    toArray() {
        const array = [];
        let atual = this.head.proximo;
        while (atual !== null) {
            array.push(atual.dado);
            atual = atual.proximo;
        }
        return array;
    }

    ordenarPorNome() {
        const pessoas = this.toArray();
        pessoas.sort((a, b) => a.nome.localeCompare(b.nome));

        const novaLista = new ListaDePessoas();
        let atual = novaLista.head;
        for (const pessoa of pessoas) {
            atual.proximo = new No(pessoa);
            atual = atual.proximo;
        }

        return novaLista;
    }

    ordenarPorIdade() {
        const pessoas = this.toArray();
        pessoas.sort((a, b) => a.idade - b.idade);

        const novaLista = new ListaDePessoas();
        let atual = novaLista.head;
        for (const pessoa of pessoas) {
            atual.proximo = new No(pessoa);
            atual = atual.proximo;
        }

        return novaLista;
    }

    toString() {
        let atual = this.head.proximo;
        let resultado = [];
        while (atual !== null) {
            resultado.push(atual.dado.toString());
            atual = atual.proximo;
        }
        return resultado.join(", ");
    }
}
