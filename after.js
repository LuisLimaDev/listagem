//after.js

	document.body.style.setProperty( "--corTema", "rgb(128,192,255)" );
	getById("barraMenu").style.backgroundColor = corTema;

	getById("addProdutoNaLista").addEventListener("click", function(){
		trabalharCampoDeTexto()
	});

	getById("editProdutoNaLista").addEventListener("click", function(){
		editProdutoNaLista();
		animAbrir( getById("visualizarLista") );
		animFechar( getById("addLista") );
	});
	
	getById("novaLista").addEventListener("click", function(){
		criarIdParaLista();
		getById("addLista").classList.remove("escondido");
		getById("addLista").style.display = "block";
		animAbrir( getById("addLista") );
	});
	
	getById("descreverItem").addEventListener("keyup", function(){
		getById("descreverItem").value = getById("descreverItem").value.toUpperCase();
	});
	
	getById("descreverItem").addEventListener("focus", function(){
		getById("descreverItem").select();
	});
	
	getById("fecharEditor").addEventListener("click", function( event ){
		animFechar( getById("addLista") );
		animAbrir( getById("visualizarLista") );
		getById("visualizarLista").style.display = "block";
		abrirLista( getById("guardarID").value );
	});
	
	getById("visualizarLista").style.height = ((window.innerHeight - getById("barraMenu").offsetHeight)-5) + "px";
	carregarListasAdicionadas();
