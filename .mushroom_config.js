module.exports = {
    rpc: {
        host: "192.168.99.100",
        port: 8541
    },
    structure: {
        source_directory: "/sources/",
        
        compiler: "multi_compiler.js",
        compiler_location: "/.mushroom/compilers/",
        compiler_output_directory: "/output/compiled/",
        
        deployer: "multi_deploy.js",
        deployer_location: "/deployer/",
        deployer_output_directory: "/output/deployed/",
        
        contract_config: "contract_config.js",
        contract_config_location: "/config/"
    }

};
