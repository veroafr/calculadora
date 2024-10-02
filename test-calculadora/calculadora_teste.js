import { calcular } from './calculadora.js'; // Ajuste o caminho conforme necessário
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

// Configurar JSDOM para criar um ambiente DOM simulado
const dom = new JSDOM(`<!DOCTYPE html><html><body><input id="resultado" value=""></body></html>`);
global.document = dom.window.document;
global.window = dom.window;

describe('Calculadora', () => {
    it('Deve somar dois números corretamente', () => {
        expect(calcular('2+3', '')).to.equal(5);
    });

    it('Deve subtrair dois números corretamente', () => {
        expect(calcular('5-2', '')).to.equal(3);
    });

    it('Deve multiplicar dois números corretamente', () => {
        expect(calcular('3*4', '')).to.equal(12);
    });

    it('Deve dividir dois números corretamente', () => {
        expect(calcular('10/2', '')).to.equal(5);
    });

    it('Deve calcular a raiz quadrada corretamente', () => {
        expect(calcular('9', 'raiz')).to.equal(3);
    });

    it('Deve calcular a exponenciação corretamente', () => {
        expect(calcular('3', 'exponenciar')).to.equal(9);
    });

    it('Deve retornar "Incorreto" para uma expressão inválida', () => {
        expect(calcular('2++2', '')).to.equal('Incorreto');
    });

    it('Deve evitar divisão por zero', () => {
        expect(calcular('5/0', '')).to.equal('Incorreto');
    });
});
