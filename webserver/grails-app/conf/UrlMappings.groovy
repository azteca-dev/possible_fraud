import api.fraud.MaskFraud

class UrlMappings {

	static mappings = {
        "/"{
            controller = "MaskFraud"
            action = [GET:'notAllowed', POST:'notAllowed', PUT:'notAllowed', DELETE:'notAllowed']
        }

        "/maskfraud"{
            controller = "MaskFraud"
            action = [GET:'getItemsMaskFraud', POST:'addItemMaskFraud', PUT:'modifyItemMaskFraud', DELETE:'']
        }
	}
}
