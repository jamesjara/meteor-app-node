let previousPath;
FlowRouter.triggers.exit([({path}) => {
  previousPath = path;
}]);

isSuperAdmin = false;


FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    Session.set('currentBoard', null);
    Session.set('currentCard', null);
 	Session.set('module', 'home');

    Filter.reset();
    EscapeActions.executeAll();
    Tracker.autorun(function() { 
    var hasProgram =  Meteor.user();

    if(Meteor.user()){ 
        //console.log("hasProgram", Roles.userIsInRole(Meteor.user()._id, ['program']) );
    	 if(Roles.userIsInRole(Meteor.user()._id, ['program'])){
		        BlazeLayout.render('defaultLayout', {
		            headerBar: 'programListHeaderBar',
		            content: 'programList',
		        });  
    	 } else {
		        BlazeLayout.render('defaultLayout', {
		            headerBar: 'boardListHeaderBar',
		            content: 'boardList',
		        });     	
		    }
    }
    	 
    
    });
  },
});

FlowRouter.route('/reports', {
  name: 'cards',
  action(params) { 
	  
	  
	    Tracker.autorun(function() { 
	        var hasProgram =  Meteor.user();

	        if(Meteor.user()){ 
	            //console.log("hasProgram", Roles.userIsInRole(Meteor.user()._id, ['program']) );
	        	 if(Roles.userIsInRole(Meteor.user()._id, ['program'])){
	        		 	Session.set('module', 'program-reports'); 
	        		    BlazeLayout.render('defaultLayout', {
	        		      //headerBar: 'boardHeaderBar',
	        		      content: 'cardProgramList',
	        		    });  
	        	 } else {
	        		 	Session.set('module', 'reports'); 
	        		    BlazeLayout.render('defaultLayout', {
	        		      //headerBar: 'boardHeaderBar',
	        		      content: 'cardList',
	        		    });  	
	    		    }
	        }
	        	 
	        
	        });
	    
	    

  },
});
 

FlowRouter.route('/:boardId/:tab?', {
  name: 'board',
  action(params) {

	//const currentProgramData = Boards.findOne({ program_url: params.program_url });
	    //const currentBoard = currentProgramData._id;
	 const currentBoard = params.boardId;
	    
	     
    const previousBoard = Session.get('currentBoard');
    Session.set('currentBoard', currentBoard);
    Session.set('currentCard', null);
 	Session.set('module', 'board');

    // If we close a card, we'll execute again this route action but we don't
    // want to excape every current actions (filters, etc.)
    if (previousBoard !== currentBoard) {
      EscapeActions.executeAll();
    } else {
      EscapeActions.executeUpTo('popup-close');
    } 
	
	Session.set('showInformationTab', null);
	Session.set('showActivitiesTab', null);	
	Session.set('showHalloffameTab', null);
	
	if(params.tab){
		if(params.tab=='activities'){
			Session.set('showActivitiesTab', true);
		} else if(params.tab=='halloffame'){
			Session.set('showHalloffameTab', true);
		}
	} else {
		Session.set('showInformationTab', true);		
	}


    BlazeLayout.render('defaultLayout', {
      headerBar: 'boardHeaderBar',
      content: 'board',
    });
  },
});

 
FlowRouter.route('/new-report/:boardId/:slug/', {
  name: 'list',
  action(params) {
      EscapeActions.executeUpTo('inlinedForm');
  

     	Session.set('currentCard', null);
     	Session.set('module', 'newCard');
    	    Session.set('currentBoard', params.boardId);  

    	    BlazeLayout.render('defaultLayout', {
    	      headerBar: 'boardHeaderBar',
    	      content: 'board',
    	    });
    	  },
  }); 
 

FlowRouter.route('/report/:boardId/:slug/:cardId', {
  name: 'card',
  action(params) {
    EscapeActions.executeUpTo('inlinedForm'); 

    console.log("/report/:boardId/:slug/:cardId" , params);
    
    Session.set('currentBoard', params.boardId);
    Session.set('currentCard', params.cardId);
 	Session.set('module', 'card');

    BlazeLayout.render('defaultLayout', {
      headerBar: 'boardHeaderBar',
      content: 'board',
    });
  },
});




FlowRouter.route('/shortcuts', {
  name: 'shortcuts',
  action() {
    const shortcutsTemplate = 'keyboardShortcuts';

    EscapeActions.executeUpTo('popup-close');

    if (previousPath) {
      Modal.open(shortcutsTemplate, {
        header: 'shortcutsModalTitle',
        onCloseGoTo: previousPath,
      });
    } else {
      BlazeLayout.render('defaultLayout', {
        headerBar: 'shortcutsHeaderBar',
        content: shortcutsTemplate,
      });
    }
  },
});

FlowRouter.route('/import', {
  name: 'import',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn,
    () => {
      Session.set('currentBoard', null);
      Session.set('currentCard', null);

      Filter.reset();
      EscapeActions.executeAll();
    },
  ],
  action() {
    BlazeLayout.render('defaultLayout', {
      headerBar: 'importHeaderBar',
      content: 'import',
    });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('defaultLayout', { content: 'notFound' });
  },
};

/*
// We maintain a list of redirections to ensure that we don't break old URLs
// when we change our routing scheme.
const redirections = {
  '/boards': '/',
  '/boards/:id/:slug': '/b/:id/:slug',
  '/boards/:id/:slug/:cardId': '/b/:id/:slug/:cardId',
};

_.each(redirections, (newPath, oldPath) => {
  FlowRouter.route(oldPath, {
    triggersEnter: [(context, redirect) => {
      redirect(FlowRouter.path(newPath, context.params));
    }],
  });
});

*/


