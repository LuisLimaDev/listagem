//after.js

	getById("barraMenu").style.backgroundColor = corTema;

	getById("addProdutoNaLista").addEventListener("click", function(){
		trabalharCampoDeTexto()
	});

	getById("editProdutoNaLista").addEventListener("click", function(){
		editProdutoNaLista()
	});
	
	getById("novaLista").addEventListener("click", function(){
		criarIdParaLista();
	});
	
	getById("descreverItem").addEventListener("keyup", function(){
		getById("descreverItem").value = getById("descreverItem").value.toUpperCase();
	});
	
	getById("descreverItem").addEventListener("focus", function(){
		getById("descreverItem").select();
	});
	
	carregarListasAdicionadas();
