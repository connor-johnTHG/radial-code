document.addEventListener('DOMContentLoaded', function() {
    let nexusTimeout;

    function openNexus() {
        var menu = document.getElementById('nexus-menu');
        if (!menu.classList.contains('active')) {
            menu.classList.add('active');
        }
    }

    function toggleNexus() {
        var menu = document.getElementById('nexus-menu');
        var btn = document.getElementById('nexus-btn');
        var anyOpen = document.querySelector('.nexus-section.active');

        if (anyOpen) {
            menu.classList.remove('active');
            btn.textContent = 'NEXUS';
            document.querySelectorAll('.nexus-section').forEach(function(section) {
                section.classList.remove('active');
            });
            localStorage.removeItem('tierlist-save');
            document.body.classList.remove('nexus-active');
        } else if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            btn.textContent = 'NEXUS';
            document.body.classList.remove('nexus-active');
        } else {
            menu.classList.add('active');
            btn.textContent = 'PRESS';
            document.body.classList.add('nexus-active');
        }
    }

    function showSection(sectionId) {
        clearTimeout(nexusTimeout);
        document.querySelectorAll('.nexus-section').forEach(function(section) {
            section.classList.remove('active');
        });
        document.getElementById('nexus-menu').classList.remove('active');

        if (sectionId !== 'tier-list') {
            localStorage.removeItem('tierlist-save');
        }

        setTimeout(function() {
            document.getElementById(sectionId).classList.add('active');
        }, 100);
    }

    window.openNexus = openNexus;
    window.toggleNexus = toggleNexus;
    window.showSection = showSection;
});
