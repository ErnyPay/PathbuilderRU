'use strict';


console.log(
    "[PathbuilderRU] content.js loaded"
);



(async()=>{


try{


    console.log(
        "[PathbuilderRU] Starting..."
    );



    if(!window.PathbuilderRUConfig){


        console.error(
            "[PathbuilderRU] Config missing"
        );


        return;

    }





    await window.PathbuilderDictionary.load();



    console.log(
        "[PathbuilderRU] Dictionary loaded"
    );





    window.PathbuilderTranslator.init();



    console.log(
        "[PathbuilderRU] Translator initialized"
    );






    window.PathbuilderTranslator.translatePage();




    console.log(
        "[PathbuilderRU] Initial translation complete"
    );






    if(window.PathbuilderObserver){


        window.PathbuilderObserver.start();


    }
    else{


        console.error(
            "[PathbuilderRU] Observer missing"
        );


    }




}
catch(e){


    console.error(

        "[PathbuilderRU] Startup error",

        e

    );


}



})();