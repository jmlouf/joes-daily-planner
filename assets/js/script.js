$(document.ready(function() {

    // Using jQuery to select all .saveBtn elements and store them in variable.
    var saveBtn = $(".saveBtn");

    // Get the current date and format with DayJS.
    var now = dayjs();
    var currentDay = now.format('dddd, MMMM D, YYYY');

    // Display the current reformatted date.
    $('#current-day').text(currentDay);


    // Function to match colors with corresponding time-blocks.
    function colorCode() {

        // Loop through each time-block hour
        $(".time-block").each(function() {

            // Parse through each time-block hour to receive the hour and compare
            // it to the cuurent hour.
            var timeblockHour = parseInt($(this).attr("id").split("hour-")[1]);
            
            // Get the current hour with DayJS.
            var currentHour = dayjs().hour();

            // Add/remove class depending on the time-block hour compared to the
            // current hour comparison.
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
    

    // Set the input value that corresponds to the designated hour-block id.
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
  

    // Calls loadSavedText and colorCode functions when page loads.
    loadSavedText();
    colorCode();

    // Calls the colorCode function every 0.5 seconds.
    setInterval(colorCode, 500);

}));
