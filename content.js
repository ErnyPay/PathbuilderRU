console.log(
    "[PathbuilderRU] Starting..."
);



(async()=>{


    try{


        await window.PathbuilderDictionary.load();


        console.log(
            "[PathbuilderRU] Dictionary loaded"
        );



        await Translator.init();



        console.log(
            "[PathbuilderRU] Initial translation complete"
        );



        if(
            window.PathbuilderObserver
        ){

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
            "[PathbuilderRU]",
            e
        );

    }



})();