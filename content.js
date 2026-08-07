console.log(
    "[PathbuilderRU] Starting..."
);



(async()=>{


try{


    await window.PathbuilderDictionary.load();



    console.log(
        "[PathbuilderRU] Dictionary loaded"
    );



    await window.Translator.init();



    console.log(
        "[PathbuilderRU] Translator initialized"
    );



    window.Translator.translatePage();



    console.log(
        "[PathbuilderRU] Initial translation complete"
    );



    if (
    window.Observer &&
    typeof window.Observer.start === "function"
) {

    window.Observer.start();

}
else {

    console.error(
        "[PathbuilderRU] Observer not available"
    );


    }



}


catch(error){


    console.error(
        "[PathbuilderRU]",
        error
    );


}



})();