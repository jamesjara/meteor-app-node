BlazeComponent.extendComponent({
 

  clickParticipar(evt) { 
	    evt.preventDefault();  
	    
      const userId = Meteor.user()._id;
      const currentProgram = Boards.findOne(Session.get('currentBoard'));
      if (!currentProgram.hasMember(userId)) {
        currentProgram.addMember(userId);
      }  
 
  } , 
  events() {
    return [{
        'click #participar-user-button': this.clickParticipar 
    
    }];
  }, 
}).register('listBodyAside');
