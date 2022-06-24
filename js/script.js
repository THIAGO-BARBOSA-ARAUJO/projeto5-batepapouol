
const btn_enviar_menssagem = document.querySelector(".enviar_msg")
const box_mensagem = document.querySelector(".box_mensagem")

const nome_usuario = prompt("Digite o seu nome!")
const nome_usuario_obj = {name:nome_usuario}

function logar() {
    const promesssa_post = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", nome_usuario_obj)

    promesssa_post.then(tudocerto_post)

    promesssa_post.catch(deuerro_post)

    function tudocerto_post(resp) {
        console.log(resp.status + " o nome foi aceito no servidor")
        setInterval(enviaUsuario, 5000)
    }
    
    function deuerro_post(resp) {
        if(resp.request.status === 400) {
            console.log("nome de usuário já consta no servidor")
            location.reload()
        }
    }  

    function atualiza_mensagem(resp){
        console.log(resp)
        box_mensagem.innerHTML = "";
        for (let index = 0; index < resp.data.length; index++) {
            const mensagem_atual = resp.data[index]
            const tempo = mensagem_atual.time
            const tipo = mensagem_atual.type
            const from = mensagem_atual.from
            const to = mensagem_atual.to
            const texto = mensagem_atual.text
            const contexto = `<strong>${from}</strong> para <strong>${to}</strong>`

            if(tipo === "status") {
                box_mensagem.innerHTML +=`<li class=${tipo}><p>${tempo}: <strong>${from}</strong> ${texto}</p></li>`;
            }
            if(tipo === "message"){
                box_mensagem.innerHTML +=`<li class=${tipo}><p>${tempo} ${contexto}: ${texto}</p></li>`;
            }
        }
    }
    setInterval(()=>{
        const promessa_get = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
        promessa_get.then(atualiza_mensagem)
    }, 2000)
}

function enviaUsuario(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome_usuario_obj)
}


function enviarMensagem(e) {
    e.preventDefault()
    const text_input = document.querySelector(".text_input")
    const text_input_obj = {
        from:nome_usuario,
	    to:"Todos",
	    text:text_input.value,
	    type:"message"
    }

    promessa_post2 = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", text_input_obj)
    text_input.value = ""
}

btn_enviar_menssagem.addEventListener("click", enviarMensagem)

logar()

