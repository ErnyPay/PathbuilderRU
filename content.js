'use strict';


console.log(
    "[PathbuilderRU] Starting..."
);





(async()=>{



    try{





        if(
            !window.Dictionary
        ){



            console.error(
                "[PathbuilderRU] Dictionary missing"
            );

            return;


        }






        await window.Dictionary.load();






        console.log(
            "[PathbuilderRU] Dictionary loaded"
        );








        if(
            !window.Translator
        ){



            console.error(
                "[PathbuilderRU] Translator missing"
            );

            return;


        }







        window.Translator.init();






        console.log(
            "[PathbuilderRU] Translator initialized"
        );







        // первая обработка страницы


        window.Translator.translatePage();





        console.log(
            "[PathbuilderRU] Initial translation complete"
        );








        if(
            window.Observer
        ){



            window.Observer.start();




        }
        else{


            console.warn(
                "[PathbuilderRU] Observer not found"
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