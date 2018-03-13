var table = $("#myTable");
if(table!=undefined) {
	var tableOffset = $("#myTable").offset().top;
	var $header = $("#myTable > thead");
	var $fixedHeader = $("#header-fixed").append($header.clone());

	$(window).bind("scroll", function() {
	    var offset = $(this).scrollTop();

	    if (offset >= tableOffset && $fixedHeader.is(":hidden")) {
	        $fixedHeader.show();
	        $.each($header.find('tr > th'), function(index,val){
          		var original_width = $(val).width();
          		$($fixedHeader.find('tr > th')[index]).width(original_width);
        });
	    }
	    else if (offset < tableOffset) {
	        $fixedHeader.hide();
	    }
	});
}
// get current row number on event like scroll up and scroll down and fetch rows skip and limit from db
