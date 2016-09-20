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
var contract_config = require(cc_path)



// *********** set up web3 and rpc ****************

const web3  = new Web3();
var url = 'http://'+mushroom_config.rpc.host+':'+ mushroom_config.rpc.port;
web3.setProvider(new web3.providers.HttpProvider(url));
var rpc_client = jayson.client.http(url);




// ********* set output file ***************

var output_file = process.cwd() + mushroom_config.structure.helper_output_directory + mushroom_config.structure.helper_file



// ********* read in header ****************

// read in header_template
var header_file = process.cwd() + mushroom_config.structure.helper_generator_location + 'helper_template_header.js';
var header_str = fs.readFileSync(header_file).toString();

// get host:ip from config and substitute
var host_ip = '\"http://' + mushroom_config.rpc.host + ":" + mushroom_config.rpc.port +'\"';
header_str = header_str.replace(/sub_geth_host_port/g, host_ip);

// fs.writeFileSync(output_file, header_str);


// ********** Read in contract details *************







