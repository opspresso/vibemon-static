// Simple JavaScript application
document.addEventListener('DOMContentLoaded', function() {
    const appDiv = document.getElementById('app');
    const currentTime = new Date().toLocaleString();
    
    appDiv.innerHTML = `
        <h2>Welcome!</h2>
        <p>This page is being served from the docs folder.</p>
        <p>Current time: <strong>${currentTime}</strong></p>
        <p>Server is working correctly!</p>
    `;
    
    console.log('App loaded successfully at', currentTime);
});
