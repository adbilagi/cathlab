
module.exports = {
    local : "mongodb://localhost/cathlab",


    remote : "mongodb://umesh:1234@cluster0-shard-00-00-pptin.mongodb.net:27017,cluster0-shard-00-01-pptin.mongodb.net:27017,cluster0-shard-00-02-pptin.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",


    ReservedGroups : ["Patients", "Cash in Hand"],

    
    ParentGroups :[ "Captil Account", "Assets", "Liabilities", "Profit and Loss"]
    
}
    