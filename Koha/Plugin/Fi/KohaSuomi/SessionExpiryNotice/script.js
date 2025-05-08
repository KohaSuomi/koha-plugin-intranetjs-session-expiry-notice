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
            if(!alert('Istunto vanhenee klo ' + timeoutTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +'. Paina OK ja tee Kohassa jokin toiminto esim. etusivun lataaminen jatkaaksesi istuntoa.')) {
  
            }
        }
        // Check if timeoutTime has gone and display new message
        if (currentTime > timeoutTime && timeoutAlertStatus != 2){
            localStorage.setItem('KohaTimeoutAlertStatus', 2);
            if(!alert('Istunto vanhentunut klo ' + timeoutTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +'. Paina OK ja kirjaudu uudelleen Kohaan.')) {
              window.location.href = window.location.href;
            }
        }
      }
    
  
      // Call the checkLastAccessedTime function every minute
      setInterval(checkLastAccessedTime, 60000);
    }
  });