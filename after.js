//after.js
    let janelaAtiva;

	// document.body.style.setProperty( "--corTema", "rgb(128,192,255)" );
	// getById("barraMenu").style.backgroundColor = corTema;

	getById("addProdutoNaLista").addEventListener("click", function(){
		trabalharCampoDeTexto()
	});

	getById("importarLista").addEventListener("change", function(){
		carregarImportado()
	});

	getById("editProdutoNaLista").addEventListener("click", function(){
		editProdutoNaLista();
        janelaAtiva = getById("visualizarLista");
		animAbrir( getById("visualizarLista") );
		animFechar( getById("addLista") );
	});

    getById("btMenu").addEventListener("click", function(){
        janelaAtiva = getById("menuBlock");
    });
	
	getById("novaLista").addEventListener("click", function(){
		criarIdParaLista();
	});
	
	getById("importList").addEventListener("click", function(){
		// criarIdParaLista();
        // janelaAtiva = getById("importar");
		// janelaAtiva.classList.remove("escondido");
		// getById("importar").style.display = "block";
		// animAbrir( getById("importar") );
	});
	
	getById("descreverItem").addEventListener("keyup", function(){
		getById("descreverItem").value = getById("descreverItem").value.toUpperCase();
	});
	
	getById("descreverItem").addEventListener("focus", function(){
		getById("descreverItem").select();
	});
	
	getById("fecharEditor").addEventListener("click", function( event ){
		animFechar( getById("addLista") );
        janelaAtiva = getById("visualizarLista");
		animAbrir( getById("visualizarLista") );
		getById("visualizarLista").style.display = "block";
		abrirLista( getById("guardarID").value );
	});
	
	getById("visualizarLista").style.height = (window.innerHeight-20)+'px';
	carregarListasAdicionadas();
