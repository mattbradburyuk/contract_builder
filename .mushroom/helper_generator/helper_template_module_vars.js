// ******** module variables (closed over when module required - I think) ************

var abi = JSON.parse('sub_abi');
var address = 'sub_address';
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


