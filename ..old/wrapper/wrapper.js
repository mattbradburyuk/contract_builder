// what was I doing here???


module.exports = {


    PsendTransaction: function(vals) {

        return new Promise(function (resolve, reject) {


            web3.eth.sendTransaction(vals, callback);

            function callback(e,r) {

                if (e) {
                console.log("error: ", e);
                reject(e);
                }else{
                    resolve(r);
                }
            }
        });
    }
}


