document.addEventListener('DOMContentLoaded', function() {
    function searchPlayer() {
        var gamertag = document.getElementById('gamertag-input').value.trim();
        var resultsDiv = document.getElementById('stats-results');
        if (!gamertag) {
            resultsDiv.innerHTML = '<p style="color:#ff4444;">Please enter a gamertag!</p>';
            return;
        }
        window.open('https://tracker.gg/marvel-rivals/profile/ign/' + gamertag + '/overview', '_blank');
    }

    document.getElementById('apex-img').addEventListener('click', function() {
        window.open('https://steamcharts.com/app/1172470', '_blank');
    });

    document.getElementById('rivals-img').addEventListener('click', function() {
        window.open('https://steamcharts.com/app/2767030', '_blank');
    });

    // expose functions to HTML onclick attributes
    window.searchPlayer = searchPlayer;
});