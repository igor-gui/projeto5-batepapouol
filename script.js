let allMessages = [];

function pegaHora(){
    let now = new Date;
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let time = `(${hour}:${min}:${sec})`;

    return time;
}

let moment = pegaHora();

function buscarDados() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(renderizar);
    promessa.catch(deuRuim);
}
buscarDados()


function deuRuim(erro) {
    console.log(erro.response.status);
    console.log(erro.response.data);
}


const msgs = document.querySelector('.msgs');

function renderizar(resposta) {
    // buscar os dados do array 'promessa''
    // renderizar esses dados no campo de mensagens enviadas
    allMessages = resposta.data;
    console.log(allMessages);
    console.log(allMessages.length);
        msgs.innerHTML = '';
    for (let i = 0; i < allMessages.length; i++) {
        msgs.innerHTML += ` <div class="msg ${allMessages[i].type}">
                                    <span class="time">(${allMessages[i].time})</span> <b class="username">${allMessages[i].from}</b> ${allMessages[i].text}
                                </div>`;
    }

}


let user = '';

function enter(dados) {

    var now = new Date;
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    let time = `${hour}:${min}:${sec}`;

    user = dados.querySelector('.nickName').value;

    const login = dados.parentNode.parentNode;

    login.classList.add('hidden');

    dados.querySelector('.nickName').value = '';

    const usuario = {
        name: user
    };
    const msgEntrada = {
        from: user,
        to: "Todos",
        text: "entrou na sala",
        type: "status",
    }

    msgs.innerHTML += ` <div class="msg status">
                                    <span class="time">${moment}</span> <b class="username">${user}</b> entrou na sala...
                                </div>`;

    const sera = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);

    const entreiPovo  = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msgEntrada);
    entreiPovo.then(buscarDados);
    entreiPovo.catch(deuRuim);
}

function enviarMensagem(send) {

    

    const containerRodape = send.parentNode;
    let msgText = containerRodape.querySelector('.campoDigitacao').value;

    if (msgText === '') {
    } else {

        let nmessage = `<div class="msg message">
                            <span class="time">${moment}</span> <b class="username">${user}</b> para todos: ${msgText} 
                        </div>`;
        msgs.innerHTML += nmessage;

        const objmessage = {
            from: user,
            to: "Todos",
            text: msgText,
            type: "message",
        }



      const sera =  axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', objmessage);
        sera.then(buscarDados);
        sera.catch(deuRuim);

        containerRodape.querySelector('.campoDigitacao').value = '';
    }
}

function Atualizar(){
    window.location.reload()
}
