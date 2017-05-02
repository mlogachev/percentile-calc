$(document).ready( function () {

	const options = {
		d: 'norm',
	}

	$('.dropdown-item').toArray().forEach( elem => {
		
		$(elem).click( e => {
			e.preventDefault();
			
			options.d = e.target.dataset.distribution;
			$('#selector').text( e.target.text );

			processChange();
			onParamChange();

		})	

	});

	$('#level').on( 'change paste keyup', onParamChange );
	$('#st').on( 'change paste keyup', onParamChange );
	$('#stf-1').on( 'change paste keyup', onParamChange );
	$('#stf-2').on( 'change paste keyup', onParamChange );


	function onParamChange(event) {

		const value = $('#level').val().replace(',', '.');
		const st = $('#st').val();
		const st1 = $('#stf-1').val();
		const st2 = $('#stf-2').val();

		console.log(value, st, st1, st2);

		switch (options.d) {
			case 'norm':
				const url = `http://localhost:5000/api/norm/${value}`;
				callAjax( url );
				break;
			case 'student':
				if ( st > 0 ) {
					const url = `http://localhost:5000/api/student/${value}/${st}`;
					callAjax( url );	
				}

				break;
			case 'hi':
				if ( st > 0 ) {
					const url = `http://localhost:5000/api/hi/${value}/${st}`;
					callAjax( url );
				}
				break;
			case 'fisher':
				if (st1 > 0 && st2 > 0) {
					const url = `http://localhost:5000/api/fisher/${value}/${st1}/${st2}`;
					callAjax( url );
				}
				break;
		}
		
		
	}

	function callAjax( url ) {
		$.ajax({
			url,
			success: function( resp ) {
				handleResponse( resp );
			}.bind(this)
		})
	}

	function processChange() {
		switch (options.d) {
			case 'norm': 
				$('#one').removeClass('selected');
				$('#two').removeClass('selected');
				break;
			case 'student':
				$('#one').addClass('selected');
				$('#two').removeClass('selected');
				break;
			case 'hi':
				$('#one').addClass('selected');
				$('#two').removeClass('selected');
				break;
			case 'fisher':
				$('#one').removeClass('selected');
				$('#two').addClass('selected');
				break;
		}
	}

	function handleResponse( resp ) {
		$('#result').text( resp );
	}

});
