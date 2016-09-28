pragma solidity ^0.4.1;

import "Play_2_base.sol";

contract Child_contract is Base_contract {

    uint child_value;

    function Child_contract(){
        child_value = 200;
    }

    function get_child_value() constant returns (uint){
        return child_value;
    }

    function set_child_value(uint val) {
        child_value = val;
    }
}