$(function(){
  function buildHTML(message){
    var img = message.image ? message.image : '' ;
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
    var url = $(this).attr('action');
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
        $('.messages').append(html);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
        $('.box__message').val("");
        $('.hidden').val("");
      })
      .fail(function(){
        alert('メッセージエラー');
      })
      .always(function () {
        $(".form__submit").removeAttr("disabled");
      })
  });
  var reloadMessages = function(){
    var last_message_id = $('.message:last').data("id");
    var group_id = $('.top-left__title').data("group_id");
    $.ajax({
      url: 'api/messages',
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id }
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
        insertHTML += buildHTML(message)
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      });
    })
    .fail(function() {
      alert('自動更新エラー')
    })
  }
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 5000)
  };
});