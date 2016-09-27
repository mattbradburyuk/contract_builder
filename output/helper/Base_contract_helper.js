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


sub_class.get_abi = function(){
    return abi
}

sub_class.get_address = function(){

    return address
}

sub_class.get_contract = function(){
    return contract
}