
console.log("including test_helper.js")

function My_other_class() {
    this.contract = 'contract object';
};


My_other_class.prototype.my_method_1 = function(){
    console.log("my_method_1 called");
};

My_other_class.prototype.my_method_2 = function(){
    console.log("my_method_2 called");
};

var inst = new My_other_class;
inst.my_method_1();
inst.my_method_2();
extra bit