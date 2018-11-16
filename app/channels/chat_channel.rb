class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat'
    ActionCable.server.broadcast(
      'chat',
      {
        'mes' => "user: #{current_user.id} is join",
        'current_user_id' => current_user.id
      }
    )
  end

  def speak(data)
    data['current_user_id'] = current_user.id
    ActionCable.server.broadcast('chat', data)
  end
end
