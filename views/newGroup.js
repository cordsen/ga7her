extends layout

block content
	.span9
		FORM.form-horizontal
			FIELDSET
				LEGEND Create a new Event
				.control-group
					LABEL.control-label(for="name") Your Name
					.controls
						INPUT(type="text").input-xlarge#name
						P.help-block Who is sending this invite
					LABEL.control-label(for="date") Date + Time
					.controls
						INPUT(type="text").input-xlarge#date
						P.help-block When is it
					LABEL.control-label(for="place") Place
					.controls
						INPUT(type="text").input-xlarge#place
						P.help-block Where is it
					LABEL.control-label(for="email") Your Email
					.controls
						INPUT(type="text").input-xlarge#email
						P.help-block We need this to verify you'e a human before we send it
						BUTTON#createEvent.btn-primary Create Event

block scripts
	script(src="/js/jquery-1.7.1.min.js")
	script
		// capture button click
		$('#createEvent').click(function(){
			createEvent();
			return false;
		});
		
		// submit form 
		function createEvent() {
			var formData = {name: $('#name').val(), date: $('#date').val(), place: $('#place').val(), email: $('#email').val()};
			$.post(
				'/event'
				,formData
				,createGatheringCallback
				,'json');
			}
		function createGatheringCallback(data, status) {
			if (data.success === true)
				window.location.href = data.redirect;
			}
		// redirect to event page

