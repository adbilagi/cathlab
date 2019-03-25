
module.exports = {
    local : "mongodb://localhost/cathlab?replicaSet=rs0",
    /**
     * use below comond to start mongodb localy
     * mongod --replSet "rs0" --bind_ip localhost,<hostname or ip address of mongod host>
     * 
     * more than one replica set
     * mongoose.connect('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]' [, options]);
     */
    

    remote : "mongodb://umesh:1234@cluster0-shard-00-00-pptin.mongodb.net:27017,cluster0-shard-00-01-pptin.mongodb.net:27017,cluster0-shard-00-02-pptin.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",


    ReservedGroups : ["Patients", "Cash in Hand"],// this are not for general purpose reserved groups

    
    ParentGroups :[ "Captil Account", "Assets", "Liabilities", "Profit and Loss"]// these are parent groups 
    
}
    