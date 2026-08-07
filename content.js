console.log(
    "[PathbuilderRU] Starting..."
);


(async()=>{


    await window.PathbuilderDictionary.load();


    console.log(
        "[PathbuilderRU] Dictionary loaded"
    );



    window.translator.init();



    window.translator.translatePage();



    console.log(
        "[PathbuilderRU] Initial translation complete"
    );



    window.observer.start();



})();