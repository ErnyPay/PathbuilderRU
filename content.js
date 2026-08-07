'use strict';


console.log(
    "[PathbuilderRU] Starting..."
);



(async function(){


    const dictionaries = [

        "ui",

        "classes",

        "ancestries",

        "heritages",

        "backgrounds",

        "feats",

        "feat_descriptions",

        "spells",

        "spell_descriptions",

        "items",

        "item_descriptions",

        "traits",

        "skills",

        "actions",

        "condition"

    ];





    try {



        if (
            !window.Dictionary
        ) {


            console.error(
                "[PathbuilderRU] Dictionary not found"
            );


            return;

        }






        await window.Dictionary.load(
            dictionaries
        );





        console.log(
            "[PathbuilderRU] Dictionary loaded"
        );







        if (
            !window.Translator
        ) {


            console.error(
                "[PathbuilderRU] Translator not found"
            );


            return;


        }







        window.Translator.init();





        console.log(
            "[PathbuilderRU] Translator initialized"
        );







        setTimeout(() => {



            window.Translator.translatePage();



            console.log(
                "[PathbuilderRU] Initial translation complete"
            );



        },500);







        if (
            window.ObserverRU
        ) {


            window.ObserverRU.start();



        } else {


            console.warn(
                "[PathbuilderRU] Observer missing"
            );


        }







    } catch(e) {



        console.error(
            "[PathbuilderRU] Startup error",
            e
        );



    }





})();