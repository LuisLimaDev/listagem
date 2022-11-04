//pre.js


let root = document.documentElement;


corTema = "rgb(128 192 255)";
corTema2 = "rgb(54 72 100)";
corTema3 = "rgb(237 237 237)";
tela = {
	a: window.innerHeight || screen.availHeight,
	l: window.innerWidth || screen.availWidth,
	update:function(){
		this.a=window.innerHeight || screen.availHeight;
		this.l=window.innerWidth || screen.availWidth
		root.style.setProperty( "--alt", (this.a-70)+"px" );
	}
};

root.style.setProperty( "--alt", (tela.a-70)+"px" );
root.style.setProperty( "--corTema", corTema );
root.style.setProperty( "--corTema2", corTema2 );
root.style.setProperty( "--corTema3", corTema3 );

    diasDaSemana = [ "domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sabado"];
	
	function de0a9( numeroParaVer ){
		if ( numeroParaVer < 10 ){
			return "0"+numeroParaVer;
		} else {
			return numeroParaVer;
		}
	}
	
	function animFechar( elementoParaAbrir ){
		elementoParaAbrir.style.animation = "1s normal fecharJanela";
		setTimeout(function(){
			elementoParaAbrir.classList.add("escondido");
			elementoParaAbrir.style.display = "none";
		}, 1000);
	}

	function animAbrir( elementoParaFechar ){
		elementoParaFechar.style.animation = "1s normal abrirJanela";
		setTimeout(function(){
			elementoParaFechar.classList.remove("escondido");
			elementoParaFechar.style.display = "block";
		}, 1000);
	}
	
	function mostrarIcones(divSaidaIcones){
		/** emojis &#129293; - &#129535;**/
		/** emojis &#129648; - &#129685;**/
		/** emojis &#127744; - &#128762;**/
		/** emojis &#128992; - &#129003;**/
		numeradorIcone = 0;
		while( numeradorIcone <= 10000 ){
			saidaCode = novoElm("span");
			saidaGrfx = novoElm("span");
			saidaGrfx.innerHTML = "&#" + numeradorIcone + ";";
			linhaIcone = novoElm("p");
			saidaCode.innerText = "&#" + numeradorIcone + ";";
			linhaIcone.append( saidaCode, saidaGrfx );
			divSaidaIcones.append( linhaIcone );
			numeradorIcone++;
		}
	}
	
	function confirmacaoExcluirLista( idListaPraPerguntar ){
		getById("excluir").innerHTML = "";
		botoes = novoElm("section");
		tituloJanela = novoElm("div");
		tituloJanela.classList.add("tituloJanela");
		perguntaPraExluir = novoElm("h4");
		perguntaPraExluir.innerText = "Deseja realmente exluir a lista selecionada?";
		
		botaoSim = novoElm("button");
		botaoSim.setAttribute("class", "botao btFechar");
		botaoSim.innerHTML = "Sim, apagar lista!";
		botaoSim.addEventListener( "click", function(){
			excluirLista( idListaPraPerguntar );
			animFechar( getById("excluir") );
		});
		
		linkVazio = novoElm("a");
		botaoNao = novoElm("button");
		botaoNao.innerHTML = "Não, foi engano.";
		botaoNao.classList.add("botao");
		botaoNao.addEventListener( "click", function(){
			history.back(1);
			animFechar( getById("excluir") );
		});
		
		botoes.append( botaoSim, botaoNao )
		tituloJanela.append( linkVazio, perguntaPraExluir )
		getById("excluir").append( tituloJanela, botoes );
	}

	function excluirLista( idListaPraExluir ){
		idsListas = localStorage.getItem( "idDasListas" ).split(" ;; ");
		cntListasGuardadas = 0;
		listasString = " ;; ";
		while ( cntListasGuardadas < idsListas.length && idListaPraExluir.toString() != "" ){
			if( idsListas[cntListasGuardadas] != idListaPraExluir.toString() && idsListas[cntListasGuardadas] != " ;; " ){
				listasString = listasString + " ;; " + idsListas[cntListasGuardadas] ;
				cntListasGuardadas++;
			} else if ( idsListas[cntListasGuardadas] == "" ){
				cntListasGuardadas++;
			} else {
				cntListasGuardadas++;
			}
		}
		localStorage.removeItem( idListaPraExluir.toString() );
		localStorage.setItem( "idDasListas", listasString );
		carregarListasAdicionadas();
	}
	
	function alterarItem( idDoItem ){
		getById("descreverItem").value = itensDaListaAberta[idDoItem].split(" ++ ")[0];
		getById("qtdCompra").value = itensDaListaAberta[idDoItem].split(" ++ ")[1];
		getById("precoDoItem").value = itensDaListaAberta[idDoItem].split(" ++ ")[2];
		getById("descreverItem").name = idDoItem;
	}
	
	function removerItem( idDoItem ){
		getById("descreverItem").value = "";
		getById("qtdCompra").value = "0.001";
		getById("precoDoItem").value = "0.001";
		getById("descreverItem").name = idDoItem;
		editProdutoNaLista();
	}
	
	function editProdutoNaLista(){
		itemEditado = getById("descreverItem").name;
		idListaEditando = getById("guardarID").value;
		listaEditando = localStorage.getItem( idListaEditando.toString() );
		listaEditando = listaEditando.split(" inicioDaLista ")[1].split(" && ");
		
		cabecaDaLista = localStorage.getItem(idListaEditando).split(" inicioDaLista ")[0];
		
		listaEditando[ itemEditado ] = getById("descreverItem").value + " ++ " + getById("qtdCompra").value + " ++ " + getById("precoDoItem").value;
		itensDaLista = "";
		guardarNovamente = 0;
		while( guardarNovamente < listaEditando.length ){
			if( !(!( listaEditando[ guardarNovamente ].split(" ++ ")[0] )) ){
				itensDaLista = itensDaLista + listaEditando[guardarNovamente] + " && ";
			}
			guardarNovamente++;
		}
		rearmazenar = cabecaDaLista + " inicioDaLista " + itensDaLista;
		localStorage.setItem( idListaEditando, rearmazenar );
		abrirLista( idListaEditando );
		carregarListasAdicionadas();
		getById("descreverItem").value = "";
		getById("qtdCompra").value = "";
		getById("precoDoItem").value = "";
		carregarListasAdicionadas();
	}

	function abrirLista( idParaVisualizar ){
		getById("visualizarLista").innerHTML = "";
		getById("visualizarLista").setAttribute("class", "janela");
		getById("visualizarLista").style.animation = "1s normal abrirJanela";
		getById("guardarID").value = idParaVisualizar;
		//getById("visualizarLista").style.display = "block";
		listaAberta = localStorage.getItem( idParaVisualizar );
		tituloAberto = novoElm("h4");
		tituloAberto.innerText = listaAberta.split(" inicioDaLista ")[0];
		
		btExcluirLista = novoElm("a");
		btExcluirLista.innerHTML = icones.delItem; //Forma de "x" grande
		btExcluirLista.href = "#excluir";
		btExcluirLista.id =  idParaVisualizar;
		btExcluirLista.setAttribute("class", "Excluir btQuadrado");
		btExcluirLista.addEventListener("click", function(evntBtFechar){
			//evntBtFechar.preventDefault();
			confirmacaoExcluirLista( getById("visualizarLista") );
			animAbrir( getById("excluir") );
			animFechar( getById("visualizarLista") );
		})
		
		btFechar = novoElm("a");
		btFechar.href = "#Voltar";
		btFechar.innerHTML = icones.setas[1];
		btFechar.setAttribute("class", "btQuadrado");
		btFechar.addEventListener("click", function(evntBtFechar){
			animFechar( getById("visualizarLista") );
			evntBtFechar.preventDefault();
		});
		
		btNovoItem = novoElm("a");
		btNovoItem.innerHTML = "&#10010";
		btNovoItem.href = "#addLista";
		btNovoItem.setAttribute("class", "adicionarItem btQuadrado");
		btNovoItem.addEventListener("click", function(evntBtFechar){
			//evntBtFechar.preventDefault();
			animFechar( getById("visualizarLista") );
			getById("visualizarLista").classList.add("escondido");
			getById("addLista").classList.remove("escondido");
			getById("addLista").style.display = "block";
			animAbrir( getById("addLista") );
			getById("addProdutoNaLista").style.display = "block";
			getById("editProdutoNaLista").style.display = "none";
		});

// nomeDoElemento
// atributoID
// atributoName
// atributoValue
// atributoType
// atributoClass
// atributoHREF
// atributoSRC
// atributoTarget
// atributoOnClick
// atributoStyle
// conteudoInterno

		divTituloJanela = novoElm("div");
		divTituloJanelaSecao = novoElm("section");
		divTituloJanelaSecao2 = criar({ nomeDoElemento:"table", conteudoInterno:"<thead style='background: "+ corTema +"; text-align: center;'><tr><td>Descrição</td><td>Unidade</td><td>Preço</td><td>Subtotal</td></tr></thead>" });
		divTituloJanelaSecao3 = criar({ nomeDoElemento:"table", conteudoInterno:"<thead style='background: var( --corTema )'><tr><td>Descrição</td><td>Unidade</td><td>Preço</td><td>Subtotal</td><td>Alterar</td><td>Excluir</td></tr></thead>" });
		tbodyShow = criar({
			nomeDoElemento: "tbody"
		});
		rolarTabela = criar({
			nomeDoElemento: "div",
			atributoClass: "rolarTabela"
		});
		divTituloJanela.setAttribute("class", "tituloJanela");
		divTituloJanela.append( btFechar, tituloAberto, btNovoItem, btExcluirLista );
		getById("visualizarLista").append( divTituloJanela );
		
		legendVerLista = novoElm("p");
		descricaoDosProdutos = novoElm("span");
		descricaoDosProdutos.innerText = "Descrição";
		
		unidadesParaCompra = novoElm("span");
		unidadesParaCompra.innerText = "Unidade";
		
		valorEstimadoDoItem = novoElm("span");
		valorEstimadoDoItem.innerText = "Preço";
		
		valorSubtotal = novoElm("span");
		valorSubtotal.innerText = "SubTotal";
		
		legEditar = novoElm("span");
		legEditar.innerText = "Alterar";
		
		legApagar = novoElm("span");
		legApagar.innerText = "Apagar";
		
		legendTabLista = novoElm("p");
		// legendVerLista.append( descricaoDosProdutos, unidadesParaCompra, valorEstimadoDoItem, valorSubtotal, legEditar, legApagar );
		// legendVerLista.style = "text-align: center;  background-color: var( --corTema ) ";
		// divTituloJanelaSecao.append( legendVerLista );
		
		itensDaListaAberta = listaAberta.split(" inicioDaLista ")[1].split(" ;; ")[0].split(" && ");
		cntItensDaListaAberta = 0;
		valorListaAberta = 0;
		while( cntItensDaListaAberta < itensDaListaAberta.length ){
			if( itensDaListaAberta[cntItensDaListaAberta] != "" ){
				// linhaDoItem = novoElm("p");

				// linhaDoItem = novoElm("p");
				verDescricao = criar({ nomeDoElemento:"span", conteudoInterno: itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[0]});
				verUnidades = criar({ nomeDoElemento:"span", atributoClass: "min100", atributoStyle:" ", conteudoInterno: itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[1]});
				verPreco = criar({ nomeDoElemento:"span", atributoClass: "min100", conteudoInterno: itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[2]});
				subtotal = (verPreco.innerText * verUnidades.innerText);
				verSubtotal = criar({ nomeDoElemento:"span", atributoClass: "min100", conteudoInterno: subtotal.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) });
				
				// verDescricao.innerText = ;
				// verUnidades.innerText = ;
				// verPreco.innerText = ;
				
				quantidadeDoItem = ( parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[1].replace(",", ".") ) ? parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[1].replace(",", ".") ) : 0 );
				valorUnidadeItem = ( parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[2].replace(",",".") ) ? parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[2].replace(",",".") ) : 0 );
				
				valorListaAberta = valorListaAberta + ( quantidadeDoItem * valorUnidadeItem );
				
				btEditarItem = novoElm("a");
				btEditarItem.href = "#addLista";
				btEditarItem.innerHTML = icones.edita;
				btEditarItem.id = cntItensDaListaAberta;
				btEditarItem.setAttribute("class", "btQuadrado");
				btEditarItem.setAttribute( "onclick", "btAltItem( this.id )" );
				
				btRemoverItem = novoElm("a");
				btRemoverItem.href = "#visualizarLista";
				btRemoverItem.innerHTML = icones.delItem;
				btRemoverItem.id = cntItensDaListaAberta;
				btRemoverItem.setAttribute("class", "btQuadrado");
				btRemoverItem.setAttribute( "onclick", 'exclItem( this.id )' );
				
				// linhaDoItem.append( verDescricao, verUnidades, verPreco, verSubtotal, btEditarItem, btRemoverItem );
				
				// divTituloJanelaSecao.append( linhaDoItem );
				lOdd = "";
				if( cntItensDaListaAberta%2 == 0 ){
					lOdd = " linhaOdd"
				}
				divTituloJanelaSecao2.append( criar({ nomeDoElemento:"tr", atributoClass: lOdd, conteudoInterno:"<td>"+verDescricao.innerText+"</td><td class='number'>"+verUnidades.innerText.replace(".",",") +"</td><td class='number'>R$ "+verPreco.innerText.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}).replace(".",",")+"</td><td class='number'>"+ subtotal.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) +"</td>" }) );
				tbodyShow.append( criar({ nomeDoElemento:"tr", conteudoInterno:"<td>"+verDescricao.innerText+"</td><td class='number'>"+verUnidades.innerText.replace(".",",") +"</td><td class='number'>R$ "+verPreco.innerText.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}).replace(".",",")+"</td><td class='number'>"+ subtotal.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) +"</td><td>"+btEditarItem.outerHTML+"</td><td>"+ btRemoverItem.outerHTML +"</td>" }) );
			}
			cntItensDaListaAberta++;
		}
		// getById("visualizarLista").append( divTituloJanelaSecao );
		divTituloJanelaSecao3.append( tbodyShow );
		rolarTabela.append( divTituloJanelaSecao3 );
		getById("visualizarLista").append( rolarTabela );
		// valorEstimadoDaLista = novoElm("p");
		// valorEstimadoDaLista.innerHTML = "<span>Preço estimado da compra: " + valorListaAberta.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) + ".</span>"
		// getById("visualizarLista").append( valorEstimadoDaLista );

		divTituloJanelaSecao2.append( criar({ nomeDoElemento:"tr", conteudoInterno:"<td colspan='3'>Total estimado da compra</td><td>"+ valorListaAberta.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) +"</td>" }) );

		rolarTabela.append( criar({
			nomeDoElemento: "div",
			atributoClass: "exportarListas",
			atributoID: "extrasDaLista",
			conteudoInterno: "<span>Preço estimado da compra: " + valorListaAberta.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) + ".</span>" + criar({
				nomeDoElemento:"a",
				atributoHREF:`javascript:downloadLista("`+tituloAberto.innerText+`",divTituloJanelaSecao2.outerHTML)`,
				conteudoInterno: icones.download + " Exportar em formato Planilha *.HTM"
			}).outerHTML + criar({
				nomeDoElemento: "a",
				atributoHREF: `javascript:download("lista.ldc", listaAberta )`,
				conteudoInterno: icones.download + " Exportar em formato do APP *.LDC"
			}).outerHTML 
		}) );

	}

	exclItem=( idDoBotao )=>{
		removerItem( idDoBotao );
	}

	btAltItem=( idDoBotao )=>{
		alterarItem( idDoBotao );
		animAbrir( getById("addLista") );
		animFechar( getById("visualizarLista") );
		getById("addProdutoNaLista").style.display = "none";
		getById("editProdutoNaLista").style.display = "block";
	}

	downloadLista=( nomeDoArquivo, conteudo )=>{
		cabecalho = `<html xmlns:o="urn:schemas-microsoft-com:office:office"xmlns:x="urn:schemas-microsoft-com:office:excel"xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><meta name=ProgId content=Excel.Sheet><meta name=Generator content="Microsoft Excel 12"><title>`+ nomeDoArquivo +`</title><style>table{border-spacing: 0; border-collapse: collapse; width: 100%} td{ padding: 10px; border: 1px solid #000; } .number{text-align: right} .linhaOdd{ background: `+ corTema3 +`}</style></head>`;
		conteudo = cabecalho + "<body>" + conteudo + "</body></html>";
		download( nomeDoArquivo + ".htm", conteudo );
	}

	function carregarListasAdicionadas(){
		if (!(!(localStorage.getItem("idDasListas"))) == false){
			getById("listaEmCriacao").innerHTML = "<h2>Nenhuma lista criada<hr></h2>";
		} else {
			getById("listaEmCriacao").innerHTML = "<h2>Listas armazenadas<hr></h2>";
			listasGuardadas = localStorage.getItem("idDasListas");
			listasSeparadas = listasGuardadas.split(" ;; ");
			cntListas = 0;
			
			while ( cntListas < listasSeparadas.length ){
				if (listasSeparadas[cntListas] != "" && listasSeparadas[cntListas] != "undefined" && listasSeparadas[cntListas] != undefined ){
					
					listaGuardada = criar({
						nomeDoElemento:"div",
						atributoID: listasSeparadas[cntListas],
						atributoClass: "rounded"
					});
					// listaGuardada.id = listasSeparadas[cntListas];
					
					itensNaLista = localStorage.getItem( listasSeparadas[cntListas] );
					tituloNaLista = itensNaLista.split(" inicioDaLista ")[0];
					h2Titulo = novoElm("h4");

					visualizarLista = novoElm("a");
					visualizarLista.innerText = tituloNaLista;
					visualizarLista.id = listasSeparadas[cntListas];
					visualizarLista.href = "#visualizarLista";
					visualizarLista.addEventListener("click", function(){
						animAbrir( getById("visualizarLista") );
						abrirLista( this.id );
					});

					h2Titulo.append( visualizarLista );
					
					tituloJanela = novoElm("div");
					tituloJanela.setAttribute("class", "tituloJanela");
					
					btExcluirLista = novoElm("a");
					btExcluirLista.href = "#excluir";
					btExcluirLista.id =  listasSeparadas[cntListas];
					btExcluirLista.innerHTML = icones.delItem;
					btExcluirLista.setAttribute("class", "btQuadrado");
					btExcluirLista.addEventListener("click", function(){
						confirmacaoExcluirLista( this.id );
						animAbrir( getById("excluir") );
					});

					btEditarLista = novoElm("a");
					btEditarLista.href = "#editarLista?idLista=" + listasSeparadas[cntListas];
					btEditarLista.setAttribute("class", "btQuadrado");
					btEditarLista.innerHTML = "&#9998;";

					tituloJanela.append( btExcluirLista, h2Titulo )//, btExcluirLista );
					
					listaGuardada.append( tituloJanela );

					secaoItems = criar({
						nomeDoElemento: "table",
						conteudoInterno: "<thead><tr><td>Descrição</td><td>Unid.</td><td>Preço</td></tr></thead>"
					});

					conteudoNaLista = itensNaLista.split(" inicioDaLista ")[1].split(" && ");
					cntItens = 0;
					
					calcularCompra = 0;
					valorEstimadoDaCompra = novoElm("section");
					
					while (cntItens < conteudoNaLista.length ){
						if( conteudoNaLista[cntItens] != "" ){
							itemDaLista = novoElm("tr");
							descricaoAdicionada = novoElm("td");
							descricaoAdicionada.innerText = conteudoNaLista[cntItens].split(" ++ ")[0];
							
							unidadesDoItem = novoElm("td");
							unidadesDoItem.innerText = conteudoNaLista[cntItens].split(" ++ ")[1];
							
							valorGuardado = novoElm("td");
							valorGuardado.innerText = conteudoNaLista[cntItens].split(" ++ ")[2].toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});
							itemDaLista.append( descricaoAdicionada, unidadesDoItem, valorGuardado );
							
							
							quantidadePorItem = ( parseFloat( conteudoNaLista[cntItens].split(" ++ ")[1].replace(",", ".") ) ? parseFloat( conteudoNaLista[cntItens].split(" ++ ")[1].replace(",", ".") ) : 0 );
							valorUnidadeoItem = ( parseFloat( conteudoNaLista[cntItens].split(" ++ ")[2].replace(",",".") ) ? parseFloat( conteudoNaLista[cntItens].split(" ++ ")[2].replace(",",".") ) : 0 );
							
							calcularCompra = calcularCompra + ( quantidadePorItem * valorUnidadeoItem );
					
							//calcularCompra = calcularCompra + ( parseFloat( conteudoNaLista[cntItens].split(" ++ ")[2].replace(",",".") ) * parseFloat( conteudoNaLista[cntItens].split(" ++ ")[1].replace(",",".") ) );
							if( isNaN( calcularCompra ) == true ){
								valorEstimadoDaCompra.innerHTML = "Valor não estimado."
							} else{
								valorEstimadoDaCompra.innerHTML = "<span>Valor estimado da compra em: " + calcularCompra.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) + ".</span>";
							}

							secaoItems.append( itemDaLista );
							
						}
						cntItens++;
					}
					// secaoItems.append( criar({nomeDoElemento: "section", conteudoInterno: valorEstimadoDaCompra.outerHTML }) );
					linkAbre = criar({
						nomeDoElemento: "a",
						atributoID: listasSeparadas[cntListas],
						atributoStyle: "padding: 15px; display: block",
						atributoHREF: "#visualizarLista",
						atributoOnClick: 'animAbrir( getById("visualizarLista") ); abrirLista( this.id );',
						conteudoInterno: "<section class='previaLista'>" + secaoItems.outerHTML + valorEstimadoDaCompra.outerHTML + "</section>"
					});
					// secaoItems.append( valorEstimadoDaCompra );
					listaGuardada.append( linkAbre );
					getById("listaEmCriacao").append(listaGuardada);
				}
					cntListas++;
			}
		}
	}
	
	function trabalharCampoDeTexto(){
		descricaoDoItem = getById("descreverItem");
		qtdCompra = getById("qtdCompra");
		precoDoItem = getById("precoDoItem");
		guardarID = getById("guardarID");
		if ( descricaoDoItem.value === "" ){
			console.log("Nada adicionado!")
		} else {
			//alert( descreverItem.value );
			//getById("listaEmCriacao");
			itemAdicionado = novoElm("p");
			quatidadeDeCompra = novoElm("span");
			valorDoItem = novoElm("span");
			botaoMais = novoElm("button");
			nomeAdicionado = novoElm("span");
			nomeAdicionado.innerText = descricaoDoItem.value;
			quatidadeDeCompra.innerText = qtdCompra.value + 0.001;
			valorDoItem.innerText = precoDoItem.value + 0.001;
			
			idLista = getById("guardarID").value;
			
			itensAdicionados = localStorage.getItem( idLista ) + " && " + descricaoDoItem.value + " ++ " + qtdCompra.value + " ++ " + precoDoItem.value;
			localStorage.setItem( idLista, itensAdicionados);
			
			itemAdicionado.append(nomeAdicionado, quatidadeDeCompra, valorDoItem);
			//listaAtual = getById("guardarID").action;
			getById(idLista).append( itemAdicionado );
			getById("descreverItem").value = "";
			getById("qtdCompra").value = "";
			getById("precoDoItem").value = "";
			getById("descreverItem").focus();
			
			//addItemParaLista = "produto: " + nomeAdicionado " ;; ";
		}
		carregarListasAdicionadas();
	}
	
	function criarIdParaLista(){
		pegarHora = new Date();
		idLista = pegarHora.getFullYear().toString() + de0a9((pegarHora.getMonth()+1)).toString() + de0a9(pegarHora.getDate()).toString() + de0a9(pegarHora.getHours()).toString() + de0a9(pegarHora.getMinutes()).toString() + de0a9(pegarHora.getSeconds()).toString();
		listaNova = novoElm("div");
		listaNova.id = idLista;
		getById("guardarID").value = idLista;
		getById("addProdutoNaLista").style.display = "block";
		getById("editProdutoNaLista").style.display = "none";
		getById("fecharEditor").href = "#visualizarLista";
		getById("fecharEditor").addEventListener("click", function(){
			//alert( this.href.split("=")[1] );
			abrirLista( getById("guardarID").value );
		});
		btExcluirLista = novoElm("a");
		btExcluirLista.setAttribute("class", "btQuadrado");
		btExcluirLista.href = "#excluir?idLista=" + idLista;
		btExcluirLista.innerHTML = icones.delItem;
		
		btEditarLista = novoElm("a");
		btEditarLista.setAttribute("class", "btQuadrado");
		btEditarLista.href = "#editarLista?idLista=" + idLista;
		btEditarLista.innerText = "Editar";
		
		identificacaoVisual = novoElm("h4");
		visualizarLista = novoElm("a");
		visualizarLista.href = "#visualizarLista";
		visualizarLista.id = idLista;
		visualizarLista.addEventListener("click", function(){
			//alert( this.href.split("=")[1] );
			abrirLista( this.id );
		});
		idVisualDaLista = "Criado  " + diasDaSemana[ pegarHora.getDay() ] + ", às " + de0a9(pegarHora.getHours()).toString() + ":" + de0a9(pegarHora.getMinutes()).toString() + ", dia " + de0a9(pegarHora.getDay()).toString() + "/" + de0a9((pegarHora.getMonth()+1)).toString() + "/" + pegarHora.getFullYear().toString();
		visualizarLista.innerText = idVisualDaLista;
		identificacaoVisual.append( visualizarLista );
		
		guardarDados = idVisualDaLista + " inicioDaLista ";
		localStorage.setItem( idLista, guardarDados );

		if (!(!(localStorage.getItem("idDasListas"))) == false){
			localStorage.setItem( "idDasListas", idLista );
		} else {
			idDasListas = localStorage.getItem("idDasListas") + " ;; " + idLista ;
			localStorage.setItem( "idDasListas", idDasListas );
		}
		
		
		tituloJanela = novoElm("div");
		tituloJanela.setAttribute("class", "tituloJanela");
		tituloJanela.append( btExcluirLista, identificacaoVisual )//, btEditarLista );
		
		listaNova.append(tituloJanela);
		
		descricaoDosProdutos = novoElm("span");
		descricaoDosProdutos.innerText = "Descrição";
		
		unidadesParaCompra = novoElm("span");
		unidadesParaCompra.innerText = "Un";
		
		valorEstimadoDoItem = novoElm("span");
		valorEstimadoDoItem.innerText = "$";
		
		legendTabLista = novoElm("p");
		legendTabLista.append( descricaoDosProdutos, unidadesParaCompra, valorEstimadoDoItem );
		legendTabLista.style = "text-align: center;  background-color: var( --corTema )";
		listaNova.append( legendTabLista );
		
		getById("listaEmCriacao").append(listaNova);
		carregarListasAdicionadas();
	}

