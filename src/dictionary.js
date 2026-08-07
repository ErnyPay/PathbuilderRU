console.log("[PathbuilderRU] dictionary.js loaded");


const Dictionary = {


    data:{},


    total:0,


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
            "spells",
            "items",
            "traits",
            "skills",
            "actions",
            "condition"

        ];



        for(const file of files){


            try{


                console.log(
                    "[Dictionary] Loading:",
                    file + ".json"
                );



                const url =
                    chrome.runtime.getURL(
                        "dictionaries/" + file + ".json"
                    );



                const response =
                    await fetch(url);



                const json =
                    await response.json();



                this.data =
                    {
                        ...this.data,
                        ...json
                    };



                console.log(
                    "[Dictionary]",
                    file + ".json",
                    Object.keys(json).length,
                    "entries"
                );



                this.total +=
                    Object.keys(json).length;



            }catch(error){


                console.error(
                    "[Dictionary] Failed:",
                    file,
                    error
                );


            }


        }



        console.log(
            "[Dictionary] TOTAL:",
            this.total
        );


        return true;


    },





    translate(text){


        if(!text)
            return text;



        const entry =
            this.data[text];



        if(!entry)
            return text;



        /*
            Старый формат:

            {
              "Monk":"Монах"
            }
        */


        if(typeof entry === "string"){


            return entry;


        }





        /*
            Новый формат:

            {
              "Battle Medicine":{
                   "name":"Боевая медицина",
                   "description":"..."
              }
            }
        */


        if(typeof entry === "object"){



            if(entry.name){

                return entry.name;

            }



            if(entry.description){

                return entry.description;

            }


        }



        return text;


    }


};




window.Dictionary = Dictionary;



console.log(
    "[PathbuilderRU] Dictionary ready"
);