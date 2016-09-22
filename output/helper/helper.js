// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));



function base_contract(){

    console.log("Creating base_contract...");

    this.name ='Matt'
    var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"get_base_value","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"set_base_value","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]');
    var address = '0xa5d6225d83a35a72913213dc02118dacc0defa08';
    this.contract = web3.eth.contract(abi).at(address);
    console.log("this.contract: ", this.contract.address)
    
}

base_contract.prototype = {

    set_base_value_send: function (val, tx_object) {

        console.log("base_contract.prototype set_base_value defined")
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
}



// ************ test helper ***********

var func = new base_contract();

console.log("func: ", func.contract.address);


// wait_2000(400)
//     .then(func.set_base_value)
//     .then(end_success,end_error);

func.set_base_value_send(70000,{from: "0xf4e9b90cf88c0f20a97ed61496ec79afbb474e93"})
    .then(end_success,end_error);



// ********** wait promise *****************

function wait_2000(pass_through){
    return new Promise(function (resolve,reject){
        console.log("pause.....")
        setTimeout(proceed,2000)
        
        function proceed() {
            
            console.log("proceeding.....")
            resolve(pass_through)
        }
    });
}



// *********end of promise chain markers **********

function end_success(result) {
    console.log("\nEnd result: ---> ",result); // "Stuff worked!"
    console.log("\n *********  end of script **********");
}
function end_error(err) {
    console.log("\nEnd error: ---> ",err); // Error: "It broke"
    console.log("\n *********  end of script **********");
}
