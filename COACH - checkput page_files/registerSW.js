var swscript = document.getElementById("sw");

if ("serviceWorker" in navigator) {
    window.addEventListener('load', function() {
        // Registering Service Worker
        if (navigator.serviceWorker.controller) {
            console.log("Active service worker found, no need to register");
        } else {
            // Register the service worker
            navigator.serviceWorker
            .register(swscript.getAttribute('data-swurl'))
            .then(function () {  
                console.log("Service worker has been registered");
            });
        }

        // Have service work trim caches
        if (navigator.serviceWorker.controller != null) {
            navigator.serviceWorker.controller.postMessage({'command': 'trimCaches'});
        }
    });   
}