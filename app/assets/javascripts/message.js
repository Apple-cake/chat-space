$(function(){
  function buildHTML(message){
    var html = `
          ${message.user.name}
          ${message.created_at.strftime("%Y/%m/%d %H:%M")}
          ${if message.content.present}
          <p class="message__lower-message__content">
          ${message.content}
          </p>
          ${image_tag message.image.url, class: 'message__lower-message__image'}
              `
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
      $('form')[0].reset();
    })
    .fail(function(){
      alert('メッセージエラー');
    })

  })
});