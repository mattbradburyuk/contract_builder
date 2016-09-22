



// ************ test helper ***********

var func = new sub_class();

console.log("func: ", func.contract.address);


// wait_2000(400)
//     .then(func.set_base_value)
//     .then(end_success,end_error);

func.sub_method_send(70000,{from: "0xf4e9b90cf88c0f20a97ed61496ec79afbb474e93"})
    .then(end_success,end_error);



// ********** wait promise *****************

function wait_2000(pass_through){
    return new Promise(function (resolve,reject){
        console.log("pause.....")
        setTimeout(proceed,2000)
        
        function proceed() {
            
            console.log("proceeding.....")
            resolve(pass_through)
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
