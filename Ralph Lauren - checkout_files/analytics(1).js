(function () {
  window.digitalData = window.digitalData || {};
  var elDataAnalyticsEventClick = document.querySelectorAll(
    "[data-analytics-event-click]"
  );
  var analyticsSection = getAnalyticsSection();

  function init() {
    digitalData.page = getPageSectionInfo(digitalData.page);
    digitalData.user = getUserSectionInfo(digitalData.user);
    digitalData.event = [];
    setAnalyticsEventClick();
    if (analyticsSection === "plp") {
      digitalData.search = getSearchInfo(digitalData.search);
      digitalData.product = getProductInfoFromPLP(digitalData.product);
    }
    if (analyticsSection === "pdp")
      digitalData.product = getProductInfoFromPDP(digitalData.product);

    if (getCartedProductCount() > 0) {
      digitalData.cart = getCartInfo(digitalData.cart);
    }

    if (analyticsSection === "cartResult") {
      digitalData.transaction = getTransactionInfo(digitalData.transaction);
    }

    setTimeout(function () {
      if (window._satellite) {
        _satellite.pageBottom();
      }
    }, 0);
  }

  function getAnalyticsSection() {
    var elDataAnalyticsSection = document.querySelector(
      "[data-analytics-section]"
    );
    if (!elDataAnalyticsSection) return null;
    return elDataAnalyticsSection.dataset.analyticsSection;
  }

  function getPageSectionInfo(obj) {
    var page = obj || {};
    page.pageLocale = "ja_JP";
    return page;
  }

  function getUserSectionInfo(obj) {
    var member_data = window.member_data || null;
    var user = obj || {};

    if (member_data) {
      if (member_data.member_id !== "") {
        user.userID = member_data.member_id;
        user.userLoginState = "registered";
      } else {
        user.userLoginState = "guest";
      }

      if (member_data.birth !== "") {
        user.userBirthday = translateYYYYMMDDtoMMDD(member_data.birth);
      }

      if (member_data.sex !== "") {
        user.userGender = member_data.sex;
      }
    } else {
      user.userLoginState = "guest";
    }

    user.userCountry = "JAPAN";

    var elEmployeeName = document.querySelector(
      '[data-analytics-content="userEmployeeName"]'
    );

    if (elEmployeeName) {
      user.userEmployeeID = user.userID;
      user.userEmployeeName = getTextContent(elEmployeeName);
    }

    return user;
  }

  function translateYYYYMMDDtoMMDD(YYYYMMDD) {
    if (typeof YYYYMMDD !== "string") return "";
    var arrYYYYMMDD = YYYYMMDD.split("/");
    if (arrYYYYMMDD.length < 3) return "";
    return arrYYYYMMDD[1] + "/" + arrYYYYMMDD[2];
  }

  function setAnalyticsEventClick() {
    var numDataAnalyticsEventClick = elDataAnalyticsEventClick.length;
    if (numDataAnalyticsEventClick < 1) return;

    for (var i = 0; i < numDataAnalyticsEventClick; i++) {
      elDataAnalyticsEventClick[i].addEventListener("click", function (e) {
        pushAnalyticsEventClick(e.currentTarget);
      });
    }
  }

  function pushAnalyticsEventClick(element) {
    digitalData.event.push({
      eventInfo: {
        eventName: element.dataset.analyticsEventClick,
      },
    });
  }

  function getSearchInfo(obj) {
    var search = obj || {};
    var elDataAnalyticsContentSearchResults = document.querySelector(
      '[data-analytics-content="searchResults"]'
    );
    var txtSearchResults;
    var matchedSearchResults;
    var keyword = getQueryParameterValue("keyword");

    if (elDataAnalyticsContentSearchResults) {
      txtSearchResults = elDataAnalyticsContentSearchResults.textContent;
      matchedSearchResults = txtSearchResults.match(/全.*件/);
      if (matchedSearchResults) {
        search.searchResults = Number(
          matchedSearchResults[0].replace(/[^0-9]/g, "")
        );
      }
    } else {
      search.searchResults = 0;
    }

    if (keyword) search.searchTerm = keyword;

    return search;
  }

  function getQueryParameterValue(key) {
    key = key.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function getProductInfoFromPDP(obj) {
    var product = obj || {};
    var item = [];
    var elProductPrice = document.querySelector(
      '[data-analytics-content="productPrice"]'
    );
    var elProductlist = document.querySelectorAll(
      '[data-analytics-content="productList"]'
    );
    var arrProductlist = [];

    for (var i = 0; i < elProductlist.length; i++) {
      arrProductlist.push(getTextContent(elProductlist[i]));
    }

    item.push({
      productID: getTextContent(
        document.querySelector('[data-analytics-content="productID"]')
      ),
      productList: arrProductlist.join("/"),
      productName: getTextContent(
        document.querySelector('[data-analytics-content="productName"]')
      ),
      productPrice: getSellPrice(elProductPrice),
    });

    if (item.length > 0) product.item = item;

    return product;
  }

  function getSellPrice(element) {
    var elPriceSell = element.querySelector(
      '[data-analytics-content="productSellPrice"]'
    );
    return getNumeral(getTextContent(elPriceSell));
  }

  function getTextContent(element) {
    if (!element) return "";
    if (!element.textContent) return "";
    return element.textContent.trim();
  }

  function getNumeral(str) {
    if (typeof str !== "string") return 0;
    return Number(str.replace(/[^0-9]/g, ""));
  }

  function getProductInfoFromPLP(obj) {
    var product = obj || {};
    var item = [];
    var elDataAnalyticsContentItemList = document.querySelectorAll(
      '[data-analytics-content="itemList"]'
    );

    for (var i = 0; i < elDataAnalyticsContentItemList.length; i++) {
      var obj = {};
      var elDataAnalyticsContentProductName = elDataAnalyticsContentItemList[
        i
      ].querySelector('[data-analytics-content="productName"]');
      if (elDataAnalyticsContentProductName) {
        obj.productName = getTextContent(elDataAnalyticsContentProductName);
        obj.productID = getProductIdFromAnchor(
          elDataAnalyticsContentProductName.querySelector("a")
        );
        obj.productPrice = getSellPrice(elDataAnalyticsContentItemList[i]);
        item.push(obj);
      }
    }

    if (item.length > 0) product.item = item;

    return product;
  }

  function getProductIdFromAnchor(element) {
    if (!element) return "";
    var path = element.pathname;

    if (!path) return "";
    var pathWithoutExt = path.split(".")[0];
    return pathWithoutExt.split("/").pop();
  }

  function getCartedProductCount() {
    var elDataAnalyticsContentCartedProductCount = document.querySelector(
      '[data-analytics-content="cartedProductCount"]'
    );
    return getNumeral(getTextContent(elDataAnalyticsContentCartedProductCount));
  }

  function getCartInfo(obj) {
    var cart = obj || {};
    var item = [];
    cart.cartedProductCount = getCartedProductCount();

    var elDataAnalyticsContentCartedProductItem = document.querySelectorAll(
      '[data-analytics-content="cartedProductItem"]'
    );

    for (var i = 0; i < elDataAnalyticsContentCartedProductItem.length; i++) {
      var element = elDataAnalyticsContentCartedProductItem[i];
      var elDataAnalyticsContentCartedProductBrand = element.querySelector(
        '[data-analytics-content="cartedProductBrand"]'
      );
      var elDataAnalyticsContentCartedProductId = element.querySelector(
        '[data-analytics-content="cartedProductID"]'
      );
      var elDataAnalyticsContentCartedProductName = element.querySelector(
        '[data-analytics-content="cartedProductName"]'
      );
      var elDataAnalyticsContentCartedProductPrice = element.querySelector(
        '[data-analytics-content="cartedProductPrice"]'
      );
      var elDataAnalyticsContentCartedProductQuantity = element.querySelector(
        '[data-analytics-content="cartedProductQuantity"]'
      );
      var elDataAnalyticsContentCartedProductOriginalPrice = element.querySelector(
        '[data-analytics-content="cartedProductOriginalPrice"]'
      );

      item.push({
        productBrand: getTextContent(elDataAnalyticsContentCartedProductBrand),
        productID: getTextContent(elDataAnalyticsContentCartedProductId).split(
          "-"
        )[0],
        productName: getTextContent(elDataAnalyticsContentCartedProductName),
        productPrice: getNumeral(
          getTextContent(elDataAnalyticsContentCartedProductPrice)
        ),
        productQuantity: getNumeral(
          getTextContent(elDataAnalyticsContentCartedProductQuantity)
        ),
        productOriginalPrice: getNumeral(
          getTextContent(elDataAnalyticsContentCartedProductOriginalPrice)
        ),
        productSKU: getTextContent(elDataAnalyticsContentCartedProductId),
        productStockMessage: "IN_STOCK",
      });
    }

    if (item.length > 0) cart.item = item;

    return cart;
  }

  function getTransactionInfo(obj) {
    var transaction = obj || {};
    var item = [];
    var elFormCartResult = document.getElementsByName("HIDDEN_DATA_FORM")[0];
    var numOrderProducts = elFormCartResult.ITEM_CD.length; // ITEM_CDが単一のelementの場合、lengthはundefined
    var isGiftOrder =
      getTextContent(
        document.querySelector('[data-analytics-content="orderIsGiftOrder"]')
      ) !== "";

    transaction.orderBillingCity = getTextContent(
      document.querySelector('[data-analytics-content="orderBillingCity"]')
    );
    transaction.orderBillingCountry = "JAPAN";
    transaction.orderBillingState = getTextContent(
      document.querySelector('[data-analytics-content="orderBillingState"]')
    );
    transaction.orderBillingZipCode = getTextContent(
      document.querySelector('[data-analytics-content="orderBillingZipCode"]')
    );

    transaction.orderCurrencyCode = "JPY";

    transaction.orderID = getTextContent(
      document.querySelector('[data-analytics-content="orderID"]')
    );
    transaction.orderIsGiftOrder = isGiftOrder ? "Yes" : "No";
    transaction.orderLevelCoupon = elFormCartResult.COUPON_CD.value;
    transaction.orderLevelCouponDiscount = getNumeral(
      elFormCartResult.COUPON_WARIBIKI.value
    );
    transaction.orderLevelProductRevenue = getNumeral(
      elFormCartResult.SYOKEI.value
    );
    transaction.orderLevelQuantitySold = getNumeral(
      elFormCartResult.ALL_AMOUNT.value
    );
    transaction.orderLevelTaxRevenue = getNumeral(elFormCartResult.TAX.value);
    transaction.orderPaymentMethod = getTextContent(
      document.querySelector('[data-analytics-content="orderPaymentMethod"]')
    );

    transaction.orderShipMethod = "Standard Delivery";
    transaction.orderShippingCity = getTextContent(
      document.querySelector('[data-analytics-content="orderShippingCity"]')
    );
    transaction.orderShippingCountry = "JAPAN";
    transaction.orderShippingState = getTextContent(
      document.querySelector('[data-analytics-content="orderShippingState"]')
    );
    transaction.orderShippingZipCode = getTextContent(
      document.querySelector('[data-analytics-content="orderShippingZipCode"]')
    );

    transaction.orderTotalProductDiscount = getNumeral(
      elFormCartResult.WARIBIKI_SUM.value
    );
    transaction.orderTransactionType = "web";

    // ITEM_CDがlengthを持つか否かで処理を分ける
    if (numOrderProducts) {
      for (var i = 0; i < numOrderProducts; i++) {
        item.push({
          productID: elFormCartResult.ITEM_CD_ONLY[i].value,
          productName: elFormCartResult.ITEM_NAME[i].value,
          productQuantity: getNumeral(elFormCartResult.ITEM_AMOUNT[i].value),
          productSKU: elFormCartResult.ITEM_CD[i].value,
          productStockMessage: "IN_STOCK",
        });
      }
    } else {
      item = [
        {
          productID: elFormCartResult.ITEM_CD_ONLY.value,
          productName: elFormCartResult.ITEM_NAME.value,
          productQuantity: getNumeral(elFormCartResult.ITEM_AMOUNT.value),
          productSKU: elFormCartResult.ITEM_CD.value,
          productStockMessage: "IN_STOCK",
        },
      ];
    }

    if (item.length > 0) transaction.item = item;

    return transaction;
  }

  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
      init();
    }, 0);
  });
})();
