// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));



Base_contract = function (){

    console.log("Creating Base_contract...");

    this.name ='Matt'
    var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"get_base_value","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"set_base_value","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]');
    var address = '0x35163117322d53f8617ff5c559f7ea03ed0f107d';
    this.contract = web3.eth.contract(abi).at(address);
    console.log("this.contract: ", this.contract.address)
    
}

Base_contract.prototype = {

    set_base_value_send: function (val, tx_object) {

        console.log("Base_contract.prototype set_base_value defined")
        console.log(this.name);

        var contract = this.contract;
        console.log("contract outside of promise: ", contract.address)

        return new Promise(function (resolve, reject) {

            console.log("promise invoked with val: ", val)
            console.log("contract in promise:", contract.address)
            contract.set_base_value.sendTransaction(val, tx_object, callback);

            function callback(e,r) {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            }
        })
    }
};


module.exports = {Base_contract};