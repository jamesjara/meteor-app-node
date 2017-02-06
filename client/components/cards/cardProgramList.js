const subManager = new SubsManager();

BlazeComponent.extendComponent({
	
 
  cards() {   

    return   Cards.find().fetch();
  },
  

  onCreated() {  
      this.subscribe('myProgramCards');
  },

  
}).register('cardProgramList');
