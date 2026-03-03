document.addEventListener('DOMContentLoaded', function() {
        const times = [
        { time: "9:00 AM",  default: " Wake up " },
        { time: "10:00 AM", default: " Actually Wake up " },
        { time: "11:00 AM", default: " Start Work" },
        { time: "12:00 PM", default: " Work" },
        { time: "1:00 PM",  default: " Play Rivals " },
        { time: "2:00 PM",  default: " Pet Duke " },
        { time: "3:00 PM",  default: " Work" },
        { time: "4:00 PM",  default: " Finish Work " },
        { time: "5:00 PM",  default: " First Dinner " },
        { time: "6:00 PM",  default: " Walk With Duke " },
        { time: "7:00 PM",  default: " Start Rivals " },
        { time: "8:00 PM",  default: " Rivals " },
        { time: "9:00 PM",  default: " Rivals " },
        { time: "10:00 PM", default: " Walk Duke " },
        { time: "11:00 PM", default: " Second Dinner " },
        { time: "12:00 AM", default: " Pass Out " }
    ];

    const tbody = document.getElementById("planner-body");
    times.forEach(function(time, i) {
        var row = document.createElement("tr");
        var timeCell = document.createElement("td");
        timeCell.textContent = time.time;
        var inputCell = document.createElement("td");
        var input = document.createElement("input");
        input.type = "text";
        var saved = localStorage.getItem("planner-" + i) || time.default;
        if (saved) { input.value = saved; }
        input.onchange = function() {
            localStorage.setItem("planner-" + i, input.value);
        };
        inputCell.appendChild(input);
        row.appendChild(timeCell);
        row.appendChild(inputCell);
        tbody.appendChild(row);
    });

    function checkMidnightReset() {
        var lastReset = localStorage.getItem('last-reset');
        var now = new Date();
        var today = now.toDateString();

        if (lastReset !== today) {
            times.forEach(function(time, i) {
                localStorage.removeItem('planner-' + i);
            });
            localStorage.setItem('last-reset', today);
            var inputs = document.querySelectorAll('#planner-body input');
            inputs.forEach(function(input, i) {
                input.value = times[i].default;
            });
        }
    }
    checkMidnightReset();
    setInterval(checkMidnightReset, 60000);

});