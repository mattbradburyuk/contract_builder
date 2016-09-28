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
    {name: 'compiled_file', alias: 'f', type: String, defaultValue: 'all', description: 'single compiled_file to compile'},
    {name: 'output_file', alias: 'o', type: String, defaultValue: 'compiled_contract', description: 'name of output compiled_file '}
]);

var options;

try{
    options = cli.parse();
    console.log('Starting with options:',JSON.stringify(options));
}
catch(e){
    console.log("error reading command line arguments, e: ", e);
    return;
}



// *********** get files and make input  *********

var num_files = files_to_compile.files.length;
console.log("num_file: ", num_files);
 

var collapsed = [];

var solc_input = {};

for (i = 0; i < num_files; i++ ){
    var file_path = files_to_compile.path + files_to_compile.files[i];
    // console.log("compiled_file",i, ":",compiled_file);

    //check the compiled_file is a .sol
    if (check_sol(file_path)==false) {
        console.log(file_path, ": compiled_file not .sol");
        return;
    }

    collapsed[i] = collapse(file_path);
    solc_input[files_to_compile.files[i]] = collapsed[i] ;
}

// console.log("solc_input:", solc_input, "\n\n");


// ******** compile input  **************

console.log("Compiling...");

var output = solc.compile({sources: solc_input},1);

// console.log("output:", output);

for (var contractName in output.contracts)
    console.log(contractName + ': ' + output.contracts[contractName].bytecode);


// ********** write to .json compiled_file ************


var com_path = '../output/compiled/' + options.output_file +'.json';
console.log("Writing compiled contracts to: ", com_path);
jsonfile.writeFileSync(com_path, output);



console.log(" *********  end of script **********");




// ************* check .sol files ***********

function check_sol(file){
    if (file.slice(-4) == ".sol"){return true;} else{return false;};
}


// ************* Collapse .sol compiled_file *****************

function collapse(path){
    console.log("Collapsing: ", path);

    try {
        var data = fs.readFileSync(path);
    }
    catch(e){
        console.log(JSON.stringify(e))
        throw "cannot read compiled_file";
    }

    var code = data.toString();
    var de_code = decomment(code);
    var de_returned = de_code.replace(/\n/g, " ");
    // console.log("de_return: ", de_returned);
    return de_returned;
}
