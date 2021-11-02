const obj1 = {
    name: "caballo",
    correr: function () {
        console.log(this)
        console.log(this.name)
    }
}
const geral = {
    name: "goku",

    obj2 : {
        name: "osito",
        correr: () => {
            //this.name = "goku"
            console.log(this.name)
        }
    }
}
let name = "gokus"
function caballo() {
    console.log(this)
    console.log(this.name)
}
//caballo();

//obj1.correr();
geral.obj2.name = "Roberto";
geral.obj2.correr();
