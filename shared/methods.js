Meteor.methods({

	addChat:function(otherUserId){
		var currentUser = this.userId;
		var otherUser = otherUserId;
		var id = Chats.insert({user1Id:currentUser, user2Id:otherUser});
		return id;
	}, //end of method for adding chat items	


	addMessage:function(chat){
		Chats.update(chat._id, chat);
	},//end of method for adding a message

});