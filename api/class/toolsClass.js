
class GeneradorDeDatosAleatorios {
    // Genera una cadena de dígitos aleatorios con la longitud especificada
    static generarDígitosAleatorios(longitud) {
        let resultado = '';
        const dígitos = '0123456789'; 
        const longitudDígitos = dígitos.length;

        // Construye el resultado seleccionando dígitos aleatorios
        for (let i = 0; i < longitud; i++) {
            resultado += dígitos.charAt(Math.floor(Math.random() * longitudDígitos));
        }
        return resultado;
    }

    // Genera un número de tarjeta de crédito ficticio con un prefijo para Visa
    static generarNúmeroDeTarjetaDeCrédito() {
        const númeroBase = this.generarDígitosAleatorios(15); 
        const númeroConPrefijo = '4' + númeroBase; 
        

        // Agrega un dígito de verificación para que el número sea válido
        return this.agregarDígitoDeVerificación(númeroConPrefijo);
    }

    // Calcula y añade el dígito de verificación usando el algoritmo de Luhn
    static agregarDígitoDeVerificación(númeroDeTarjeta) {
        let suma = 0;
        let duplicarDígito = false;

        // Recorre los dígitos de derecha a izquierda
        for (let i = númeroDeTarjeta.length - 1; i >= 0; i--) {
            const dígito = parseInt(númeroDeTarjeta.charAt(i), 10);

            if (duplicarDígito) {
                // Doble el dígito y resta 9 si el resultado es mayor que 9
                const duplicado = dígito * 2;
                suma += duplicado > 9 ? duplicado - 9 : duplicado;
            } else {
                suma += dígito;
            }

            // Alterna el estado para el siguiente dígito
            duplicarDígito = !duplicarDígito;
        }

        // Calcula el dígito de verificación para que la suma sea múltiplo de 10
        const dígitoDeVerificación = (10 - (suma % 10)) % 10;
        return númeroDeTarjeta + dígitoDeVerificación;
    }

    // Genera un código CVV de 3 dígitos
    static generarCVV() {
        return this.generarDígitosAleatorios(3);
    }

    // Genera una fecha de expiración en formato MM/AA
    // Mes entre 1 y 12
    // Año actual + entre 1 y 10 años
    static generarFechaDeExpiración() {
        const mes = Math.floor(Math.random() * 12) + 1; 
        const año = new Date().getFullYear() + 3;

        // Formatea el mes y el año en formato MM/AA
        return ${mes.toString().padStart(2, '0')}/${año.toString().slice(-2)};
    }
}
