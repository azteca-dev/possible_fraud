
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

                def ItemMaskFraud01 = new MaskFraud(
                        type: 'telefono',
                        status:'active',

                )
                if(!ItemMaskFraud01.save()){
                    println 'Error: no se pudo salvar un item en la mascara de fraude'
                    ItemMaskFraud01.errors.each{
                        println it
                    }
                }

                def ItemMaskFraude02 = new MaskFraud(
                        type:'email',
                        status: 'active'
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
                        type:'telefono',
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
                        type:'email',
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
