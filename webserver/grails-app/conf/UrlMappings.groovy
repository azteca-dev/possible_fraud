
class UrlMappings {

	static mappings = {
        "/"{
            controller = "MaskFraud"
            action = [GET:'notAllowed', POST:'notAllowed', PUT:'notAllowed', DELETE:'notAllowed']
        }

        "/maskfraud"{
            controller = "MaskFraud"
            action = [GET:'getItemsMaskFraud', POST:'addItemMaskFraud', PUT:'modifyItemMaskFraud', DELETE:'notAllowed']
        }

        "/valuefraud"{
            controller = "ValuesFraud"
            action = [GET:'getItemValue', POST:'addItemValue', PUT:'modifyItemValue', DELETE:'notAllowed']
        }

        "/processFraudVehicle/$vehicleId?"{
            controller = "ProcessFraud"
            action = [GET:'processFraudVehicle',POST:'notAllowed', PUT:'notAllowed', DELETE:'notAllowed']
        }
	}
}
