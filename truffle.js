module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    production:{

        host: "bcrb6mrj7.southcentralus.cloudapp.azure.com",
        port: 8545,
        network_id: 72

    }
  }
};

