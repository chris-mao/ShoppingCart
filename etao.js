function supporthHtml5() {
    return (typeof(Worker) !== "undefined") ? true : false;
}

function addfavorite(theUrl) {
    if (document.all) {
        window.external.addFavorite(theUrl, 'Emerson Web Order'); 
    }
    else if (window.sidebar) {
        window.sidebar.addPanel('Emerson Web Order', theUrl, ''); 
    }
} 

$(document).ready(function() {
    jQuery.ajaxSetup({cache:false});
});

//select all items
function selectAll() {
    var aChecked = $(".select_all").prop("checked");
    if (typeof(aChecked) == "undefined") {aChecked = false;}
    $(".selectable").each(function() {
        if (typeof($(this).attr("disabled")) == "undefined") {
            var subchecked = $(this).prop("checked");
            if (subchecked != aChecked) {
                $(this).prop("checked", aChecked);
            }
        }
    });
}

function EnsureDecimal(e) {
    e.value = e.value.replace(/[^\d.]/g,""); //先把非数字的都替换掉，除了数字和.
    e.value = e.value.replace(/^\./g,""); //必须保证第一个为数字而不是.
    e.value = e.value.replace(/\.{2,}/g,"."); //保证只有出现一个.而没有多个.
    e.value = e.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); //保证.只出现一次，而不能出现两次以上
}

function EnsureInt() {
    if (((event.keyCode < 48) || (event.keyCode > 57))) {
       event.returnValue = false;
    }
}

/*********************HTML5 Notification Functions **************************************/

/** 
 * 金额按千位逗号分割 
 * @character_set UTF-8 
 * @author Jerry.li(hzjerry@gmail.com) 
 * @version 1.2014.08.24.2143 
 *  Example 
 *  <code> 
 *      alert($.formatMoney(1234.345, 2)); //=>1,234.35 
 *      alert($.formatMoney(-1234.345, 2)); //=>-1,234.35 
 *      alert($.unformatMoney(1,234.345)); //=>1234.35 
 *      alert($.unformatMoney(-1,234.345)); //=>-1234.35 
 *  </code> 
 */  
!(function($)  
		{  
		    $.extend({  
		        /** 
		         * 数字千分位格式化 
		         * @public 
		         * @param mixed mVal 数值 
		         * @param int iAccuracy 小数位精度(默认为2) 
		         * @return string 
		         */  
		        formatMoney:function(mVal, iAccuracy){  
		            var fTmp = 0.00;//临时变量  
		            var iFra = 0;//小数部分  
		            var iInt = 0;//整数部分  
		            var aBuf = new Array(); //输出缓存  
		            var bPositive = true; //保存正负值标记(true:正数)  
		            /** 
		             * 输出定长字符串，不够补0 
		             * <li>闭包函数</li> 
		             * @param int iVal 值 
		             * @param int iLen 输出的长度 
		             */  
		            function funZero(iVal, iLen){  
		                var sTmp = iVal.toString();  
		                var sBuf = new Array();  
		                for(var i=0,iLoop=iLen-sTmp.length; i<iLoop; i++)  
		                    sBuf.push('0');  
		                sBuf.push(sTmp);  
		                return sBuf.join('');  
		            };  
		  
		            if (typeof(iAccuracy) === 'undefined')  
		                iAccuracy = 2;  
		            bPositive = (mVal >= 0);//取出正负号  
		            fTmp = (isNaN(fTmp = parseFloat(mVal))) ? 0 : Math.abs(fTmp);//强制转换为绝对值数浮点  
		            //所有内容用正数规则处理  
		            iInt = parseInt(fTmp); //分离整数部分  
		            iFra = parseInt((fTmp - iInt) * Math.pow(10,iAccuracy) + 0.5); //分离小数部分(四舍五入)  
		  
		            do{  
		                aBuf.unshift(funZero(iInt % 1000, 3));  
		            }while((iInt = parseInt(iInt/1000)));  
		            aBuf[0] = parseInt(aBuf[0]).toString();//最高段区去掉前导0  
		            return ((bPositive)?'':'-') + aBuf.join(',') +'.'+ ((0 === iFra)?'00':funZero(iFra, iAccuracy));  
		        },  
		        /** 
		         * 将千分位格式的数字字符串转换为浮点数 
		         * @public 
		         * @param string sVal 数值字符串 
		         * @return float 
		         */  
		        unformatMoney:function(sVal){  
		            var fTmp = parseFloat(sVal.replace(/,/g, ''));  
		            return (isNaN(fTmp) ? 0 : fTmp);  
		        },  
		    });  
		})(jQuery);