//pre.js

	function getById(id){
		return document.getElementById(id);
	}

	function getByClass(cl){
		return document.getElementsByClassName(cl);
	}

	function criarNovoEl(el){
		return document.createElement(el);
	}
	
	function de0a9( numeroParaVer ){
		if ( numeroParaVer < 10 ){
			return "0"+numeroParaVer;
		} else {
			return numeroParaVer;
		}
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
		idListaEditando = getById("guardarID").action.split("lista/")[1];
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
	}

	function abrirLista( idParaVisualizar ){
		getById("visualizarLista").innerHTML = "";
		getById("guardarID").action = idParaVisualizar;
		//getById("visualizarLista").style.display = "block";
		listaAberta = localStorage.getItem( idParaVisualizar );
		tituloAberto = criarNovoEl("h2");
		tituloAberto.innerText = listaAberta.split(" inicioDaLista ")[0];
		
		btExcluirLista = criarNovoEl("a");
		btExcluirLista.innerText = "X";
		btExcluirLista.href = "#excluir?idLista=" + idParaVisualizar;
		btExcluirLista.setAttribute("class", "btFechar Excluir");
		
		btNovoItem = criarNovoEl("a");
		btNovoItem.innerHTML = "&#10010";
		btNovoItem.href = "#addLista";
		btNovoItem.setAttribute("class", "adicionarItem");
		
		divTituloJanela = criarNovoEl("div");
		divTituloJanela.setAttribute("class", "tituloJanela");
		divTituloJanela.append( tituloAberto, btNovoItem, btExcluirLista );
		getById("visualizarLista").append( divTituloJanela );
		
		legendVerLista = criarNovoEl("p");
		descricaoDosProdutos = criarNovoEl("span");
		descricaoDosProdutos.innerText = "Descrição";
		
		unidadesParaCompra = criarNovoEl("span");
		unidadesParaCompra.innerText = "Unidade";
		
		valorEstimadoDoItem = criarNovoEl("span");
		valorEstimadoDoItem.innerText = "Preço";
		
		legEditar = criarNovoEl("span");
		legEditar.innerText = "Alterar";
		
		legApagar = criarNovoEl("span");
		legApagar.innerText = "Apagar";
		
		legendTabLista = criarNovoEl("p");
		legendVerLista.append( descricaoDosProdutos, unidadesParaCompra, valorEstimadoDoItem, legEditar, legApagar );
		getById("visualizarLista").append( legendVerLista );
		
		itensDaListaAberta = listaAberta.split(" inicioDaLista ")[1].split(" ;; ")[0].split(" && ");
		cntItensDaListaAberta = 0;
		valorListaAberta = 0;
		while( cntItensDaListaAberta < itensDaListaAberta.length ){
			if( itensDaListaAberta[cntItensDaListaAberta] != "" ){
				linhaDoItem = criarNovoEl("p");

				linhaDoItem = criarNovoEl("p");
				verDescricao = criarNovoEl("span");
				verUnidades = criarNovoEl("span");
				verPreco = criarNovoEl("span");
				
				verDescricao.innerText = itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[0];
				verUnidades.innerText = itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[1];
				verPreco.innerText = itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[2];
				
				quantidadeDoItem = ( parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[1].replace(",", ".") ) ? parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[1].replace(",", ".") ) : 0 );
				valorUnidadeItem = ( parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[2].replace(",",".") ) ? parseFloat( itensDaListaAberta[cntItensDaListaAberta].split(" ++ ")[2].replace(",",".") ) : 0 );
				
				valorListaAberta = valorListaAberta + ( quantidadeDoItem * valorUnidadeItem );
				
				btEditarItem = criarNovoEl("a");
				btEditarItem.href = "#addLista";
				btEditarItem.innerText = "Alterar";
				btEditarItem.id = cntItensDaListaAberta;
				btEditarItem.addEventListener( "click", function(){
					alterarItem( this.id );
				} );
				
				btRemoverItem = criarNovoEl("a");
				btRemoverItem.href = "#visualizarLista";
				btRemoverItem.innerText = "Remover";
				btRemoverItem.id = cntItensDaListaAberta;
				btRemoverItem.addEventListener( "click", function(){
					removerItem( this.id );
				} );
				
				linhaDoItem.append( verDescricao, verUnidades, verPreco, btEditarItem, btRemoverItem );
				
				getById("visualizarLista").append( linhaDoItem );
			}
			cntItensDaListaAberta++;
		}
		valorEstimadoDaLista = criarNovoEl("p");
		valorEstimadoDaLista.innerHTML = "Preço estimado da compra: " + valorListaAberta.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"}) + "."
		getById("visualizarLista").append( valorEstimadoDaLista );
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
				
				listaGuardada = criarNovoEl("div");
				listaGuardada.id = listasSeparadas[cntListas];
				
				itensNaLista = localStorage.getItem( listasSeparadas[cntListas] );
				tituloNaLista = itensNaLista.split(" inicioDaLista ")[0];
				h2Titulo = criarNovoEl("h2");

				visualizarLista = criarNovoEl("a");
				visualizarLista.innerText = tituloNaLista;
				visualizarLista.id = listasSeparadas[cntListas];
				visualizarLista.href = "#visualizarLista";
				visualizarLista.addEventListener("click", function(){
					abrirLista( this.id );
				});

				h2Titulo.append( visualizarLista );
				
				tituloJanela = criarNovoEl("div");
				tituloJanela.setAttribute("class", "tituloJanela");
				
				btExcluirLista = criarNovoEl("a");
				btExcluirLista.href = "#excluir?idLista=" + listasSeparadas[cntListas];
				btExcluirLista.innerText = "X";

				btEditarLista = criarNovoEl("a");
				btEditarLista.href = "#editarLista?idLista=" + listasSeparadas[cntListas];
				btEditarLista.innerText = "Editar";

				tituloJanela.append( h2Titulo, btExcluirLista )//, btExcluirLista );
				
				listaGuardada.append( tituloJanela );
				
				legendDasListas = criarNovoEl("p");
				
				legendaDesc = criarNovoEl("span");
				legendaDesc.innerText = "Descrição";
				
				legendaUnid = criarNovoEl("span");
				legendaUnid.innerText = "Unidades";
				
				legendaPrec = criarNovoEl("span");
				legendaPrec.innerText = "Preço";

				legendDasListas.append( legendaDesc, legendaUnid, legendaPrec );
				listaGuardada.append( legendDasListas );

				conteudoNaLista = itensNaLista.split(" inicioDaLista ")[1].split(" && ");
				cntItens = 0;
				
				calcularCompra = 0;
				valorEstimadoDaCompra = criarNovoEl("p");
				
				while (cntItens < conteudoNaLista.length ){
					if( conteudoNaLista[cntItens] != "" ){
						itemDaLista = criarNovoEl("p");
						descricaoAdicionada = criarNovoEl("span");
						descricaoAdicionada.innerText = conteudoNaLista[cntItens].split(" ++ ")[0];
						
						unidadesDoItem = criarNovoEl("span");
						unidadesDoItem.innerText = conteudoNaLista[cntItens].split(" ++ ")[1];
						
						valorGuardado = criarNovoEl("span");
						valorGuardado.innerText = conteudoNaLista[cntItens].split(" ++ ")[2];
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

						listaGuardada.append( itemDaLista );
					}
					cntItens++;
				}
				listaGuardada.append( valorEstimadoDaCompra );
				getById("listaEmCriacao").append(listaGuardada);
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
			itemAdicionado = criarNovoEl("p");
			quatidadeDeCompra = criarNovoEl("span");
			valorDoItem = criarNovoEl("span");
			botaoMais = criarNovoEl("button");
			nomeAdicionado = criarNovoEl("span");
			nomeAdicionado.innerText = descricaoDoItem.value;
			quatidadeDeCompra.innerText = qtdCompra.value;
			valorDoItem.innerText = precoDoItem.value;
			
			idLista = getById("guardarID").action.split("lista/")[1];
			
			itensAdicionados = localStorage.getItem( idLista ) + descricaoDoItem.value + " ++ " + qtdCompra.value + " ++ " + precoDoItem.value + " && ";
			localStorage.setItem( idLista, itensAdicionados);
			
			itemAdicionado.append(nomeAdicionado, quatidadeDeCompra, valorDoItem);
			//listaAtual = getById("guardarID").action;
			getById(idLista.toString()).append( itemAdicionado );
			getById("descreverItem").value = "";
			getById("qtdCompra").value = "";
			getById("precoDoItem").value = "";
			getById("descreverItem").focus();
			
			//addItemParaLista = "produto: " + nomeAdicionado " ;; ";
		}
	}
	
	function criarIdParaLista(){
		pegarHora = new Date();
		idLista = pegarHora.getFullYear().toString() + de0a9((pegarHora.getMonth()+1)).toString() + de0a9(pegarHora.getDate()).toString() + de0a9(pegarHora.getHours()).toString() + de0a9(pegarHora.getMinutes()).toString() + de0a9(pegarHora.getSeconds()).toString();
		listaNova = criarNovoEl("div");
		listaNova.id = idLista;
		getById("guardarID").action = idLista;
		btExcluirLista = criarNovoEl("a");
		btExcluirLista.href = "#excluir?idLista=" + idLista;
		btExcluirLista.innerText = "X";
		
		btEditarLista = criarNovoEl("a");
		btEditarLista.href = "#editarLista?idLista=" + idLista;
		btEditarLista.innerText = "Editar";
		
		identificacaoVisual = criarNovoEl("h2");
		visualizarLista = criarNovoEl("a");
		visualizarLista.href = "#visualizarLista";
		visualizarLista.id = idLista;
		visualizarLista.addEventListener("click", function(){
			//alert( this.href.split("=")[1] );
			abrirLista( this.id );
		});
		idVisualDaLista = "Criado às " + de0a9(pegarHora.getHours()).toString() + ":" + de0a9(pegarHora.getMinutes()).toString() + " dia " + de0a9(pegarHora.getDay()).toString() + "/" + de0a9((pegarHora.getMonth()+1)).toString() + "/" + pegarHora.getFullYear().toString();
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
		
		
		tituloJanela = criarNovoEl("div");
		tituloJanela.setAttribute("class", "tituloJanela");
		tituloJanela.append( identificacaoVisual, btExcluirLista )//, btEditarLista );
		
		listaNova.append(tituloJanela);
		
		descricaoDosProdutos = criarNovoEl("span");
		descricaoDosProdutos.innerText = "Descrição";
		
		unidadesParaCompra = criarNovoEl("span");
		unidadesParaCompra.innerText = "Unidade";
		
		valorEstimadoDoItem = criarNovoEl("span");
		valorEstimadoDoItem.innerText = "Preço";
		
		legendTabLista = criarNovoEl("p");
		legendTabLista.append( descricaoDosProdutos, unidadesParaCompra, valorEstimadoDoItem );
		listaNova.append( legendTabLista );
		
		getById("listaEmCriacao").append(listaNova);
	}