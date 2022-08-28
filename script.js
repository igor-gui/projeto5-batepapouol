const msgs = document.querySelector('.msgs');
let user = '';
function enviarMensagem(send) {
    const containerRodape = send.parentNode;
    let msgText = containerRodape.querySelector('.campoDigitacao').value;

    if (msgText === '') {
    } else {

        msgs.innerHTML += `<div class="msg">
                            <span class="time"> (09:21:45) </span> <b class="username">${user}</b> ${msgText} 
                        </div>`;
        containerRodape.querySelector('.campoDigitacao').value = '';
    }
}

function enter(dados){
    user = dados.querySelector('.nickName').value;
    const login = dados.parentNode.parentNode;
    login.classList.add('hidden');
    dados.querySelector('.nickName').value = '';
}