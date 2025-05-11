const chaveDaApi = "b978aaf1ab2b48bc84e133225242411";
const botaoDeBusca = document.querySelector(".btn-busca");
const inputDeBusca = document.getElementById("input-busca");
const campoVazio = "Preencha o campo com um nome de cidade valida!"

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById
        ("input-busca").value.trim();

    if (!cidade) return alert(`${campoVazio}`);

    const dados = await buscarDadosDaCidade(cidade);

    if (dados) preencherDadosNaTela(dados, cidade);
});

inputDeBusca.addEventListener('keyup', async (e) => {
    const key = e.key || e.keyCode;

    if(key === "Enter" || key === 13 ) {
        const cidade = e.target.value.trim();

        if(!cidade) return alert(`${campoVazio}`);
        const dados = await buscarDadosDaCidade(cidade);

        if(dados) preencherDadosNaTela(dados, cidade)
    }
})

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

    try{
    const resposta = await fetch(apiUrl);

    if (resposta.status !== 200) return alert("Cidade não encontrada!");
    const dados = resposta.json();

    return dados;
    } catch (error) {
        console.error("Erro ao buscar dados da cidade:", error);
        alert("Errp na conexão com a API. Tente novamente mais tarde.");
        return null;
    }
}

function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const umidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;

    document.getElementById("temperatura").textContent = `${temperatura} °C`;

    document.getElementById("condicao").textContent = condicao;

    document.getElementById("umidade").textContent = `${umidade}%`

    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento}km/h;`

    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}