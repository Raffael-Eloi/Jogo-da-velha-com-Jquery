var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][0] = 0;
matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;

matriz_jogo['b'][0] = 0;
matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;

matriz_jogo['c'][0] = 0;
matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;


$(document).ready(function(){
	$('#btn_iniciar_jogo').click(function(){

		// Validação se o campo dos apelidos foram preenchidos 

		if ($('#apelido_jogador1').val() == '') {
			alert('Preencha o apelido do jogador 1');
			return false;
		}

		if ($('#apelido_jogador2').val() == '') {
			alert('Preencha o apelido do jogador 2');
			return false;
		}

		// Exibir os apelidos 

		$('#nome_jogador1').html($('#apelido_jogador1').val());
		$('#nome_jogador2').html($('#apelido_jogador2').val());


		// Controla a visualização das divs
		$('#pagina-inicial').hide();
		$('#palco-jogo').show();


		$('.jogada').click(function(){
			var id_campo_clicado = this.id;
			$('#'+id_campo_clicado).off();
			jogada(id_campo_clicado);
		});

		function jogada(id) {
			var icone = '';
			var ponto = 0;

			if ((rodada%2) == 1) {
				icone = 'url("imagens/marcacao_1.png")';
				ponto = -1;
			}
			else {
				icone = 'url("imagens/marcacao_2.png")';
				ponto = 1;
			}

			rodada++;


			$('#'+id).css('background-image', icone);


			var linha_coluna = id.split('-');
			
			matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

			verifica_combinacao();

		}

		function verifica_combinacao() {

			//Verifica na horizontal
			var pontos = 0;
			for (var i=0; i<3; i++){
				pontos = pontos + matriz_jogo['a'][i];
			}

			ganhador(pontos);
			pontos = 0;

			for (var i=0; i<3; i++){
				pontos = pontos + matriz_jogo['b'][i];
			}

			ganhador(pontos);
			pontos = 0;

			pontos = 0;
			for (var i=0; i<3; i++){
				pontos = pontos + matriz_jogo['c'][i];
			}

			ganhador(pontos);
			pontos = 0;

			//Verifica na vertical

			for (var j=0; j<3; j++) {
				pontos = 0;
				pontos = pontos + matriz_jogo['a'][j];
				pontos = pontos + matriz_jogo['b'][j];
				pontos = pontos + matriz_jogo['c'][j];
				ganhador(pontos);
			}
			
			//Verifica na diagonal

			pontos = 0;
			pontos = matriz_jogo['a'][0] + matriz_jogo['b'][1] + matriz_jogo['c'][2];
			ganhador(pontos);

			pontos = 0;
			pontos = matriz_jogo['a'][2] + matriz_jogo['b'][1] + matriz_jogo['c'][0];
			ganhador(pontos); 
		}

		function ganhador(pontos) {

			var jogador1 = $('#apelido_jogador1').val();
			var jogador2 = $('#apelido_jogador2').val();

			if (pontos == -3) {
				alert(jogador1 + ' ganhou o jogo!');
				$('.jogada').off();
			}

			else if (pontos == 3) {
				alert(jogador2 + ' ganhou o jogo!');
				$('.jogada').off();
			}
		}

	});
});