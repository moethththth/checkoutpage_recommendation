/*
 * 処理中インジケーター表示
 * 
 * Dependencies none
 * Updated 2009.10.01
 */

function jsgt_Indicator(src)
{
  this.div = setIndicatorDIV(src);

  this.indi_append = indi_append;
  this.indi_start = indi_start;
  this.indi_stop = indi_stop;

  this.img = new Image();
  this.img.src = src;

  function setIndicatorDIV(src)
  {
    // インジケータを出力するdiv
    id = "_indicator"+(new Date()).getTime();//idを生成;
    this.div = document.createElement("DIV") ;

    // インジケータ用DIVのデフォルト値(インスタンスで上書き変更できます)
    this.div.style.position = "relative";
    this.div.style.top      = "0px";
    this.div.style.left     = "0px";
    this.div.style.width    = "0px";
    this.div.style.height   = "0px";
    this.div.style.margin  = '0px' ; 
    this.div.style.padding = '0px' ; 
    
    return this.div
  }

  function indi_append(id)
  {
    if(typeof document.getElementById(id) != 'object')return;
    document.getElementById(id).appendChild(this.div);
  }

  //インジケータ スタート
  function indi_start()
  {
    //サイズを与えることで表示する
    this.div.style.height ="12px";
    this.div.style.width ="auto";
    this.div.innerHTML  = '<img src="'+this.img.src+'">' ;
  }

  //インジケータ ストップ
  function indi_stop()
  {
    this.div.style.width ="0px";
    this.div.style.height ="0px";
    this.div.innerHTML  = '' ;
  }
  return this
}
var _ebisu_indicator;
// インジケータの画像パス
var _ebisu_indicator_ImagePath = 'html/common/ebisu/indicator.gif';
function startIndicator(area) {
	_ebisu_indicator = new jsgt_Indicator(_ebisu_indicator_ImagePath);
	_ebisu_indicator.indi_append(area);
	_ebisu_indicator.indi_start();
}
function stopIndicator() {
	_ebisu_indicator.indi_stop();
}
// １画面で複数インジケーターを利用する場合の start
function startIndicatorMulti(area) {
	var indicator = new jsgt_Indicator(_ebisu_indicator_ImagePath);
	indicator.indi_append(area);
	indicator.indi_start();
	return indicator;
}
//１画面で複数インジケーターを利用する場合の stop
function stopIndicatorMulti(indicator) {
	indicator.indi_stop();
}
