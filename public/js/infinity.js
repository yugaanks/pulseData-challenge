// s= last row number, t= current row number
var s=1000, t=0;
// scroll trigger
$(window).scroll(function(){
	// if scroll position is at bottom of the window
	if ($(window).scrollTop() == $(document).height()-$(window).height()){
    	// send an ajax request to the server to get the next 100 rows, and the function will append those rows to the table. It will also remove the first 100 rows of the table
    	// there is a timeout function that demonstrates the functionality in a better way
    	// everytime user scrolls down, the last row number and the first row number is incremented by 100
    	$.ajax({
              url: `/users?skip=${s}&take=100`,
              success: function (data) {
              		setTimeout(()=>{
              			s+=100;
	              		t+=100;
	              		$('tbody > tr').slice(0,100).remove();
	              		for(let i=0;i<data.length;i++) {
							var x="<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].email+"</td><td>"+data[i].city+"</td></tr>";
							$('tbody').append(x); 
						}
						// setting the scrollbar position to the difference of 100th row from the end and the height of the window so the previous last row remains at the bottom
						$(window).scrollTop($("tr:nth-last-child(100)").offset().top-$(window).height());
              		}, 2000)},
              dataType: 'json'
           });
    } else {
    	// in case user scrolls to top of the page and first row number is not 0, this condition will execute
    	// decrement the first row and last row number by 100
    	// add the data requested to the top of the table using prepend
    	if (t!=0 && $(window).scrollTop() == 0) {
    		t=t-100;
    		s=s-100;
    		if(t<0)
    			t=0;
	    	$.ajax({
	              url: `/users?skip=${t}&take=100`,
	              success: function (data) {
	              		setTimeout(()=>{
	              			s=s-100;
		              		$('tbody > tr').slice(-100).remove();
		              		for(let i=data.length-1;i>=0;i--) {
								var x="<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].email+"</td><td>"+data[i].city+"</td></tr>";
								$('tbody').prepend(x); 
							}
							// setting the scrollbar position to the 100th row from the start
							$(window).scrollTop($("tr:nth-child(100)").offset().top);
	              		}, 2000)},
	              dataType: 'json'
	           });
	    }
    }
});