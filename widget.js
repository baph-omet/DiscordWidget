//console.clear();

function getData() {
 var callback = makeid();
 	$.getJSON("https://discordapp.com/api/servers/162389127872905226/widget.json?callback=" + callback, function(json) {
	  console.log(json);
	  buildWidget(json);
	})
	.fail(function(error) {
	  console.log("Retrevial of player list failed");
	  console.log(error);
	});
}

function buildWidget(json) {
  document.getElementById("title").innerHTML += "<h2>" + json.name.toUpperCase() + "</h2><h3>Discord Server</h3>";


	// Channels
  var channels = "";
  for (var i = 0; i < json.channels.length; i++) {
	channels += "<li><img src=\"https://i.imgur.com/gI7bpiX.png\"/> " + json.channels[i].name;
	for (var j = 0; j < json.members.length; j++) {
		var member = json.members[j];
		if (typeof(member.channel_id) != "undefined" && member.channel_id == json.channels[i].id) {
		channels += "<br/><img class=\"avatar\" src=\"" + member.avatar_url + "\"/> <p>" + member.username + "</p>";
	  }
	}
	channels += "</li>";
  }
  document.getElementById("channels").innerHTML = channels;
	
  
  
  // Online Members
  var members = "";
  for (var i = 0; i < json.members.length; i++) {
	var idle = json.members[i].status == "idle";
	var game = "";
	if (typeof(json.members[i].game) != "undefined") {
		game = json.members[i].game.name;
	}
	members += "<li><img src=\"" + json.members[i].avatar_url + "\"> <p>" + (idle ? "<span class=\"idle\">" : "") + json.members[i].username + (idle ? " (Idle)</span>" : "") + "</p>" + (game ? "<br/><p class=\"game\"><b>Playing:</b> " + game + "</p>" : "") + "</li>";
  }
  document.getElementById("members").innerHTML = members;
  
  
}

function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 5; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

getData();
