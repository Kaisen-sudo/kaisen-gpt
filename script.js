document.getElementById("send-btn").addEventListener("click", sendMessage);

async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    addMessage("user", message);
    input.value = "";

    try {
        const res = await fetch("/api/kaisen-chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await res.json();
        addMessage("bot", data.reply || "Pas de réponse");
    } catch (err) {
        addMessage("bot", "Erreur serveur.");
    }
}

function addMessage(role, text) {
    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("div");
    msg.classList.add("message", role);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}
