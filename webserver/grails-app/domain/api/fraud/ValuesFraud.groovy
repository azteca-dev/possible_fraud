package api.fraud

class ValuesFraud {

    static constraints = {
        parameterName                nullable:false, blank:false, maxSize: 50
        value               nullable:false, blank:false, maxSize: 100
        status              inList: ['active', 'deleted']
        userRegistration    nullable:false, blank:false
        userUpdate          nullable:true
        userDeleted         nullable:true
        dateDeleted         nullable:true
    }


    String parameterName
    String value
    String status = 'active'
    String userRegistration = 'sin_user'
    String userUpdate
    String userDeleted
    Date dateRegistration = new Date()
    Date dateActived      = new Date()
    Date dateDeleted

}
