//Make connection
var socket = io.connect("http://localhost:4000");

//Query DOM
var message = document.getElementById("message");
pseudo = document.getElementById("pseudo");
bouton = document.getElementById("send");
output = document.getElementById("output");
info = document.getElementById("info");

//Emit events

bouton.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    pseudo: pseudo.value
  });
  message.value = "";
});

message.addEventListener("keypress", function(pressedKey) {
  if (pressedKey.keyCode == 13) {
    socket.emit("chat", { message: message.value, pseudo: pseudo.value });
    message.value = "";
  } else {
	socket.emit("typing", pseudo.value);
  }
});

//Listen for events
socket.on("chat", function(data) {
  info.innerHTML = "";
  if (data.pseudo == pseudo) {
    output.innerHTML +=
      "<p><strong>" +
      document.getElementById("pseudo") +
      "</strong> " +
      data.message +
      "</p>";
  } else {
    output.innerHTML +=
      "<p><strong>" + data.pseudo + ":</strong> " + data.message + "</p>";
  }
});

socket.on("typing", function(data) {
  info.innerHTML = "<p><em>" + data + " est en train d'ecrire...</em><p>";
});
