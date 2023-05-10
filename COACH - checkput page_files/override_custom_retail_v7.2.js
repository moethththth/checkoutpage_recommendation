/* Script to hide order summary div/element for order detail containing returned order */

function hideOrderSubtotalElement () {
    const $orderDetailsContainer = $(".order-detail-section");
    // check for page  & container element
    if ($orderDetailsContainer.length) {
        //check for returned order existing on page or not
        const $returnedOrderELements = $orderDetailsContainer.find(".status").filter("[data-qa='maohdp_ord_status_bar_返品済み']");
        if ($returnedOrderELements.length) {
            $orderDetailsContainer.find(".checkout-order-total-summary .subtotal-item").addClass("d-none");
        }
    }
}
$(document).ready(function(){

    //Check if relevant (order detail) page
    const pageExist = $(".page[data-action='Order-TrackOrderForm']").length || $(".page[data-action='Order-Details']").length;

    if (pageExist) {
        // for scenario when user is logged in and navigates to order history section -> order-detials
        hideOrderSubtotalElement();

        // for scenario when user fills up a form with order details and email id & zipcode to fetch the details
        $(document).ajaxComplete(function(event, xhr, settings) {
            let urlArray = settings.url.split("/");
            const urlEndpoint = urlArray[urlArray.length-1];
            if (urlEndpoint === "Order-TrackOrder") {
                hideOrderSubtotalElement();
            }
        });
    }
});

$(document).on('shown.bs.modal', '.js-add-address-preferences-modal' , function (e) {
    $(this).find('.add-to-email-list-container #dmOptIn').parent().remove();
});


$(document).ready(function(){
  
  $(document).on('show.bs.modal', function(){
    
        var div = $('div.checkbox.d-flex.justify-content-between.add-gift-wrap');

        if(div && div.parent()) {
          $('<div class="checkbox d-flex justify-content-between add-gift-wrap">ギフトラッピングには、コーチのブランド紹介とコーチ ストアでのケアアイテムプレゼントのご案内を同封させていただきます。</div>').appendTo(div.parent());
         }
    });
});

$(document).ready(function(){
	if (($('body').attr('data-pagename') === "confirmation") && ($('label[for=confirm-terms-condition]').length > 0)){
		$("label[for=confirm-terms-condition]").html('<div class="content-asset"><a href="https://japan.coach.com/support/terms-of-use" title="利用規約" data-qa="ar_link_dsclmr_tnc" target="_blank"><u>利用規約</u></a>と<a href="https://japan.coach.com/support/privacy-policy" title="個人情報保護方針" data-qa="ar_link_dsclmr_prpolicy" target="_blank"><u>個人情報保護方針</u></a>に同意する</div>');
	}
});

$(document).ready(function(){
  
  if($('div.single-shipping').length){
        var shippingMethod = $('div.shipping-method');
    if(shippingMethod.length && shippingMethod.parent()){
       shippingMethod.parent().remove();
    }
  }
});
