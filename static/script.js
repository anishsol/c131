$(document).ready(function () {

    console.log('Ready')

    //  Fetch the current date and update it in the DOM
    let currentDate = new Date();
    $('#date').text(currentDate.toDateString());

    //  write an event, when Submit button is clicked
    $('#submit-btn').click(function () {

        //  get the text value from the textarea using the 'val()' method
        let text_value = $('#text').val()

        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_text = { 'customer_review': text_value };
        console.log(input_text);

        //  ajax request
        $.ajax({

            //  type of web request
            type: 'POST',

            //  Data to be sent in JSON format
            data: JSON.stringify(input_text),

            //  URL to which the request is to be sent
            url: '/review',

            //  type of response expected is json
            dataType: 'json',

            //  contentType
            contentType: 'application/json',

            //  if everything is successful, run this function
            success: function (result) {

                // extract prediction and emoticon url from result
                let sentiment = result.sentiment;
                let imgPath = result.image_path;

                //  update the DOM elements
                $('#sentiment').text(sentiment);
                $('#emoticon').attr('src', imgPath);

                //  show them
                $('#prediction').show();

            },

            //  if any error, run this function
            error: function (result) {

                console.log(result);
            }
        })

        //  clearing the textbox after every button push
        $('#text').val("");
    })

});
