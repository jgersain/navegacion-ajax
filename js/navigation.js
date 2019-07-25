$(function() {
	const extension = ".html"
	let content = $('#content');
	let prev_url = ""
	let original = window.location;

	// cambiamos el atributo href por el del contenido del data-page
	let items = $('nav a');
	items.each(function() {
		$(this).attr('href', $(this).data('page'));
	});
	
	// implementación usando solo javascript
	// [...items].forEach(element => {
	// 	element.setAttribute('href', element.dataset.page);
	// });

	// agregamos la funcionalidad a cada item del menú
	items.on('click', function(event) {
		let hash = $(this).attr('href');
		event.preventDefault();
		validateURL(hash);
	});

	function validateURL(hash) {
		// manejando callbacks
		const deferred = $.Deferred()
		
		cargarPagina(hash).done(function(data) {
			var html = $(data);
			content.html(html);
		});

		return deferred.promise();
	}

	function cargarPagina(hash) {
		pageUrl = hash.replace('#', '');
		return $.ajax({
			url: pageUrl + extension,
			async: true,
			dataType: 'html'
		});
	}

});