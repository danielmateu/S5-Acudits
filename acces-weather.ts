window.addEventListener('load', () =>{
    let lon:number;
    let lat:number;

    let temperaturaValor = document.getElementById('temperatura-valor');
    let iconoAnimado =<HTMLInputElement> document.getElementById('icono-animado') as HTMLInputElement;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((posicion) =>{
            console.log('Lat ->',posicion.coords.latitude, 'Long ->',posicion.coords.longitude );

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
                let desc = data.weather[0].description;

                //Inyectamos los Iconos en funcion de la desc del tiempo

                switch (data.weather[0].main) {
                    case "Clear":
                    iconoAnimado.src = "./img/day.svg";
                      // console.log("Limpio");
                    break;
                    case "Clouds":
                    iconoAnimado.src = "./img/cloudy.svg";
                      // console.log("Limpio");
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

})