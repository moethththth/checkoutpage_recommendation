//<script>
bouncex.tryCatch(function reloadCampaigns(){
	var newCampaigns = false;
	bouncex.creatives = false;
	bouncex.brandStyles = false;
	bouncex.webfonts = false;

	if (bouncex.gbi) {
		bouncex.gbi.stacks = false;
	}

	var newCookie = {"did":"6650839440232970214","vid":1684116858978064,"v":{"ever_logged_in":false,"cart_value":49.899999999999999,"submitted_onsite":false,"cart":true,"logged_in_identified":false},"dgFirstLoad":true,"fvt":1683877324,"ao":1,"lp":"https%3A%2F%2Fwww.muji.us%2F55680663742%2Fcheckouts%2F545cd1aff1f655ae360872002649c85d%3F_ga%3D2.116832513.661679673.1683877293-1877227013.1683877292%26_gac%3D1.57420760.1683877300.CjwKCAjwx_eiBhBGEiwA15gLNx7gfU05yljutMKujyqJWkkBT7Obd1bdoHtupuEfoyHSp2tWyg_wSRoCEOUQAvD_BwE","as":0,"vpv":1,"d":"d","r":"","cvt":1684116858,"sid":1,"gcr":35,"m":0,"lvt":1684116858,"campaigns":{"2019918":{"lvt":1683877303,"lavid":1},"2019959":{"lvt":1683877303,"lavid":1,"la":1683877301,"fsa":1683877301,"as":1,"ao":1,"oa":[]},"2055247":{"lvt":1683877295,"lavid":1,"la":1683877295,"fsa":1683877295,"as":1,"ao":1,"oa":[1683877295],"io":1,"wc":1683877297},"2055252":{"lvt":1683877303,"lavid":1}}};
	var campaignAdded = false;
	for (var campaignId in newCampaigns) {
		if (newCampaigns.hasOwnProperty(campaignId)) {
			// if campaign cookie does not exist
			if (!bouncex.cookie.campaigns) {
				bouncex.cookie.campaigns = {};
			} else {
				bouncex.cookie.campaigns = Object.assign({}, bouncex.cookie.campaigns);
			}

			if (!bouncex.cookie.campaigns[campaignId]) {
				campaignAdded = true;
				bouncex.cookie.campaigns[campaignId] = {lvt:bouncex.cookie.lvt, vv:0};
			} else if (newCookie.campaigns[campaignId]) {
				// need to set campaign cookie's activations_sessions to the new cookie as it gets modified in reloadCampaigns
				campaignAdded = true;
				bouncex.cookie.campaigns[campaignId].as = newCookie.campaigns[campaignId].as;
			}
		}
	}
	if (campaignAdded) {
		bouncex.setBounceCookie();
	}

	for (var campaignId in bouncex.campaigns) {
		if (bouncex.campaigns.hasOwnProperty(campaignId)) { //copy state vars
			if (newCampaigns[campaignId]) {
				newCampaigns[campaignId].ap = bouncex.campaigns[campaignId].ap;
				newCampaigns[campaignId].repressed = Boolean(bouncex.campaigns[campaignId].repressed);
			}

			if (newCampaigns[campaignId] &&
				bouncex.campaigns[campaignId].ad_visible &&
				newCampaigns[campaignId].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'') == bouncex.campaigns[campaignId].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'')) {
								newCampaigns[campaignId] = bouncex.campaigns[campaignId];
			} else if (newCampaigns[campaignId] && bouncex.isGbi2Campaign(campaignId) && bouncex.campaigns[campaignId].gbi.hasBegunAuction) {
								newCampaigns[campaignId] = bouncex.campaigns[campaignId];
			} else {
				bouncex.destroy_ad(campaignId);
			}
		}
	}

	bouncex.campaigns = newCampaigns;
	newCampaigns = {};

	bouncex.debug = false;
		bouncex.setBounceCookie();
	if (bouncex.campaigns) {
		for (var campaignId in bouncex.campaigns) {
			if (bouncex.campaigns[campaignId].ad_visible && typeof bouncex.repressCampaigns === 'function') {
				bouncex.repressCampaigns(campaignId);
			}
		}
		bouncex.loadBounceCss(bouncex.initActivationFuncs);
	}
		bouncex.loadBrandStyles();
	bouncex.loadWebfonts();

	})();
