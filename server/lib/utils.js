allowIsBoardAdmin = function(userId, board) {
  return board && board.hasAdmin(userId);
};

allowIsBoardMember = function(userId, board) {
  return board && board.hasMember(userId);
};

//TODO - complete the funciton
allowIsHackerRole = function(userId, board) {

  var valid = false;
  // only hacker can update add as participants
  if(Roles.userIsInRole(userId, ['hacker'])){
	valid = true;
  }
  console.log(" utils.allowIsHackerRole(userId, boar);", userId,  board.hasMember(userId), 'role->', valid);
  
  return valid;
  return valid && board && board.hasMember(userId);
};
