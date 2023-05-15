(function() { function bxBootstrap() {
	var re = /bot|crawl|slurp|spider|mediapartners|headlesschrome|snap-prefetch|remotasks|woorank|uptime\.com|facebookexternalhit|facebookcatalog/i;
	if (re.test(navigator.userAgent) || navigator.userAgent == '') {
		return;
	}

	if (!(window.bouncex&&bouncex.website)) {
		var pushedData = [];
		if(window.bouncex && bouncex.push && bouncex.length){
			pushedData = bouncex;
		}
		window.bouncex = {};
		bouncex.pushedData = pushedData;
		bouncex.website = {"id":5535,"name":"MUJI US","cookie_name":"bounceClientVisit5535","domain":"muji.us","ct":"fp_local_storage","ally":0,"ei":0,"tcjs":"","cjs":"","force_https":false,"waypoints":false,"content_width":900,"gai":"UA-8435447-1","swids":"","sd":0,"ljq":"auto","campaign_id":0,"is_preview":false,"aco":{"first_party_limit":"3500","local_storage":"1"},"cmp":{"gdpr":0,"gmp":0,"whitelist_check":0},"burls":[],"ple":false,"fbe":true,"mas":2,"map":1,"gar":true,"ete":1,"ettm":false,"etjs":"/* ---------------------------- SHARED VARIABLES ---------------------------- */\n\nvar CART_COOKIE_KEY = 'cart',\n    CLEAN_URL = bouncex.utils.url.allowParams(['q']);\n\n/* --------------------------------- HELPERS -------------------------------- */\n\nfunction getIdFromUrl(url) {\n    url = url ? bouncex.utils.url.allowParams([], url) : '';\n\n    return url.split('/products/').pop();\n}\n\n/* ------------------------------ ITEM TRACKING ----------------------------- */\n\nfunction getItem() {\n    return {\n        id: getIdFromUrl(CLEAN_URL),\n        copy: jQuery('.product-title').first().text().trim(),\n        category: bouncex.utils.getNestedProp('ShopifyAnalytics.meta.product.type'),\n        url: CLEAN_URL,\n        imageurl: 'http:' + jQuery('.product-gallery--loaded-image').attr('src'),\n        instock: jQuery('.product-form--atc-button').text().toLowerCase().indexOf('add') > -1\n    };\n}\n\nfunction fireViewItem(id) {\n    bouncex.push(['view item', { 'item:id': id }]);\n}\n\nfunction initializeItemEvents() {\n    var item;\n\n    bouncex.et.onTrue(\n        function () {\n            item = getItem();\n            return !!item.id &&\n                !!item.copy &&\n                !!item.category &&\n                !!item.url &&\n                !!item.imageurl;\n        },\n        function () {\n            if (item.url.indexOf('gift-card') > -1) {\n                return;\n            }\n            bouncex.push(['item', item]);\n            fireViewItem(item.id);\n            initializeATCClickTracking(item.id);\n        },\n        10\n    );\n}\n\n/* ---------------------------- CATEGORY TRACKING --------------------------- */\n\nfunction getItemIdsCat() {\n    var ids = [];\n\n    jQuery('.productgrid--item a.productitem--image-link').each(function (i, e) {\n        var id = getIdFromUrl(jQuery(e).attr('href'));\n\n        if (id && ids.indexOf(id) < 0) {\n            ids.push(id);\n        }\n    });\n\n    return ids.join(',');\n}\n\nfunction getCategoryObject() {\n    return {\n        'page:url': CLEAN_URL,\n        'items:ids': getItemIdsCat()\n    };\n}\n\nfunction initializeCategoryEvents() {\n    var categoryObj;\n\n    bouncex.et.onTrue(\n        function () {\n            categoryObj = getCategoryObject();\n            return !!categoryObj['items:ids'].length &&\n                !!categoryObj['page:url'];\n        },\n        function () {\n            bouncex.push(['view category', categoryObj]);\n        },\n        10\n    );\n}\n\nfunction initializeQuickView() {\n    bouncex.et.onVarChange('quickview_visible', function (oldVal, newVal) {\n        if (newVal) {\n            var id = getIdFromUrl(jQuery('.modal-content .product-title a').attr('href'));\n\n            if (id) {\n                fireViewItem(id);\n                initializeATCClickTracking(id);\n            }\n        }\n    });\n}\n\n/* ------------------------------- CART EVENTS ------------------------------ */\n\nfunction fireAddToCart(itemId) {\n    var token;\n\n    bouncex.et.onTrue(\n        function () {\n            token = bouncex.getBounceCookie(CART_COOKIE_KEY);\n            return !!token;\n        },\n        function () {\n            bouncex.push([\n                'add to cart',\n                {\n                    'item:id': itemId,\n                    'cart:token': token\n                }\n            ]);\n\n            if (bouncex.vars.cart) {\n                return;\n            }\n\n            bouncex.setVar('cart', true);\n        },\n        10\n    );\n}\n\nfunction initializeATCClickTracking(itemId) {\n    bouncex.off(bouncex.document, 'click.bxatc');\n    bouncex.et.on(bouncex.document, 'click.bxatc', function () {\n        if (itemId) {\n            fireAddToCart(itemId);\n        }\n    }, '.product-form--atc-button');\n}\n\nfunction initializeQuickATC() {\n    var $quickATC = jQuery('.productitem--action-atc').filter(function() {\n        return jQuery(this).text().toLowerCase().indexOf('add to cart') > -1;\n    });\n\n    bouncex.off($quickATC, 'click.bxatc');\n    bouncex.on($quickATC, 'click.bxatc', function () {\n        var id = getIdFromUrl(jQuery(this).parents('.productitem__container').find('.productitem--info a').attr('href'));\n        if (id) {\n            fireAddToCart(id);\n        }\n    });\n}\n\nfunction fireEmptyCart() {\n    bouncex.push(['empty_cart']);\n    bouncex.setVar('cart', false);\n}\n\nfunction emptyCart() {\n    if (bouncex.website.pts === 'cart' && bouncex.vars.cart_qty === 0 && bouncex.vars.cart) {\n        fireEmptyCart();\n    }\n\n    bouncex.et.onVarChange('cart_qty', function (oldVal, newVal) {\n        if (bouncex.vars.cart && newVal === 0 && oldVal > 0) {\n            fireEmptyCart();\n        }\n    });\n}\n\nfunction initializeCartEvents() {\n    bouncex.et.cart.init({\n        replenishmentType: 'cookie',\n        replenish: function (cart) {\n            bouncex.utils.cookies.create({\n                name: CART_COOKIE_KEY,\n                value: cart.token\n            });\n            replenComplete();\n        }\n    });\n\n    function replenComplete() {\n        window.location.href = CLEAN_URL + '?bx_replen=true';\n    }\n\n    bouncex.et.onVarChange('cart_qty', function (oldVal, newVal) {\n        if (newVal > oldVal && jQuery('#tdf_upsell').length > 0) {\n            initializeQuickATC();\n        }\n    });\n\n    emptyCart();\n}\n\n/* ------------------------------ USER TRACKING ----------------------------- */\n\nfunction initializeUserTracking() {\n    if (!bouncex.vars.logged_in || !!bouncex.vars.logged_in_identified) {\n        return;\n    }\n\n    var userEmail;\n\n    bouncex.et.onTrue(\n        function () {\n            userEmail = bouncex.utils.getNestedProp('_BISConfig.customer.email', '');\n            return bouncex.utils.validate.email(userEmail);\n        },\n        function () {\n            bouncex.push([\n                'user',\n                {\n                    'email': userEmail,\n                    'source': 'LoggedIn'\n                }\n            ]);\n            bouncex.setVar('logged_in_identified', true);\n        },\n        5\n    );\n}\n\n/* --------------------------- INITIALIZE TRACKING -------------------------- */\n\nfunction isValidDomain() {\n    return CLEAN_URL.indexOf('muji.us') > -1;\n}\n\nfunction isEn() {\n    return bouncex.html.attr('lang') === 'en';\n}\n\nfunction isValidForTracking() {\n    return isValidDomain() && isEn();\n}\n\nfunction init() {\n    if (!isValidForTracking()) {\n        return;\n    }\n\n    initializeUserTracking();\n    initializeCartEvents();\n    initializeQuickView();\n    initializeQuickATC();\n\n    switch (bouncex.website.pts) {\n        case 'category':\n        case 'search':\n            initializeCategoryEvents();\n            break;\n        case 'product':\n            initializeItemEvents();\n            break;\n        default:\n            break;\n    }\n}\n\ninit();\n","dge":true,"bxidLoadFirst":false,"pie":true,"cme":true,"gbi_enabled":0,"bpush":false,"pt":{"cart":{"testmode":false,"val":[[{"activation":"js","prop":"","prop2":"","prop3":"","val":"!!jQuery('.cart-title-left').length;"}]]},"category":{"testmode":false,"val":[[{"activation":"js","prop":"","prop2":"","prop3":"","val":"bouncex.utils.getNestedProp('ShopifyAnalytics.meta.page.pageType', '') === 'collection';"}]]},"checkout":{"testmode":false,"val":[[{"activation":"js","prop":"","prop2":"","prop3":"","val":"jQuery('title').text().toLowerCase().indexOf('checkout') > -1;"}]]},"home":{"testmode":false,"val":[[{"activation":"js","prop":"","prop2":"","prop3":"","val":"bouncex.utils.getNestedProp('ShopifyAnalytics.meta.page.pageType', '') === 'home';"}]]},"product":{"testmode":false,"val":[[{"activation":"js","prop":"","prop2":"","prop3":"","val":"bouncex.utils.getNestedProp('ShopifyAnalytics.meta.page.pageType', '') === 'product';"}]]},"search":{"testmode":false,"val":[[{"activation":"js","prop":"","prop2":"","prop3":"","val":"bouncex.utils.getNestedProp('ShopifyAnalytics.meta.page.pageType', '') === 'searchresults';"}]]}},"els":{"blank_site_element":""},"vars":[{"name":"logged_in","polling":"none","persist":"no","page_types":[],"testmode":false,"default":"false","code":"!!bouncex.utils.getNestedProp('__st.cid', false);","trigger":""},{"name":"ever_logged_in","polling":"none","persist":"permanent","page_types":[],"testmode":false,"default":"false","code":"bouncex.vars.logged_in || null;","trigger":""},{"name":"cart_qty","polling":"all","persist":"no","page_types":[],"testmode":false,"default":"0","code":"(function() {\n    var count = 0;\n    if (bouncex.website.pts === 'checkout') {\n        jQuery('#order-summary .product-thumbnail__quantity').each(function() {\n            count += Number(jQuery(this).text());\n        });\n        return count;\n    }\n    return Number(jQuery('.site-header-cart--count').text()) || 0;\n})();","trigger":""},{"name":"cart_value","polling":"all","persist":"visit","page_types":[],"testmode":false,"default":"0","code":"(function() {\n    if (bouncex.website.pts === 'checkout') {\n        return Number(jQuery('.order-summary__section .total-line--subtotal .total-line__price').text().replace(/[^0-9.]/g, ''));\n    }\n    return Number(jQuery('.qimify-minicart-cart-total .money:last').text().replace(/[^0-9.]/g, \"\")) || 0;\n})();","trigger":""},{"name":"prod_price","polling":"none","persist":"no","page_types":[],"testmode":true,"default":"false","code":"","trigger":""},{"name":"prod_name","polling":"none","persist":"no","page_types":[],"testmode":true,"default":"false","code":"","trigger":""},{"name":"in_stock","polling":"none","persist":"no","page_types":[],"testmode":true,"default":"false","code":"","trigger":""},{"name":"submitted_onsite","polling":"none","persist":"permanent","page_types":[],"testmode":false,"default":"false","code":"!!jQuery('.newsletter-success').length || null;","trigger":""},{"name":"page_url","polling":"none","persist":"no","page_types":["category","search"],"testmode":true,"default":"false","code":"","trigger":""},{"name":"cart_token","polling":"none","persist":"no","page_types":[],"testmode":true,"default":"false","code":"null;","trigger":"pageload"},{"name":"cart_items","polling":"none","persist":"no","page_types":[],"testmode":true,"default":"false","code":"null;","trigger":"pageload"},{"name":"cart","polling":"none","persist":"permanent","page_types":[],"testmode":false,"default":"false","code":"null;","trigger":"pageload"},{"name":"cookie_modal_present","polling":"all","persist":"no","page_types":[],"testmode":true,"default":"false","code":"null;","trigger":"pageload"},{"name":"page_type","polling":"all","persist":"no","page_types":[],"testmode":false,"default":"false","code":"bouncex.website.pts;","trigger":"pageload"},{"name":"quickview_visible","polling":"all","persist":"no","page_types":[],"testmode":false,"default":"false","code":"jQuery('.modal--quickshop-full, .modal--quickshop-slim').length > 0;","trigger":"pageload"},{"name":"logged_in_identified","polling":"none","persist":"permanent","page_types":[],"testmode":false,"default":"false","code":"null;","trigger":"pageload"}],"dgu":"pixel.cdnwidget.com","dgp":false,"ba":{"enabled":0,"fbte":0},"biu":"assets.bounceexchange.com","bau":"api.bounceexchange.com","beu":"events.bouncex.net","ibx":{"tjs":"","cjs":"","miw":0,"mibcx":1,"te":1,"cart_rep":{"get":"","set":""},"ulpj":{"bxid":"espemailid"},"cus":"","miw_exclude":"","enabled":1},"etjson":null,"osre":true,"osru":"osr.bounceexchange.com/v1/osr/items","checkDfp":false,"gamNetwork":"","spa":0,"spatm":1,"preinit_cjs":"","crs":{"integrations":null,"pageCount":null},"mat":0,"math":0,"cpnu":"coupons.bounceexchange.com","dfpcms":0,"sms":{"optm":"","eventSharing":false,"shqId":"","enabled":0},"pde":true,"fmc":["AW","AI","AG","AR","BS","BB","BZ","BM","BO","BQ","BR","CA","KY","CL","CO","CR","CU","CW","DM","DO","EC","SV","GF","GL","GD","GT","GP","HT","HN","JM","MQ","MX","MS","NI","PA","PY","PE","PR","PM","MF","BL","KN","LC","VC","SX","SR","TT","US","UM","UY","VE","VG","VI"],"fme":true,"fmx":".yotpo-input[aria-label*=\"Friend\"]","sdk":{"android":{"enabled":false,"enabledVersions":[],"eventModifications":null},"ios":{"enabled":false,"enabledVersions":[],"eventModifications":null}},"onsite":{"enabled":1},"ads":{"enabled":0},"pubs":{"enabled":0},"ga4_property_id":"313231727","ga4_measurement_id":"G-1GPK8C7YJL"}
;
		bouncex.tag = 'tag3';
		bouncex.$ = window.jQuery;
		bouncex.env = 'production';
		bouncex.restrictedTlds = {"casl":{"ca":1},"gdpr":{"ad":1,"al":1,"at":1,"ax":1,"ba":1,"be":1,"bg":1,"by":1,"xn--90ais":1,"ch":1,"cy":1,"cz":1,"de":1,"dk":1,"ee":1,"es":1,"eu":1,"fi":1,"fo":1,"fr":1,"uk":1,"gb":1,"gg":1,"gi":1,"gr":1,"hr":1,"hu":1,"ie":1,"im":1,"is":1,"it":1,"je":1,"li":1,"lt":1,"lu":1,"lv":1,"mc":1,"md":1,"me":1,"mk":1,"xn--d1al":1,"mt":1,"nl":1,"no":1,"pl":1,"pt":1,"ro":1,"rs":1,"xn--90a3ac":1,"ru":1,"su":1,"xn--p1ai":1,"se":1,"si":1,"sj":1,"sk":1,"sm":1,"ua":1,"xn--j1amh":1,"va":1,"tr":1}};
		bouncex.client = {
			supportsBrotli: 1
		};
		bouncex.assets = {"ads":"b1f427e44bd70011c72fa21c427b417d","creativesBaseStyles":"a53944a2","inbox":"55e6b1db95283cbbf5b7297bc078f464","onsite":"fd4c26110d21e22467b38d007a4ec27e","sms":"f75be24ffe0530b348756e8bc01ddcdf"};
		bouncex.push = function(pushData) {
			bouncex.pushedData.push(pushData);
		}

		var runtime = document.createElement('script');
		runtime.setAttribute('src', '//assets.bounceexchange.com/assets/smart-tag/versioned/runtime_b4ad65fa381da0648767eee58152de5e.br.js');
		runtime.setAttribute('async', 'async');

		runtime.onload = function() {
			var script = document.createElement('script');
			script.setAttribute('src', '//assets.bounceexchange.com/assets/smart-tag/versioned/main-v2_4972a3d7a4d2403321b45bfaef590d08.br.js');
			script.setAttribute('async', 'async');
			document.body.appendChild(script);


			var deviceGraphScript = document.createElement('script');
			deviceGraphScript.setAttribute('src', '//assets.bounceexchange.com/assets/smart-tag/versioned/cjs_min_823aeb800e990ee40f4b77498369fab4.js');
			deviceGraphScript.setAttribute('async', 'async');
			var dgAttrs = [{"Key":"id","Value":"c.js"},{"Key":"async","Value":"true"},{"Key":"data-apikey","Value":"2^HIykD"},{"Key":"data-cb","Value":"bouncex.dg.initPostDeviceGraph"},{"Key":"data-bx","Value":"1"},{"Key":"data-gm","Value":"1"},{"Key":"data-fire","Value":"1"}];
			if (dgAttrs) {
				for (var i = 0; i < dgAttrs.length; i++) {
					deviceGraphScript.setAttribute(dgAttrs[i].Key, dgAttrs[i].Value);
				}
			}
			document.body.appendChild(deviceGraphScript);

		};

		document.body.appendChild(runtime);

	}


}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", bxBootstrap);
} else {
	bxBootstrap();
}})();