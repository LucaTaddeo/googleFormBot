function createAnswerPollCard(startDate, endDate) {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  const days = getDaysInRange(startDateObj, endDateObj);

  const sections = [];

  const votes = [];

  for (var i = 0; i < days.length; i++) {
    votes.push({
      "counter": [],
      "names": []
    });
  }

  for (var i = 0; i < days.length; i++) {
    sections.push(createSingleDateSection(getDateString(days[i]), i, votes, days));
  }

  return {
    "actionResponse": {
      "type": "NEW_MESSAGE"
    },
    "text": "<users/all> Nuovo sondaggio!",
    "cardsV2": [{
      "cardId": "survey-" + new Date().toString(),
      "card": {
        "header": {
          "title": "Prossimo Direttivo"
        },
        "sections": sections
      }
    }]
  };
}

function updateAnswerPollCard(votes, days) {
  const newDays = JSON.parse(days);
  const sections = [];

  for (var i = 0; i < newDays.length; i++) {
    sections.push(createSingleDateSection(getDateString(new Date(newDays[i])), i, votes, newDays));
  }

  var maxIndex = -1;
  var maxIndexes = []
  var maxItemCount = -1;

  for (var i = 0; i < votes.length; i++) {
    var count = votes[i].counter.length;
    if (count > 0) {
      if (count > maxItemCount) {
        maxItemCount = count;
        maxIndex = i;
        maxIndexes = [i]
      } else if (count === maxItemCount) {
        maxIndexes = [...maxIndexes, i]
      }
    }
  }

  var bestOptions = "";

  for (var i = 0; i < maxIndexes.length; i++) {
    bestOptions += getShortDateString(new Date(newDays[maxIndexes[i]]));
    if (i < maxIndexes.length - 1) {
      bestOptions += ", ";
    }
  }

  return {
    "actionResponse": {
      "type": "UPDATE_MESSAGE"
    },
    "text": "<users/all> Nuovo sondaggio!",
    "cardsV2": [{
      "cardId": "survey-" + new Date().toString(),
      "card": {
        "header": {
          "title": "Prossimo Direttivo"
        },
        "sections": [
          ...sections,
          {
            "header": "Opzione migliore (finora, con "+maxItemCount.toString()+" presenti)",
            "widgets": [
              {
                "textParagraph": {
                  "text": bestOptions
                }
              }
            ]
          },
        ]
      }
    }]
  };
}


function createSingleDateSection(day, i, votes, days) {
  return {
    "header": day,
    "collapsible": votes[i].names?.length > 0,
    "uncollapsibleWidgetsCount": 1,
    "widgets": [
      {
        "columns": {
          "columnItems": [
            {
              "widgets": [
                {
                  "textParagraph": {
                    "text": "Presenti: " + votes[i]?.counter?.length.toString()
                  }
                },
              ]
            },
            {
              "horizontalAlignment": "END",
              "widgets": [
                {
                  "buttonList": {
                    "buttons": [
                      {
                        "text": "Ci Sono!",
                        "onClick": {
                          "action": {
                            "function": "handleVote",
                            "parameters": [
                              {
                                "key": "day",
                                "value": i.toString()
                              },
                              {
                                "key": "votes",
                                "value": JSON.stringify(votes)
                              },
                              {
                                "key": "days",
                                "value": JSON.stringify(days)
                              }
                            ]
                          }
                        }
                      },
                      {
                        "text": "Annulla",
                        "onClick": {
                          "action": {
                            "function": "handleRemoveVote",
                            "parameters": [
                              {
                                "key": "day",
                                "value": i.toString()
                              },
                              {
                                "key": "votes",
                                "value": JSON.stringify(votes)
                              },
                              {
                                "key": "days",
                                "value": JSON.stringify(days)
                              }
                            ]
                          }
                        }
                      }
                    ]
                  },
                },
              ]
            }
          ],
        }
      },
      votes[i].names?.length > 0 ? {
        "textParagraph": {
          "text": votes[i]?.names?.join(", ")
        }
      } : {}
    ]
  };
}