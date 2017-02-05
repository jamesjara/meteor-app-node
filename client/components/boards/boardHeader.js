Template.boardMenuPopup.events({
  'click .js-rename-board': Popup.open('boardChangeTitle'),
  'click .js-open-archives'() {
    Sidebar.setView('archives');
    Popup.close();
  },
  'click .js-change-board-color': Popup.open('boardChangeColor'),
  'click .js-change-language': Popup.open('changeLanguage'),
  'click .js-archive-board ': Popup.afterConfirm('archiveBoard', function() {
    const currentBoard = Boards.findOne(Session.get('currentBoard'));
    currentBoard.archive();
    // XXX We should have some kind of notification on top of the page to
    // confirm that the board was successfully archived.
    FlowRouter.go('home');
  }),
});

Template.boardMenuPopup.helpers({
  exportUrl() {
    const boardId = Session.get('currentBoard');
    const loginToken = Accounts._storedLoginToken();
    return FlowRouter.url(`api/boards/${boardId}?authToken=${loginToken}`);
  },
  exportFilename() {
    const boardId = Session.get('currentBoard');
    return `spartug-export-board-${boardId}.json`;
  },
});

Template.boardChangeTitlePopup.events({
  submit(evt, tpl) {
    const newTitle = tpl.$('.js-board-name').val().trim();
    const newDesc = tpl.$('.js-board-desc').val().trim();
    if (newTitle) {
      this.rename(newTitle);
      this.setDesciption(newDesc);
      Popup.close();
    }
    evt.preventDefault();
  },
});

BlazeComponent.extendComponent({
  watchLevel() {
    const currentBoard = Boards.findOne(Session.get('currentBoard'));
    return currentBoard && currentBoard.getWatchLevel(Meteor.userId());
  },

  isStarred() {
    const boardId = Session.get('currentBoard');
    const user = Meteor.user();
    return user && user.hasStarred(boardId);
  },

  isMiniScreen() {
    return Utils.isMiniScreen();
  },

  // Only show the star counter if the number of star is greater than 2
  showStarCounter() {
    const currentBoard = Boards.findOne(Session.get('currentBoard'));
    return currentBoard && currentBoard.stars >= 2;
  },

  events() {
    return [{
      'click .js-edit-board-title': Popup.open('boardChangeTitle'),
      'click .js-star-board'() {
        Meteor.user().toggleBoardStar(Session.get('currentBoard'));
      },
      'click .js-open-board-menu': Popup.open('boardMenu'),
      'click .js-change-visibility': Popup.open('boardChangeVisibility'),
      'click .js-watch-board': Popup.open('boardChangeWatch'),
      'click .js-open-filter-view'() {
        Sidebar.setView('filter');
      },
      'click .js-filter-reset'(evt) {
        evt.stopPropagation();
        Sidebar.setView();
        Filter.reset();
      },
      'click .js-multiselection-activate'() {
        const currentCard = Session.get('currentCard');
        MultiSelection.activate();
        if (currentCard) {
          MultiSelection.add(currentCard);
        }
      },
      'click .js-multiselection-reset'(evt) {
        evt.stopPropagation();
        MultiSelection.disable();
      },
      'click .js-log-in'() {
        FlowRouter.go('atSignIn');
      },
    }];
  },
}).register('boardHeaderBar');

BlazeComponent.extendComponent({
  backgroundColors() {
    return Boards.simpleSchema()._schema.color.allowedValues;
  },

  isSelected() {
    const currentBoard = Boards.findOne(Session.get('currentBoard'));
    return currentBoard.color === this.currentData().toString();
  },

  events() {
    return [{
      'click .js-select-background'(evt) {
        const currentBoard = Boards.findOne(Session.get('currentBoard'));
        const newColor = this.currentData().toString();
        currentBoard.setColor(newColor);
        evt.preventDefault();
      },
    }];
  },
}).register('boardChangeColorPopup');

BlazeComponent.extendComponent({
  onCreated() {
    this.visibilityMenuIsOpen = new ReactiveVar(false);
    this.visibility = new ReactiveVar('private');
  },

  visibilityCheck() {
    return this.currentData() === this.visibility.get();
  },

  setVisibility(visibility) {
    this.visibility.set(visibility);
    this.visibilityMenuIsOpen.set(false);
  },

  toggleVisibilityMenu() {
    this.visibilityMenuIsOpen.set(!this.visibilityMenuIsOpen.get());
  },

  onSubmit(evt) {
    evt.preventDefault();
    const title = this.find('.js-new-board-title').value;
    const visibility = this.visibility.get();

    const boardId = Boards.insert({ 
		permission: visibility, 
        "title" : title,
        "permission" : "public", 
        "slug" : title.replace(' ',''), 
        "archived" : false,        
        "stars" : 0, 
        "labels" : [ 
            { "color" : "green", "_id" : "bLp7za", "name" : "" }, 
            { "color" : "yellow", "_id" : "pELcTf", "name" : "" }, 
            { "color" : "orange", "_id" : "zGsrGi", "name" : "" }, 
            { "color" : "red", "_id" : "SxtpmT", "name" : "" }, 
            { "color" : "purple", "_id" : "GQfs4A", "name" : "" }, 
            { "color" : "blue", "_id" : "KrXgbh", "name" : "" } 
            ], 
        "color" : "belize",
        "permission": "public",
        "program_name": title,
        "program_logo": "https://profile-photos.hackerone-user-content.com/production/000/000/177/45c11ab6339e6638918dcee97e3db9cc41b2f19c_large.png?1398764641",
        "program_total_bugs": "567567",
        "program_bounty_minimun": "000",
        "program_bounty_maximun": "111",
        "title": "title",
        "description": "title",
        "program_summary": "program_summary",
        "program_type": "program_type",
        "program_url" : title.replace(' ','')
      
    });

    Utils.goBoardId(boardId);

    // Immediately star boards crated with the headerbar popup.
    Meteor.user().toggleBoardStar(boardId);
  },

  events() {
    return [{
      'click .js-select-visibility'() {
        this.setVisibility(this.currentData());
      },
      'click .js-change-visibility': this.toggleVisibilityMenu,
      'click .js-import': Popup.open('boardImportBoard'),
      submit: this.onSubmit,
    }];
  },
}).register('createBoardPopup');

BlazeComponent.extendComponent({
  visibilityCheck() {
    const currentBoard = Boards.findOne(Session.get('currentBoard'));
    return this.currentData() === currentBoard.permission;
  },

  selectBoardVisibility() {
    const currentBoard = Boards.findOne(Session.get('currentBoard'));
    const visibility = this.currentData();
    currentBoard.setVisibility(visibility);
    Popup.close();
  },

  events() {
    return [{
      'click .js-select-visibility': this.selectBoardVisibility,
    }];
  },
}).register('boardChangeVisibilityPopup');

BlazeComponent.extendComponent({
  watchLevel() {
    const currentBoard = Boards.findOne(Session.get('currentBoard'));
    return currentBoard.getWatchLevel(Meteor.userId());
  },

  watchCheck() {
    return this.currentData() === this.watchLevel();
  },

  events() {
    return [{
      'click .js-select-watch'() {
        const level = this.currentData();
        Meteor.call('watch', 'board', Session.get('currentBoard'), level, (err, ret) => {
          if (!err && ret) Popup.close();
        });
      },
    }];
  },
}).register('boardChangeWatchPopup');
