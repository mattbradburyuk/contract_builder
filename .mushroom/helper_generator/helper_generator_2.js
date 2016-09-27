// generates helper functions for deployed contracts


/*
 // **************** plan ******************

 1) read in header file to set up requires and web3

 2) Read in contract details from compiled:
 - contract names
 - contract methods
 - number of arguments for each
 - type of method (constant, etc...)

 For each contract

 3) Generate contract class with properties:
 - web3 contract object
 - deployed address
 - tx_receipt
 - other??

 4) for each method append the methods onto the prototype

 */



console.log("helper_generator called...");

// ************ imports **************

var fs = require('fs');
var Web3 = require('web3');
var jsonfile = require("jsonfile");
var jayson = require("jayson");



// ********* get the config files  ************

// note, as mushroom.js is in the root of the project the cwd() will always return the root so can use it to get to the .mushroom_config.js file

var root = process.cwd();

var mc_path = root + "/.mushroom_config.js";
var mushroom_config = require(mc_path);

var cc_path = root + mushroom_config.structure.contract_config_location + mushroom_config.structure.contract_config;
var contract_config = require(cc_path);



// *********** set up web3 and rpc ****************

const web3  = new Web3();
var url = 'http://'+mushroom_config.rpc.host+':'+ mushroom_config.rpc.port;
web3.setProvider(new web3.providers.HttpProvider(url));
var rpc_client = jayson.client.http(url);










// ********** Read in contract details *************


var file = contract_config.compiler_output_file_to_deploy;
var file_path = root + mushroom_config.structure.compiler_output_directory + file

var compiled_output_json = jsonfile.readFileSync(file_path);
var contracts_json = compiled_output_json.contracts
var contract_names = [];

for (var i in contracts_json){
    contract_names.push(i)
}


// *********** picking one contract to make a helper file for ***********


var contract_name = contract_names[0]
var contract = contracts_json[contract_name]
var iface = JSON.parse(contract.interface)      // note interface appears to be in a string rather than json so need to parse



// ********* set output file ***************

var output_file = process.cwd() + mushroom_config.structure.helper_output_directory + contract_name + '_' + mushroom_config.structure.helper_file

console.log("output_file: ", output_file)


// ********* read in and customise header ****************

// read in header_template
var header_file = process.cwd() + mushroom_config.structure.helper_generator_location + 'helper_template_header.js';
var header_str = fs.readFileSync(header_file).toString();

// get host:ip from config and substitute
var host_ip = '\"http://' + mushroom_config.rpc.host + ":" + mushroom_config.rpc.port +'\"';
header_str = header_str.replace(/sub_geth_host_port/g, host_ip);



// ********** get deployed address ***********************

var deployed_file = process.cwd() + mushroom_config.structure.deployer_output_directory + 'deployed_instances.json'

var deployed_json_str = fs.readFileSync(deployed_file).toString()

var deployed_json = JSON.parse(deployed_json_str);

var contract_ind
for (var i in deployed_json.contracts){
    console.log("i: ", i)
    if (deployed_json.contracts[i].name == contract_name) {
        console.log("contract_name: ", contract_name)
        contract_ind = i;
    }
}

var deployed_address = deployed_json.contracts[contract_ind].details.address
console.log("deployed address: ", deployed_address )



// ********** read in and customise module vars *************

// read in helper_object_def template
var module_vars_file = process.cwd() + mushroom_config.structure.helper_generator_location + 'helper_template_module_vars.js';
var module_vars_str = fs.readFileSync(module_vars_file).toString();

module_vars_str = module_vars_str.replace(/sub_abi/g, JSON.stringify(iface));
module_vars_str = module_vars_str.replace(/sub_address/g, deployed_address)


// ********** get number of methods in contract ********************

// console.log("contract: ", contract)

var num_methods = iface.length
console.log("num_methods: ", num_methods)

for (var i =0; i<num_methods; i++){

    var method = iface[i];
    // console.log("method: ",method)

    var method_name = method.name;
    console.log("method_name: ", method_name)

    var num_args = method.inputs.length
    console.log("num_args", num_args)

    var arg_str ='';
    var arg_log_str = ''

    for (var j = 0;j< (num_args+1); j++){
        arg_str = arg_str + 'arg[' + j +  '],';
        arg_log_str = arg_log_str + '\"\\n ---> args[' + j + ']:\", args[' +j + '],'

    }

    arg_str = arg_str.slice(0,arg_str.length-1)
    arg_log_str = arg_log_str.slice(0,arg_log_str.length-1)

    console.log("arg_str: ", arg_str)
    console.log("log_arg_str: ", arg_log_str)
}

// ***************************** start from here **********************

var output_str = header_str + module_vars_str

fs.writeFileSync(output_file, output_str);

return




var method = iface[1];
// console.log("method: ",method)
var method_name = method.name;

// var method_args = 'val, tx_object';
var method_args = 'arg_array'
//

// read in helper_object_def template
var object_def_file = process.cwd() + mushroom_config.structure.helper_generator_location + 'helper_template_object_def.js';
var object_def_str = fs.readFileSync(object_def_file).toString();

// read in helper_method template
var method_file = process.cwd() + mushroom_config.structure.helper_generator_location + 'helper_template_method_sendtx.js';
var method_str = fs.readFileSync(method_file).toString();

// create module.exports str
var exports_str = 'module.exports = sub_class;';

// read in helper_test template
var test_file = process.cwd() + mushroom_config.structure.helper_generator_location + 'helper_test.js';
var test_str = fs.readFileSync(test_file).toString();



// var output_str = header_str+  object_def_str + method_str + exports_str//+ test_str

// substitutions:



output_str = output_str.replace(/sub_class/g, contract_name);
output_str = output_str.replace(/sub_method/g, method_name);
output_str = output_str.replace(/sub_args/g, method_args);




fs.writeFileSync(output_file, output_str);




//
// console.log("num methods: ", JSON.parse(iface).length)
