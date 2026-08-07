'use strict';


console.log(
    "[PathbuilderRU] dictionary.js loaded"
);



window.Dictionary = {


    entries: {},

    loaded: false,

    loading: false,



    async load(){


        if(this.loaded){
            return;
        }


        if(this.loading){
            return;
        }


        this.loading = true;


        console.log(
            "[Dictionary] Start loading"
        );



        const files = [


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

            "condition",

            "phrases"


        ];




        let total = 0;




        for(
            const file of files
        ){


            try{


                console.log(
                    "[Dictionary] Loading:",
                    file
                );



                let url =
                    chrome.runtime.getURL(
                        "dictionaries/" + file + ".json"
                    );



                let response =
                    await fetch(url);



                if(!response.ok){

                    console.warn(
                        "[Dictionary] Missing:",
                        file
                    );

                    continue;

                }




                let json =
                    await response.json();




                let count = 0;




                for(
                    const key in json
                ){


                    let value =
                        json[key];



                    /*
                        Поддержка:

                        {
                          "en":"",
                          "ru":""
                        }

                    */


                    if(
                        typeof value === "object" &&
                        value !== null
                    ){


                        if(value.ru){


                            this.entries[key.trim()]
                                =
                            value.ru;


                            count++;

                        }


                    }



                    else if(
                        typeof value === "string"
                    ){


                        this.entries[key.trim()]
                            =
                        value;


                        count++;

                    }



                }




                total += count;



                console.log(

                    "[Dictionary]",
                    file,
                    count,
                    "entries"

                );



            }

            catch(error){


                console.error(

                    "[Dictionary] Error:",
                    file,
                    error

                );


            }



        }






        this.loaded = true;

        this.loading = false;



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



        let clean =
            text.trim();




        if(
            !clean
        ){

            return text;

        }







        /*
            1.
            Точное совпадение
        */


        if(
            this.entries.hasOwnProperty(clean)
        ){

            return this.entries[clean];

        }









        /*
            2.
            По предложениям
        */


        if(
            clean.length > 80
        ){



            let sentences =
                clean.match(
                    /[^.!?]+[.!?]+/g
                );




            if(
                sentences &&
                sentences.length > 1
            ){



                let result =
                    sentences.map(
                        sentence => {


                            let s =
                                sentence.trim();



                            return (
                                this.entries[s]
                                ||
                                s
                            );


                        }
                    )
                    .join(" ");





                if(
                    result !== clean
                ){

                    return result;

                }



            }



        }









        /*
            3.
            Перевод отдельных строк
        */


        if(
            clean.includes("\n")
        ){


            let lines =
                clean.split("\n");



            let result =
                lines.map(
                    line =>
                    this.translateLine(line)
                )
                .join("\n");



            return result;


        }







        return clean;



    },









    translateLine(line){


        let clean =
            line.trim();



        if(
            !clean
        ){

            return line;

        }




        return (
            this.entries[clean]
            ||
            clean
        );



    }



};