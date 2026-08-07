console.log("[PathbuilderRU] Starting...");


(async()=>{


    await window.PathbuilderDictionary.load();


    console.log("[PathbuilderRU] Dictionary loaded");



    window.PathbuilderTranslator.init();


    console.log("[PathbuilderRU] Initial translation complete");



    window.PathbuilderTranslator.translatePage();



    if(window.PathbuilderObserver){

        window.PathbuilderObserver.start();

    }


})();