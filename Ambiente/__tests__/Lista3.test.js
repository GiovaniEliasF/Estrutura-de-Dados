import { 
    PilhaEncadeada, 
    FilaEncadeada, 
    ListaArrayNos,
    inverterLista,
    embaralharLista,
	ListaDeCaracteres,
	resolverJosephus,
	ListaDePessoas,
	Pessoa

} from "../src/Lista3.js";

import Lista from "../src/Lista.js";

test("Questão 1: Pilha dinâmica com lista encadeada", () => {
    const pilha = new PilhaEncadeada();

    expect(pilha.isEmpty()).toBe(true);
    expect(pilha.length()).toBe(0);
    expect(pilha.top()).toBe(null);

    pilha.push(10);
    pilha.push(20);
    pilha.push(30);

    expect(pilha.top()).toBe(30);
    expect(pilha.length()).toBe(3);
    expect(pilha.isEmpty()).toBe(false);

    expect(pilha.pop()).toBe(30);
    expect(pilha.top()).toBe(20);
    expect(pilha.length()).toBe(2);

    pilha.clear();
    expect(pilha.isEmpty()).toBe(true);
    expect(pilha.length()).toBe(0);
});

test("Questão 2: Fila dinâmica com lista encadeada", () => {
    const fila = new FilaEncadeada();

    expect(fila.isEmpty()).toBe(true);
    expect(fila.length()).toBe(0);
    expect(fila.front()).toBe(null);

    fila.enqueue("A");
    fila.enqueue("B");
    fila.enqueue("C");

    expect(fila.front()).toBe("A");
    expect(fila.length()).toBe(3);
    expect(fila.isEmpty()).toBe(false);

    expect(fila.dequeue()).toBe("A");
    expect(fila.front()).toBe("B");
    expect(fila.length()).toBe(2);

    fila.clear();
    expect(fila.isEmpty()).toBe(true);
    expect(fila.length()).toBe(0);
});

test("Questão 3: Lista simples com array de nós", () => {
    const lista = new ListaArrayNos(5);

    expect(lista.isEmpty()).toBe(true);
    expect(lista.length()).toBe(0);

    lista.add("X");
    lista.add("Y");
    lista.add("Z");

    expect(lista.toArray()).toEqual(["Z", "Y", "X"]);
    expect(lista.length()).toBe(3);
    expect(lista.isEmpty()).toBe(false);

    lista.clear();
    expect(lista.toArray()).toEqual([]);
    expect(lista.isEmpty()).toBe(true);
});

test("Questão 4: Inverter lista simplesmente encadeada", () => {
    const lista = new Lista();
    lista.add("A");
    lista.add("B");
    lista.add("C"); // Lista atual: C -> B -> A

    inverterLista(lista); // Esperado: A -> B -> C

    expect(lista.toString()).toBe("ABC");
});

test("Questão 5: Embaralhar lista simplesmente encadeada", () => {
    const lista = new Lista();
    ["A", "B", "C", "D", "E"].forEach(letra => lista.add(letra)); // Lista: E -> D -> C -> B -> A

    const original = lista.toString().split("").sort();
    embaralharLista(lista);
    const embaralhado = lista.toString().split("").sort();

    expect(embaralhado).toEqual(original);
});


test("Questão 6: Lista de caracteres com substring(A, B)", () => {
    const lista = new ListaDeCaracteres("ESTRUTURA");

    const sub = lista.substring(2, 5); // T, R, U, T

    expect(sub.toString()).toBe("TRUT");
});

test("Questão 7: Problema de Josephus", () => {
    expect(resolverJosephus(7, 3)).toBe(4);
    expect(resolverJosephus(5, 2)).toBe(3);
    expect(resolverJosephus(10, 1)).toBe(10);
    expect(resolverJosephus(1, 5)).toBe(1);
});

test("Questão 8: Ordenar lista de pessoas por nome e idade", () => {
    const lista = new ListaDePessoas();
    lista.adicionar(new Pessoa("Carlos", 22));
    lista.adicionar(new Pessoa("Ana", 30));
    lista.adicionar(new Pessoa("Bruno", 25));

    const ordenadoPorNome = lista.ordenarPorNome();
    expect(ordenadoPorNome.toString()).toBe("Ana (30), Bruno (25), Carlos (22)");

    const ordenadoPorIdade = lista.ordenarPorIdade();
    expect(ordenadoPorIdade.toString()).toBe("Carlos (22), Bruno (25), Ana (30)");
});
