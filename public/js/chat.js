let url = (window.location.hostname.includes("localhost"))
    ? `http://localhost:8081/api/auth`
    : `https://rest-node-jwt.herokuapp.com/api/auth`;

const lblUsers = document.querySelector("#lblUsers");
const txtMsg = document.querySelector("#txtMsg");
const boxMsg = document.querySelector("#boxMsg");

let usuario = null;
let socket = null;

const validarJWT = async () => {

    const token = localStorage.getItem("token") || "";

    if (token.length < 15) {
        window.location = "index.html";
        throw new Error("No hay un token en el servidor");
    }
    try {
        const resp = await fetch(url, {
            headers: {
                "j-token": token
            }
        });

        const { user, token: tokenDB } = await resp.json();
        document.title = user.name;
        
        await conectarSocket();

    } catch (error) {
        window.location = "index.html";
    }

}

const conectarSocket = async () =>{
    socket = io({
        "extraHeaders": {
            "j-token": localStorage.getItem("token")
        }
    });

    socket.on("disconnect", ()=>{
        console.log("disconnect");
    })
    socket.on("chat-container", renderChatContainer)
    socket.on("ver-usuarios", renderListUsers)


}

const renderListUsers = (arrUser = []) =>{
    let userHtml = "";
    arrUser.forEach(el =>{
        userHtml += `
            <li>
                ${el.name} <br/>
                <span>
                ${el.uid}
                </span>
            </li>
        `
    })
    lblUsers.innerHTML = userHtml;
}

const renderChatContainer = (payload)=>{
    console.log(payload);
    let container = "";
    payload.forEach(el =>{
        container += `
            <div class="mb-2">
                <small class="text-muted"> ${el.name} </small><br/>
                <span> ${el.message} </span>
            </div>            
        `;
    })
    boxMsg.innerHTML = container;
}

txtMsg.addEventListener("keyup" , ({ keyCode }) => {
    const msg = txtMsg.value;
    if( keyCode !== 13) return;
    if( msg.length <= 0) return;

    socket.emit("send-message", msg);

    txtMsg.value = "";
    
})

const main = async () => {
    await validarJWT();
}

main();
