
sub_class = function (){

    console.log("Creating sub_class...");

    this.name ='Matt'
    var abi = JSON.parse('sub_abi');
    var address = 'sub_address';
    this.contract = web3.eth.contract(abi).at(address);
    console.log("this.contract: ", this.contract.address)
    
}