pragma solidity ^0.4.1;

contract Contract_1{

    uint stored_value;

    function Contract_1(){
        stored_value = 100;
    }

    function get_stored_value() constant returns (uint){
        return stored_value;
    }
}