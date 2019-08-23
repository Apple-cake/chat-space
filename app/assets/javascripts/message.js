$(function(){
  function buildHTML(message){
    var img = message.image.url ? message.image.url : '' ;
        var html = `
                  <div class="message">
                    <div class="message__upper-message">
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
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').delay(100).animate({scrollTop: $('.messages')[0].scrollHeight}, 'swing');
      $('form')[0].reset()
    })
    .fail(function(){
      alert('メッセージエラー');
    })
    return false;
  })
});