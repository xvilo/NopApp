$( document ).on( "pageinit", function( event ) {
    if (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i)) {
        $("body").addClass("ios7");
        $('body').append('<div id="ios7statusbar"/>');
    }
});