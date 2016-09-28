// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));


// ******** module variables (closed over when module required - I think) ************

var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"get_base_value","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"set_base_value","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]');
var address = '0xf6d0abc5bd183201a4845dc22733ad1cbf46180c';
var contract = web3.eth.contract(abi).at(address);


sub_class.get_abi = function(){
    return abi
}

sub_class.get_address = function(){

    return address
}

sub_class.get_contract = function(){
    return contract
}


// ********* get_base_value **********

sub_class.get_base_value = function (args) {
        
        console.log("get_base_value called")
        console.log("\n ---> args[0]:", args[0])

        return new Promise(function (resolve, reject) {

            contract.get_base_value.sendTransaction(arg[0], callback);

            var timer;

            function callback(e,tx_ref) {
                if (e) {
                    reject(e);
                } else {
                    console.log(" ---> tx_ref:", tx_ref)
                    timer = setInterval(check_mined, 500, tx_ref)

                }
            }

            function check_mined(tx_ref) {
                // console.log("tx_ref in check_mined:", tx_ref);
                var tx = web3.eth.getTransaction(tx_ref.toString());
                // console.log("tx.blockNumber: ", tx.blockNumber);

                if(tx.blockNumber != null) {
                    console.log(" ---> tx mined in block: ", tx.blockNumber);
                    clearInterval(timer);
                    resolve(tx_ref);
                }
            }

        });
};


// ********* set_base_value **********

sub_class.set_base_value = function (args) {
        
        console.log("set_base_value called")
        console.log("\n ---> args[0]:", args[0],"\n ---> args[1]:", args[1])

        return new Promise(function (resolve, reject) {

            contract.set_base_value.sendTransaction(arg[0],arg[1], callback);

            var timer;

            function callback(e,tx_ref) {
                if (e) {
                    reject(e);
                } else {
                    console.log(" ---> tx_ref:", tx_ref)
                    timer = setInterval(check_mined, 500, tx_ref)

                }
            }

            function check_mined(tx_ref) {
                // console.log("tx_ref in check_mined:", tx_ref);
                var tx = web3.eth.getTransaction(tx_ref.toString());
                // console.log("tx.blockNumber: ", tx.blockNumber);

                if(tx.blockNumber != null) {
                    console.log(" ---> tx mined in block: ", tx.blockNumber);
                    clearInterval(timer);
                    resolve(tx_ref);
                }
            }

        });
};


