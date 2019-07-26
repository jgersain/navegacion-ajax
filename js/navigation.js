$(function() {
	const extension = ".html"
	const content = $('#content');
	const htmlError = `<div class="container alert alert-danger m-0" role="alert">La página no existe</div>`
	let prev_url = '';

	// cambiamos el atributo href por el del contenido del data-page
	let items = $('nav a');
	items.each(function() {
		$(this).attr('href', $(this).data('page'));
	});

	// agregamos la funcionalidad a cada item del menú
	items.on('click', function(event) {
		event.preventDefault();
		let hash = $(this).attr('href');
		// cuando la peticion es satisfactoria
		validateURL(hash).done(() => window.location.href = hash)
		// cuando hay un error
		.fail(() => window.location.href = '#error')
		// cuando la petición se completo
		.always(data =>	content.html(data));
	});

	validateURL();
	setInterval(function(){
		validateURL().fail(function(){
			window.location.href = '#error';
		}).always(function(data){
			content.html(data);
		});
	}, 250);
	
	function validateURL(hash) {
		// manejando callbacks con el objeto referido
		const deferred = $.Deferred()
		
		// si no hay hash, por ejemplo cuando se navega con lo botones 
		// del navegador o cuando se introduce manualmente
		if (!hash)
			hash = window.location.hash;			

		// cargamos el nuevo contenido solo cuándo es necesario
		if (hash !== prev_url) {
			prev_url = hash;
			cargarPagina(hash)
			.done(data => deferred.resolve(data))
			.fail(() => deferred.reject(htmlError));
		}
		return deferred.promise();
	}

	// relaiza la peticion, retorna una respuesta html
	function cargarPagina(hash) {		
		let pageUrl = hash.replace('#', '') + extension;
		return $.ajax({
			url: pageUrl,
			async: true,
			dataType: 'html'
		});
	}
});