carregarImportado=()=>{
	lista = getById("importarLista").files[0];
	leitor = new FileReader();
	leitor.addEventListener("load", lista);
	leitor.readAsText( lista );
	getById("lImport").style.backgroundSize = "100% 100px;";
	// getById("lImport").style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10"><rect id="" x="0" y="0"  width="100" height="100" style="fill: ` + corTema + `"></rect></svg>')`;

	setTimeout(function(){
		getById("previaImportado").innerText = leitor.result;
		getById("previaImportado").style.maxHeight = (tela.a - getById("previaImportado").offsetTop )+"px";

		setTimeout(function(){

			listaAberta = getById("previaImportado").innerText.toString();

			divTituloJanelaSecao3 = criar({ nomeDoElemento:"table", conteudoInterno:"<thead style='background: var( --corTema )'><tr><td>Descrição</td><td>Unidade</td><td>Preço</td><td>Subtotal</td></tr></thead>" });
			tbodyShow = criar({
				nomeDoElemento: "tbody"
			});


			infoLista = listaAberta.split(" inicioDaLista ")[0].split(" && ");
			itensDaListaAberta = listaAberta.split(" inicioDaLista ")[1].split(" && ");
			cntItensDaListaAberta = 0;
			valorListaAberta = 0;
			itensReorg = "";
			while( cntItensDaListaAberta < itensDaListaAberta.length ){
				if( itensDaListaAberta[cntItensDaListaAberta] != "" ){

					verDescricao = itensDaListaAberta[cntItensDaListaAberta].split("++")[0];
					verUnidades = itensDaListaAberta[cntItensDaListaAberta].split(" ++")[1];
					verPreco = itensDaListaAberta[cntItensDaListaAberta].split("++")[2];
					if( cntItensDaListaAberta == (itensDaListaAberta.length-1) ){
						verPreco = verPreco.slice(0, (verPreco.length - 2));
					}
					subtotal = (verPreco * verUnidades);
					verSubtotal = criar({ nomeDoElemento:"span", atributoClass: "min100", conteudoInterno: subtotal.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) });

					quantidadeDoItem = ( parseFloat( itensDaListaAberta[cntItensDaListaAberta].split("++")[1] ) ? parseFloat( itensDaListaAberta[cntItensDaListaAberta].split("++")[1] ) : 0 );
					valorUnidadeItem = ( parseFloat( itensDaListaAberta[cntItensDaListaAberta].split("++")[2] ) ? parseFloat( itensDaListaAberta[cntItensDaListaAberta].split("++")[2] ) : 0 );
					
					valorListaAberta = valorListaAberta + ( quantidadeDoItem * valorUnidadeItem );

					lOdd = "";
					if( cntItensDaListaAberta%2 == 0 ){
						lOdd = " linhaOdd"
					}tbodyShow.append( criar({ nomeDoElemento:"tr", conteudoInterno:"<td>"+verDescricao+"</td><td class='number'>"+verUnidades.replace(".",",") +"</td><td class='number'>R$ "+verPreco+"</td><td class='number'>"+ subtotal.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) +"</td>" }) );
				}
				itensReorg = verDescricao + " ++ " + verUnidades + " ++ " + verPreco + " && " + itensReorg;
				cntItensDaListaAberta++;
			}
			divTituloJanelaSecao3.append( tbodyShow );
			divTituloJanelaSecao3.append( criar({
				nomeDoElemento: "div",
				atributoClass: "optsImport",
				conteudoInterno: "<a class='botao' href='javascript:salvarImportado()'>Confirmar</a><button onclick='cancelarImport()'>Cancela</button>"
			}) );
			getById("previaImportado").innerHTML = "";
			getById("previaImportado").append( divTituloJanelaSecao3 );


		},50);
		leitor = [];
	}, 100);
}

