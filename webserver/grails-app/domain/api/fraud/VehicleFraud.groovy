package api.fraud

class VehicleFraud {

    static constraints = {

        vehicleId           unique: true, nullable: false, blank: false
        averange            min:0, nullable:false, blank:false
        updateDate          nullable: true
        updateOperator      nullable: false, blank:false
        status              inList: ['open','close']

    }

    String vehicleId
    int averange
    Date registrationDate = new Date()
    Date updateDate
    String updateOperator = 'sin actualizar'
    String status
    List coincidence = []
}
