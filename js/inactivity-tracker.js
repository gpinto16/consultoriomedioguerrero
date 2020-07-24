function inactivityTracker() {

    // Create an alert division
    var alertDiv = document.createElement("div");
    alertDiv.setAttribute("style", "position: absolute; top: 30%; left: 42.5%; width: 320px; border-radius: 5px; height: 45px; background-color: red; text-align: center; color:white; padding-top: 10px;");
    alertDiv.innerHTML = "Your session will expire in 59 seconds.";

    // Initialise a variable to store an alert and logout timer
    var alertTimer;
    var logoutTimer;

    // Set the timer thresholds in seconds
    var alertThreshold = 3540;
    var logoutThreshold = 60;

    // Start the timer
    window.onload = resetAlertTimer;

    // Ensure timer resets when activity logged
    registerActivityLoggers(resetAlertTimer);

    // ***** FUNCTIONS ***** //

    // Function to register activities for alerts
    function registerActivityLoggers(functionToCall) {
        document.onmousemove = functionToCall;
        document.onkeypress = functionToCall;
    }

    // Function to reset the alert timer
    function resetAlertTimer() {
        clearTimeout(alertTimer);
        alertTimer = setTimeout(sendAlert, alertThreshold * 1000);
    }

    // Function to start logout timer
    function startLogoutTimer() {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(logout, logoutThreshold * 1000);
    }

    // Function to logout
    function sendAlert() {

        // Send a logout alert
        document.body.appendChild(alertDiv);

        // Start the logout timer
        startLogoutTimer();

        // Reset everything if an activity is logged
        registerActivityLoggers(reset);
    }

    // Function to logout
    function logout() {
        if (window.location !== window.parent.location) {
            parent.logOutInactivity();
        } else {
            logOutInactivity();
        }
    }

    function logOutInactivity() {
        window.location.replace("/Login.html");
    }

    // Function to remove alert and reset logout timer
    function reset() {

        // Remove alert division
        alertDiv.parentNode.removeChild(alertDiv);

        // Clear the logout timer
        clearTimeout(logoutTimer);

        // Restart the alert timer
        document.onmousemove = resetAlertTimer;
        document.onkeypress = resetAlertTimer;
    }
};