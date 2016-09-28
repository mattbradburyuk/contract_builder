module.exports = {
    
    files_to_compile: ["Play_2_base.sol","Play_2_child.sol","Play_2_grandchild.sol" ],
    compiler_output_file: "compiled.json",
    compiler_output_file_to_deploy: "compiled.json",
    contracts_to_deploy: ["Base_contract","Child_contract", "Grandchild_contract"],
    deployment_record: "deployed_instances.json"
    
};