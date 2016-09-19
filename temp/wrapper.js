var Web3 = require('web3');

const web3 = new Web3();
var url = 'http://192.168.99.100:8541';
web3.setProvider(new web3.providers.HttpProvider(url));

var con = require("./get_contract.js");

var contract = con.get_contract_object();

// console.log(contract)



module.exports = {
   
    get_base_value: function (){

        console.log("base value: ", contract.get_base_value()); // need to sort out call syntax
    },
    
    
    get_child_value: function (){
        
        return new Promise(function (resolve,reject) {

            contract.get_child_value(callback)


            function callback(e, r) {
                if (e) {
                    reject(e)
                } else {
                    console.log("child value: ", r);
                    resolve(r)
                }
            }
        });
    },
    
    get_grandchild_value: function(){
        
        return new Promise(function (resolve,reject){
            
            contract.get_grandchild_value(callback);
            
            function callback(e,r){
                if (e){
                    reject(e)
                }else{
                    console.log("grandchild value: ",r);
                    resolve(r);
                }
            }
        });
    },
    
    
    test: function(){
        var cb = web3.eth.coinbase
        console.log("test function called, cb: ", cb)
    }   
   
}
    