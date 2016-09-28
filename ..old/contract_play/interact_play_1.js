// objective: write some generic set up code to interact with a contract, (currently specific to Prescription)

// need to work out how to have a contract object I can call whenever I like rather than at the end of the promise chain.


var config = require("../deployer_config.js")
var Web3 = require('web3');
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
// 3    test out with some methods on Prescription


// ********* declare vars *********

var compiled_file_path = '../output/compiled/Play_1.json'
var deployed_file_path = '../output/deployed/instance_of_Play_1.json'
var compiled_contract_json;
var contract_interface;
var deployed_address;
var deployed_instance;

// ********** Promise chain *********

read_in_compiled_json()
    .then(read_in_deployed_json)
    .then(set_deployed_instance)
    .then(log_vars)
    .then(get_stored_value)
    .then(end_success, end_error);




// ********** define promises ******************

function read_in_compiled_json(){
    console.log("read_in_compiled_json called");
    return new Promise(function(resolve,reject){

        console.log(" ---> Reading in .json..... from compiled_file: ", compiled_file_path);

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

        console.log(" ---> Reading in .json..... from compiled_file: ", deployed_file_path);

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


//
// function set_drug(){
//
//     return new Promise(function(resolve,reject){
//
//         web3.personal.unlockAccount(web3.eth.coinbase,'mattspass');
//         deployed_instance.set_drug.sendTransaction('snuddles', {from: web3.eth.coinbase, to: deployed_address}, callback);
//
//         var timer;
//
//         function callback(e,tx_id){
//             if(e){
//                 reject(e)
//             }else{
//                 console.log("set_drug response: ", tx_id);
//                 timer = setInterval(check_mined, 1000, tx_id)
//             }
//         }
//
//         function check_mined(tx_id){
//             console.log('check_mined called with: ', tx_id);
//             var tx_receipt = web3.eth.getTransaction(tx_id)
//             var bn = tx_receipt.blockNumber
//             // console.log("tx_receipt: ", tx_receipt.blockNumber);
//             if (bn != null){
//                 console.log("bn not null: ", bn)
//                 clearInterval(timer);
//                 resolve()
//             }
//
//
//         }
//
//     })
// }

function get_stored_value(){

    return new Promise(function(resolve,reject){

        deployed_instance.get_stored_value_2.call(callback);

        function callback(e,r){
            if(e){
                reject(e)
            }else{
                console.log("get_stored_value response: ", r);
                resolve(r)
            }
        }

    })
}











// ******* utilities ************

// ******* log vars *************

function log_vars(){

    return new Promise(function(resolve,reject){

        console.log("vars:");
        console.log("compiled_file_path: ", compiled_file_path);
        console.log("deployed_file_path ", deployed_file_path);
        console.log("compiled_contract_json: ", compiled_contract_json);
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






