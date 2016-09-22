pragma solidity ^0.4.1;

contract Base_contract{

    uint base_value;

    function Base_contract(){
        base_value = 100;
    }

    function get_base_value() constant returns (uint){
        return base_value;
    }

    function set_base_value(uint val) {
        base_value = val;
    }

}