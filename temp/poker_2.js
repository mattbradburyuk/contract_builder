var poker = require("./get_contract.js");





var contract = poker.get_contract_object()

for (var i in contract.abi) {

    console.log(contract.abi[i].name);
    
    
}
// console.log("base:", contract.get_base_value.call());
// console.log("child:", contract.get_child_value.call());
// console.log("grandchild:", contract.get_grandchild_value.call());