'use strict';


console.log(
    "[PathbuilderRU] dictionary.js loaded"
);



window.Dictionary = {



    dictionaries:{},


    loaded:false,





    async load(files){


        console.log(
            "[Dictionary] Start loading"
        );




        for(
            const file of files
        ){


            try{


                console.log(
                    "[Dictionary] Loading:",
                    file
                );



                const url =
                    chrome.runtime.getURL(
                        "dictionaries/" + file + ".json"
                    );



                const response =
                    await fetch(url);



                if(
                    !response.ok
                ){

                    console.warn(
                        "[Dictionary] Missing:",
                        file
                    );

                    continue;

                }





                const json =
                    await response.json();




                this.dictionaries[file] =
                    json;



                console.log(
                    "[Dictionary]",
                    file,
                    Object.keys(json).length,
                    "entries"
                );




            }
            catch(e){


                console.error(
                    "[Dictionary] Failed:",
                    file,
                    e
                );


            }


        }







        this.loaded = true;




        let total = 0;



        Object.values(
            this.dictionaries
        ).forEach(d=>{

            total += Object.keys(d).length;

        });





        console.log(
            "[Dictionary] TOTAL:",
            total
        );



        console.log(
            "[PathbuilderRU] Dictionary ready"
        );




    },









    translate(text){



        if(
            !text
        ){

            return text;

        }







        // специальные исправления PF2e


        const overrides = {



            "Exemplar":
                "Избранник",



            "Feat":
                "Черта",



            "Feats":
                "Черты",



            "Heritage":
                "Наследие",



            "Ancestry":
                "Родословие",



            "Background":
                "Предыстория",



            "Class":
                "Класс",



            "Level":
                "Уровень",



            "Skill":
                "Навык",



            "General":
                "Общий",



            "Ward Medic":
                "Палатный медик",



            "Battle Medicine":
                "Боевая медицина",



            "Quick Recognition":
                "Быстрое распознавание"



        };








        if(
            overrides[text]
        ){

            return overrides[text];

        }







        for(
            const dict of Object.values(
                this.dictionaries
            )
        ){



            if(
                dict[text]
            ){

                return dict[text];

            }


        }





        return text;



    }





};