 const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

//ao clicar em buscar ele retira o hide para que a tela de busca apareça
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

//ao clicar no X ele coloca o hide no modal para que a janela de busca fique culta novamente
close.addEventListener("click", () => {
    modal.classList.add("hide")
})