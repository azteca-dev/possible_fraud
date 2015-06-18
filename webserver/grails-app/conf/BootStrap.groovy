
import api.fraud.MaskFraud
import api.fraud.ValuesFraud

class BootStrap {

    def init = { servletContext ->

        test{

        }
        production{

        }
        development{

            if(MaskFraud.count() == 0){

                def enabledSitesTest = ["mlm,apc"]


                def ItemMaskFraud01 = new MaskFraud(
                        parameterName: 'telefono',
                        status:'active',
                        score:10,
                        enabledSites: enabledSitesTest

                )
                if(!ItemMaskFraud01.save()){
                    println 'Error: no se pudo salvar un item en la mascara de fraude'
                    ItemMaskFraud01.errors.each{
                        println it
                    }
                }

                enabledSitesTest = ['mlm,apc,carmudi']
                def ItemMaskFraude02 = new MaskFraud(
                        parameterName:'email',
                        status: 'active',
                        score:60,
                        enabledSites:enabledSitesTest
                )

                if(!ItemMaskFraude02.save()){
                    println 'Error: no se puedo salvar un item en la mascara de fraude'
                    ItemMaskFraude02.errors.each{
                        println it
                    }
                }

            }

            if(ValuesFraud.count() == 0){

                def ValueFraud01 = new ValuesFraud(
                        parameterName:'telefono',
                        value:'5528886754',
                        status: 'active'
                )

                if(!ValueFraud01.save()){
                    println 'Error: no se pudo guardar el valor de item de fraude'
                    ValueFraud01.errors.each{
                        println it
                    }
                }

                def ValueFraud02 = new ValuesFraud(
                        parameterName:'email',
                        value:'david@detocho.com.mx',
                        status: 'active'
                )

                if(!ValueFraud02.save()){
                    println 'Error: no se pudo guardar el valor de item de fraude'
                    ValueFraud02.errors.each{
                        println it
                    }
                }

            }
        }
    }
    def destroy = {
    }
}
