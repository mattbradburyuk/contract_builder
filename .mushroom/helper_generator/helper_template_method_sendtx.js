

sub_class.sub_method = function (args) {
        
        console.log("sub_method called")
        console.log(" ---> args[0]:", args[0], "\n ---> args[1]", args[1])

        return new Promise(function (resolve, reject) {

            contract.sub_method.sendTransaction(args[0],args[1], callback);

            var timer;

            function callback(e,tx_ref) {
                if (e) {
                    reject(e);
                } else {
                    console.log(" ---> tx_ref:", tx_ref)
                    timer = setInterval(check_mined, 500, tx_ref)

                }
            }

            function check_mined(tx_ref) {
                // console.log("tx_ref in check_mined:", tx_ref);
                var tx = web3.eth.getTransaction(tx_ref.toString());
                // console.log("tx.blockNumber: ", tx.blockNumber);

                if(tx.blockNumber != null) {
                    console.log(" ---> tx mined in block: ", tx.blockNumber);
                    clearInterval(timer);
                    resolve(tx_ref);
                }
            }

        });
};


// console.log("sub_class: ", sub_class);
// console.log("sub_class.prototype: ", sub_class.prototype);

