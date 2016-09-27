

sub_class.sub_method = function (args) {
        
        console.log("sub_method called")
        console.log("args[0]:", args[0], "\nargs[1]", args[1])

        return new Promise(function (resolve, reject) {

            contract.sub_method.sendTransaction(args[0],args[1], callback);

            function callback(e,r) {
                if (e) {
                    reject(e);
                } else {
                    resolve(r);
                }
            }
        });
};


// console.log("sub_class: ", sub_class);
// console.log("sub_class.prototype: ", sub_class.prototype);

