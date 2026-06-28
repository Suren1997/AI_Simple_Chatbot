let chatBox = document.getElementById("chat");
let messageInput = document.getElementById("message");
let sendButton = document.getElementById("send-btn");

function addMessage(text, who) {
  let newMessage = document.createElement("div");
  newMessage.className = "message" + who;
  newMessage.innerText = text;
  chatBox.appendChild(newMessage);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  let text = messageInput.value;

  if (text === "") {
    return;
  }

  addMessage(text, "user");

  messageInput.value = "";

  // addMessage("I hear you! we will connect this to flask max", "bot");
  fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: text }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      addMessage(data.reply, "bot");
    });
}

sendButton.onclick = sendMessage;

messageInput.onkeydown = function (event) {
  if (event.key == "Enter") {
    sendMessage();
  }
};
