let allMessages = [];
let todaMessage = [];

function pegaHora() {
    let now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let time = `(${hour}:${min}:${sec})`;

    return time;
}

let moment = pegaHora();

function buscarMensagens() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(renderizar);
    promessa.catch(deuRuim);



    todaMessage = document.querySelectorAll('.message');
    const lastMessage = todaMessage[(todaMessage.length)];
    console.log(lastMessage);
    lastMessage.scrollIntoView();
}

function buscarUsuarios() {
    axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
}

function deuRuim(erro) {
    if (erro.response.status === 409) {
        alert('NOME EM USO, ESCOLHA OUTRO');
    }
    console.log(erro.response.status);
    console.log(erro.response.data);

}

const msgs = document.querySelector(".msgs");

function renderizar(resposta) {
    // buscar os dados do array 'promessa''
    // renderizar esses dados no campo de mensagens enviadas
    allMessages = resposta.data;
    console.log(allMessages);

    msgs.innerHTML = "";
    for (let i = 0; i < allMessages.length; i++) {
        msgs.innerHTML += ` <div class="msg ${allMessages[i].type}">
                                    <span class="time">(${allMessages[i].time})</span> <b class="username">${allMessages[i].from}</b> ${allMessages[i].text}
                                </div>`;
    }
}

let user = "";

function enter(dados) {
    user = dados.querySelector(".nickName").value;
    const login = dados.parentNode.parentNode;
    login.classList.add("hidden");
    dados.querySelector(".nickName").value = "";
    const usuario = {
        name: user
    };
    const msgEntrada = {
        from: user,
        to: "Todos",
        text: "entrou na sala",
        type: "status"
    };

    /*   msgs.innerHTML += ` <div class="msg status">
                                        <span class="time">${moment}</span> <b class="username">${user}</b> <span class="text">${msgEntrada.text}</span>
                                    </div>`; */
    console.log(usuario);
    console.log(msgEntrada);

    function handleLogin() {
        const entreiPovo = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", msgEntrada);
        entreiPovo.catch(deuRuim);
        buscarMensagens();
    }


    const entrada = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);
    entrada.then(handleLogin);
    entrada.catch(deuRuim);


}

function enviarMensagem(send) {
    const containerRodape = send.parentNode;
    let msgText = containerRodape.querySelector(".campoDigitacao").value;

    /*   let nmessage = `<div class="msg message">
                                <span class="time">${moment}</span> <b class="username">${user}</b> para todos: ${msgText} 
                            </div>`;
      msgs.innerHTML += nmessage; */

    const objmessage = {
        from: user,
        to: "Todos",
        text: msgText,
        type: "message"
    };

    const sera = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", objmessage);
    sera.then(buscarMensagens);
    sera.catch(window.location.reload());



    // axios é assíncrono, fazer console.log na requisição e no retorno.
    // o erro está vindo antes ou dps?

    containerRodape.querySelector(".campoDigitacao").value = "";
}

function checkPageFocus() {
    if (document.hasFocus() === false) {
        window.location.reload();
    } else {

        const req = {
            name: user
        }

        axios.post('https://mock-api.driven.com.br/api/v6/uol/status', req);
    }
}
/* setInterval(checkPageFocus, 10000); */

setInterval(buscarMensagens, 3000);

