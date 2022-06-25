
const btn_enviar_menssagem = document.querySelector(".enviar_msg")
const box_mensagem = document.querySelector(".box_mensagem")

const arrayUsers = document.querySelectorAll(".usuarios > div")
const fundo = document.querySelector(".fundo")

const caixa_users = document.querySelector(".usuarios")

const escolher_pessoa_img = document.querySelector(".escolher_pessoa_img")
const tela_escolhe_contato = document.querySelector(".tela-escolhe-contato")

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
                box_mensagem.innerHTML +=`<li class=${tipo}><p>(${tempo}) <strong>${from}</strong> ${texto}</p></li>`;
            }
            if(tipo === "message"){
                box_mensagem.innerHTML +=`<li class=${tipo}><p>(${tempo}) ${contexto}: ${texto}</p></li>`;
            }

            if(tipo === "private_message"){
                if(to === nome_usuario){
                    box_mensagem.innerHTML +=`<li class=${tipo}><p>(${tempo}) <strong>${from}</strong> reservadamente para <strong>${to}</strong>: ${texto}</p></li>`;
                }
            }

        }

        const ultima_mensagem = document.querySelector("li:last-of-type")
        ultima_mensagem.scrollIntoView()
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


function pegaUsers(){
    const promessa_get2 = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    promessa_get2.then(resposta_promessa_get2)


    function resposta_promessa_get2(resp){
        for(let i = 0; i < resp.data.length; i++){
            
            caixa_users.innerHTML += `
            <div onclick="tiraOuColocaEscondido(this)" class="user">
                <div>
                    <img src="img/user.svg">
                    <span>${resp.data[i].name}</span>
                </div>
                <img class="check escondido" src="img/checked.svg">
            </div><!--user-->
            `
        }
    }

    console.log("Atualizou")
}


function mostrar_tela_pessoas() {
    tela_escolhe_contato.classList.toggle("escondido")
    
}


btn_enviar_menssagem.addEventListener("click", enviarMensagem)

escolher_pessoa_img.addEventListener("click", mostrar_tela_pessoas)

fundo.addEventListener("click", mostrar_tela_pessoas)


logar()

pegaUsers()

function tiraOuColocaEscondido(e) {
    e.querySelector(".check").classList.toggle("escondido")
}

