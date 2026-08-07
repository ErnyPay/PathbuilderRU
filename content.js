console.log("[PathbuilderRU] Starting...");


(async()=>{


try{


    await Dictionary.load();


    console.log(
        "[PathbuilderRU] Dictionary loaded"
    );



    await Translator.init();


    console.log(
        "[PathbuilderRU] Translator initialized"
    );



    Translator.translatePage();


    console.log(
        "[PathbuilderRU] Initial translation complete"
    );



    if(window.Observer){


        Observer.start();


    }



}catch(error){


    console.error(
        "[PathbuilderRU]",
        error
    );


}


})();