
module.exports = {

    get_contract_object: function() {

        var jsonfile = require("jsonfile");
        var Web3 = require('web3');

        const web3 = new Web3();
        var url = 'http://192.168.99.100:8541';
        web3.setProvider(new web3.providers.HttpProvider(url));

        // console.log(web3.eth.coinbase);

        var dep = jsonfile.readFileSync("../output/deployed/deployed_instances.json");
        var comp = jsonfile.readFileSync("../output/compiled/Play.json");
        var name = dep.contracts[0].name;
        var addr = dep.contracts[0].details.address;
        var iface = comp.contracts[name].interface;

        // console.log(name);
        // console.log(addr);
        // console.log(iface);


        var con = web3.eth.contract(JSON.parse(iface));
        var contract = con.at(addr);

        // console.log("base:", contract.get_base_value.call());
        // console.log("child:", contract.get_child_value.call());
        // console.log("grandchild:", contract.get_grandchild_value.call());
    
        return contract;
    }
}



