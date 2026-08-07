'use strict';


console.log(
"[PathbuilderRU] dictionary.js loaded"
);



window.PathbuilderDictionary = {


    data:{},


    loaded:false,



    async load(){


        console.log(
            "[Dictionary] Loading..."
        );



        const files=[


            "ui",
            "classes",
            "ancestries",
            "heritages",
            "backgrounds",
            "feats",
            "feat_descriptions",
            "spells",
            "items",
            "traits",
            "skills",
            "actions",
            "condition",
            "phrases"


        ];





        for(const file of files){



            try{


                const url =

                chrome.runtime.getURL(

                    "dictionaries/" + file + ".json"

                );



                const response = await fetch(url);



                if(!response.ok){

                    console.warn(
                        "[Dictionary] Missing:",
                        file
                    );


                    continue;

                }




                const json =
                    await response.json();



                this.data[file]=json;




                console.log(

                    "[Dictionary]",

                    file,

                    Object.keys(json).length

                );



            }
            catch(e){


                console.error(

                    "[Dictionary] Error",

                    file,

                    e

                );


            }


        }





        this.loaded=true;



        console.log(

            "[Dictionary] READY",

            this.data

        );



    },








    translate(text){



        if(!text || !this.loaded)
            return text;



        let result=text;



        for(
            const group of Object.values(this.data)
        ){



            if(
                group[result]
            ){


                return group[result];


            }



        }




        return result;



    }






};