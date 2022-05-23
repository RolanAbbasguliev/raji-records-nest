var loadClient = document.getElementById("load-info-client");

window.onload = function (e) {
    var sample = localStorage.getItem("loadTime");
    if (sample == null) {
        localStorage.setItem("loadTime", new Date().getTime());
        window.location.reload(true);
    } else {
        var loadingTime = new Date().getTime() - sample;


        loadClient.innerHTML = 'Total load time: ' + loadingTime + 'ms(client) +';
        localStorage.removeItem("loadTime");
    }
}


