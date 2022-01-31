
const header = document.getElementById('header') as HTMLInputElement;
const weatherContainer = document.getElementById('weather-container') as HTMLInputElement;
const temperaturaValor = document.getElementById('temperatura-valor') as HTMLInputElement;
const iconoAnimado = document.getElementById('icono-animado') as HTMLInputElement;

const container = document.getElementById('container') as HTMLInputElement;
const jokeContainer = document.getElementById('joke-container') as HTMLInputElement;
const jokeBlock = document.getElementById('joke-block') as HTMLInputElement;
const valoration = document.getElementById('valoration') as HTMLInputElement;
const valorationBlock = document.createElement('ul') as HTMLElement;
valorationBlock.classList.add('ul');
const btn = document.getElementById('btn') as HTMLInputElement;

valorationBlock.innerHTML = `
<li><button class="valoration-boton" id="1">😒</button></li>
<li><button class="valoration-boton" id="2">😐</button></li>
<li><button class="valoration-boton" id="3">😆</button></li>
`
console.log(valorationBlock);

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


//FUNCIÓ al Clickar el Botó next!

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
        valoration.appendChild(valorationBlock);

        

    }catch(err){
        console.log('Error', err);
    }
}

//WEATHER ACCESS

window.addEventListener('load', () =>{
    let lon:number|string;
    let lat:number|string;

    let temperaturaValor =<HTMLInputElement>document.getElementById('temperatura-valor');

    let iconoAnimado =<HTMLInputElement> document.getElementById('icono-animado');

    let temperaturaDescripcion =<HTMLInputElement>document.getElementById('temperatura');

    //let ubicacion = <HTMLInputElement>document.getElementById('ubicacion');
    
    //let vientoVelocidad = <HTMLInputElement>document.getElementById('viento-velocidad');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((posicion) =>{
            //console.log('Lat ->',posicion.coords.latitude, 'Long ->',posicion.coords.longitude );

            //UBICACION ACTUAL
            /*
            `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c813f2748d4825e65ccf6f3bfe4e2464`
            */

            //Ubicacion por CIUDAD
            /* 
            `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&lang=es&units=metric&appid=c813f2748d4825e65ccf6f3bfe4e2464`
            */

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barcelona&lang=es&units=metric&appid=c813f2748d4825e65ccf6f3bfe4e2464`).then((response)=>{
                return response.json();
            }).then((data)=>{
                
                let temp = data.main.temp.toFixed(1);
                temperaturaValor.textContent = `${temp}ºC`;
                //let name = data.name;
                //ubicacion.textContent = `${name}`;
                //let desc = data.weather[0].description;
                //temperaturaDescripcion.textContent = desc.toLowerCase();
                //let velocidad = data.wind.speed;
                //vientoVelocidad.textContent = `${velocidad}m/s`
                console.log(data.weather[0].main);

                //Inyectamos los Iconos en funcion de la desc del tiempo

                switch (data.weather[0].main) {
                    case "Clear":
                    iconoAnimado.src = "./img/day.svg";
                    //console.log("Limpio");
                    break;
                    case "Clouds":
                    iconoAnimado.src = "./img/cloudy.svg";
                    //console.log("Limpio");
                    break;
                    case "Snow":
                    iconoAnimado.src = "./img/snowy-1.svg";
                      //console.log("Limpio");
                    break;
                    case "Rain":
                    iconoAnimado.src = "./img/rainy-3.svg";
                      //console.log("Limpio");
                    break;
                    case "Drizzle":
                    iconoAnimado.src = "./img/rainy-1.svg";
                      // console.log("Limpio");
                    break;
                    case "Thunderstorm":
                    iconoAnimado.src = "./img/thunder.svg";
                      //console.log("Limpio");
                    break;
                }
            }).catch((error)=>{
                console.log(error);
            })
        })
    }
});