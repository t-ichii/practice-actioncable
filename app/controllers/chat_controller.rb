class ChatController < ApplicationController
  def index
    render html: nil, layout: 'application'
  end
end
