

sub_class.prototype = {

    sub_method: function (args) {
        
        console.log("sub_class.prototype sub_method defined")
        console.log(this.name);

        var contract = this.contract;
        console.log("contract outside of promise: ", contract.address)

        return new Promise(function (resolve, reject) {

            console.log("promise invoked with val: ", args)
            console.log("contract in promise:", contract.address)
            contract.sub_method.sendTransaction(args[0],args[1], callback);

            function callback(e,r) {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            }
        })
    }
};


// console.log("sub_class: ", sub_class);
// console.log("sub_class.prototype: ", sub_class.prototype);

