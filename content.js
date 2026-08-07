(async () => {

    console.log("[PathbuilderRU] Starting...");


    // Загружаем словарь
    await PathbuilderDictionary.load();


    console.log(
        "[PathbuilderRU] Dictionary loaded"
    );


    // Запускаем переводчик
    if (window.PathbuilderTranslator) {

        window.PathbuilderTranslator.init();

        console.log(
            "[PathbuilderRU] Initial translation complete"
        );

    }

    else {

        console.error(
            "[PathbuilderRU] Translator not found"
        );

    }



    // Повторный перевод после динамической загрузки UI
    const observer =
        new MutationObserver(
            (mutations) => {

                let changed = false;


                for (const mutation of mutations) {

                    if (
                        mutation.addedNodes.length
                    ) {

                        changed = true;
                        break;

                    }

                }


                if (changed) {

                    window.PathbuilderTranslator
                        ?.translatePage();

                }

            }
        );



    observer.observe(
        document.body,
        {
            childList:true,
            subtree:true
        }
    );



})();