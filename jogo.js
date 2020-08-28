/*verificação da altura do jogo em cada dispostivo atraves do console,
 para que não ocorra do mosquito aparecer fora da area do jogo e não aparecer a barra de rolagem horizontal.*/

 /*Necessario inicializar as variaveis pois se não dá erro dizendo que a variavel não existe por estar em um escopo de uma função 
 e não globalmente.*/

var largura = 0
var altura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

//o href retorna a url por completo, e o search retorna o que está a direita do ponto de ? da URL, E INCLUSIVE O PONTO DE INTERROGAÇÃO7
//PARA REMOVER O ? DA STRING BASTA USAR O REPLACE, COLOCAR O CARACTERE QUE DESEJA LOCALIZAR E DEPOIS O CARACTER QUE VC DESEJA SUBSTITUIR

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel == 'normal'){
	criaMosquitoTempo = 1500
}

else if (nivel == 'dificil') {
	criaMosquitoTempo = 1000
}

else if (nivel == 'chucknorris'){
	criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo() {
	 altura = window.innerHeight
	 largura = window.innerWidth
	console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

//Tudo que está entre as tags é innerHTML no caso o cronometro ta entre spam
//pra inserir algo dentro entre as tags (span) usa-se o innerHTML QUE NO CASO É A VARIAVEL TEMPO

var cronometro = setInterval(function() {
	tempo -= 1

	//se o tempo acabar antes de todos os pontos de vida esvaziarem, ele venceu
	//se der ok no alert a mensagem continua aparecendo a cada 1000 milisegundos ou seja 1s
	//entao para resolver isso cria-se o clearinterval, que elimina o cronometro da memoria.
	//faz-se a mesma coisa com o interval do cria mosquito do app.html. Porque se não
	//continua aparecendo mosquito depois que aperta ok na mensagem de vitoria
	if(tempo < 0){
		clearInterval(cronometro)
		clearInterval(CriaMosquito)
		window.location.href= 'vitoria.html'
	}
	else{
		document.getElementById('cronometro').innerHTML = tempo
	}
}, 1000)

function posicaoRandomica() {

	//remover o mosquito anterior (porque sem o if aparece um monte de mosquito a cada 1s)
	// (caso exista, pq na primeira chamada da função ele não existe)
	if (document.getElementById('mosquito')){
		document.getElementById('mosquito').remove()

		//quando o usuario n clicar em NENHUM mosquito pela terceira vez,  o jogo será interrompido que será o game over
		if(vidas > 3) {
			window.location.href = "fim_de_jogo.html"
		}


		//caso a remoção seja automático e o usuario n clique no mosquito a tempo, vai perdendo pontos de vida
		//a variavel vidas foi criada valendo um porque concatenando v com a variavel vidas fica v1 e depois v2 e depois v3, ou seja os corações vão ficando vazios toda vez q
		//entra no fluxo
		else {
			document.getElementById('v' + vidas).src= "imagens/coracao_vazio.png"
		
			vidas++
		}
	}

	/*Duas variaveis posição X e Y recebem numeros aleatorios entre 0 e a largura e a altura , o math floor arrendonda para baixo
	e o - 90 é porque ás vezes a imagem pode ficar numa posição randomica cortada ao meio o - 90 garante que ela fique na pagina direitinho*/
	/*Operador ternário caso a posição seja -0 a imagem some, portanto, se for menor que 0 a posição x e y recebem 0*/
	/*na criação do elemento html, foi criada a tag <img> de forma programatica aonde a variavel mosquito recebe o DOM do createElement
	E apartir daí a variavel mosquito vira uma variavel do DOM e serve para modificar elementos style, className, etc..*/
	/*O document.body.appendChild(faz com o que o body recebe as configurações de mosquito e mostre na tela)*/

	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura)  - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY


	console.log(posicaoX, posicaoY)

	//criar elemento html

	var mosquito = document.createElement('img')
	mosquito.src = "imagens/mosquito.png"
	//foi concatenado o espaço porque senão daria a ideia de soma, e não é isso, quero juntar as informações e não somá-las
	mosquito.className = TamanhoAleatorio() + ' ' + ladoAleatorio()
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'

	//funçao de que captura o clique sobre o elemento html(mosquito), capaz de fazer com que o mosquito seja removido
	//o this seleciona o atual atributo ou método
	mosquito.onclick = function(){
		this.remove()
	}

	document.body.appendChild(mosquito)
}

//aparecerá número entre 0 e 3
//como foi arrendodado, caso o tamanho for 0 aparecerá a classe mosquito 1 com o seu tamanho, se não será o da classe 2 etc...
//O BREAK NÃO É NECESSÁRIO PORQUE TODOS OS CASOS TERÃO RETORNO
function TamanhoAleatorio(){
	var classe = Math.floor(Math.random() * 3)

	switch(classe){

		case 0:
			return 'mosquito1'
		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}
}

//como so pdoe ter duas possibilidade 0 e 1, então tem que multiplicar por 2 porque o arrendondamento é pra baixo de 2
function ladoAleatorio(){
	var classe = Math.floor(Math.random() * 2)

	switch(classe){

		case 0:
			return 'ladoA'
		case 1:
			return 'ladoB'
	}
}