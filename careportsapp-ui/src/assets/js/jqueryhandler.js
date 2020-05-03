$( document ).ready(function() {
    console.log( "ready!" );
   /*	$('#saveitem').on('submit',function(e) {
   			setTimeout(function() { 
   				$('#modal').modal('hide'); 
   				$("#itemSubmitButton").prop('disabled', false);
   				$("#itemSubmitButton").prop('class', 'btn btn-info');
   				$("#itemSubmitButton").text("Save changes");
   			}, 1000);
   	});*/

   	
   	$(document).on('click','.supitem-edit-item-button', function(){
    	$('#add_edit_modal_title').text('Edit Item');
      $('#form_group_item_close_date').show();
      $('#form_group_primary_sla_breahed').show();
      $('#form_group_secondary_sla_breahed').show();
      $('#form_group_tertirary_sla_breahed').show();
      $('#form_group_item_resolution').show();
      $('#form_group_aged_item').show();
      $('#form_group_bounce_item').show();
      $('#form-group_item_owner').show();
      $('#form-group_aged_justification').show();
      $('#form_group_rca_shared_date').show();
      $('#form_group_rca_document_status').show();
      console.log($("#aged_item").val());
 	});

      $(document).on('click','.supitem-report-edit-item-button', function(){
      //$('.modal-title').text('Edit Item Reporting Info');
      $('#form_group_item_close_date').show();
      $('#form_group_primary_sla_breahed').show();
      $('#form_group_secondary_sla_breahed').show();
      $('#form_group_tertirary_sla_breahed').show();
      $('#form_group_item_resolution').show();
      $('#form_group_aged_item').show();
      $('#form_group_bounce_item').show();
      $('#form-group_item_owner').show();
      $('#form-group_aged_justification').show();
      $('#form_group_rca_shared_date').show();
      $('#form_group_rca_document_status').show();
   });

 	$(document).on('click','.add-item-button', function(){
    	$('#add_edit_modal_title').text('Add New Item');
      $('#form_group_item_close_date').hide();
      $('#form_group_primary_sla_breahed').hide();
      $('#form_group_secondary_sla_breahed').hide();
      $('#form_group_tertirary_sla_breahed').hide();
      $('#form_group_item_resolution').hide();
      $('#form_group_aged_item').hide();
      $('#form_group_bounce_item').hide();
      $('#form-group_item_owner').hide();
      $('#form-group_aged_justification').hide();
      $('#form_group_rca_shared_date').hide();
      $('#form_group_rca_document_status').hide();
      
      
      
 	});

/*
      $(document).on('click','.devitemdailystatus', function(){
      $("#devdailystatusmodal").modal();
   });
   */

   


});

