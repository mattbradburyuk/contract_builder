
// module variables (closed over)

var abi = JSON.parse('sub_abi');
var address = 'sub_address';
var contract = web3.eth.contract(abi).at(address);


function sub_class(){

    console.log("Creating sub_class...");

}

sub_class.get_abi = function(){
    return abi
}

sub_class.get_contract = function(){
    return contract
}