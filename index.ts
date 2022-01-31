
const header = document.getElementById('header') as HTMLInputElement;
const weatherContainer = document.getElementById('weather-container') as HTMLInputElement;
const temperaturaValor = document.getElementById('temperatura-valor') as HTMLInputElement;
const iconoAnimado = document.getElementById('icono-animado') as HTMLInputElement;

const container = document.getElementById('container') as HTMLInputElement;
const jokeContainer = document.getElementById('joke-container') as HTMLInputElement;
const jokeBlock = document.getElementById('joke-block') as HTMLInputElement;
const valoration = document.createElement('ul') as HTMLElement;
valoration.classList.add('ul');
const btn = document.getElementById('btn') as HTMLInputElement;

valoration.innerText = `
<li><button class="valorarion-boton" id="1">😒</button></li>
<li><button class="valorarion-boton" id="2">😐</button></li>
<li><button class="valorarion-boton" id="3">😆</button></li>
`

btn.addEventListener("click",getMoreJokes);

class MyJoke{
    joke: string;
    score: number;
    date: string;
    constructor(joke:string,score:number,date:string){
        (this.joke = joke),
        (this.score = score),
        (this.date = date);
    }
}

async function getMoreJokes(): Promise<void>{
    try{
        const resultado = await Promise.all<any>([
            fetch('https://icanhazdadjoke.com',{
                headers: {
                    Accept: 'application/json',
                },
            }).then(async (value)=> await value.json()),
            fetch('https://api.chucknorris.io/jokes/random').then(async (value)=> await value.json()),
        ]);
        //console.log(resultado[0].joke);
        //console.log(resultado[1].value);

        const arrayJokes = [];
        arrayJokes[0] = resultado[0].joke.toString();
        arrayJokes[1] = resultado[1].value.toString();
        const randomJokes = arrayJokes[Math.floor(Math.random() * arrayJokes.length)];
        //console.log(randomJokes);
        jokeBlock.innerText = randomJokes;

    }catch(err){
        console.log('Error', err);
    }
}