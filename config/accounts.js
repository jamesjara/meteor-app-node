const passwordField = AccountsTemplates.removeField('password');
const emailField = AccountsTemplates.removeField('email');

AccountsTemplates.addFields([ {
	  _id: "name",
	  type: "text",
	  options: {
	  extraCls:"inputLeft",
	    special: true
	  }
	}, {
	  _id: "lastname",
	  type: "text",
	  options: {
	  extraCls:"inputRight",
	    special: true
	  }
	}, {
	  _id: "program",
	  type: "text"
	},{
	  _id: 'username',
	  type: 'text',
	  displayName: 'username',  
	  required: true,
	  minLength: 2,
	  options: {
	    special: true
	  }
	}, emailField, passwordField]);

AccountsTemplates.configure({
	defaultLayout: 'landpage',
	 // defaultLayout: 'userFormsLayout',
  
  defaultContentRegion: 'content',
  confirmPassword: false,
  enablePasswordChange: true,
  sendVerificationEmail: true,
  showForgotPasswordLink: true,
  onLogoutHook() {
    const homePage = 'home';
    if (FlowRouter.getRouteName() === homePage) {
      FlowRouter.reload();
    } else {
      FlowRouter.go(homePage);
    }
  },
});

['signIn', 'signUp', 'resetPwd', 'forgotPwd', 'enrollAccount'].forEach(
  (routeName) => AccountsTemplates.configureRoute(routeName));

// We display the form to change the password in a popup window that already
// have a title, so we unset the title automatically displayed by useraccounts.
AccountsTemplates.configure({
  texts: {
    title: {
      changePwd: '',
    },
  },
});

AccountsTemplates.configureRoute('changePwd', {
  redirect() {
    // XXX We should emit a notification once we have a notification system.
    // Currently the user has no indication that his modification has been
    // applied.
    Popup.back();
  },
});

if (Meteor.isServer) {
	var mySubmitFunc = function(userId, info) {
		  if (userId) {
			Roles.addUsersToRoles(userId, ['hacker','profile','participant','report']); 	
			Roles.addUsersToRoles([userId], ['hacker','profile','participant','report']); 		
		  }
		};

		AccountsTemplates.configure({
		  postSignUpHook : mySubmitFunc
		});

	  if (process.env.MAIL_FROM) {
	    Accounts.emailTemplates.from = process.env.MAIL_FROM;
	  } 
	  
  ['resetPassword-subject', 'resetPassword-text', 'verifyEmail-subject', 'verifyEmail-text', 'enrollAccount-subject', 'enrollAccount-text'].forEach((str) => {
    const [templateName, field] = str.split('-');
    Accounts.emailTemplates[templateName][field] = (user, url) => {
      return TAPi18n.__(`email-${str}`, {
        url,
        user: user.getName(),
        siteName: Accounts.emailTemplates.siteName,
      }, user.getLanguage());
    };
  });
}
