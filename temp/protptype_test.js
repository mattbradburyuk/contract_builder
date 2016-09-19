function wrapper(){
    this.data_1 = 10;
    this.data_2 = 20;
    this.funcs = []
}

wrapper.prototype.func_1 = function(){

    console.log("func_1 called");
}


wrapper.prototype.func_2 = function(){
    console.log("func_2 called");
}

var func_name = "func_3";

// wrapper.prototype.eval(func_name) = function(){
//
//     console.log("func_3 called");
// }



var my_obj = new wrapper()

my_obj.func_1();
my_obj.func_2();
// my_obj.func_3();

function Wrapper_2(){

    this.data ='10';
}

var my_funcs = ['func_3'];
console.log(my_funcs[0])

Wrapper_2.prototype = {

    func_3: function(){
        console.log("wrapper_2 func_3 called");
    },

    func_4: function (){
        console.log("wrapper_2 func_4 called");
    }


}

var my_wrapper_2 = new Wrapper_2()


my_wrapper_2.func_3();

var str = "my_wrapper_2." + my_funcs[0] +"()"
console.log("str: ", str);

eval(str);

// my_wrapper_2.eval(my_funcs[0]);
my_wrapper_2.func_4();


// console.log(Wrapper_2.prototype)