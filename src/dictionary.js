console.log("[PathbuilderRU] dictionary.js loaded");


window.Dictionary = {


    data:{},

    ready:false,


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
                    file+".json"
                );


                const url =
                chrome.runtime.getURL(
                    "dictionaries/"+file+".json"
                );


                const response =
                    await fetch(url);



                const json =
                    await response.json();



                this.data[file]=json;



                console.log(
                    "[Dictionary]",
                    file,
                    Object.keys(json).length || json.length,
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



        this.ready=true;


        console.log(
            "[Dictionary] TOTAL:",
            this.count()
        );


    },



    count(){

        let total=0;


        for(
            const key in this.data
        ){

            const obj=this.data[key];


            if(
                Array.isArray(obj)
            ){

                total+=obj.length;

            }
            else{

                total+=
                Object.keys(obj).length;

            }

        }


        return total;

    },





    translate(text){


        if(!text) return text;


        let result=text;



        for(
            const file in this.data
        ){


            const db =
                this.data[file];



            result =
            this.search(
                db,
                result
            );


        }



        return result;


    },





    search(obj,text){



        if(!obj)
            return text;



        if(
            Array.isArray(obj)
        ){


            for(
                const item of obj
            ){

                const r =
                this.search(
                    item,
                    text
                );


                if(r!==text)
                    return r;


            }


        }



        else if(
            typeof obj==="object"
        ){



            for(
                const key in obj
            ){


                const value=obj[key];



                if(
                    typeof value==="string"
                ){


                    if(
                        value.trim()===text.trim()
                    ){


                        if(
                            obj.name
                        ){

                            return obj.name;

                        }


                    }


                }



                const r =
                this.search(
                    value,
                    text
                );


                if(r!==text)
                    return r;


            }


        }



        return text;


    }


};


console.log(
"[PathbuilderRU] Dictionary ready"
);