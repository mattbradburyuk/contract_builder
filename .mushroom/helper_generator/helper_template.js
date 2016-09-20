
console.log("including test_helper.js")

function sub_class_name() {
    this.contract = 'contract object';
};


sub_class_name.prototype.sub_method_1 = function(){
    console.log("sub_method_1 called");
};

sub_class_name.prototype.sub_method_2 = function(){
    console.log("sub_method_2 called");
};

var inst = new sub_class_name;
inst.sub_method_1();
inst.sub_method_2();