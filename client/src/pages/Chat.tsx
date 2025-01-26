import "../assets/css/chat.css";
import React, { useEffect, useState, useRef } from "react";
interface messageType {
  username: String,
  message: String
}
const Chat: React.FC = () => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [message, setMessage] = useState<string>('');
  const socketRef = useRef<WebSocket | null>(null);
  const socket = new WebSocket("ws://localhost:8000/ws/chat/sakib/");
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket("ws://localhost:8000/ws/chat/sakib/");
      socket.onopen = () => {
        console.log("WebSocket connection established");
      };
      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      }
      socketRef.current.onclose = () => {
        console.log("Socket connection closed");
      }
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }

    }
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socketRef.current && message.trim()) {
      socketRef.current.send(JSON.stringify({
        message,
        username: "sakib1"
      }));
      setMessage('');
    }
  };

  return (
    <>
      <div className="container py-2">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <div id="plist" className="people-list">
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  <li className="clearfix">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="avatar"
                      className="rounded-circle"
                    />
                    <div className="about">
                      <div className="name">Vincent Porter</div>
                      <div className="status">
                        <i className="fa fa-circle text-danger"></i> left 7 mins
                        ago
                      </div>
                    </div>
                  </li>
                  <li className="clearfix active">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      alt="avatar"
                      className="rounded-circle"
                    />
                    <div className="about">
                      <div className="name">Aiden Chavez</div>
                      <div className="status">
                        <i className="fa fa-circle text-success"></i> online
                      </div>
                    </div>
                  </li>
                  <li className="clearfix">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      alt="avatar"
                      className="rounded-circle"
                    />
                    <div className="about">
                      <div className="name">Mike Thomas</div>
                      <div className="status">
                        <i className="fa fa-circle text-success"></i> online
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-lg-6">
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#view_info"
                      >
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar2.png"
                          alt="avatar"
                          className="rounded-circle"
                        />
                      </a>
                      <div className="chat-about">
                        <h6 className="mb-0">Aiden Chavez</h6>
                        <small>Last seen: 2 hours ago</small>
                      </div>
                    </div>
                    <div className="col-lg-6 text-end d-none d-sm-block">
                      <button className="btn btn-outline-secondary">
                        <i className="fa fa-camera"></i>
                      </button>
                      <button className="btn btn-outline-primary">
                        <i className="fa fa-image"></i>
                      </button>
                      <button className="btn btn-outline-info">
                        <i className="fa fa-cogs"></i>
                      </button>
                      <button className="btn btn-outline-warning">
                        <i className="fa fa-question"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="chat-history">
                  <ul className="mb-0">
                    {
                      messages && messages.map((ele, index) => (
                        <li className="clearfix" key={'chat_' + index}>
                          <div className={'message-data ' + (ele.username === 'sakib1' ? 'text-end' : '')}>
                            <span className="message-data-time">
                              10:10 AM, Today
                            </span>
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar7.png"
                              alt="avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div className={'message other-message  ' + (ele.username === 'sakib1' ? 'float-end' : '')}>
                            {ele.message}
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className="chat-message clearfix">
                  <form onSubmit={sendMessage}>
                    <div className="input-group mb-0">
                      <span className="input-group-text">
                        <i className="fa fa-paper-plane"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter text here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button className="btn btn-primary" type="submit">Send</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
