'use strict';

const fs = require('fs');


const feats = JSON.parse(
    fs.readFileSync(
        './dictionaries/feats.json',
        'utf8'
    )
);


const result = {};


for (const feat of Object.keys(feats)) {

    result[feat] = "";

}


fs.writeFileSync(
    './dictionaries/feat_descriptions.json',
    JSON.stringify(
        result,
        null,
        4
    ),
    'utf8'
);


console.log(
    'Created feat_descriptions.json:',
    Object.keys(result).length,
    'entries'
);