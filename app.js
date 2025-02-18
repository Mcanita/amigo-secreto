let amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    
    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }
    
    if (amigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        return;
    }
    
    amigos.push(nombre);
    actualizarLista();
    input.value = "";
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.onclick = () => eliminarAmigo(index);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos 2 participantes para el sorteo.");
        return;
    }
    
    let sorteados = [...amigos];
    let resultado = {};
    
    for (let i = 0; i < amigos.length; i++) {
        let posibles = sorteados.filter(nombre => nombre !== amigos[i]);
        
        if (posibles.length === 0) {
            alert("Error en el sorteo. Inténtalo de nuevo.");
            return;
        }
        
        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        resultado[amigos[i]] = elegido;
        sorteados = sorteados.filter(nombre => nombre !== elegido);
    }
    
    mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "";
    
    for (const [amigo, asignado] of Object.entries(resultado)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${asignado}`;
        listaResultado.appendChild(li);
    }
}
