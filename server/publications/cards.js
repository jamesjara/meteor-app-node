Meteor.publish('card', function(cardId) {
	  if (!Match.test(this.userId, String))
		    return [];
	  
  check(cardId, String);
  //return Cards.find({ _id: cardId ,  userId: this.userId });
});

Meteor.publish('myCards',  function() {
	  if (!Match.test(this.userId, String))
		    return [];
	  
	  return Cards.find({
		  userId: this.userId
	   });
	});


Meteor.publish('myProgramCards',  function() {
 
	  return Cards.find({
		  //userId: this.userId
	   });
	});
