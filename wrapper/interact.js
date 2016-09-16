var config = require("../deployer_config.js")
var Web3 = require('web3');
var jayson = require('jayson');
var commandLineArgs = require('command-line-args');
var jsonfile = require("jsonfile");


// ************* read in commandline options

var cli = commandLineArgs([
    {name: 'file', alias: 'f', type: String, defaultValue: 'all', description: 'file to compile'}
]);

try{
    var options = cli.parse();
    console.log('Starting with options:',JSON.stringify(options));
}
catch(e){
    console.log("error reading command line arguments, e: ", e);
    return;
}


// *********** set up web3 and rpc ****************

const web3  = new Web3();
var url = 'http://'+config.rpc.host+':'+config.rpc.port;
// console.log('web3 connect to:',url);
web3.setProvider(new web3.providers.HttpProvider(url));
// console.log('rpc connect to:',url);
var rpc_client = jayson.client.http(url);

// check connection objects
// console.log(web3._requestManager.provider.host);
// console.log(rpc_client.options.host)

// plan
// 1    Get contract definition
// 2    Get deployed instance
// 3    expose an object which can call methods on


// ********* declare vars *********
 
var compiled_file_path = '../output/compiled/Prescription.json'
var deployed_file_path = '../output/deployed/instance_of_Prescription.json'
var compiled_contract_json;
var contract_interface;
var deployed_address;
var deployed_instance;

// ********** Promise chain *********

read_in_compiled_json()
    .then(read_in_deployed_json)
    .then(set_deployed_instance)
    .then(log_vars)
    .then(end_success, end_error);




// ********** define promises ******************

function read_in_compiled_json(){
    console.log("read_in_compiled_json called");
    return new Promise(function(resolve,reject){

        console.log(" ---> Reading in .json..... from file: ", compiled_file_path);
        
        jsonfile.readFile(compiled_file_path, callback);

        function callback(e,json) {
            if (e) {
                reject("read_in_json error");
            } else {
                console.log(" ---> json read in\n");
                compiled_contract_json = json;
                contract_interface = json.interface;
                resolve();
            }
        }
    });
}

function read_in_deployed_json(){
    console.log("read_in_deployed_json called");
    return new Promise(function(resolve,reject){

        console.log(" ---> Reading in .json..... from file: ", deployed_file_path);

        jsonfile.readFile(deployed_file_path, callback);

        function callback(e,json) {
            if (e) {
                reject("read_in_json error");
            } else {
                console.log(" ---> json read in\n");
                deployed_address = json.address;
                resolve();
            }
        }
    });
}

function set_deployed_instance(){
    
    return new Promise(function(resolve,reject){

        var con = web3.eth.contract(JSON.parse(contract_interface));
        deployed_instance =  con.at(deployed_address);
        resolve()
    });
}







// ******* utilities ************

// ******* log vars *************

function log_vars(){
    
    return new Promise(function(resolve,reject){
        
        console.log("vars:");
        console.log("compiled_file_path: ", compiled_file_path);
        console.log("deployed_file_path ", deployed_file_path);
        // console.log("compiled_contract_json: ", compiled_contract_json);
        console.log("contract_interface: ", contract_interface);
        console.log("deployed_address: ", deployed_address);
        console.log("deployed_instance: ", deployed_instance);
        resolve();
    });
}




// ********* pass_through logger **********

function pass_though(val) {
    console.log("pass_through called");
    console.log(" ---> val:  ",val);
    return val
}

// *********end of promise chain markers **********

function end_success(result) {
    console.log("End result: ---> ",result); // "Stuff worked!"
}
function end_error(err) {
    console.log("End error: ---> ",err); // Error: "It broke"
}






