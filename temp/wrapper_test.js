var wrapper = require ('./wrapper.js');

//
// wrapper.get_base_value();
// wrapper.get_child_value();
// wrapper.get_grandchild_value();
//


wrapper.get_grandchild_value()
    .then(wrapper.get_child_value)
    .then(end_success,end_error);



// *********end of promise chain markers **********

function end_success(result) {
    console.log("\nEnd result: ---> ",result); // "Stuff worked!"
    console.log("\n *********  end of script **********");
}
function end_error(err) {
    console.log("\nEnd error: ---> ",err); // Error: "It broke"
    console.log("\n *********  end of script **********");
}

