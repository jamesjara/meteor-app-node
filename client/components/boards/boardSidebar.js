const reportsPerPage = 20;

BlazeComponent.extendComponent({
  onCreated() {
  
  
  // 1. Initialization

  var instance = this;

  // initialize the reactive variables
  this.loaded = new ReactiveVar(0);
  //this.limit = new ReactiveVar(5);
  
  
    this.autorun(() => {

    // get the limit
    var limit = 100;	
     var subscription =  this.subscribe('reports', () => { });
	 
	 	// if subscription is ready, set limit to newLimit
		if (subscription.ready()) {
		  console.log("> Received "+limit+" posts. \n\n")
		  instance.loaded.set(limit);
		} else {
		  console.log("> Subscription is not ready yet. \n\n");
		}	 
    });
	
  },
 
}).register('boardSidebar');

Template.boardSidebar.helpers({
  
  bugs: function() {
    return 140;
  },
  
  puntos: function() {
    return 140;
  },
  
  top: function() {
    return 1 ;
  },
  
  reports() { 
		return Activities.find({
			activityType:  { $eq: "report" } 
		  }, {
			limit: 4,
			sort: {createdAt: -1},
		  });
  },
  
  top3hackers() { 
	return Users.find({
		//"roles":  { "$in": ["hacker"] } 
	}, {
		limit: 3,
		sort: {createdAt: -1},
	});
  } 
  
});
