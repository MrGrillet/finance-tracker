var init_stock_lookup = function(){
    $("#stock-lookup-form").on("submit", function(e) {
        hideResults();
        // showSpinnner();
        $('#stock-lookup-form').on('ajax:before', function(event, data, status){

show_spinner();

});


 
        var url = $(this).attr("action"); // the script where you handle the form input.
 
        $.ajax({
            type: "GET",
            url: url,
            format: "json",
            data: $(this).serialize(), // serializes the form's elements.
            success: function(data)
            {
                $("#stock-lookup").replaceWith(data);
                // hideSpinner();
        		$('#stock-lookup-form').on('ajax:error', function(event, xhr, status, error){
					hide_spinner();
					$('#stock-lookup-results').replaceWith(' ');
					$('#stock-lookup-errors').replaceWith('Stock was not found.');
				});
                
                init_stock_lookup();
            },
            error: function(e, xhr, status, error){
                // hideSpinner();
                $("#stock-lookup-errors").show();
                $("#stock-lookup-errors").html("stock was not found!");
            }
        });
 
        e.preventDefault(); // avoid to execute the actual submit of the form.
    });
 
    function hideResults()
    {
        $("#stock-lookup-errors").hide();
        $("#stock-lookup-results").hide();
    }
};
 
$(document).ready(function(){
    init_stock_lookup();
});