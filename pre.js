//pre.js

	var corTema = "rgb(128,192,255)";
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
		numeradorIcone = 0;
		while( numeradorIcone < 13311 ){
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
		perguntaPraExluir = novoElm("h2");
		perguntaPraExluir.innerText = "Deseja realmente exluir a lista selecionada?";
		
		botaoSim = novoElm("button");
		botaoSim.setAttribute("class", "botao btFechar");
		botaoSim.innerHTML = "Sim, apagar lista!";
		botaoSim.addEventListener( "click", function(){
			excluirLista( idListaPraPerguntar );
			animFechar( getById("excluir") );
		});
		
		nada = novoElm("a");
		botaoNao = novoElm("button");
		botaoNao.innerHTML = "Não, foi engano.";
		botaoNao.classList.add("botao");
		botaoNao.addEventListener( "click", function(){
			history.back(1);
			animFechar( getById("excluir") );
		});
		
		botoes.append( botaoSim, botaoNao )
		tituloJanela.append( nada, perguntaPraExluir )
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
		getById("qtdCompra").value = "";
		getById("precoDoItem").value = "";
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
		tituloAberto = novoElm("h2");
		tituloAberto.innerText = listaAberta.split(" inicioDaLista ")[0];
		
		btExcluirLista = novoElm("a");
		btExcluirLista.innerHTML = "&#10007;";
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
		btFechar.innerHTML = "&#10216;";
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
		divTituloJanelaSecao2 = criar({ nomeDoElemento:"table", conteudoInterno:"<tr><td>Descrição</td><td>Unidade</td><td>Preço</td><td>Subtotal</td>" });
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
		
		legEditar = novoElm("span");
		legEditar.innerText = "Alterar";
		
		legApagar = novoElm("span");
		legApagar.innerText = "Apagar";
		
		legendTabLista = novoElm("p");
		legendVerLista.append( descricaoDosProdutos, unidadesParaCompra, valorEstimadoDoItem, legEditar, legApagar );
		legendVerLista.style = "text-align: center;  background-color: " + corTema ;
		divTituloJanelaSecao.append( legendVerLista );
		
		itensDaListaAberta = listaAberta.split(" inicioDaLista ")[1].split(" ;; ")[0].split(" && ");
		cntItensDaListaAberta = 0;
		valorListaAberta = 0;
		while( cntItensDaListaAberta < itensDaListaAberta.length ){
			if( itensDaListaAberta[cntItensDaListaAberta] != "" ){
				linhaDoItem = novoElm("p");

				linhaDoItem = novoElm("p");
				verDescricao = novoElm("span");
				verUnidades = novoElm("span");
				verPreco = novoElm("span");
				
				verDescricao.innerText = itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[0];
				verUnidades.innerText = itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[1];
				verPreco.innerText = itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[2];
				
				quantidadeDoItem = ( parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[1].replace(",", ".") ) ? parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[1].replace(",", ".") ) : 0 );
				valorUnidadeItem = ( parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[2].replace(",",".") ) ? parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[2].replace(",",".") ) : 0 );
				
				valorListaAberta = valorListaAberta + ( quantidadeDoItem * valorUnidadeItem );
				
				btEditarItem = novoElm("a");
				btEditarItem.href = "#addLista";
				btEditarItem.innerHTML = "&#9998;";
				btEditarItem.id = cntItensDaListaAberta;
				btEditarItem.setAttribute("class", "btQuadrado");
				btEditarItem.addEventListener( "click", function(){
					alterarItem( this.id );
					animAbrir( getById("addLista") );
					animFechar( getById("visualizarLista") );
					getById("addProdutoNaLista").style.display = "none";
					getById("editProdutoNaLista").style.display = "block";
				} );
				
				btRemoverItem = novoElm("a");
				btRemoverItem.href = "#visualizarLista";
				btRemoverItem.innerHTML = "&#10007;";
				btRemoverItem.id = cntItensDaListaAberta;
				btRemoverItem.setAttribute("class", "btQuadrado");
				btRemoverItem.addEventListener( "click", function(){
					removerItem( this.id );
				} );
				
				linhaDoItem.append( verDescricao, verUnidades, verPreco, btEditarItem, btRemoverItem );
				
				divTituloJanelaSecao.append( linhaDoItem );
				subtotal = (verPreco.innerText * verUnidades.innerText);
				divTituloJanelaSecao2.append( criar({ nomeDoElemento:"tr", conteudoInterno:"<td>"+verDescricao.innerText+"</td><td class='number'>"+verUnidades.innerText.replace(".",",") +"</td><td class='number'>R$ "+verPreco.innerText.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}).replace(".",",")+"</td><td class='number'>"+ subtotal.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) +"</td>" }) );
			}
			cntItensDaListaAberta++;
		}
		getById("visualizarLista").append( divTituloJanelaSecao );
		valorEstimadoDaLista = novoElm("p");
		valorEstimadoDaLista.innerHTML = "Preço estimado da compra: " + valorListaAberta.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) + "."
		divTituloJanelaSecao2.append( criar({ nomeDoElemento:"tr", conteudoInterno:"<td colspan='3'>Total estimado da compra</td><td>"+ valorListaAberta.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) +"</td>" }) );
		getById("visualizarLista").append( criar({
			nomeDoElemento:"a",
			atributoHREF:`javascript:downloadLista("`+tituloAberto.innerText+`",divTituloJanelaSecao2.outerHTML)`,
			conteudoInterno:"Baixar lista"
		}) );
		getById("visualizarLista").append( valorEstimadoDaLista );
	}

	downloadLista=( nomeDoArquivo, conteudo )=>{
		cabecalho = `<html xmlns:o="urn:schemas-microsoft-com:office:office"xmlns:x="urn:schemas-microsoft-com:office:excel"xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><meta name=ProgId content=Excel.Sheet><meta name=Generator content="Microsoft Excel 12"><title>`+ nomeDoArquivo +`</title><style>td{ border: 1px solid #000; } .number{text-align: right} </style></head>`;
		conteudo = cabecalho + "<body>" + conteudo + "</body></html>";
		download( nomeDoArquivo + ".htm", conteudo );
	}

	function carregarListasAdicionadas(){
		if (!(!(localStorage.getItem("idDasListas"))) == false){
			console.log("Nada encontrado!")
		} else {
			getById("listaEmCriacao").innerHTML = "";
			listasGuardadas = localStorage.getItem("idDasListas");
			listasSeparadas = listasGuardadas.split(" ;; ");
			cntListas = 0;
			
			while ( cntListas < listasSeparadas.length ){
				if (listasSeparadas[cntListas] != ""){
					
					listaGuardada = novoElm("div");
					listaGuardada.id = listasSeparadas[cntListas];
					
					itensNaLista = localStorage.getItem( listasSeparadas[cntListas] );
					tituloNaLista = itensNaLista.split(" inicioDaLista ")[0];
					h2Titulo = novoElm("h2");

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
					btExcluirLista.innerHTML = "&#10008;";
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
					
					legendDasListas = novoElm("p");
					
					legendaDesc = novoElm("span");
					legendaDesc.innerText = "Descrição";
					
					legendaUnid = novoElm("span");
					legendaUnid.innerText = "Unidades";
					
					legendaPrec = novoElm("span");
					legendaPrec.innerText = "Preço";

					legendDasListas.append( legendaDesc, legendaUnid, legendaPrec );
					legendDasListas.style = "text-align: center;  background-color: " + corTema ;
					secaoItems = novoElm("section");
					secaoItems.append( legendDasListas );
					//listaGuardada.append( legendDasListas );

					conteudoNaLista = itensNaLista.split(" inicioDaLista ")[1].split(" && ");
					cntItens = 0;
					
					calcularCompra = 0;
					valorEstimadoDaCompra = novoElm("p");
					
					while (cntItens < conteudoNaLista.length ){
						if( conteudoNaLista[cntItens] != "" ){
							itemDaLista = novoElm("p");
							descricaoAdicionada = novoElm("span");
							descricaoAdicionada.innerText = conteudoNaLista[cntItens].split(" ++ ")[0];
							
							unidadesDoItem = novoElm("span");
							unidadesDoItem.innerText = conteudoNaLista[cntItens].split(" ++ ")[1];
							
							valorGuardado = novoElm("span");
							valorGuardado.innerText = conteudoNaLista[cntItens].split(" ++ ")[2].toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});
							itemDaLista.append( descricaoAdicionada, unidadesDoItem, valorGuardado );
							
							
							quantidadePorItem = ( parseFloat( conteudoNaLista[cntItens].split(" ++ ")[1].replace(",", ".") ) ? parseFloat( conteudoNaLista[cntItens].split(" ++ ")[1].replace(",", ".") ) : 0 );
							valorUnidadeoItem = ( parseFloat( conteudoNaLista[cntItens].split(" ++ ")[2].replace(",",".") ) ? parseFloat( conteudoNaLista[cntItens].split(" ++ ")[2].replace(",",".") ) : 0 );
							
							calcularCompra = calcularCompra + ( quantidadePorItem * valorUnidadeoItem );
					
							//calcularCompra = calcularCompra + ( parseFloat( conteudoNaLista[cntItens].split(" ++ ")[2].replace(",",".") ) * parseFloat( conteudoNaLista[cntItens].split(" ++ ")[1].replace(",",".") ) );
							if( isNaN( calcularCompra ) == true ){
								valorEstimadoDaCompra.innerHTML = "Valor não estimado."
							} else{
								valorEstimadoDaCompra.innerHTML = "Valor estimado da compra em: " + calcularCompra.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) + ".";
							}

							secaoItems.append( itemDaLista );
							
						}
						cntItens++;
					}
					secaoItems.append( valorEstimadoDaCompra );
					listaGuardada.append( secaoItems );
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
			quatidadeDeCompra.innerText = qtdCompra.value;
			valorDoItem.innerText = precoDoItem.value;
			
			idLista = getById("guardarID").value;
			
			itensAdicionados = localStorage.getItem( idLista ) + descricaoDoItem.value + " ++ " + qtdCompra.value + " ++ " + precoDoItem.value + " && ";
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
		btExcluirLista.innerHTML = "&#10008;";
		
		btEditarLista = novoElm("a");
		btEditarLista.setAttribute("class", "btQuadrado");
		btEditarLista.href = "#editarLista?idLista=" + idLista;
		btEditarLista.innerText = "Editar";
		
		identificacaoVisual = novoElm("h2");
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
		legendTabLista.style = "text-align: center;  background-color: " + corTema ;
		listaNova.append( legendTabLista );
		
		getById("listaEmCriacao").append(listaNova);
		carregarListasAdicionadas();
	}
