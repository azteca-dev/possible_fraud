environments {
    development {
        grails {
            mongo {
                host = "localhost"
                databaseName = "mp_fraud"
            }
        }
    }
    test {
        grails {
            mongo {
                host = "localhost"
                databaseName = "mp_fraud"
            }
        }
    }
    production {
        grails {
            mongo {

                // replicaSet = []
                host = "localhost"
                username = ""
                password = ""
                databaseName = "mp_fraud"
            }
        }
    }
}