cancelarImport=()=>{
	getById("previaImportado").innerHTML = "";
}

salvarImportado=()=>{
	pegarHora = new Date();
	idLista = pegarHora.getFullYear().toString() + de0a9((pegarHora.getMonth()+1)).toString() + de0a9(pegarHora.getDate()).toString() + de0a9(pegarHora.getHours()).toString() + de0a9(pegarHora.getMinutes()).toString() + de0a9(pegarHora.getSeconds()).toString();
	idVisualDaLista = "Importado " + diasDaSemana[ pegarHora.getDay() ] + ", às " + de0a9(pegarHora.getHours()).toString() + ":" + de0a9(pegarHora.getMinutes()).toString() + ", dia " + de0a9(pegarHora.getDay()).toString() + "/" + de0a9((pegarHora.getMonth()+1)).toString() + "/" + pegarHora.getFullYear().toString();

	chamarImportada( idLista );
	localStorage.setItem(idLista, idVisualDaLista + ", e " + infoLista + " inicioDaLista " + itensReorg );
	if( !(!(localStorage.getItem("idDasListas"))) == false ){
		localStorage.setItem("idDasListas", idLista)
	} else {
		localStorage.idDasListas = idLista + " ;; " + localStorage.idDasListas;
	}
	carregarListasAdicionadas();
}

chamarImportada=( idImportada )=>{
	getById("importarLista").value = "";
	getById("previaImportado").innerHTML = "";
	verImportado = criar({
		nomeDoElemento: "a",
		atributoHREF: "#visualizarLista",
		conteudoInterno: "Ver Lista importada"
	});
	verImportado.addEventListener("click", function(){ animAbrir( getById("visualizarLista") ); abrirLista( idImportada ); getById("previaImportado").innerHTML = ""});
	getById("previaImportado").append( verImportado );
	
}
