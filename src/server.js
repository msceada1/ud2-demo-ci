// Importamos la librería Express
const express = require('express');
// Importamos nuestras funciones de la calculadora
const { sumar, restar } = require('./calculadora');

// Creamos la aplicación de Express
const app = express();
// Definimos el puerto. Render nos lo dará en una variable de entorno,
// si no, usamos el 3000 para local.
const PORT = process.env.PORT || 3000;

// Definimos una ruta "Home" (/)
app.get('/', (req, res) => {
    res.send('¡Hola Mundo! Este es nuestro servidor de calculadora.');
});

// Definimos una ruta para sumar
app.get('/sumar', (req, res) => {
    // Obtenemos 'a' y 'b' de la URL (query parameters)
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send('Error: "a" y "b" deben ser números.');
    }

    const resultado = sumar(a, b);
    res.send(`El resultado de sumar ${a} + ${b} es ${resultado}`);
});

// Definimos una ruta para restar
app.get('/restar', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send('Error: "a" y "b" deben ser números.');
    }

    const resultado = restar(a, b);
    res.send(`El resultado de restar ${a} - ${b} es ${resultado}`);
});

// Ponemos el servidor a "escuchar" en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});