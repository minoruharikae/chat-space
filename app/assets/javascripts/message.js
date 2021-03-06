$(function(){
  var buildMessageHTML = function(message) {
    var image = message.image.url ? `<img class= "lower-message__image" src= ${message.image.url} >` : "";
    
      var html = 
      `<div class="message" data-id= ${message.id} >
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name} 
          </div>
          <div class="upper-message__date">
            ${message.date} 
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content} 
          </p>
            ${image}
        </div>
      </div>`

    $('.messages').append(html);
    
  };

  
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){ 
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('id');
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: 'api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message){
        buildMessageHTML(message); 
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      });
    })
    .fail(function() {
    });
   };
  };


  $("#new_message").on("submit", function(e){
    e.preventDefault()

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
      .done(function(message){
        var html =  buildMessageHTML(message);
        $('.messages').append(html);
        $('.form__message').val('');
        //$('#message_image').val('');
        $('#new_message')[0].reset();
        $('.form__submit').prop('disabled', false);
        
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        
      })
      .fail(function(){
        alert('error')
        $('.form__submit').prop('disabled', false);
      })

    });
       
  setInterval(reloadMessages, 7000);
})

