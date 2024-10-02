let operacionActual = '';
let ultimaOperacion = '';

// Atualiza o display da calculadora
export function atualizarDisplay(resultado = '') {
    document.getElementById('resultado').value = resultado || operacionActual;
}

// Função que realiza o cálculo
export function calcular(operacionActual, ultimaOperacion) {
    let valor;
    try {
        const num = parseFloat(operacionActual);
        
        if (ultimaOperacion === 'exponenciar') {
            valor = Math.pow(num, 2);
        } else if (ultimaOperacion === 'raiz') {
            valor = Math.sqrt(num);
        } else {
            // Evitar o uso de eval para segurança
            valor = calcularExpressao(operacionActual);
        }
        return valor;
    } catch {
        return 'Incorreto';
    }
}

// Função para calcular expressões matemáticas simples
function calcularExpressao(expressao) {
    const operacoes = expressao.match(/(\d+)([+\-*/])(\d+)/);
    if (!operacoes) return 'Incorreto';
    
    const num1 = parseFloat(operacoes[1]);
    const operador = operacoes[2];
    const num2 = parseFloat(operacoes[3]);

    switch (operador) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Incorreto'; // Evita divisão por zero
        default:
            return 'Incorreto';
    }
}

// Inicializa os event listeners
export function inicializarCalculadora() {
    // Event listeners para os números
    document.querySelectorAll('.numero').forEach(function (button) {
        button.addEventListener('click', function () {
            operacionActual += button.textContent;
            atualizarDisplay();
        });
    });

    // Event listeners para as operações
    document.querySelectorAll('.operacion').forEach(function (button) {
        button.addEventListener('click', function () {
            let operacion = button.textContent;

            if (operacion === '=') {
                const resultado = calcular(operacionActual, ultimaOperacion);
                atualizarDisplay(resultado);
                operacionActual = '';
                ultimaOperacion = '';
            } else if (operacion === 'C') {
                operacionActual = '';
                atualizarDisplay();
            } else if (operacion === '<') {
                operacionActual = operacionActual.slice(0, -1);
                atualizarDisplay();
            } else if (operacion === '√' || operacion === 'x²') {
                ultimaOperacion = button.id;
                const resultado = calcular(operacionActual, ultimaOperacion);
                atualizarDisplay(resultado);
            } else {
                ultimaOperacion = button.id;
                operacionActual += operacion;
                atualizarDisplay();
            }
        });
    });
}
