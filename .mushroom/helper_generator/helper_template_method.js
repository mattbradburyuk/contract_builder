

sub_class.prototype.sub_method = function(sub_args){

    return new Promise (function (resolve,reject){

        this.contract_obj.sub_method(sub_args, callback);
        
        function callback(){
            if(e){
                reject(e);
            }else{
                resolve(r);
            }
        }
    })
};