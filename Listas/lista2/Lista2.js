import Fila from './Fila.js';
import Pilha from './Pilha.js';

// QUESTÃO 1 - Pilha usando duas filas
export class PilhaComDuasFilas {
    constructor(size) {
        this.fila1 = new Fila();
        this.fila2 = new Fila();
        this.fila1.setSize(size);
        this.fila2.setSize(size);
        this.size = size;
    }

    push(elemento) {
        this.fila2.enqueue(elemento);
        while (!this.fila1.isEmpty()) {
            this.fila2.enqueue(this.fila1.front());
            this.fila1.dequeue();
        }
        const temp = this.fila1;
        this.fila1 = this.fila2;
        this.fila2 = temp;
    }

    pop() {
        if (this.fila1.isEmpty()) {
            throw new Error("Stack Underflow");
        }
        const elem = this.fila1.front();
        this.fila1.dequeue();
        return elem;
    }

    top() {
        if (this.fila1.isEmpty()) {
            return undefined;
        }
        return this.fila1.front();
    }

    isEmpty() {
        return this.fila1.isEmpty();
    }

    length() {
        return this.fila1.length();
    }
}

// QUESTÃO 2 - Fila usando duas pilhas
export class FilaComDuasPilhas {
    constructor(size) {
        this.pilha1 = new Pilha(size);
        this.pilha2 = new Pilha(size);
        this.size = size;
    }

    enqueue(elemento) {
        this.pilha1.push(elemento);
    }

    dequeue() {
        if (this.pilha2.isEmpty()) {
            while (!this.pilha1.isEmpty()) {
                this.pilha2.push(this.pilha1.pop());
            }
        }
        if (this.pilha2.isEmpty()) {
            throw new Error("Queue Underflow");
        }
        return this.pilha2.pop();
    }

    front() {
        if (this.pilha2.isEmpty()) {
            while (!this.pilha1.isEmpty()) {
                this.pilha2.push(this.pilha1.pop());
            }
        }
        if (this.pilha2.isEmpty()) {
            return undefined;
        }
        return this.pilha2.top();
    }

    isEmpty() {
        return this.pilha1.isEmpty() && this.pilha2.isEmpty();
    }

    length() {
        return this.pilha1.length() + this.pilha2.length();
    }
}

// QUESTÃO 3 - Controle de caminhoneiros
export class ControleCaminhoneiros {
    constructor() {
        this.fila = new Fila();
        this.fila.setSize(10);
    }

    chegada(caminhoneiro) {
        if (this.fila.isFull()) {
            throw new Error("Limite diário de caminhoneiros atingido");
        }
        this.fila.enqueue(caminhoneiro);
    }

    saida() {
        if (this.fila.isEmpty()) {
            throw new Error("Nenhum caminhoneiro aguardando");
        }
        this.fila.dequeue();
    }

    existeCaminhoneiro() {
        return !this.fila.isEmpty();
    }

    limiteAtingido() {
        return this.fila.isFull();
    }

    listarCaminhoneiros() {
        const lista = [];
        const tamanho = this.fila.length();
        let idx = this.fila.inicio;
        for (let i = 0; i < tamanho; i++) {
            lista.push(this.fila.dados[idx]);
            idx = (idx + 1) % (this.fila.size + 1);
        }
        return lista;
    }
}

// QUESTÃO 4 - Intercalar duas filas
export function intercalarFilas(fila1, fila2) {
    const resultado = new Fila();
    resultado.setSize(fila1.size + fila2.size);

    while (!fila1.isEmpty() || !fila2.isEmpty()) {
        if (!fila1.isEmpty()) {
            resultado.enqueue(fila1.front());
            fila1.dequeue();
        }
        if (!fila2.isEmpty()) {
            resultado.enqueue(fila2.front());
            fila2.dequeue();
        }
    }
    return resultado;
}

export class Deque {
    constructor(size) {
        this.size = size;
        this.dados = new Array(size);
        this.inicio = 0;
        this.fim = 0;
        this.count = 0;
    }

    isFull() {
        return this.count === this.size;
    }

    isEmpty() {
        return this.count === 0;
    }

    inserirInicio(elemento) {
        if (this.isFull()) {
            throw new Error("Deque cheio");
        }
        this.inicio = (this.inicio - 1 + this.size) % this.size;
        this.dados[this.inicio] = elemento;
        this.count++;
    }

    removerInicio() {
        if (this.isEmpty()) {
            throw new Error("Deque vazio");
        }
        const elemento = this.dados[this.inicio];
        this.inicio = (this.inicio + 1) % this.size;
        this.count--;
        return elemento;
    }

    inserirFim(elemento) {
        if (this.isFull()) {
            throw new Error("Deque cheio");
        }
        this.dados[this.fim] = elemento;
        this.fim = (this.fim + 1) % this.size;
        this.count++;
    }

    removerFim() {
        if (this.isEmpty()) {
            throw new Error("Deque vazio");
        }
        this.fim = (this.fim - 1 + this.size) % this.size;
        const elemento = this.dados[this.fim];
        this.count--;
        return elemento;
    }
}

// QUESTÃO 6: Função recursiva para inverter uma fila
export function inverterFila(fila) {
    if (fila.isEmpty()) {
        return;
    }
    const elemento = fila.front();
    fila.dequeue();
    inverterFila(fila);
    fila.enqueue(elemento);
}
