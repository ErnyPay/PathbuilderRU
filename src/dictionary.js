'use strict';

console.log(
    "[PathbuilderRU] dictionary.js loaded"
);



window.Dictionary = {


    data:{},


    loaded:false,


    _translating:null,



    async load(){


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



                const url =
                    chrome.runtime.getURL(
                        "dictionaries/" +
                        file +
                        ".json"
                    );




                const response =
                    await fetch(url);




                if(!response.ok){

                    console.warn(
                        "[Dictionary] Missing:",
                        file
                    );

                    this.data[file] = {};

                    continue;

                }




                const json =
                    await response.json();




                this.data[file] = json;



                const count =
                    Object.keys(json).length;



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


                this.data[file] = {};


            }


        }





        this.loaded = true;



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
        )
            return text;



        const original =
            String(text).trim();




        if(
            !original
        )
            return text;




        /*
            защита от бесконечного вызова
        */


        if(
            this._translating === original
        ){

            return original;

        }




        this._translating = original;



        try{


            const dictionaries = [


                this.data.ui,


                this.data.classes,


                this.data.ancestries,


                this.data.heritages,


                this.data.backgrounds,


                this.data.feats,


                this.data.feat_descriptions,


                this.data.spells,


                this.data.spell_descriptions,


                this.data.items,


                this.data.item_descriptions,


                this.data.traits,


                this.data.skills,


                this.data.actions,


                this.data.condition,


                this.data.phrases


            ];






            for(
                const dict of dictionaries
            ){



                if(
                    !dict
                )
                    continue;





                if(
                    Object.prototype.hasOwnProperty.call(
                        dict,
                        original
                    )
                ){



                    return dict[original];



                }



            }






            /*
                поиск без учёта пробелов
            */


            const normalized =
                original
                .replace(/\s+/g," ")
                .trim();





            if(
                normalized !== original
            ){



                for(
                    const dict of dictionaries
                ){


                    if(
                        !dict
                    )
                        continue;




                    if(
                        Object.prototype.hasOwnProperty.call(
                            dict,
                            normalized
                        )
                    ){


                        return dict[normalized];


                    }


                }


            }







            return original;




        }
        finally{


            this._translating = null;


        }



    }







};