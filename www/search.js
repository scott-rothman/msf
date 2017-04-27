/**
 * Function takes in fund mf/inst name and searches in all arrau to see if we have a match
 * @params  share_name  pass lower case string of mutual fund from search box
 * @return  true if match; otherwise false
 */
var search_holders = function(share_name) {
	for inst in GSK_etf_holders {
		if (inst.hasOwnProperty("name")) {
			if (share_name == inst.name) {
				return true;
			}
		}
	}
	for inst in GSK_mfund_holders {
		if (inst.hasOwnProperty("name")) {
			if (share_name == inst.name) {
				return true;
			}
		}
	}
	for inst in PFE_etf_holders {
		if (inst.hasOwnProperty("name")) {
			if (share_name == inst.name) {
				return true;
			}
		}
	}
	for inst in PFE_mfund_holders {
		if (inst.hasOwnProperty("name")) {
			if (share_name == inst.name) {
				return true;
			}
		}
	}

	return false;
}
