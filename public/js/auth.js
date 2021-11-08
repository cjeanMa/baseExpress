const form = document.querySelector("form");


var url = ( window.location.hostname.includes("localhost"))
? `http://localhost:8081/api/auth`
: `https://rest-node-jwt.herokuapp.com/api/auth`;

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let formData = {};
    for( let el of form.elements){
        if(el.name.length > 0)
            formData[el.name] = el.value
    }
    
    fetch(url + "/login",{
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(({token}) => {
        localStorage.setItem("token", token)
        window.location = "chat.html"
    })
    .catch(err=>{
        console.log(err);
    })
})


function handleCredentialResponse(response) {

    const body = {"token_google": response.credential}
    //let url = `http://localhost:8081/api/auth/google`;
    //let url = `https://rest-node-jwt.herokuapp.com/api/auth/google`;


    fetch(url + "/google",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(body)
    })
    .then( res => res.json())
    .then(({token}) => {
        localStorage.setItem("token", token)
        window.location = "chat.html"
    })
    .catch(err=> console.warn(err))
}

const btnClose = document.getElementById("cSessionGoogle");
btnClose.onclick = () =>{
    google.accounts.id.disableAutoSelect()
    google.accounts.id.revoke( localStorage.getItem( 'email' ), done =>{
        localStorage.clear();
        location.reload();
    })
}