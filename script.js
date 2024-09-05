document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let data = document.querySelector('#searchInput').value;
    if (data !== '') {
        limparInfos();
        mensagem('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(data)}&appid=a3ad8700c8a4563718f6b9da0513e365&units=metric&lang=pt_br`;
        let req = await fetch(url);
        let json = await req.json();
        
        if(json.cod === 200){
            mostrarInfos(json);
        } else {
            limparInfos();
            mensagem('A cidade inserida está incorreta ou não existe.');
        }

    } else {
        limparInfos();
    }
})

function mensagem(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function limparInfos(){
    mensagem('');
    document.querySelector('.resultado').style.display = 'none';
}

function mostrarInfos(json){
    document.querySelector('.titulo').innerHTML = `<div class="titulo">${json.name}, ${json.sys.country}</div>`;
    document.querySelector('.tempInfo').innerHTML = `<div class="tempInfo">${json.main.temp} <sup>ºC</sup></div>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);
    document.querySelector('.ventoInfo').innerHTML = `<div class="ventoInfo">${json.wind.speed} <span>km/h</span></div>`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.wind.deg - 90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
}