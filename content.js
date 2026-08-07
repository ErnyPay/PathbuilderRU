console.log("[PathbuilderRU] Starting...");


(async () => {

    try {


        // Загружаем словарь

        if (
            window.PathbuilderDictionary &&
            typeof window.PathbuilderDictionary.load === "function"
        ) {

            await window.PathbuilderDictionary.load();

        }
        else {

            console.error(
                "[PathbuilderRU] Dictionary missing"
            );

            return;
        }



        console.log(
            "[PathbuilderRU] Dictionary loaded"
        );



        // Запускаем переводчик

        if (
            window.PathbuilderTranslator &&
            typeof window.PathbuilderTranslator.init === "function"
        ) {

            window.PathbuilderTranslator.init();

        }
        else {

            console.error(
                "[PathbuilderRU] Translator missing"
            );

        }



        console.log(
            "[PathbuilderRU] Initial translation complete"
        );



        // Запускаем Observer

        if (
            window.PathbuilderObserver &&
            typeof window.PathbuilderObserver.start === "function"
        ) {

            window.PathbuilderObserver.start();

        }
        else {

            console.error(
                "[PathbuilderRU] Observer missing"
            );

        }



    }
    catch(error) {

        console.error(
            "[PathbuilderRU] Startup error:",
            error
        );

    }


})();