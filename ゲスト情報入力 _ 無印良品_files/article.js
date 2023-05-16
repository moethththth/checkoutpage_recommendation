"use strict";

(function ($, I18n, Settings) {
  var domain = Settings.resRoot(); // @author ys
  // article_writer

  if (document.getElementsByClassName('article_intro_writer')) {
    // `more` button is not displayed when the text is less than five lines
    if (jQuery(".p-round-text").prop('scrollHeight') <= jQuery(".p-round-text").height()) {
      jQuery(".c-common-normal-buttons--block-read_more-readmore").hide();
    }
  } //  article_writer
  //defaultHandler function


  function initModuleFBFnWithGoodButton() {
    $('.c-common_good-button').click(function () {
      var self = $(this);

      if (self.attr('aria-expanded') === 'false') {
        self.find('img').attr({
          'src': domain + 'images/btn-good.png',
          'alt': I18n.value('Remove good evaluation')
        });
        self.attr('aria-expanded', 'true');
      } else {
        self.find('img').attr({
          'src': domain + 'images/btn-good-on.png',
          'alt': I18n.value('Make a good evaluation')
        });
        self.attr('aria-expanded', 'false');
        $('.c-common_bad-button').find('img').attr({
          'src': domain + 'images/btn-bad.png',
          'alt': I18n.value('Make a bad evaluation')
        });
        $('.c-common_bad-button').attr('aria-expanded', 'true');
      }
    });
  }

  function initModuleFBFnWithBadButton() {
    $('.c-common_bad-button').click(function () {
      var self = $(this);

      if (self.attr('aria-expanded') === 'false') {
        self.find('img').attr({
          'src': domain + 'images/btn-bad.png',
          'alt': I18n.value('Make a bad evaluation')
        });
        self.attr('aria-expanded', 'true');
      } else {
        self.find('img').attr({
          'src': domain + 'images/btn-bad-on.png',
          'alt': I18n.value('Make a bad evaluation')
        });
        self.attr('aria-expanded', 'false');
      }

      $('.c-common_good-button').find('img').attr({
        'src': domain + 'images/btn-good.png',
        'alt': I18n.value('Make a bad evaluation')
      });
      $('.c-common_good-button').attr('aria-expanded', 'true');
    });
  } // View More Menus
  // -----------------------------------------------------------------------------------------------------------


  function viewMoreMenus() {
    // view the more menus
    $('.btn-more').off('click');
    $('.btn-more').on('click', function () {
      var self = $(this);

      if (self.html() === I18n.value('See more')) {
        self.html(I18n.value('Close'));
      } else {
        self.html(I18n.value('See more'));
      }

      self.toggleClass('is-tgl__txt');

      if (self.attr('aria-expanded') === 'false') {
        self.attr('aria-expanded', 'true');
      } else {
        self.attr('aria-expanded', 'false');
      }

      self.prev('[id*="-hoge"]').attr('aria-hidden', 'false').slideToggle();
    });
  }

  function initLoadImg() {
    $('.u-vh').removeClass("u-vh");
  }

  function imageRoundTextReadMore() {
    if ($('.p-image-round-text--readmore').length > 0) {
      var lock = false;
      $('.p-image-round-text--readmore .series__readmore--btn').on('click', function () {
        if (lock) {
          return;
        }

        lock = true;
        var self = $(this),
            readMoreInfo = self.closest('.event__series--readmore--info, .readings__series--readmore--info'),
            img = readMoreInfo.find('img'),
            imgBottom = img.position().top + img.outerHeight(),
            roundText = readMoreInfo.find('.p-round-text'),
            roundTextCollapseHeight,
            roundTextExpandedHeight,
            roundTextBottom,
            ariaExpanded = self.attr('aria-expanded'),
            collapseHeight,
            expandedHeight;
        self.css({
          'opacity': 0,
          'left': 0
        });

        if (ariaExpanded === 'false') {
          self.attr('aria-expanded', 'true').html(I18n.value('Close')).addClass('is-tgl__txt');
          collapseHeight = readMoreInfo.height();
          readMoreInfo.attr('data-collapse-height', collapseHeight);
          roundTextCollapseHeight = roundText.outerHeight();
          roundText.attr('data-collapse-height', roundTextCollapseHeight);
          roundTextExpandedHeight = roundText.css({
            'display': 'inline',
            'height': 'auto'
          }).outerHeight();
          roundTextBottom = roundText.position().top + roundText.outerHeight();

          if (roundTextBottom <= imgBottom) {
            roundText.css({
              'display': 'block',
              'height': roundTextCollapseHeight
            }).animate({
              'height': roundTextExpandedHeight
            }, 300, function () {
              roundText.css({
                'display': 'inline',
                'height': 'auto'
              });
              var roundTextLeft = roundText.position().left;

              if (self.position().left < roundTextLeft) {
                self.css('left', roundTextLeft);
              }

              self.css('opacity', 1);
              lock = false;
            });
          } else {
            expandedHeight = readMoreInfo.css({
              'height': 'auto'
            }).height();
            readMoreInfo.height(collapseHeight).animate({
              'height': expandedHeight
            }, 300, function () {
              readMoreInfo.css('height', 'auto');
              var roundTextLeft = roundText.position().left;

              if (self.position().left < roundTextLeft) {
                self.css('left', roundTextLeft);
              }

              self.css('opacity', 1);
              lock = false;
            });
          }
        } else {
          self.attr('aria-expanded', 'false').html(I18n.value('See more')).removeClass('is-tgl__txt');
          roundTextCollapseHeight = roundText.attr('data-collapse-height');
          roundTextBottom = roundText.position().top + roundText.outerHeight();

          if (roundTextBottom <= imgBottom) {
            roundText.css('display', 'block').animate({
              'height': roundTextCollapseHeight
            }, 300, function () {
              var roundTextLeft = roundText.position().left;

              if (self.position().left < roundTextLeft) {
                self.css('left', roundTextLeft);
              }

              self.css('opacity', 1);
              lock = false;
            });
          } else {
            roundText.css({
              'display': 'block',
              'height': roundTextCollapseHeight
            });
            roundTextExpandedHeight = roundText.css({
              'display': 'inline',
              'height': 'auto'
            }).outerHeight();
            readMoreInfo.animate({
              'height': readMoreInfo.attr('data-collapse-height')
            }, 300, function () {
              readMoreInfo.css('height', 'auto');
              roundText.css({
                'display': 'block',
                'height': roundTextCollapseHeight
              });
              var roundTextLeft = roundText.position().left;

              if (self.position().left < roundTextLeft) {
                self.css('left', roundTextLeft);
              }

              self.css('opacity', 1);
              lock = false;
            });
          }
        }
      });
    }
  }

  function adjustImageRoundTextContainerCollapseHeight() {
    if ($('.p-image-round-text--readmore').length > 0) {
      var readMoreInfo = $('.p-image-round-text--readmore').find('.event__series--readmore--info, .readings__series--readmore--info'),
          roundText = readMoreInfo.find('.p-round-text'),
          readMoreBtn = readMoreInfo.find('.series__readmore--btn'),
          collapseHeight = parseInt(readMoreInfo.attr('data-collapse-height')) || 0,
          img = readMoreInfo.find('img'),
          imgHeight = img.outerHeight();

      if (collapseHeight !== imgHeight) {
        readMoreInfo.attr('data-collapse-height', imgHeight);
      }

      readMoreBtn.css('left', 0);
      var roundTextLeft = roundText.position().left;

      if (readMoreBtn.position().left < roundTextLeft) {
        readMoreBtn.css('left', roundTextLeft);
      }
    }
  } // -----------------------------------------------------------------------------------------------------------
  // Module: Card & Slide 12
  // Related Class: c-common__order-list
  // Adjust cards height same
  // -----------------------------------------------------------------------------------------------------------


  function adjustCardsHeightSame() {
    if ($('.history-main[aria-hidden="false"] .c-common__order-list').length > 0) {
      var screenWidth = $(window).width(),
          scrollBarWidth = 17;

      if (screenWidth <= 768 - scrollBarWidth) {
        $('.history-main[aria-hidden="false"] .c-common__order-list .order-menu').each(function () {
          var card = $(this);
          card.height('auto');
        });
        return;
      }

      var colNum = screenWidth > 1151 - scrollBarWidth ? 3 : 2,
          colIndex = 0;
      $('.history-main[aria-hidden="false"]').each(function () {
        var cardList = $(this),
            cardListObj = {
          maxHeight: 0,
          list: []
        };
        var cards = cardList.find('.c-common__order-list .order-menu'),
            cardNum = cards.length,
            cardIndex = 0;
        cards.each(function () {
          cardIndex++;
          var card = $(this);
          card.height('auto');
          var notice = card.siblings('.order-notice'),
              button = card.siblings('.order-btn');
          var currentHeight = card.height();

          if (notice.length > 0) {
            currentHeight += notice.outerHeight();
          }

          if (button.length > 0) {
            currentHeight += button.outerHeight();
          }

          if (cardListObj.maxHeight < currentHeight) {
            cardListObj.maxHeight = currentHeight;
          }

          cardListObj.list.push(card);
          colIndex++;

          if (colIndex >= colNum || cardIndex >= cardNum) {
            cardListObj.list.forEach(function (item) {
              var maxHeight = cardListObj.maxHeight,
                  itemNotice = item.siblings('.order-notice'),
                  itemButton = item.siblings('.order-btn');

              if (itemNotice.length > 0) {
                maxHeight -= itemNotice.outerHeight();
              }

              if (itemButton.length > 0) {
                maxHeight -= itemButton.outerHeight();
              }

              item.height(maxHeight);
            });
            colIndex = colIndex % colNum;
            cardListObj = {
              maxHeight: 0,
              list: []
            };
          }
        });
      });
    }
  } // ===========================================================================================================
  // Limited Time Prices Taxonomy list
  // ===========================================================================================================


  function LimitedTimePrice() {
    //tab slider slick
    if ($('.js-featured__slick--list').length > 0) {
      $(function () {
        var slider = ".js-featured__slick--list";
        var thumbnailItem = ".js-tab__slick .js-tab__button";
        $(thumbnailItem).each(function () {
          var index = $(thumbnailItem).index(this);
          $(this).attr("data-index", index);
        });
        $(slider).on('init', function (slick) {
          var index = $(".slide-item.slick-slide.slick-current").attr("data-slick-index");
          $(thumbnailItem + '[data-index="' + index + '"]').addClass("active");
        });
        $('.js-featured__slick--list').not('.slick-initialized').slick({
          accessibility: true,
          autoplay: false,
          speed: 500,
          lazyLoad: 'ondemand',
          infinite: false,
          slidesToShow: 1,
          arrows: false,
          adaptiveHeight: true,
          slidesToScroll: 1
        });
        $(thumbnailItem).on('click', function () {
          var index = $(this).attr("data-index");
          $(slider).slick("slickGoTo", index, false);
        });
        $(slider).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          $(thumbnailItem).each(function () {
            $(this).removeClass("active");
          });
          $(thumbnailItem + '[data-index="' + nextSlide + '"]').addClass("active");
        });
      });
    } //sort 


    if ($('.js-sort_list').length > 0) {
      $('.js-sort_listitem').click(function () {
        $('.js-sort_listitem').find('a').removeClass('active');
        $(this).find('a').addClass('active');
        var SortClick = $(this).data('sort-click');
        $('.js-slide--count').each(function () {
          var $elements = $(this).find('.js-sort__item').sort(function (a, b) {
            if (SortClick == 'recommendation') {
              var SortData = 'weight';
              var bf = $(a).data(SortData);
              var af = $(b).data(SortData);

              if (bf > af) {
                return 1;
              } else if (bf < af) {
                return -1;
              }

              return 0;
            } else if (SortClick == 'end-date') {
              var _SortData = 'end-date';

              var _bf = $(a).data(_SortData);

              var _af = $(b).data(_SortData);

              if (_bf > _af) {
                return 1;
              } else if (_bf < _af) {
                return -1;
              }

              return 0;
            } else {
              var _SortData2 = 'end-date';

              var _bf2 = $(a).data(_SortData2);

              var _af2 = $(b).data(_SortData2);

              if (_bf2 < _af2) {
                return 1;
              } else if (_bf2 > _af2) {
                return -1;
              }

              return 0;
            }
          });
          var lm_sortls = $(this).find('.js-sort__ul');
          $(this).find('.js-sort__ul').empty();
          $elements.each(function () {
            lm_sortls.append($(this));
          });
        });
      });
    }
  } // ===========================================================================================================
  // static header footer
  // ===========================================================================================================


  function staticHeaderFooter() {
    $('#js-head-humbtn').on('click', function () {
      $(this).toggleClass('active');
      $("#js-staticnav").toggleClass('active');
      $(this).children().css('animation', '');
      return false;
    });
    $('#js-nexbtn').on('click', function () {
      $('#js-nav_hiddenarea').addClass('active');
      return false;
    });
    $('#js-prebtn').on('click', function () {
      $('#js-nav_hiddenarea').removeClass('active');
      return false;
    });
  } // ===========================================================================================================
  // Page Handler List
  // ===========================================================================================================


  function defaultHandler() {
    initModuleFBFnWithGoodButton();
    initModuleFBFnWithBadButton();
    viewMoreMenus();
    staticHeaderFooter();
    LimitedTimePrice();
    $(window).resize(function () {
      adjustCardsHeightSame();
    });
    imageRoundTextReadMore();
    $(window).resize(function () {
      adjustImageRoundTextContainerCollapseHeight();
    });

    if ($('.c-common__slick-list').length > 0) {
      $('.c-common__slick-list').not('.slick-initialized').slick({
        arrows: false,
        infinite: false,
        accessibility: true,
        slidesToShow: 4,
        adaptiveHeight: false,
        responsive: [{
          breakpoint: 1152,
          settings: {
            slidesToShow: 3
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }]
      });
    }

    if ($('.js-featured').length > 0) {
      $('.js-featured').not('.slick-initialized').slick({
        accessibility: true,
        autoplay: false,
        speed: 500,
        lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    }

    if ($('.js-middle-featured').length > 0) {
      $('.js-middle-featured').not('.slick-initialized').slick({
        accessibility: true,
        centerMode: true,
        centerPadding: '400px',
        autoplay: false,
        speed: 500,
        slidesToShow: 1,
        responsive: [{
          breakpoint: 1500,
          settings: {
            centerPadding: '300px'
          }
        }, {
          breakpoint: 1240,
          settings: {
            centerPadding: '260px'
          }
        }, {
          breakpoint: 1130,
          settings: {
            centerPadding: '200px'
          }
        }, {
          breakpoint: 960,
          settings: {
            centerPadding: '180px'
          }
        }, {
          breakpoint: 860,
          settings: {
            centerPadding: '0'
          }
        }]
      });
    }

    initLoadImg();
  }

  defaultHandler(); //global_notice_filter

  if ($('#date_filter').length > 0) {
    $('#date_filter').change(function () {
      var date_val = $('#date_filter').val();
      $('.js-post-date').each(function () {
        $(this).addClass('u-hide');

        if (date_val == 'all') {
          $(this).removeClass('u-hide');
        } else if ($(this).data('post-date').match(date_val)) {
          $(this).removeClass('u-hide');
        }

        ;
      });
    });
  }
})(jQuery, I18n, Settings);