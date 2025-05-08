// Ilmoitus istunnon vanhenemisesta
$(document).ready(function() {
    if ($('body#main_auth').length == 0) {
      const timeoutLength = REPLACE_BY_CONFIG_PARAM_A;
      let timeoutTime = new Date();
      timeoutTime.setSeconds(timeoutTime.getSeconds() + timeoutLength);
      localStorage.setItem('KohaTimeoutAlertStatus', 0);
      localStorage.setItem('KohaTimeoutTime', timeoutTime);
      // Function to check if the last accessed time is still valid
      function checkLastAccessedTime() {
        let currentTime = new Date();
        let timeoutAlertStatus = localStorage.getItem('KohaTimeoutAlertStatus');
        let timeoutTime = new Date(localStorage.getItem('KohaTimeoutTime'));
        let timeDifference = timeoutTime - currentTime;
        let minutesDifference = Math.floor(timeDifference / 60000); // Convert milliseconds to minutes  
        
        // Check if there are 5 minutes left
        if (minutesDifference <= 5 && timeoutAlertStatus == 0) {
            localStorage.setItem('KohaTimeoutAlertStatus', 1);
            let userLanguage = $('html').attr('lang') || 'fi-FI'; // Default to English if language is not set
            let warningMessage;

            if (userLanguage === 'fi-FI') {
              warningMessage = 'Istunto vanhenee klo ' + timeoutTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + '. Paina OK ja tee Kohassa jokin toiminto esim. etusivun lataaminen jatkaaksesi istuntoa.';
            } else if (userLanguage === 'sv-SE') {
              warningMessage = 'Sessionen går ut kl. ' + timeoutTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + '. Tryck på OK och gör något i Koha, till exempel ladda om startsidan, för att fortsätta sessionen.';
            } else {
              warningMessage = 'Session will expire at ' + timeoutTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + '. Press OK and perform an action in Koha, such as reloading the homepage, to continue the session.';
            }

            if (!alert(warningMessage)) {
              // No action needed here, alert is just for notification
            }
        }
        // Check if timeoutTime has gone and display new message
        if (currentTime > timeoutTime && timeoutAlertStatus != 2){
            localStorage.setItem('KohaTimeoutAlertStatus', 2);
            let userLanguage = $('html').attr('lang') || 'fi-FI'; // Default to English if language is not set
            let timeoutMessage;

            if (userLanguage === 'fi-FI') {
              timeoutMessage = 'Istunto vanhentunut klo ' + timeoutTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + '. Paina OK ja kirjaudu uudelleen Kohaan.';
            } else if (userLanguage === 'sv-SE') {
              timeoutMessage = 'Sessionen gick ut kl. ' + timeoutTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + '. Tryck på OK och logga in på Koha igen.';
            } else {
              timeoutMessage = 'Session expired at ' + timeoutTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + '. Press OK and log in to Koha again.';
            }

            if (!alert(timeoutMessage)) {
              window.location.href = window.location.href;
            }
        }
      }
    
  
      // Call the checkLastAccessedTime function every minute
      setInterval(checkLastAccessedTime, 60000);
    }
  });