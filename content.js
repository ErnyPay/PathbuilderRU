console.log(
    "[PathbuilderRU] Starting..."
);



(async()=>{


    try{


        await window.PathbuilderDictionary.load();


        console.log(
            "[PathbuilderRU] Dictionary loaded"
        );



        await window.translator.init();



        console.log(
            "[PathbuilderRU] Initial translation complete"
        );



        window.translator.translatePage();



        if(
            window.PathbuilderObserver
        ){

            window.PathbuilderObserver.start();

        }


    }


    catch(e){

        console.error(
            "[PathbuilderRU]",
            e
        );

    }



})();