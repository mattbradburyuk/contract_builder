
var helper_file = '../../output/helper/helper.js'
var helper = require(helper_file)


// ************ test helper ***********
console.log("new helper.Base_contract...");
var func = new helper.Base_contract();

// console.log("func: ", func);

console.log("set_base_value:", func.set_base_value)


// wait_2000(123,{from: "0xf4e9b90cf88c0f20a97ed61496ec79afbb474e93"})
//     // .then(func.set_base_value)
//     .then(log_func)
//     .then(end_success,end_error);

var args = [789,{from: "0xf4e9b90cf88c0f20a97ed61496ec79afbb474e93"}];

// func.set_base_value(args)
//     .then(end_success,end_error);

log_func(args)
    .then(func.set_base_value)
    .then(end_success,end_error);



// ********* log func *********

function log_func(pass_through){

    return new Promise ( function (resolve,reject){
        console.log("func: ", func );
        resolve(pass_through)
    });
}

// ********* log pass_through

function log_func(pass_through){

    return new Promise ( function (resolve,reject){
        console.log("pass_through: ", pass_through );
        resolve(pass_through)
    });
}


// ********** wait promise *****************

function wait_2000(pass_through){
    return new Promise(function (resolve,reject){
        console.log("pause.....")
        setTimeout(proceed,2000)

        function proceed() {

            console.log("proceeding.....");
            resolve(pass_through);
        }
    });
}



// *********end of promise chain markers **********

function end_success(result) {
    console.log("\nEnd result: ---> ",result); // "Stuff worked!"
    console.log("\n *********  end of script **********");
}
function end_error(err) {
    console.log("\nEnd error: ---> ",err); // Error: "It broke"
    console.log("\n *********  end of script **********");
}
