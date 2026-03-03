document.addEventListener('DOMContentLoaded', function() {
    let moodTimeout;

    let savedMood = localStorage.getItem('mood') || 'default';
    if (savedMood) {
        document.body.classList.add(savedMood);
    }

    function setMood(mood) {
        clearTimeout(moodTimeout);
        document.body.classList.remove('cozy', 'default', 'sleepy', 'nature', 'green');
        document.body.classList.add(mood);
        localStorage.setItem('mood', mood);
        document.getElementById('mood-menu').classList.remove('active');
    }

    function toggleMood() {
        var menu = document.getElementById('mood-menu');
        menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            moodTimeout = setTimeout(function() {
                menu.classList.remove('active');
            }, 2000);
        } else {
            clearTimeout(moodTimeout);
        }
    }

    window.setMood = setMood;
    window.toggleMood = toggleMood;
});