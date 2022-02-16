"use strict";
let livros = [];

function lerDados(url){
    fetch(url)
        .then((resp) => resp.json())
        .then((json) => livros = json.registros)
        .catch((error) => console.log(error))
}

lerDados("dados/biblioteca.json");

$("#btn1").click(function(){
    let str_pesq = document.getElementById("pesq").value;
    let tipo = document.getElementById("tipo").value;
    pesquisar(str_pesq, tipo);
});

function pesquisar(str,tipo){
    $("#resultado").html("");
    for(let livro of livros){
        switch(tipo){
            case "1": //titulo
                    if(livro.titulo.toLowerCase().indexOf(str.toLowerCase()) >= 0){
                        montaLivro(livro);
                    }
                    break;
            case "2":
                    if(livro.classificacao.toLowerCase() == str.toLowerCase()){
                        montaLivro(livro);
                    }
                    break;        
        }
    }
}

function montaLivro(livro){
    let autores = "";
    for(let autor of livro.autores){
        autores += autor.nome +"<br>";
    }
    $("#resultado").append(`<article>
                              <div>
                                    <img src="${livro.capa}">
                                    <strong>Titulo:</strong> ${livro.titulo}<br>
                                    <strong>Autor(es)</strong> ${autores}<br>
                                    <strong>Edição:</strong>${livro.edicao}<br>
                                </div>
                                <strong>Assunto:</strong>${livro.assunto}
                            </article>`);
}