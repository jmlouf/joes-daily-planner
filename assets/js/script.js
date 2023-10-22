$(function() {

    var saveBtn = $(".saveBtn");

    var now = dayjs();
    var currentDay = now.format('dddd, MMMM D, YYYY');
    $('#current-day').text(currentDay);
    
    var currentHour = dayjs().hour();


    function colorCode() {

        // Loop through each time-block hour
        $(".time-block").each(function() {

            var timeblockHour = parseInt($(this).attr("id").split("hour-")[1]);
          
            if (timeblockHour < currentHour) {
                $(this).removeClass("present");
                $(this).removeClass("future");
                $(this).addClass("past");
            } else if (timeblockHour === currentHour) {
                $(this).removeClass("past");
                $(this).removeClass("future");
                $(this).addClass("present");
            } else if (timeblockHour > currentHour) {
                $(this).removeClass("present");
                $(this).removeClass("past");
                $(this).addClass("future");
            }
        });
    
    }


    saveBtn.on("click", function() {

        var hourX = $(this).parent().attr("id").split("hour-")[1];
        var input = $(this).siblings(".input").val();
      
        localStorage.setItem(hourX, input);
      
    });


    // Get saved <textarea> content from local storage.
    function loadSavedText() {

        // Loop through each time-block.
        $(".time-block").each(function() {
    
            // Get hour id from time-block id.
            var hourX = $(this).attr("id").split("hour-")[1];
        
            // Get saved text from local storage using hour as identifier. 
            var input = localStorage.getItem(hourX);
        
            // If saved text exists for hour, set <textarea> value.
            if (input) {
                $(this).find(".input").val(input);
            }
        });
    
    }
  

    // Call loadSavedText function when page loads.
    loadSavedText();
    colorCode();


    setInterval(function() {
        
        if (now.minute() === 0 && now.second() === 0) {
          colorCode();
        }  
    }, 1000);
    
});
