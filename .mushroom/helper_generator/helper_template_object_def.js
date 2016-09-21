
function sub_class(){

    this.abi = sub_abi;
    this.bytecode = sub_bytecode;
    this.address = sub_address;
    
    this.contract_obj = web3.eth.contract(this.abi).at(this.address);
    
}