BlazeComponent.extendComponent({
  boards() {
    return Boards.find({
      archived: false,
      'members.userId': Meteor.userId(),
    }, {
      sort: ['title'],
    })  ;
  },

  isStarred() {
    const user = Meteor.user();
    return user && user.hasStarred(this.currentData()._id);
  },

  isInvited() {
    const user = Meteor.user();
    return user && user.isInvitedTo(this.currentData()._id);
  },

  events() {
    return [{

        'click .Button--bugReported'(e){
            alert(".Button--bugReported");           
        },  
        'click .Button--participate'(e){
            alert(".Button--participate");           
        },  
         
        
        
      'click .js-add-board': Popup.open('createBoard'),
      'click .js-star-board'(evt) {
        const boardId = this.currentData()._id;
        Meteor.user().toggleBoardStar(boardId);
        evt.preventDefault();
      },
      'click .js-accept-invite'() {
        const boardId = this.currentData()._id;
        Meteor.user().removeInvite(boardId);
      },
      'click .js-decline-invite'() {
        const boardId = this.currentData()._id;
        Meteor.call('quitBoard', boardId, (err, ret) => {
          if (!err && ret) {
            Meteor.user().removeInvite(boardId);
            FlowRouter.go('home');
          }
        });
      },
    }];
  },
}).register('programList');




BlazeComponent.extendComponent({

	  events() {
	    return [{
	      submit(evt) { 
		  	  
	      evt.preventDefault();
	      const program_name = this.find('.report-program_name-input').value.trim(); 
	      const program_logo = this.find('.report-program_logo-input').value.trim(); 
	      const description = this.find('.report-description-input').value.trim(); 
	      const program_summary = this.find('.report-program_summary-input').value.trim(); 
	      const program_type = this.find('.report-program_type-input').value.trim(); 
	      const program_url = this.find('.report-program_url-input').value.trim(); 

	        const boardId = this.currentData()._id;
	      console.log( boardId );
	      this.currentData().updateForm( {$set: {
      		archived: false,
    		program_name: program_name,
    		title: program_name,
    		program_logo: program_logo,
    		description: description,
    		program_summary: program_summary,
    		program_type: program_type,
    		program_url: program_url,
    		slug: program_url,
          }});
	        if (true) {
	        	 
	          
	            
	        } 

	        
	      },
	    }];
	  },
	}).register('addProgramFullForm');



