$( document ).on( "pageinit", function( event ) {
    if (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i)) {
        $("body").addClass("ios7");
        $('body').append('<div id="ios7statusbar"/>');
    }
});

//iAds

        // If you want to prevent dragging, uncomment this section
        /*
         function preventBehavior(e) 
         { 
         e.preventDefault(); 
         };
         document.addEventListener("touchmove", preventBehavior, false);
         */
        
        var gLastAdLoadedDate = null;
        var gTotalAdsLoaded = 0;
        var gTimerId = null;
        
        function onBodyLoad()
        {
            document.addEventListener("deviceready", onDeviceReady,false);
        }
        
        function onOrientationChange()
        {
            //alert(window.orientation);
        }
        
        /* When this function is called, PhoneGap has been initialized and is ready to roll */
        function onDeviceReady()
        {
            // listen for orientation changes
            window.addEventListener("orientationchange", window.plugins.iAd.orientationChanged, false);
            // listen for the "iAdBannerViewDidLoadAdEvent" that is sent by the iAd
            document.addEventListener("iAdBannerViewDidLoadAdEvent", iAdBannerViewDidLoadAdEventHandler, false);
            // listen for the "iAdBannerViewDidFailToReceiveAdWithErrorEvent" that is sent by the iAd
            document.addEventListener("iAdBannerViewDidFailToReceiveAdWithErrorEvent", iAdBannerViewDidFailToReceiveAdWithErrorEventHandler, false);
            
            var adAtBottom = false; 
            setTimeout(function() {
                       window.plugins.iAd.prepare(adAtBottom); // by default, ad is at Top
                       }, 1000);
                       window.plugins.iAd.orientationChanged(true);//trigger immediately so iAd knows its orientation on first load
        }

        function iAdBannerViewDidFailToReceiveAdWithErrorEventHandler(evt)
        {
            alert(evt.error);
            window.plugins.iAd.showAd(false);
            var elem = document.getElementById("showAd");
            elem.checked = false;
        }
        
        function iAdBannerViewDidLoadAdEventHandler(evt)
        {
            // if we got this event, a new ad is loaded
            var elem = document.getElementById("lastAdLoaded");
            gLastAdLoadedDate = new Date();
            elem.innerHTML = gLastAdLoadedDate.toLocaleString();
            
            elem = document.getElementById("showAd");
            elem.disabled = false;
            elem.checked = true;
            window.plugins.iAd.showAd(true);
            
            gTotalAdsLoaded++;
            
            elem = document.getElementById("totalAdsLoaded");
            elem.innerHTML = gTotalAdsLoaded.toString();
            
            if (gTimerId) {
                clearInterval(gTimerId);
            }
            gTimerId = setInterval(lastAdLoadedInterval, 1000);
            
        }
        
        function lastAdLoadedInterval()
        {
            var now = (new Date()).getTime();
            var diff = now - gLastAdLoadedDate.getTime();
            var elem = document.getElementById("lastAdLoaded");
            
            var ms_in_a_year = 31449600000; /* 1000ms x 60s x 60m x 24hrs x 7d x 52w */
            var ms_in_a_week = 604800000; /* 1000ms x 60s x 60m x 24hrs * 7d */
            var ms_in_a_day = 86400000; /* 1000ms x 60s x 60m x 24hrs */
            var ms_in_an_hour = 3600000; /* 1000ms x 60s x 60m */ 
            var ms_in_a_minute = 60000; /* 1000ms x 60s */ 
            var ms_in_a_second = 1000;		
            
            var milliseconds = Math.floor(diff);
            var seconds = Math.floor(milliseconds / ms_in_a_second) % 60;
            var minutes = Math.floor(milliseconds / ms_in_a_minute) % 60;
            var hours = Math.floor(milliseconds / ms_in_an_hour) % 24;
            var days = Math.floor(milliseconds / ms_in_a_day) % 7;
            var weeks = Math.floor(milliseconds / ms_in_a_week) % 52;
            var years = Math.floor(milliseconds / ms_in_a_year);
            
            var caption = seconds + "s ago";
            
            if (minutes > 0) {
                caption = minutes + "m " + caption;
            }
            if (hours > 0) {
                caption = hours + "h " + caption;
            } 
            if (days > 0) {
                caption = days + "d " + caption;
            } 
            if (weeks > 0) {
                caption = weeks + "w " + caption;
            } 
            if (years > 0) {
                caption = years + "yr " + caption;
            } 
            
            elem.innerHTML = caption;
        }
        
        function showAdClicked(evt)
        {
            window.plugins.iAd.showAd(evt.checked);
        }

//End iAds