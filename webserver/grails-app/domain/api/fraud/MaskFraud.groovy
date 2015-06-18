package api.fraud

class MaskFraud {

    static constraints = {

        parameterName       nullable:false, blank:false, maxSize: 50, unique: true
        status              inList: ['active', 'inactive']
        userActivation      nullable:false, blank:false
        userRegistration    nullable:false, blank:false
        userDeactivation    nullable:true
        dateDeactivation    nullable:true
        dateActivation      nullable:true
        dateRegistration    nullable:false
        score               nullable:false, blank:false, max: 100, min:0
    }

    String parameterName
    String status           = 'active'
    Date dateRegistration   = new Date()
    Date dateDeactivation
    Date dateActivation     = new Date()
    String userRegistration = 'sin_user'
    String userDeactivation
    String userActivation   = 'sin_user'
    int score = 0
    List enabledSites = []

    //TODO agregar un mapa para saber en que sitio este parametro es considerado posible fraude
}
