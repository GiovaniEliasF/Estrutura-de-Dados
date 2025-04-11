import { 
    PilhaComDuasFilas, 
    FilaComDuasPilhas, 
    ControleCaminhoneiros,
    intercalarFilas,
    Deque,
    inverterFila 
} from "../src/Lista2.js";

import Fila from "../src/Fila.js";

test("Questão 1: Pilha implementada usando duas filas", () => {
    const pilha = new PilhaComDuasFilas(5);

    pilha.push(10);
    pilha.push(20);
    pilha.push(30);

    expect(pilha.top()).toBe(30);

    expect(pilha.pop()).toBe(30);
    expect(pilha.top()).toBe(20);

    pilha.push(40);
    expect(pilha.top()).toBe(40);

    expect(pilha.length()).toBe(3);

    expect(pilha.pop()).toBe(40);
    expect(pilha.pop()).toBe(20);
    expect(pilha.pop()).toBe(10);

    expect(pilha.isEmpty()).toBe(true);
});

test("Questão 2: Fila implementada usando duas pilhas", () => {
    const fila = new FilaComDuasPilhas(5);

    fila.enqueue(10);
    fila.enqueue(20);
    fila.enqueue(30);

    expect(fila.front()).toBe(10);

    expect(fila.dequeue()).toBe(10);
    expect(fila.front()).toBe(20);

    fila.enqueue(40);
    fila.enqueue(50);

    expect(fila.length()).toBe(4);

    expect(fila.dequeue()).toBe(20);
    expect(fila.dequeue()).toBe(30);
    expect(fila.dequeue()).toBe(40);
    expect(fila.dequeue()).toBe(50);

    expect(fila.isEmpty()).toBe(true);
});

test("Questão 3: Controle de caminhoneiros no pátio", () => {
    const controle = new ControleCaminhoneiros();

    controle.chegada("Caminhoneiro 1");
    controle.chegada("Caminhoneiro 2");
    controle.chegada("Caminhoneiro 3");

    expect(controle.existeCaminhoneiro()).toBe(true);

    expect(controle.listarCaminhoneiros()).toEqual(["Caminhoneiro 1", "Caminhoneiro 2", "Caminhoneiro 3"]);

    controle.saida();
    expect(controle.listarCaminhoneiros()).toEqual(["Caminhoneiro 2", "Caminhoneiro 3"]);

    expect(controle.limiteAtingido()).toBe(false);

    for (let i = 3; i <= 10; i++) {
        controle.chegada(`Caminhoneiro ${i}`);
    }
    expect(controle.limiteAtingido()).toBe(true);
});

test("Questão 4: Intercalar duas filas", () => {
    const fila1 = new Fila();
    const fila2 = new Fila();

    fila1.setSize(5);
    fila2.setSize(5);

    fila1.enqueue(1);
    fila1.enqueue(3);
    fila1.enqueue(5);

    fila2.enqueue(2);
    fila2.enqueue(4);
    fila2.enqueue(6);

    const filaIntercalada = intercalarFilas(fila1, fila2);

    const resultado = [];
    while (!filaIntercalada.isEmpty()) {
        resultado.push(filaIntercalada.front());
        filaIntercalada.dequeue();
    }

    expect(resultado).toEqual([1, 2, 3, 4, 5, 6]);
});

test("Questão 5: Operações básicas de Deque", () => {
    const deque = new Deque(5);

    deque.inserirInicio(10);  // [10]
    deque.inserirFim(20);     // [10, 20]
    deque.inserirInicio(5);   // [5, 10, 20]
    deque.inserirFim(30);     // [5, 10, 20, 30]

    expect(deque.removerInicio()).toBe(5); // [10, 20, 30]
    expect(deque.removerFim()).toBe(30);   // [10, 20]

    deque.inserirFim(40);     // [10, 20, 40]
    deque.inserirInicio(1);   // [1, 10, 20, 40]

    expect(deque.removerFim()).toBe(40);   // [1, 10, 20]
    expect(deque.removerInicio()).toBe(1); // [10, 20]
});

test("Questão 6: Inverter fila recursivamente", () => {
    const fila = new Fila();
    fila.setSize(5);

    fila.enqueue(1);
    fila.enqueue(2);
    fila.enqueue(3);
    fila.enqueue(4);
    fila.enqueue(5);

    inverterFila(fila);

    const resultado = [];
    while (!fila.isEmpty()) {
        resultado.push(fila.front());
        fila.dequeue();
    }

    expect(resultado).toEqual([5, 4, 3, 2, 1]);
});
