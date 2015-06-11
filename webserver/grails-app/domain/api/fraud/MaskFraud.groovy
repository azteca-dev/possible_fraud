package api.fraud

class MaskFraud {

    static constraints = {

        type                nullable:false, blank:false, maxSize: 50, unique: true
        status              inList: ['active', 'inactive']
        userActivation      nullable:false, blank:false
        userRegistration    nullable:false, blank:false
        userDeactivation    nullable:true
        dateDeactivation    nullable:true
        dateActivation      nullable:true
        dateRegistration    nullable:false
    }

    String type
    String status           = 'active'
    Date dateRegistration   = new Date()
    Date dateDeactivation
    Date dateActivation     = new Date()
    String userRegistration = 'sin_user'
    String userDeactivation
    String userActivation   = 'sin_user'
}
