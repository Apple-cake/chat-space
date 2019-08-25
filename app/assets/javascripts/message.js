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
$(function() {
  $(function() {
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = ※※※
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: ※※※,
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log('success');
      })
      .fail(function() {
        console.log('error');
      });
    };
    setInterval(reloadMessages, 5000);
  });
});