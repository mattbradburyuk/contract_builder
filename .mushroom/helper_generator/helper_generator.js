// generates helper functions for deployed contracts



console.log("helper_generator.js called...\n");

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



// ********** Read in compiled contract details *************


var file = contract_config.compiler_output_file_to_deploy;
var file_path = root + mushroom_config.structure.compiler_output_directory + file

var compiled_output_json = jsonfile.readFileSync(file_path);
var compiled_contracts_json = compiled_output_json.contracts
var compiled_contracts_names = [];

for (var i in compiled_contracts_json){
    compiled_contracts_names.push(i)
}

console.log("Compiled contracts:")
console.log(" ---> ", compiled_contracts_names)

// ********** get json of deployed contracts ****************

var deployed_file = process.cwd() + mushroom_config.structure.deployer_output_directory + 'deployed_instances.json'
var deployed_json_str = fs.readFileSync(deployed_file).toString()
var deployed_json = JSON.parse(deployed_json_str);
var deployed_contracts_names = []

for (var i in deployed_json.contracts) {
    deployed_contracts_names[i] = deployed_json.contracts[i].name
}

console.log("\nDeployed contracts:")
console.log(" ---> ",deployed_contracts_names )


// *********** only produce helpers if contract has been both compiled and deployed ************


for (var i in compiled_contracts_names) {

    if (i in deployed_contracts_names){

        make_helper_for_contract(compiled_contracts_names[i])
    }
}


function make_helper_for_contract(contract_name) {


    var contract = compiled_contracts_json[contract_name]
    var iface = JSON.parse(contract.interface)      // note interface appears to be in a string rather than json so need to parse

    console.log("\nBuilding helper for", contract_name, "...")
    // console.log("contract: ",contract)



    // ********* set output file ***************

    var output_file = process.cwd() + mushroom_config.structure.helper_output_directory + contract_name + '_helper.js'

    console.log(" ---> output_file: ", contract_name + '_helper.js')



    // ********* read in and customise header ****************

    // read in header_template
    var header_file = process.cwd() + mushroom_config.structure.helper_generator_location + 'helper_template_header.js';
    var header_str = fs.readFileSync(header_file).toString();

    // get host:ip from config and substitute
    var host_ip = '\"http://' + mushroom_config.rpc.host + ":" + mushroom_config.rpc.port + '\"';
    header_str = header_str.replace(/sub_geth_host_port/g, host_ip);



    // ********** get deployed address ***********************

    var contract_ind
    for (var i in deployed_json.contracts) {
        if (deployed_json.contracts[i].name == contract_name) {
            // console.log("contract_name: ", contract_name)
            contract_ind = i;
        }
    }

    var deployed_address = deployed_json.contracts[contract_ind].details.address
    console.log(" ---> deployed address: ", deployed_address)



    // ********** read in and customise module vars *************

    // read in helper_object_def template
    var module_vars_file = process.cwd() + mushroom_config.structure.helper_generator_location + 'helper_template_module_vars.js';
    var module_vars_str = fs.readFileSync(module_vars_file).toString();

    module_vars_str = module_vars_str.replace(/sub_abi/g, JSON.stringify(iface));
    module_vars_str = module_vars_str.replace(/sub_address/g, deployed_address)



    // ********** get number of methods in contract and generate method calls********************

    // console.log("contract: ", contract)

    var num_methods = iface.length
    console.log(" ---> num_methods: ", num_methods)
    console.log(" ---> methods:")

    var method_strs = [];

    for (var i = 0; i < num_methods; i++) {

        var method = iface[i];
        // console.log("method: ",method)

        var method_name = method.name;
        console.log("      ---> ", method_name)

        if (method_name == undefined) {
            break;
        }


        var num_args = method.inputs.length
        // console.log("num_args", num_args)

        var arg_str = '';
        var arg_log_str = ''

        for (var j = 0; j < (num_args + 1); j++) {
            arg_str = arg_str + 'args[' + j + '],';
            arg_log_str = arg_log_str + '\" ---> args[' + j + ']:\", args[' + j + '],'

        }

        arg_str = arg_str.slice(0, arg_str.length - 1)
        arg_log_str = arg_log_str.slice(0, arg_log_str.length - 1)

        // console.log("arg_str: ", arg_str)
        // console.log("log_arg_str: ", arg_log_str, "\n")


        // read in helper_method template

        var method_file;

        if (method.constant) {
            method_file = process.cwd() + mushroom_config.structure.helper_generator_location + 'helper_template_method_call.js';

        } else {

            method_file = process.cwd() + mushroom_config.structure.helper_generator_location + 'helper_template_method_sendtx.js';
        }


        // need array of strings for each method
        method_strs[i] = fs.readFileSync(method_file).toString();

        // console.log("method_str[",i,"]:",method_strs[i])

        method_strs[i] = method_strs[i].replace(/sub_method/g, method_name)
        method_strs[i] = method_strs[i].replace(/sub_args/g, arg_str)
        method_strs[i] = method_strs[i].replace(/sub_log_args/g, arg_log_str)


    }

    var method_str = ''
    for (var i in method_strs) {
        method_str = method_str + method_strs[i]
    }


    //  **********  create module.exports str *************

    var exports_str = 'module.exports = Contract;';


    var output_str = header_str + module_vars_str + method_str + exports_str

    fs.writeFileSync(output_file, output_str);

}

console.log("\n\n ***** Add message about how to use *****")












