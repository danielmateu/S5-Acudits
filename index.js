"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const header = document.getElementById('header');
const weatherContainer = document.getElementById('weather-container');
const temperaturaValor = document.getElementById('temperatura-valor');
const iconoAnimado = document.getElementById('icono-animado');
const container = document.getElementById('container');
const jokeContainer = document.getElementById('joke-container');
const jokeBlock = document.getElementById('joke-block');
const valoration = document.createElement('ul');
valoration.classList.add('ul');
const btn = document.getElementById('btn');
valoration.innerText = `
<li><button class="valorarion-boton" id="1">😒</button></li>
<li><button class="valorarion-boton" id="2">😐</button></li>
<li><button class="valorarion-boton" id="3">😆</button></li>
`;
btn.addEventListener("click", getMoreJokes);
class MyJoke {
    constructor(joke, score, date) {
        (this.joke = joke),
            (this.score = score),
            (this.date = date);
    }
}
function getMoreJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resultado = yield Promise.all([
                fetch('https://icanhazdadjoke.com', {
                    headers: {
                        Accept: 'application/json',
                    },
                }).then((value) => __awaiter(this, void 0, void 0, function* () { return yield value.json(); })),
                fetch('https://api.chucknorris.io/jokes/random').then((value) => __awaiter(this, void 0, void 0, function* () { return yield value.json(); })),
            ]);
            //console.log(resultado[0].joke);
            //console.log(resultado[1].value);
            const arrayJokes = [];
            arrayJokes[0] = resultado[0].joke.toString();
            arrayJokes[1] = resultado[1].value.toString();
            const randomJokes = arrayJokes[Math.floor(Math.random() * arrayJokes.length)];
            //console.log(randomJokes);
            jokeBlock.innerText = randomJokes;
        }
        catch (err) {
            console.log('Error', err);
        }
    });
}
