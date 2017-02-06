const subManager = new SubsManager();

BlazeComponent.extendComponent({
  onCreated() {
    this.draggingActive = new ReactiveVar(false);
    this.showOverlay = new ReactiveVar(false);
    this.isBoardReady = new ReactiveVar(false);

    // The pattern we use to manually handle data loading is described here:
    // https://kadira.io/academy/meteor-routing-guide/content/subscriptions-and-data-management/using-subs-manager
    // XXX The boardId should be readed from some sort the component "props",
    // unfortunatly, Blaze doesn't have this notion.
    this.autorun(() => {
      const currentBoardId = Session.get('currentBoard');
      
      console.log("currentBoardId" , currentBoardId);
      if (!currentBoardId)
        return;
      const handle = subManager.subscribe('board', currentBoardId);
      Tracker.nonreactive(() => {
        Tracker.autorun(() => {
            
            console.log("currentBoardId  Tracker.autoru");
          this.isBoardReady.set(handle.ready());  
        });
      });
    });

    this._isDragging = false;
    this._lastDragPositionX = 0;

    // Used to set the overlay
    this.mouseHasEnterCardDetails = false;
  },



  	  
  openNewListForm() {
    this.childComponents('addListForm')[0].open();
  },
 
  currentCardIsInThisList() { 
	 
	  console.log("currentCardIsInThisList");
	  
    const currentCard = Cards.findOne(Session.get('currentCard'));
    const listId = this.currentData()._id;
    return currentCard && currentCard.listId === listId;
  },
	  
 onlyShowCurrentCard() {
		   // return Utils.isMiniScreen() &&
		    return Session.get('currentCard');
		  },

  events() {
    return [{
      // XXX The board-overlay div should probably be moved to the parent
      // component.
      'mouseenter .board-overlay'() {
        if (this.mouseHasEnterCardDetails) {
          this.showOverlay.set(false);
        }
      }
    }];
  },
}).register('board');



	  
 

	  

	  BlazeComponent.extendComponent({
		  
 
		  newCard() { 
			    return Session.get('module') == 'newCard';
			  }, 

	  }).register('boardBody');
	  
	  
BlazeComponent.extendComponent({
  // Proxy
  open() {
    this.childComponents('inlinedForm')[0].open();
  },

  events() {
    return [{
      submit(evt) {
        evt.preventDefault();
        const titleInput = this.find('.list-name-input');
        const title = titleInput.value.trim();
        if (title) {
          Lists.insert({
            title,
            boardId: Session.get('currentBoard'),
            sort: $('.list').length,
          });

          titleInput.value = '';
          titleInput.focus();
        }
      },
    }];
  },
}).register('addListForm');


BlazeComponent.extendComponent({

	  events() {
	    return [{
	      submit(evt) { 
		  	  
	      evt.preventDefault();
	      const title = this.find('.report-title-input').value.trim();
	      const vulnerabilidad = this.find('.report-vulnerabilidad-input').value.trim();
	      const typebug = this.find('.report-typebug-input').value.trim();
	      const risk = this.find('.report-risk-input').value.trim();
	      const description = this.find('.report-description-input').value.trim();
	      const poc = this.find('.report-poc-input').value.trim();
	      

	        if (true) {
 

	          Cards.insert({
	              title: title,
	              vulnerabilidad: vulnerabilidad,
	              typebug: typebug,
	              risk: risk,
	              description: description, 
	              poc: poc,
	              // internal changes
	              status: 'en espera',
	              code: 123,
	              userId: Meteor.user()._id,
	              listId: this.currentData()._id,
	              boardId: Session.get('currentBoard')
	          });    
	          
	          FlowRouter.go('/reports'); 
	        } 

	        
	      },
	    }];
	  },
	}).register('addCardFullForm');



 

