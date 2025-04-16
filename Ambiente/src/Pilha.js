class Pilha {
    constructor(size) {
        this.dados = [];
        this.size = size;
        this.topo = 0;
    }

    push(elemento) {
        if (this.isFull()) {
            throw new Error("Stack Overflow");
        }
        this.dados[this.topo++] = elemento;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack Underflow");
        }
        this.topo--;
        return this.dados.pop(); 
    }

    top() {
        if (!this.isEmpty()) {
            return this.dados[this.topo - 1];
        }
    }

    isEmpty() {
        return this.length() === 0;
    }

    isFull() {
        return this.length() === this.size;
    }

    clear() {
        this.topo = 0;
        this.dados = [];
    }

    length() {
        return this.topo;
    }

    setSize(size) {
        this.size = size;
    }
}

export default Pilha;
