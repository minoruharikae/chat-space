$(function(){
  $("#new_message").on("submit", function(e){
    e.preventDefault()
     console.log('イベント発火');

     var url = $(this).attr('action');
     var formdata = new FormData(this);
     $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formdata,  
      dataType: 'json',
      processData: false,
      contentType: false
     })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.form__message').val('');
        $('.form__submit').prop('disabled', false);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function(){
        alert('error')
        $('.form__submit').prop('disabled', false);
      })

      
  
  })

  function buildHTML(message){
    var html = `<div class="message">
                  <div class="upper-message">
                      <div class="upper-message__user-name">
                          ${ message.user_name }
                      </div>
                      <div class="upper-message__date">
                          ${ message.time }
                      </div>
                  </div>
                  <div class="lower-message">
                      <p class="lower-message__content">
                          ${ message.content }
                      </p>
                  </div>
               </div>`
        return html; 
    }
})

