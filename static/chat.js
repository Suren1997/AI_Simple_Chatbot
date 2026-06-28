const chatBox = document.getElementById("chat");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send-btn");

function addMessage(text, who) {
  const message = document.createElement("div");
  message.className = `message ${who}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.innerText = who === "user" ? "👤" : "🤖";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerText = text;

  message.appendChild(avatar);
  message.appendChild(bubble);

  chatBox.appendChild(message);

  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
  const typing = document.createElement("div");
  typing.className = "message bot";
  typing.id = "typing";

  typing.innerHTML = `
        <div class="avatar">🤖</div>
        <div class="bubble">
            <div class="typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

  chatBox.appendChild(typing);

  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");

  if (typing) {
    typing.remove();
  }
}

async function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) return;

  addMessage(text, "user");

  messageInput.value = "";

  showTyping();

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
      }),
    });

    const data = await response.json();

    removeTyping();

    addMessage(data.reply, "bot");
  } catch (error) {
    removeTyping();

    addMessage("Sorry, something went wrong. Please try again.", "bot");

    console.error(error);
  }
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
