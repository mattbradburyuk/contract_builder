// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));



// module variables (closed over)

var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"get_base_value","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"set_base_value","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]');
var address = '0xf6d0abc5bd183201a4845dc22733ad1cbf46180c';
var contract = web3.eth.contract(abi).at(address);


function Base_contract(){

    console.log("Creating Base_contract...");

}

Base_contract.get_abi = function(){
    return abi
}

Base_contract.get_contract = function(){
    return contract
}

Base_contract.set_base_value = function (args) {
        
        console.log("set_base_value called")
        console.log("args[0]:", args[0], "\nargs[1]", args[1])

        return new Promise(function (resolve, reject) {

            contract.set_base_value.sendTransaction(args[0],args[1], callback);

            function callback(e,r) {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            }
        });
};


// console.log("Base_contract: ", Base_contract);
// console.log("Base_contract.prototype: ", Base_contract.prototype);

module.exports = Base_contract;