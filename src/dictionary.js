'use strict';


console.log(
    "[PathbuilderRU] dictionary.js loaded"
);





window.Dictionary = {



    data:{},


    initialized:false,



    files:[

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

    ],







    async load(){


        console.log(
            "[Dictionary] Start loading"
        );




        for(
            const file of this.files
        ){



            try{


                console.log(
                    "[Dictionary] Loading:",
                    file
                );



                const response =
                    await fetch(
                        chrome.runtime.getURL(
                            "dictionaries/" + file + ".json"
                        )
                    );




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





                this.data[file]=json;



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







        let total=0;


        Object.values(
            this.data
        ).forEach(dict=>{


            total +=
                Object.keys(dict).length;


        });




        console.log(
            "[Dictionary] TOTAL:",
            total
        );




        this.initialized=true;



        console.log(
            "[PathbuilderRU] Dictionary ready"
        );



    },









    translate(text){


        if(
            !text
        )
            return text;



        for(
            const dict of Object.values(this.data)
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