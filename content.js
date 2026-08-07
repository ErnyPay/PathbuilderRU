console.log("[PathbuilderRU] Starting...");


(async () => {


    await Dictionary.load();


    console.log(
        "[PathbuilderRU] Dictionary loaded"
    );


    PathbuilderTranslator.init();


    console.log(
        "[PathbuilderRU] Initial translation complete"
    );


    Observer.start();



})();