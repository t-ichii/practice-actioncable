import React, { Component } from 'react'
import ActionCable from 'actioncable'

class Chat extends Component {
    cable
    chat
    chatNode

    constructor(props) {
        super(props)
        this.cable = ActionCable.createConsumer()
        this.chat = this.cable.subscriptions.create(
            'ChatChannel',
            {
                connected() {
                    console.log("connected")
                },

                disconnected() {
                    console.log("disconnected")
                },

                received(data) {
                    this.onReceive(data)
                    console.log("received", data)
                },

                speak(mes = "hello") {
                    this.perform('speak', { mes })
                },

                addReceiveFuc(f){
                    this.onReceive = f
                }
            }
        )
        this.chat.addReceiveFuc(this.onReceive.bind(this))

        this.state = {
            messages: [],
            sendMessage: ''
        }
    }

    componentDidMount() {
        this.chatNode = document.getElementById('messages')
    }


    onReceive(data){
        console.dir('onReceive')
        const { messages } = this.state
        messages.push(data)
        this.setState({
            messages
        })
    }

    onChangeTextArea(e){
        this.setState({
            sendMessage: e.target.value || ''
        })
    }

    onClickSend() {
        const { sendMessage } = this.state
        this.chat.speak(sendMessage)
        this.setState({
            sendMessage: ''
        })
    }

    render() {
        const { messages } = this.state
        return (
            <div>
                <ul id="messages">
                    {
                        messages.map(message => {
                            return (
                                <li>
                                    <span>{ message.mes }</span>
                                    <span>(user: { message.current_user_id })</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <textarea
                        value={this.state.sendMessage || ''}
                        onChange={e => this.onChangeTextArea(e)}
                    />
                    <button onClick={() => this.onClickSend()}>Send!</button>
                </div>
            </div>
        )
    }
}

export default Chat
