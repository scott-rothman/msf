/**
 * Function takes of fund mf/ofst name and searches of all arrau to see if we have a match
 * @params  share_name  pass lower case strofg of mutual fund from search box
 * @return  true if match; otherwise false
 */
var search_holders = function(share_name) {
	share_name = share_name.toLowerCase()
	for (ofst of GSK_etf_holders) {
		if (ofst.hasOwnProperty("name")) {
			if (share_name == ofst.name.toLowerCase()) {
				return true;
			}
		}
	}
	for (ofst of GSK_inst_holders) {
		if (ofst.hasOwnProperty("name")) {
			if (share_name == ofst.name.toLowerCase()) {
				return true;
			}
		}
	}
	for (ofst of GSK_mfund_holders) {
		if (ofst.hasOwnProperty("name")) {
			if (share_name == ofst.name.toLowerCase()) {
				return true;
			}
		}
	}
	for (ofst of PFE_etf_holders) {
		if (ofst.hasOwnProperty("name")) {
			if (share_name == ofst.name.toLowerCase()) {
				return true;
			}
		}
	}
	for (ofst of PFE_inst_holders) {
		if (ofst.hasOwnProperty("name")) {
			if (share_name == ofst.name.toLowerCase()) {
				return true;
			}
		}
	}
	for (ofst of PFE_mfund_holders) {
		if (ofst.hasOwnProperty("name")) {
			if (share_name == ofst.name.toLowerCase()) {
				return true;
			}
		}
	}

	return false;
}
