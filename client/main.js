
//this is the subscription for the chats collection

  Meteor.subscribe('chats');
  Meteor.subscribe('users');

 ///
  // helper functions 
  /// 
  Template.available_user_list.helpers({
    users:function(){
      return Meteor.users.find();
    }
  })
 Template.available_user.helpers({
    getUsername:function(userId){
      user = Meteor.users.findOne({_id:userId});
      return user.profile.username;
    }, 
    isMyUser:function(userId){
      if (userId == Meteor.userId()){
        return true;
      }
      else {
        return false;
      }
    }
  })


  Template.chat_page.helpers({
    messages:function(){
      var chat = Chats.findOne({_id:Session.get("chatId")});
      return chat.messages;
    }, 
    other_user:function(){
      return ""
    }, 

  })


  Template.chat_message.helpers({
    user:function(){
    var currentId = Session.get('chatId');
    console.log(Chats.findOne({_id:Session.get("chatId")}));
    console.log(Meteor.user()._id);
    return Meteor.user()._id;
      },
  });



 Template.chat_page.events({
  // this event fires when the user sends a message on the chat page
  'submit .js-send-chat':function(event){
    // stop the form from triggering a page reload
    event.preventDefault();
    // see if we can find a chat object in the database
    // to which we'll add the message
    var chat = Chats.findOne({_id:Session.get("chatId")});
    if (chat){// ok - we have a chat to use
      var msgs = chat.messages; // pull the messages property
      if (!msgs){// no messages yet, create a new array
        msgs = [];
      }
      // is a good idea to insert data straight from the form
      // (i.e. the user) into the database?? certainly not. 
      // push adds the message to the end of the array
      console.log("this is the avatar"+ Meteor.user().profile.avatar);
      msgs.push({text: event.target.chat.value, creatorName:Meteor.user().profile.username, creatorImage:Meteor.user().profile.avatar});
      // reset the form
      event.target.chat.value = "";
      console.log(msgs);
      // put the messages array onto the chat object
      chat.messages = msgs;
      // update the chat object in the database.
      Meteor.call("addMessage", chat);
      setTimeout(function(){ $('.msg').emoticonize() }, 500);
    }
  },//this is the end of the submit form event

  'click .emot':function(event){
    $('.msg').emoticonize(function(err,res){
        return res;
      });
  }

 })