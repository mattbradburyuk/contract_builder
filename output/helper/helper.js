// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));



function base_contract(){

    console.log('constructor called')

    var abi = [{"constant":true,"inputs":[],"name":"get_base_value","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"set_base_value","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}];
    var bytecode = "placeholder for bytecode";
    var address = "0x266f8c89a93f139cb8e09b46f8fa17dcdddb9c0f";
    
    var contract_obj = web3.eth.contract(abi).at(address);
    
}

base_contract.prototype = {
    
    set_base_value : function(val) {

        return new Promise(function (resolve, reject) {

            console.log("promise called with val: ", val)
            console.log(this.contract_obj);
            resolve();
            // this.contract_obj.set_base_value(val, callback);
            //
            // function callback(){
            //     if(e){
            //         reject(e);
            //     }else{
            //         resolve(r);
            //     }
            // }
        })
    }
};


var func = new base_contract();

func.set_base_value(400)
    .then(end_success,end_error);




// *********end of promise chain markers **********

function end_success(result) {
    console.log("\nEnd result: ---> ",result); // "Stuff worked!"
    console.log("\n *********  end of script **********");
}
function end_error(err) {
    console.log("\nEnd error: ---> ",err); // Error: "It broke"
    console.log("\n *********  end of script **********");
}
