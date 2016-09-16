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


// ********** Promise chain *********


var file = options.file;

var contract_interface;
var deployed_instance;

read_in_json()
    // .then(pass_though)
    .then(set_contract_interface)
    .then(log_vars)
    .then(end_success, end_error);




// ********** define promises ******************

function read_in_json(){
    console.log("read_in_json called");
    return new Promise(function(resolve,reject){

        console.log(" ---> Reading in .json..... from file: ", file);
        com_path = '../output/compiled/' + file;

        jsonfile.readFile(com_path, callback);

        function callback(e,json) {
            if (e) {
                reject("read_in_json error");
            } else {
                console.log(" ---> json read in\n");
                resolve(json);
            }
        }
    });
}

function set_contract_interface(val){
    return new Promise(function(resolve, reject){
        contract_interface = val.interface;
        resolve()
    });
}

function set_deployed_instance(val){
    
    return new Promise(function(resolve,reject){
        
        addr = val.addres
        
        
    });
    
}




// ******* utilities ************

// ******* log vars *************

function log_vars(){
    
    return new Promise(function(resolve,reject){
        
        console.log("vars:");
        console.log("file: ", file);
        console.log("contract_interface: ", contract_interface);
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






