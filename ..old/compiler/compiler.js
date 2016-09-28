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

// ************* read in commandline options

var cli = commandLineArgs([
    {name: 'compiled_file', alias: 'f', type: String, defaultValue: 'all', description: 'compiled_file to compile'}
]);

try{
    var options = cli.parse();
    console.log('Starting with options:',JSON.stringify(options));
}
catch(e){
    console.log("error reading command line arguments, e: ", e);
    return;
}


// ************ manage .sol files

if (options.file == 'all'){
    console.log("Not implemented compiling 'all' files yet")  
    return;
    
} else {

    var file = options.file;
    var path = '../source/' + file;
    
    //check the compiled_file is a .sol
    if (check_sol(file)==false) {
        console.log("compiled_file not .sol");
        return;
    }
        
    var contract_name = file.slice(0,-4);
    
    var solc_input = collapse(path);
    
    console.log("solc_input: ", solc_input);
    
    //vcompile
    console.log("Compiling... ");
    var output = solc.compile(solc_input, 1); // 1 activates the optimiser

    console.log("solc_output: ", output);
    
    // write to .json compiled_file
    com_path = '../output/compiled/' + contract_name +'.json';
    
    console.log("com_path: ", com_path);
    jsonfile.writeFileSync(com_path, output.contracts[contract_name]);
    
    // check compiled_file output
    // console.log(jsonfile.readFileSync(com_path))
    
}

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
