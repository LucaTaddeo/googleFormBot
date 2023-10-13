function createPollDialog() {
  return {
    "actionResponse": {
      "type": "DIALOG",
      "dialog_action": {
        "dialog": {
          "body": {
            "header": {
              "title": "Crea un sondaggio"
            },
            "fixedFooter": {
              "primaryButton": {
                "text": "Invia il sondaggio",
                "onClick": {
                  "action": {
                    "function": "submitPollCreation",
                  }
                }
              }
            },
            "sections": [
              {
                "widgets": [
                  {
                    "textParagraph": {
                      "text": "Usa questo form per inviare un sondaggio e chiedere le disponibilità agli altri! Creeremo automaticamente una opzione per ogni data compresa tra quelle che indicherai qui sotto!"
                    }
                  },
                ]
              },
              {
                "widgets": [
                  {
                    'dateTimePicker': {
                      'label': 'Primo giorno disponibile',
                      'name': 'first_date',
                      'type': 'DATE_ONLY',
                      'valueMsEpoch': getCurrentDayValueMsEpoch(),
                      'timezoneOffsetDate': 60
                    },
                  },
                ]
              },
              {
                "widgets": [
                  {
                    'dateTimePicker': {
                      'label': 'Ultimo giorno disponibile',
                      'name': 'last_date',
                      'type': 'DATE_ONLY',
                      'valueMsEpoch': getCurrentDayValueMsEpoch() + 86400000,
                      'timezoneOffsetDate': 60
                    },
                  },
                ]
              },
            ]
          }
        }
      }
    }
  };
}