$( document ).ready(function() {
    console.log( "ready!" );
   	$('#saveitem').on('submit',function(e) {
   			setTimeout(function() { 
   				$('#modal').modal('hide'); 
   				$("#itemSubmitButton").prop('disabled', false);
   				$("#itemSubmitButton").prop('class', 'btn btn-info');
   				$("#itemSubmitButton").text("Save changes");
   			}, 1000);
   	});

   	
   	$(document).on('click','.edit-item-button', function(){
    	$('.modal-title').text('Edit Item');
 	});

 	$(document).on('click','.add-item-button', function(){
    	$('.modal-title').text('Add New Item');
 	});

});

