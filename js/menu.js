addEventListener('load', function() {
    document.getElementById('play_button').addEventListener('click', 
    function(){
        window.location.assign("./html/game.html");
    });

    document.getElementById('settings_button').addEventListener('click', 
    function(){
        window.location.assign("./html/options.html");
    });

    document.getElementById('saves_button').addEventListener('click', 
    function(){
        console.error("Opció no implementada");
    });

    document.getElementById('exit_button').addEventListener('click', 
    function(){
        console.warn("No es pot sortir!");
    });
});