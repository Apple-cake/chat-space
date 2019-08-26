$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var img = message.image.url ? message.image.url : '' ;
        var html = `
                  <div class="message" data-id="${message.id}">
                    <div class="message__upper-message" data-id="${message.id}">
                      <div class="message__upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="message__upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__lower-message">
                      <p class="message__lower-message__content">
                        ${message.content}
                      </p>
                        <img src="${img}">
                    </div>
                  </div>
                  `;
        return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').delay(100).animate({scrollTop: $('.messages')[0].scrollHeight}, 'swing');
      $('form')[0].reset()
    })
    .fail(function(){
      alert('メッセージエラー');
    });
    return false;
  });
  var reloadMessages = function(){
    var last_message_id = $('.message').last().data('id');
    $.ajax({
      url: location.href,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(data) {
      console.log('success');
      var insertHTML = '';
      insertHTML += buildHTML(data);
      $('.messages').append(insertHTML)
      $('.messages').delay(100).animate({scrollTop: $('.messages')[0].scrollHeight}, 'swing');
    })
    .fail(function() {
      console.log('error');
      // alert('自動更新エラー')
    });
  };
  setInterval(reloadMessages, 10000);
});
