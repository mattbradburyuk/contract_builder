

sub_class.prototype = {

    sub_method_send: function (sub_args) {

        console.log("sub_class.prototype sub_method defined")
        console.log(this.name);

        var contract = this.contract;
        console.log("contract outside of promise: ", contract.address)

        return new Promise(function (resolve, reject) {

            console.log("promise invoked with val: ", val)
            console.log("contract in promise:", contract.address)
            contract.sub_method.sendTransaction(sub_args, callback);

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


