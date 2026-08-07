console.log("[PathbuilderRU] Starting...");

(async()=>{


    await window.PathbuilderDictionary.load();


    console.log(
        "[PathbuilderRU] Dictionary loaded"
    );


    translator.init();


    translator.translatePage();


    console.log(
        "[PathbuilderRU] Initial translation complete"
    );


    observer.start();


})();