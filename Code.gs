/**
* Responds to a MESSAGE event in Google Chat.
*
* @param {Object} event the event object from Chat API.
*
* @return {Object} open a Dialog in response to a slash command
* or a card"s button click.
*/
function onMessage(event) {
  if (event.message.slashCommand) {
    switch (event.message.slashCommand.commandId) {
      case 1:
        return createPollDialog();
    }
  }
}


/**
* Responds to a CARD_CLICKED event in Google Chat.
*
* @param {Object} event the event object from Google Chat
*/
function onCardClick(event) {
  if (event.common.invokedFunction === "handleRemoveVote") {
    const user = event.user;
    const params = event.common.parameters;
    const indexToUpdate = parseInt(params.day);

    const days = params.days

    const oldVotes = JSON.parse(params.votes);

    var newVotes = oldVotes;

    if (newVotes[indexToUpdate].counter.includes(user.email)) {
      newVotes[indexToUpdate] = {
        "counter": newVotes[indexToUpdate].counter.filter(email => email !== user.email),
        "names": newVotes[indexToUpdate].names.filter(name => name !== user.displayName)
      }
    }

    return updateAnswerPollCard(newVotes, days);
  }

  if (event.common.invokedFunction === "handleVote") {
    const user = event.user;
    const params = event.common.parameters;
    const indexToUpdate = parseInt(params.day);

    const days = params.days

    const oldVotes = JSON.parse(params.votes);

    var newVotes = oldVotes;

    if (!newVotes[indexToUpdate].counter.includes(user.email)) {
      newVotes[indexToUpdate] = {
        "counter": [user.email, ...newVotes[indexToUpdate].counter],
        "names": [user.displayName, ...newVotes[indexToUpdate].names]
      }
    }

    return updateAnswerPollCard(newVotes, days);
  }

  if (event.common.invokedFunction === "submitPollCreation") {
    const startDate = event.common.formInputs["first_date"][""]["dateInput"]["msSinceEpoch"];
    const endDate = event.common.formInputs["last_date"][""]["dateInput"]["msSinceEpoch"];

    return createAnswerPollCard(startDate, endDate);
  }

}
