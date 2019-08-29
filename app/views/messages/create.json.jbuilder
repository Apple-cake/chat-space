json.content  @message.content
json.image  @message.image.url
json.user_name @message.user.name
json.id  @message.id
json.created_at @message.created_at.strftime('%Y年%m月%d日 %H:%M:%S')