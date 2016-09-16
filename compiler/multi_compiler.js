// note this script deliberately uses synchronous calls to run through like a script.

// however, the only function that would benefit from an async call would be jsonfile.writeFileSync which is called last anyway

// may be benefit when update to accept 'all' cl args



// *********** import requirements  ***********

var decomment = require('decomment');
var fs = require('fs');
var solc = require('solc');
var jayson = require('jayson');
var commandLineArgs = require('command-line-args');
var jsonfile = require("jsonfile");
var files_to_compile = require("./files_to_compile.js"); 
// var Promise = require('bluebird');  // may not be required


// ************* read in commandline options

var cli = commandLineArgs([
    {name: 'file', alias: 'f', type: String, defaultValue: 'all', description: 'single file to compile'},
    {name: 'output_file', alias: 'o', type: String, defaultValue: 'compiled_contract.json', description: 'name of output file '}
]);

try{
    var options = cli.parse();
    console.log('Starting with options:',JSON.stringify(options));
}
catch(e){
    console.log("error reading command line arguments, e: ", e);
    return;
}



// ***********

var num_files = files_to_compile.files.length;
console.log("num_file: ", num_files);
 

// add: check files are .sol


var collapsed = [];

var solc_input = {};

for (i = 0; i < num_files; i++ ){
    var file_path = files_to_compile.path + files_to_compile.files[i];
    // console.log("file",i, ":",file_path);
    
    collapsed[i] = collapse(file_path);
    solc_input[files_to_compile.files[i]] = collapsed[i] ;
}

console.log("solc_input:", solc_input, "\n\n");

var output = solc.compile({sources: solc_input},1);

// console.log("output:", output);

for (var contractName in output.contracts)
    console.log(contractName + ': ' + output.contracts[contractName].bytecode);



//  *********** got to here **********


return;


// ************ manage .sol files


    //check the file is a .sol
    if (check_sol(file)==false) {
        console.log("file not .sol");
        return;
    }

    var contract_name = file.slice(0,-4);



    // write to .json file
    com_path = '../output/compiled/' + contract_name +'.json';

    console.log("com_path: ", com_path);
    // jsonfile.writeFileSync(com_path, output.contracts['Contract_1']);
    jsonfile.writeFileSync(com_path, output.contracts);
    
    // check file output
    // console.log(jsonfile.readFileSync(com_path))



console.log(" *********  end of script **********");

// ************* check .sol files ***********

function check_sol(file){
    if (file.slice(-4) == ".sol"){return true;} else{return false;};
}


// ************* Collapse .sol file *****************

function collapse(path){
    console.log("Collapsing: ", path);

    try {
        var data = fs.readFileSync(path);
    }
    catch(e){
        console.log(JSON.stringify(e))
        throw "cannot read file";
    }

    var code = data.toString();
    var de_code = decomment(code);
    var de_returned = de_code.replace(/\n/g, " ");
    // console.log("de_return: ", de_returned);
    return de_returned;
}
