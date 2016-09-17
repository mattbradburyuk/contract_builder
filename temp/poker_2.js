var poker = require("./poker.js");



var contract = poker.get_contract_object()


console.log("base:", contract.get_base_value.call());
console.log("child:", contract.get_child_value.call());
console.log("grandchild:", contract.get_grandchild_value.call());