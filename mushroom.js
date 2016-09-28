#!/usr/local/bin node

// ********* imports **************

var config = require("./.mushroom_config.js");


// ******** Welcome message ***********

console.log("\n** Mushroom, a less good version of truffle :-) **\n");


// ************* read in commandline command ***************

var command = process.argv[2]

switch(command){
    case 'compile':
        var compiler = process.cwd() + config.structure.compiler_location + config.structure.compiler;
        console.log("Calling compiler...  ", compiler,"\n");
        require(compiler);
        break;

    case 'deploy':
        var deployer = process.cwd() + config.structure.deployer_location + config.structure.deployer;
        console.log("Calling deployer...  ", deployer,"\n");
        require(deployer);
        break;

    case 'helpers':
        var helper_generator = process.cwd() + config.structure.helper_generator_location + config.structure.helper_generator;
        console.log("Generating <contracts>_helpers.js ...\n");
        require(helper_generator);
        break;
    
    default:
        console.log("Command not recognised");
        console.log("Correct usage: TBD");
}
    

