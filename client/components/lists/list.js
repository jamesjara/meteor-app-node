const { calculateIndex } = Utils;

BlazeComponent.extendComponent({
  // Proxy
  openForm(options) {
    this.childComponents('listBody')[0].openForm(options);
  },

  onCreated() {
    this.newCardFormIsVisible = new ReactiveVar(true);
  },

  
  onRendered2() {
    const boardComponent = this.parentComponent();
 

    function userIsMember() {
      return Meteor.user() && Meteor.user().isBoardMember();
    }
 

    // We want to re-run this function any time a card is added.
    this.autorun(() => {
      const currentBoardId = Tracker.nonreactive(() => {
        return Session.get('currentBoard');
      });
      Cards.find({ boardId: currentBoardId }).fetch();
      Tracker.afterFlush(() => {
        
      });
    });
  },
}).register('list');
