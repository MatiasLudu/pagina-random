window.addEventListener("load", (event) => {


    // PROYECTO 1 //
    //
    //
    //
    //
    //
    // PROYECTO 1 //

    let input = document.querySelector(".form__input_1");
    let form = document.querySelector(".main__form_1");
    let list = document.querySelector(".form__list_1");

    let draggedItem = null;

    let loadList = () => {
        let tasks = JSON.parse(localStorage.getItem("tasks"));

        if (tasks) {
            tasks.forEach(task => {
                add(task.text, task.completed);
            });
        }
    }

    let saveAndUpdate = () => {
        let allTask = document.querySelectorAll(".list__task_1");
        let newTasks = [];

        allTask.forEach(item => {
            let task = item.querySelector(".task__text_1");
            let check = item.querySelector(".task__check_1");
            let taskObj = {
                text: task.innerText,
                completed: check.checked
            };

            newTasks.push(taskObj);
        });

        localStorage.setItem("tasks", JSON.stringify(newTasks));
    }

    let deleteTask = (task) => {
        task.remove();
    };

    let add = (task, completed = false) => {
        if (task.trim() != "") {
            let item = document.createElement("li");
            item.classList.add("list__item_1");
            item.setAttribute("draggable", "true");

            item.innerHTML += `
                <div class="list__task_1">
                    <input type="checkbox" class="task__check_1" ${completed ? "checked" : ""}>
                    <p class="task__text_1">${task}</p>
                </div>
                <i class="fa-solid fa-trash list__delete_1"></i>
            `;

            if (task && completed) {
                item.classList.add("list__item--completed_1");
            }

            list.appendChild(item);
            saveAndUpdate();
            input.value = "";

            let btnDelete = item.querySelector(".list__delete_1");
            btnDelete.addEventListener("click", () => {
                deleteTask(item);
                saveAndUpdate();
            });

            let checkbox = item.querySelector(".task__check_1");
            checkbox.addEventListener("change", () => {
                item.classList.toggle("list__item--completed_1");

                if (checkbox.checked) {
                    list.appendChild(item);
                } else {
                    list.insertBefore(item, list.firstChild);
                }

                saveAndUpdate();
            });

            item.addEventListener("dragstart", () => {
                draggedItem = item;
                item.classList.add("dragging");
                setTimeout(() => {
                    item.style.display = "none";
                }, 0);
            });

            item.addEventListener("dragend", () => {
                setTimeout(() => {
                    item.style.display = "flex";
                    item.classList.remove("dragging");
                    draggedItem = null;
                }, 0);
                saveAndUpdate();
            });

            list.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            list.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedItem) {
                    let target = e.target.closest(".list__item_1");
                    if (target && target !== draggedItem) {
                        list.insertBefore(draggedItem, target);
                    }
                    saveAndUpdate();
                }
            });
        }
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let task = input.value;
        add(task);
    });

    loadList();

    // PROYECTO 2 //
    //
    //
    //
    //
    //
    // PROYECTO 2 //

    // Seleccionar elementos del DOM

    let number_2 = document.querySelector(".load__number_2");
    let btn_2 = document.querySelector(".load__btn_2");
    let complete_2 = document.querySelector(".load__complete_2");
    let background_2 = document.querySelector(".main__background_2");

    // Variables contadoras

    let percent_2 = 1;
    let blur_2 = 30;

    btn_2.addEventListener("click", (event) => {
        btn_2.style.display = "none";

        let inter_2 = setInterval(() => {
            percent_2++;
            blur_2 -= 30 / 100;

            if (percent_2 > 100) {
                clearInterval(inter_2);
                complete_2.style.display = "block";
            } else {
                number_2.innerHTML = percent_2 + "%";
                background_2.style.filter = `blur(${blur_2}px)`;
            }
        }, 20);
    });


    // PROYECTO 3 //
    //
    //
    //
    //
    //
    // PROYECTO 3 //

    let followers_3 = document.querySelectorAll(".socials__number_3");

    followers_3.forEach(follower_3 => {
        let max_3 = parseInt(follower_3.getAttribute("data-target"));
        let counter_3 = max_3 / 300;
        let current_3 = 0;

        let interval_3 = setInterval(() => {
            current_3 = Math.min(current_3 + counter_3, max_3);
            follower_3.innerHTML = Math.ceil(current_3).toLocaleString(); // Mostrar con separador de miles

            if (current_3 >= max_3) {
                clearInterval(interval_3); // Detener el intervalo cuando se alcanza el máximo
            }
        }, 10);
    });
    

    // PROYECTO 7 //
    //
    //
    //
    //
    //
    // PROYECTO 7 //

    let btn_7 = document.querySelector(".nav__btn_7");
    let plus_7 = document.querySelector(".btn__ico-plus_7");
    let close_7 = document.querySelector(".btn__ico-close_7");
    let list_7 = document.querySelector(".nav__list_7");

    btn_7.addEventListener("click", () => {
        plus_7.classList.toggle('btn__show_7');
        close_7.classList.toggle('btn__show_7');
        list_7.classList.toggle('list__open_7');
    });

    // PROYECTO 8 //
    //
    //
    //
    //
    //
    // PROYECTO 8 //

    document.getElementById('city').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });

    document.getElementById('search__weather').addEventListener('click', getWeather);
    
    const weatherAdvice = {
        "Soleado": "Es un buen día para salir. ¡Disfruta del sol!",
        "Despejado": "Cielo despejado, perfecto para salir. ¡Disfruta de la noche!",
        "Parcialmente nublado": "Puede que necesites un abrigo ligero por si refresca.",
        "Nublado": "Un día nublado, pero no olvides tu abrigo por si acaso.",
        "Cielo cubierto": "El cielo está completamente cubierto. ¡Lleva un abrigo en caso de que se enfríe!",
        "Lluvia": "Está lloviendo. Asegúrate de llevar ropa impermeable.",
        "Lluvia ligera": "Puede que llueva ligeramente. Mantén un abrigo a mano.",
        "Lluvia intensa": "Se espera lluvia intensa. ¡Prepárate con ropa impermeable y cuida tus pertenencias!",
        "Lluvia  moderada a intervalos": "Lluvia a intervalos. Mantente seco y alerta.",
        "Chubascos": "Hay chubascos. Lleva ropa adecuada para mantenerte seco.",
        "Tormentas eléctricas": "Se pronostican tormentas eléctricas. Mejor evita salir y mantente a salvo.",
        "Aguanieve moderada a intervalos en las aproximaciones": "Puede que haya aguanieve. Asegúrate de abrigarte bien y usar calzado adecuado.",
        "Nieve": "Está nevando. Asegúrate de abrigarte bien y usar calzado adecuado.",
        "Nieve ligera": "Puede que haya nieve ligera. Viste ropa abrigada.",
        "Nieve intensa": "Nieve intensa en camino. Mantente abrigado y ten cuidado al conducir.",
        "Nieve moderada a intervalos en las aproximaciones": "Puede que haya nieve ligera. Viste ropa abrigada.",
        "Neblina": "Hay niebla densa. Si conduces, asegúrate de tener precaución.",
        "Bruma": "Hay bruma. Mantén la visibilidad al conducir.",
        "Calina": "La visibilidad puede estar reducida. Conduce con cuidado.",
        "Polvo": "Puede haber polvo en el aire. Si eres alérgico, considera usar una mascarilla.",
        "Arena": "La arena puede estar volando. Cuida tus ojos y usa gafas de sol.",
        "Ventoso": "El viento es fuerte. Ten cuidado si usas sombrero o bufanda.",
        "Llovizna helada a intervalos en las aproximaciones": "Puede haber llovizna helada. Lleva ropa abrigada y cuidado al conducir.",
        "Cielos tormentosos en las aproximaciones": "Se aproxima una tormenta. Mantente a salvo y evita salir si es posible.",
        "Chubascos de nieve": "Hay chubascos de nieve. Abrígate bien y ten cuidado en la calle.",
        "Ventisca": "Se espera una ventisca. Mejor no salgas si no es necesario.",
        "Niebla moderada": "Hay niebla moderada. Ten cuidado al conducir.",
        "Niebla helada": "Niebla helada en el ambiente. Ten mucho cuidado al caminar o conducir.",
        "Llovizna a intervalos": "Llovizna a intervalos. Ten cuidado al caminar sobre superficies mojadas.",
        "Llovizna": "Hay llovizna constante. Asegúrate de llevar ropa adecuada.",
        "Llovizna helada": "Hay llovizna helada. Asegúrate de llevar ropa adecuada.",
        "Fuerte llovizna helada": "Llovizna helada intensa. Mantente abrigado y ten cuidado al moverte.",
        "Lluvias ligeras a intervalos": "Lluvias ligeras por momentos. Mantén un abrigo a mano.",
        "Ligeras lluvias": "Lluvias suaves. Prepárate para posibles cambios en el clima.",
        "Periodos de lluvia moderada": "Lluvia moderada a intervalos. Mantente seco y alerta.",
        "Lluvia moderada": "Está lloviendo moderadamente. Un buen abrigo impermeable es recomendable.",
        "Periodos de fuertes lluvias": "Lluvias intensas por momentos. Prepárate con ropa impermeable.",
        "Fuertes lluvias": "Fuertes lluvias. Asegúrate de llevar ropa impermeable.",
        "Ligeras lluvias heladas": "Lluvias heladas ligeras. Cuidado con el frío y las superficies resbaladizas.",
        "Lluvias heladas fuertes o moderadas": "Lluvias heladas moderadas a fuertes. Mantente abrigado y toma precauciones.",
        "Ligeras precipitaciones de aguanieve": "Ligeras precipitaciones de aguanieve. Abrígate bien y usa calzado adecuado.",
        "Aguanieve fuerte o moderada": "Aguanieve moderada a intensa. Usa ropa impermeable y abrigada.",
        "Nevadas ligeras a intervalos": "Nevadas ligeras por momentos. Abrígate adecuadamente.",
        "Nevadas ligeras": "Nevadas ligeras. Usa ropa abrigada y calzado adecuado.",
        "Nieve moderada a intervalos": "Nieve moderada por momentos. Lleva ropa de invierno.",
        "Nieve moderada": "Nieve moderada. Mantente abrigado y ten cuidado al conducir.",
        "Nevadas intensas": "Nevadas intensas. No salgas si no es necesario.",
        "Fuertes nevadas": "Se esperan fuertes nevadas. Mantente abrigado y toma precauciones.",
        "Granizo": "Granizo en la región. Mantente a cubierto para evitar lesiones.",
        "Ligeras precipitaciones": "Precipitaciones ligeras. Mantén un abrigo a mano por si acaso.",
        "Lluvias fuertes o moderadas": "Lluvias moderadas a intensas. Asegúrate de estar preparado para mojarte.",
        "Lluvias torrenciales": "Lluvias torrenciales. Evita salir si es posible.",
        "Ligeros chubascos de aguanieve": "Chubascos ligeros de aguanieve. Usa ropa impermeable.",
        "Chubascos de aguanieve fuertes o moderados": "Chubascos de aguanieve intensos. Mantente abrigado y usa calzado adecuado.",
        "Ligeras precipitaciones de nieve": "Ligeras precipitaciones de nieve. Abrígate bien.",
        "Chubascos de nieve fuertes o moderados": "Chubascos de nieve intensos. Usa ropa de invierno y ten cuidado.",
        "Ligeros chubascos acompañados de granizo": "Chubascos ligeros con granizo. Mantente a cubierto y cuida tu cabeza.",
        "Chubascos fuertes o moderados acompañados de granizo": "Chubascos intensos con granizo. Mantente a salvo bajo techo.",
        "Intervalos de lluvias ligeras con tormenta en la región": "Lluvias ligeras con tormenta en la zona. Ten cuidado con los relámpagos.",
        "Lluvias con tormenta fuertes o moderadas en la región": "Tormentas con lluvia intensa en la región. Mejor evita salir.",
        "Nieve moderada con tormenta en la región": "Nieve y tormenta en la zona. Mantente a cubierto y abrigado.",
        "Nieve moderada o fuertes nevadas con tormenta en la región": "Fuertes nevadas acompañadas de tormentas. Mejor no salgas de casa."
    }; 

    const weatherGifs = {

        "Lluvia ligera": "assets/img/lluvia-suave.png",
        "Llovizna a intervalos": "assets/img/lluvia-suave.png",
        "Llovizna": "assets/img/lluvia-suave.png",
        "Lluvias ligeras a intervalos": "assets/img/lluvia-suave.png",
        "Ligeras lluvias": "assets/img/lluvia-suave.png",
        "Ligeras lluvias heladas": "assets/img/lluvia-suave.png",
        "Ligeras precipitaciones": "assets/img/lluvia-suave.png",
        "Llovizna helada": "assets/img/lluvia-suave.png",
        "Llovizna helada a intervalos en las aproximaciones": "assets/img/lluvia-suave.png",
    
        "Lluvia moderada a intervalos": "assets/img/lluvia.png",
        "Lluvia  moderada a intervalos": "assets/img/lluvia.png",
        "Periodos de lluvia moderada": "assets/img/lluvia.png",
        "Lluvia moderada": "assets/img/lluvia.png",
        "Lluvias fuertes o moderadas": "assets/img/lluvia.png",
        "Lluvias heladas fuertes o moderadas": "assets/img/lluvia.png",
        "Intervalos de lluvias ligeras con tomenta en la región": "assets/img/lluvia.png",
    
        "Lluvia intensa": "assets/img/lluvia-intensa.png",
        "Chubascos": "assets/img/lluvia-intensa.png",
        "Fuerte llovizna helada": "assets/img/lluvia-intensa.png",
        "Periodos de fuertes lluvias": "assets/img/lluvia-intensa.png",
        "Fuertes lluvias": "assets/img/lluvia-intensa.png",
        "Lluvias torrenciales": "assets/img/lluvia-intensa.png",
        "Lluvias con tormenta fuertes o moderadas en la región": "assets/img/lluvia-intensa.png",
        "Cielos tormentosos en las aproximaciones": "assets/img/lluvia-intensa.png",
    
        "Tormentas eléctricas": "assets/img/tormenta.png",
        "Intervalos de lluvias ligeras con tormenta en la región": "assets/img/tormenta.png",
        "Lluvias con tormenta fuertes o moderadas en la región": "assets/img/tormenta.png",
        "Cielos tormentosos en las aproximaciones": "assets/img/tormenta.png",
    
        "Nieve": "assets/img/nieve.png",
        "Nieve ligera": "assets/img/nieve.png",
        "Nieve intensa": "assets/img/nieve.png",
        "Nieve moderada a intervalos en las aproximaciones": "assets/img/nieve.png",
        "Chubascos de nieve": "assets/img/nieve.png",
        "Ventisca": "assets/img/nieve.png",
        "Niebla helada": "assets/img/nieve.png",
        "Nevadas ligeras a intervalos": "assets/img/nieve.png",
        "Nevadas ligeras": "assets/img/nieve.png",
        "Nieve moderada a intervalos": "assets/img/nieve.png",
        "Nieve moderada": "assets/img/nieve.png",
        "Nevadas intensas": "assets/img/nieve.png",
        "Fuertes nevadas": "assets/img/nieve.png",
        "Ligeras precipitaciones de nieve": "assets/img/nieve.png",
        "Chubascos de nieve fuertes o moderados": "assets/img/nieve.png",
        "Nieve moderada con tormenta en la región": "assets/img/nieve.png",
        "Nieve moderada o fuertes nevadas con tormenta en la región": "assets/img/nieve.png",
    
        "Soleado": "assets/img/soleado.png",
    
        "Despejado": "assets/img/despejado.png",
    
        "Parcialmente nublado": "assets/img/nublado.png",
        "Nublado": "assets/img/nublado.png",
        "Cielo cubierto": "assets/img/nublado.png",
    
        "Niebla moderada": "assets/img/neblina.png",
        "Neblina": "assets/img/neblina.png",
        "Bruma": "assets/img/neblina.png",
    
        "Calina": "assets/img/arena.png",
        "Polvo": "assets/img/arena.png",
        "Arena": "assets/img/arena.png",
    
        "Ventoso": "assets/img/viento.png",
        
        "Chubascos ligeros de aguanieve": "assets/img/nieve-suave.png",
        "Chubascos de aguanieve fuertes o moderados": "assets/img/nieve-suave.png",
    
        "Ligeros chubascos acompañados de granizo": "assets/img/granizo.png",
        "Chubascos fuertes o moderados acompañados de granizo": "assets/img/granizo.png",
        "Granizo": "assets/img/granizo.png"
    
    };
    
    const windDirections = {
        "N": "N",
        "NNE": "NEN",
        "NE": "NE",
        "ENE": "ENE",
        "E": "E",
        "ESE": "ESE",
        "SE": "SE",
        "SSE": "SSE",
        "S": "S",
        "SSW": "SSO",
        "SW": "O",
        "WSW": "ONO",
        "NW": "NO",
        "NNW": "NON"
    };
    
    const apiKey = "14fe70e7f5a74bc8977202838242009"; // Coloca tu API key aquí

    function getWeather() {
        const city = document.getElementById('city').value;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=2&aqi=no&alerts=no&lang=es`;
        

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const time = data.location.localtime;
            const temperature = data.current.temp_c;
            const description = data.current.condition.text;
            const suggestion = getClothingSuggestion(temperature);
            const humidity = data.current.humidity;
            const wind = data.current.wind_kph;
            const windDirection = data.current.wind_dir; 
            const windDirectionSpanish = windDirections[windDirection] || windDirection; 

            const maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
            const minTemp = data.forecast.forecastday[0].day.mintemp_c;
            const willRain = data.forecast.forecastday[0].day.daily_will_it_rain;
            const chanceRain = data.forecast.forecastday[0].day.daily_chance_of_rain;

            const actualHour = parseInt(time.split(' ')[1].split(':')[0]);


            let plus1temp, plus1rain, plus2temp, plus2rain, plus3temp, plus3rain;
            let plus1Hour, plus2Hour, plus3Hour;

            
            if (actualHour <= 20) {
                
                plus1Hour = actualHour + 1;
                plus2Hour = actualHour + 2;
                plus3Hour = actualHour + 3;
                
                plus1temp = data.forecast.forecastday[0].hour[plus1Hour].temp_c;
                plus1rain = data.forecast.forecastday[0].hour[plus1Hour].chance_of_rain;

                plus2temp = data.forecast.forecastday[0].hour[plus2Hour].temp_c;
                plus2rain = data.forecast.forecastday[0].hour[plus2Hour].chance_of_rain;

                plus3temp = data.forecast.forecastday[0].hour[plus3Hour].temp_c;
                plus3rain = data.forecast.forecastday[0].hour[plus3Hour].chance_of_rain;
            } else if (actualHour === 21) {
                
                plus1Hour = actualHour + 1;
                plus2Hour = actualHour + 2;
                plus3Hour = 0; 
                
                plus1temp = data.forecast.forecastday[0].hour[plus1Hour].temp_c;
                plus1rain = data.forecast.forecastday[0].hour[plus1Hour].chance_of_rain;

                plus2temp = data.forecast.forecastday[0].hour[plus2Hour].temp_c;
                plus2rain = data.forecast.forecastday[0].hour[plus2Hour].chance_of_rain;

                
                plus3temp = data.forecast.forecastday[1].hour[0].temp_c;
                plus3rain = data.forecast.forecastday[1].hour[0].chance_of_rain;
            } else if (actualHour === 22) {
                
                plus1Hour = actualHour + 1;
                plus2Hour = 0; 
                plus3Hour = 1; 
                
                plus1temp = data.forecast.forecastday[0].hour[plus1Hour].temp_c;
                plus1rain = data.forecast.forecastday[0].hour[plus1Hour].chance_of_rain;

                
                plus2temp = data.forecast.forecastday[1].hour[0].temp_c;
                plus2rain = data.forecast.forecastday[1].hour[0].chance_of_rain;

                plus3temp = data.forecast.forecastday[1].hour[1].temp_c;
                plus3rain = data.forecast.forecastday[1].hour[1].chance_of_rain;
            } else if (actualHour === 23) {
               
                plus1Hour = 0; 
                plus2Hour = 1; 
                plus3Hour = 2;

                plus1temp = data.forecast.forecastday[1].hour[0].temp_c;
                plus1rain = data.forecast.forecastday[1].hour[0].chance_of_rain;

                plus2temp = data.forecast.forecastday[1].hour[1].temp_c;
                plus2rain = data.forecast.forecastday[1].hour[1].chance_of_rain;

                plus3temp = data.forecast.forecastday[1].hour[2].temp_c;
                plus3rain = data.forecast.forecastday[1].hour[2].chance_of_rain;
            }

            
            document.getElementById('result5').innerHTML = `
                <details>
                    <summary>Clima en las Próximas horas:</summary>
                    <p class="suggestion__text">Próximas horas:</p>
                    <p>${plus1Hour}:00hs: ${plus1temp}° - ${plus1rain}% Lluvia</p>
                    <p>${plus2Hour}:00hs: ${plus2temp}° - ${plus2rain}% Lluvia</p>
                    <p>${plus3Hour}:00hs: ${plus3temp}° - ${plus3rain}% Lluvia</p>
                </details>
            `;

            const date = time.split(" ")[0];
            const [year, month, day] = date.split("-");
            const formattedDate = `${day}/${month}`;

            const will = willRain === 0 ? "NO" : "SÍ";

            let rainMessage = '';
            if (chanceRain >= 0 && chanceRain <= 20) {
                rainMessage = "Muy improbable que llueva. En general, se considera que no lloverá.";
            } else if (chanceRain > 20 && chanceRain <= 40) {
                rainMessage = "Ligeramente improbable que llueva, aunque puede haber lluvias ligeras o esporádicas.";
            } else if (chanceRain > 40 && chanceRain <= 60) {
                rainMessage = "Zona de incertidumbre. Es un '50/50', donde puede o no llover.";
            } else if (chanceRain > 60 && chanceRain <= 80) {
                rainMessage = "Probabilidad elevada de que llueva. Es más seguro pensar que lloverá.";
            } else if (chanceRain > 80 && chanceRain <= 100) {
                rainMessage = "Muy probable que llueva. Se considera casi seguro que lloverá.";
            }
        
            document.getElementById('result3').innerHTML = `
                <details>
                    <summary>Pronóstico para hoy:</summary>
                    <p class="suggestion__text">Pronóstico para hoy: ${formattedDate}</p>
                    <p>Máxima: ${maxTemp}° - Mínima: ${minTemp}°</p>
                    <p>¿Se esperan lluvias para hoy?: ${will}</p>
                    <p>Chances que llueva: ${chanceRain}%</p>
                    <p>${rainMessage}</p>
                </details>
            `;

            const maxTemp2 = data.forecast.forecastday[1].day.maxtemp_c;
            const minTemp2 = data.forecast.forecastday[1].day.mintemp_c;
            const willRain2 = data.forecast.forecastday[1].day.daily_will_it_rain;
            const chanceRain2 = data.forecast.forecastday[1].day.daily_chance_of_rain;

            const time2 = data.forecast.forecastday[1].date;
            const [year2, month2, day2] = time2.split("-");
            const formattedDate2 = `${day2}/${month2}`;

            const will2 = willRain2 === 0 ? "NO" : "SÍ";

            let rainMessage2 = '';
            if (chanceRain2 >= 0 && chanceRain2 <= 20) {
                rainMessage2 = "Muy improbable que llueva. En general, se considera que no lloverá.";
            } else if (chanceRain2 > 20 && chanceRain2 <= 40) {
                rainMessage2 = "Ligeramente improbable que llueva, aunque puede haber lluvias ligeras o esporádicas.";
            } else if (chanceRain2 > 40 && chanceRain2 <= 60) {
                rainMessage2 = "Zona de incertidumbre. Es un '50/50', donde puede o no llover.";
            } else if (chanceRain2 > 60 && chanceRain2 <= 80) {
                rainMessage2 = "Probabilidad elevada de que llueva. Es más seguro pensar que lloverá.";
            } else if (chanceRain2 > 80 && chanceRain2 <= 100) {
                rainMessage2 = "Muy probable que llueva. Se considera casi seguro que lloverá.";
            }
        
            document.getElementById('result4').innerHTML = `
                <details>
                    <summary>Pronóstico para mañana:</summary>
                    <p class="suggestion__text">Pronóstico para mañana: ${formattedDate2}</p>
                    <p>Máxima: ${maxTemp2}° - Mínima: ${minTemp2}°</p>
                    <p>¿Se esperan lluvias para mañana?: ${will2}</p>
                    <p>Chances que llueva: ${chanceRain2}%</p>
                    <p>${rainMessage2}</p>
                </details>
            `;

            const isDay = data.current.is_day; 
            const layout = document.querySelector('.layout8');

            if (isDay === 1) { 
                layout.classList.remove('layout--night');
            } else { 
                layout.classList.add('layout--night');
            }


            const gifUrl = weatherGifs[description] || "assets/img/tierra.png";

            document.getElementById('icon__container').innerHTML = `
                <p><img class="icon__weather" src="${gifUrl}" alt=""></p>
            `;

            document.getElementById('result').innerHTML = `
                <p>Hora en ${city}: ${time.split(' ')[1]}</p>
                <p class="weather__temperature">${temperature}°</p>
                <p class="weather__description">${description}</p>

                <div class="wind__info">
                    <svg class="wind__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="#ffffff" d="M184 184a32 32 0 0 1-32 32c-13.7 0-26.95-8.93-31.5-21.22a8 8 0 0 1 15-5.56C137.74 195.27 145 200 152 200a16 16 0 0 0 0-32H40a8 8 0 0 1 0-16h112a32 32 0 0 1 32 32m-64-80a32 32 0 0 0 0-64c-13.7 0-26.95 8.93-31.5 21.22a8 8 0 0 0 15 5.56C105.74 60.73 113 56 120 56a16 16 0 0 1 0 32H24a8 8 0 0 0 0 16Zm88-32c-13.7 0-26.95 8.93-31.5 21.22a8 8 0 0 0 15 5.56C193.74 92.73 201 88 208 88a16 16 0 0 1 0 32H32a8 8 0 0 0 0 16h176a32 32 0 0 0 0-64"/></svg>
                    <p>Viento </p>
                    <p class="wind__separator">|</p>
                    <p>${windDirectionSpanish} ${wind} Km/h</p>
                </div>
                <div class="humidity__info">
                    <svg class="humidity__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 21.5q-3.325 0-5.663-2.3T4 13.6q0-1.575.613-3.012T6.35 8.05l4.25-4.175q.3-.275.663-.425T12 3.3t.738.15t.662.425l4.25 4.175q1.125 1.1 1.738 2.538T20 13.6q0 3.3-2.337 5.6T12 21.5m0-2q2.5 0 4.25-1.713T18 13.6q0-1.175-.45-2.237T16.25 9.5L12 5.3L7.75 9.5q-.85.8-1.3 1.863T6 13.6q0 2.475 1.75 4.188T12 19.5"/></svg>
                    <p>Humedad </p>
                    <p class="humidity__separator">|</p>
                    <p>${humidity}%</p>
                </div>
            `;

            document.getElementById('result2').innerHTML = `
                <p class="suggestion__text">Sugerencia de ropa: </p>
                <p>${suggestion}</p>
            `;
            
            const precipAmountMm = data.current.precip_mm; 
            
            const rainConditions = [
                "Lluvia ligera",
                "Llovizna a intervalos",
                "Llovizna",
                "Lluvias ligeras a intervalos",
                "Ligeras lluvias",
                "Ligeras lluvias heladas",
                "Ligeras precipitaciones",
                "Llovizna helada",
                "Llovizna helada a intervalos en las aproximaciones",
                "Lluvia moderada a intervalos",
                "Lluvia moderada",
                "Periodos de lluvia moderada",
                "Lluvias fuertes o moderadas",
                "Lluvias heladas fuertes o moderadas",
                "Intervalos de lluvias ligeras con tormenta en la región",
                "Lluvia intensa",
                "Chubascos",
                "Fuerte llovizna helada",
                "Periodos de fuertes lluvias",
                "Fuertes lluvias",
                "Lluvias torrenciales",
                "Lluvias con tormenta fuertes o moderadas en la región",
                "Cielos tormentosos en las aproximaciones",
                "Tormentas eléctricas",
                "Intervalos de lluvias ligeras con tormenta en la región",
                "Nieve moderada con tormenta en la región",
                "Nieve moderada o fuertes nevadas con tormenta en la región",
                "Granizo",
                "Ligeros chubascos acompañados de granizo",
                "Chubascos fuertes o moderados acompañados de granizo",
            ];
                   
            if (rainConditions.includes(description)) {
                document.getElementById('result2').innerHTML += `
                    <p>¡Ha habido o hay precipitaciones! Considera llevar un paraguas.</p>
                `;
            } else if (precipAmountMm > 0) {
                document.getElementById('result2').innerHTML += `
                    <p>¡Ha habido precipitaciones! Considera llevar un paraguas.</p>
                `;
            } else {
                document.getElementById('result2').innerHTML += `
                    <p>No se registran precipitaciones.</p>
                `;
            }

            const advice = getAdvice(temperature, description); 
            document.getElementById('result2').innerHTML += `<p>${advice}</p>`;
        })
        .catch(error => {
            document.getElementById('result').innerHTML = 'Error al obtener los datos del clima.';
            document.getElementById('result2').innerHTML = 'Por favor, ingresá tu ciudad.';
            console.error(error);
        });

    }
    
    function getAdvice(temperature, weatherCondition) {
        if (weatherCondition === "parcialmente nublado" || weatherCondition === "nublado") { 
            if (temperature > 20) {
                return "Está nublado, pero hace calor. ¡No necesitas abrigo!";
            } else {
                return "Un día nublado. Lleva un abrigo por si refresca.";
            }
        } else if (weatherCondition === "soleado"){
            if (temperature > 25){
                return "Hace calor, lleva un sombrero y protector solar.";
            } else {
                return "Es un buen día para salir. ¡Disfruta del sol!";
            }
        } else {
            return weatherAdvice[weatherCondition] || "";
        }

        
    }

    function getClothingSuggestion(temp) {
        if (temp < -10) {
            return 'Ropa térmica, abrigo muy pesado, bufanda, gorro, guantes y botas.';
        } else if (temp < 0) {
            return 'Abrigo grueso, suéter, bufanda, guantes y gorro. Botas abrigadas.';
        } else if (temp < 5) {
            return 'Abrigo pesado, bufanda, gorro, guantes y zapatos resistentes al frío.';
        } else if (temp < 10) {
            return 'Abrigo pesado, bufanda y guantes. Considera una capa adicional debajo.';
        } else if (temp < 15) {
            return 'Chaqueta de entretiempo o suéter grueso. Podrías necesitar una bufanda ligera.';
        } else if (temp < 20) {
            return 'Chaqueta ligera, suéter o cardigan. Ropa de manga larga es adecuada.';
        } else if (temp < 25) {
            return 'Ropa casual ligera, como una camiseta de manga larga o camisa. Pantalones ligeros.';
        } else if (temp < 30) {
            return 'Camiseta de manga corta y pantalones cortos o falda. Ropa cómoda para el calor.';
        } else if (temp < 35) {
            return 'Ropa muy ligera, como camiseta sin mangas y shorts. Gafas de sol y protector solar recomendados.';
        } else if (temp < 40) {
            return 'Ropa fresca y de colores claros. Mantente hidratado, usa gorra o sombrero.';
        } else {
            return 'Ropa mínima, busca sombra y mantente hidratado. Evita la exposición prolongada al sol.';
        }
    }

    // PROYECTO 9 //
    //
    //
    //
    //
    //
    // PROYECTO 9 //

    // Variables para contadores de minutos y segundos
    let cronoMin_9 = document.querySelector(".crono__min_9");
    let cronoSec_9 = document.querySelector(".crono__sec_9");

    // Variables selección botones
    let btnStart_9 = document.querySelector(".layout__btn-start_9");
    let btnStop_9 = document.querySelector(".layout__btn-stop_9");
    let btnReset_9 = document.querySelector(".layout__btn-reset_9");

    // Variables cuenta minutos y segundos
    let minutes_9 = 0;
    let seconds_9 = 0;
    let time_9 = null;

    // Función para iniciar cronómetro
    let start_9 = () => {
        if (!time_9) {
            time_9 = setInterval(() => {
                seconds_9++;

                if (seconds_9 == 60) {
                    minutes_9++;
                    seconds_9 = 0;
                }

                if (minutes_9 >= 60) {
                    alert("Has excedido el tiempo límite de 60 minutos.");
                    clearInterval(time_9);
                }

                cronoSec_9.innerHTML = seconds_9 < 10 ? "0" + seconds_9 : seconds_9;
                cronoMin_9.innerHTML = minutes_9 < 10 ? "0" + minutes_9 : minutes_9;
            }, 1000);
        }
    };

    let stop_9 = () => {
        if (time_9) {
            clearInterval(time_9);
            time_9 = null;
        }
    };

    //Botón Iniciar
    btnStart_9.addEventListener("click", () => {
        start_9();
    });

    btnStop_9.addEventListener("click", () => {
        stop_9();
    });

    btnReset_9.addEventListener("click", () => {
        stop_9();
        minutes_9 = 0;
        seconds_9 = 0;
        cronoSec_9.innerHTML = "00";
        cronoMin_9.innerHTML = "00";
    });

    // PROYECTO 11 //
    //
    //
    //
    //
    //
    // PROYECTO 11 //

    let controlRange_11 = document.querySelector(".control__range_11");
    let controlNumber_11 = document.querySelector(".control__number_11");

    controlRange_11.value = 5;

    let mainForm_11 = document.querySelector(".main__form_11");
    let checkMinus_11 = document.querySelector("#letters_11");
    let checkMayus_11 = document.querySelector("#mayus_11");
    let checkNumbers_11 = document.querySelector("#numbers_11");
    let checkSymbols_11 = document.querySelector("#sym_11");
    let passwordDom_11 = document.querySelector(".generate__mail_11");

    let valueRange_11 = 5;

    controlRange_11.addEventListener("input", () => {
        valueRange_11 = controlRange_11.value;
        controlNumber_11.innerText = valueRange_11;
    });

    function getLower_11() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    function getMayus_11() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    function getNumber_11() {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }

    function getSymbol_11() {
        return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
    }

    mainForm_11.addEventListener("submit", (e) => {
        e.preventDefault();
        let password_11 = "";

        let count_11 = 0;

        if (checkMinus_11.checked || checkMayus_11.checked || checkNumbers_11.checked || checkSymbols_11.checked) {
            do {
                if (checkMinus_11.checked && count_11 < valueRange_11) {
                    password_11 += getLower_11();
                    count_11++;
                }
                if (checkMayus_11.checked && count_11 < valueRange_11) {
                    password_11 += getMayus_11();
                    count_11++;
                }
                if (checkNumbers_11.checked && count_11 < valueRange_11) {
                    password_11 += getNumber_11();
                    count_11++;
                }
                if (checkSymbols_11.checked && count_11 < valueRange_11) {
                    password_11 += getSymbol_11();
                    count_11++;
                }
            } while (count_11 < valueRange_11);

            passwordDom_11.innerText = password_11;
        }
    });

    let copyPass_11 = document.querySelector(".generate__icon_11");

    copyPass_11.addEventListener("click", () => {
        let passwordCopy_11 = passwordDom_11.innerText;
        navigator.clipboard.writeText(passwordCopy_11);

        alert("La contraseña se ha copiado en tu portapapeles");
    });

    // PROYECTO 12 //
    //
    //
    //
    //
    //
    // PROYECTO 12 //

    let btn_12 = document.querySelector(".nav__btn_12");
    let pagesBox_12 = document.querySelector(".layout__pages_12");
    let listNav_12 = document.querySelector(".layout__list_12");
    let listItem_12 = document.querySelectorAll(".list__item_12");
    let pagesItem_12 = document.querySelectorAll(".pages__page_12");

    btn_12.addEventListener("click", () => {
        btn_12.classList.toggle("nav__btn--active_12");
        pagesBox_12.classList.toggle("layout__pages--show_12");
        listNav_12.classList.toggle("layout__list--show_12");
    });

    let activatePage_12 = (i) => {
        pagesItem_12.forEach(page => {
            page.classList.remove("page--active_12");
        });
        pagesItem_12[i].classList.add("page--active_12");
    }

    listItem_12.forEach((item, index) => {
        item.addEventListener("click", () => {
            activatePage_12(index);
        });
    });

    // PROYECTO 13 //
    //
    //
    //
    //
    //
    // PROYECTO 13 //

    let left_13 = document.querySelector(".main__article--left_13");
    let right_13 = document.querySelector(".main__article--right_13");

    left_13.addEventListener("mouseenter", () => {
        left_13.classList.add("active_13");
        right_13.classList.add("inactive_13");
    });

    left_13.addEventListener("mouseleave", () => {
        left_13.classList.remove("active_13");
        right_13.classList.remove("inactive_13");
    });

    right_13.addEventListener("mouseenter", () => {
        right_13.classList.add("active_13");
        left_13.classList.add("inactive_13");
    });

    right_13.addEventListener("mouseleave", () => {
        right_13.classList.remove("active_13");
        left_13.classList.remove("inactive_13");
    });



});
