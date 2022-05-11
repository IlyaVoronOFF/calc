/* Калькулятор стоимости строительства -------------------------------------------------------*/

function perimetr(a, b) {
    var result = (parseInt(a) + parseInt(b)) * 2;
    return result;
}

function nesus_sten(a, b) {
    var result = ((parseInt(a) + parseInt(b)) * 2) + parseInt(a);
    return result;
}



$('.validnumber').on('keypress', function(e) {

    if (e.keyCode == 8 || e.keyCode == 46) {
        return true;
    } else {
        var letters = '1234567890';
        return (letters.indexOf(String.fromCharCode(e.which)) != -1);
    }
});


$(document).ready(function() {
    $('.parament2 input').prop('disabled', true);
    calculating();
});


function calculating() {

    var gaba = $('#gaba').val();
    var gabb = $('#gabb').val();
    var perim = perimetr(gaba, gabb);
    var plosnova = gaba * gabb;
    var nes_sten = nesus_sten(gaba, gabb);
    var heighthorse = $('#heighthorse').val();
    var plfronton = gaba * heighthorse;
    var etag = $('#etag').val();
    var visetag = $('#visetag').val();
    var viscok = $('#viscok').val();

    var plroof = Math.ceil(Math.sqrt(Math.pow(gaba / 2, 2) + Math.pow(heighthorse, 2)) * 2 * gabb);

    $('#perimetr').val(Math.round(perim * 100) / 100);
    $('#plosnova').val(Math.round(plosnova * 100) / 100);
    $('#nes_sten').val(Math.round(nes_sten * 100) / 100);
    $('#plfronton').val(Math.round(plfronton * 100) / 100);

    $('#plroof').val(Math.round(plroof * 100) / 100);

    if ($('#mansarda').prop('checked')) {
        var ma = 1;
        var vissten = $('#vissten').val();
        var cofmans = 0.5;
        if (vissten > 0) {
            cofmans = 1;
        }
        var plmans = plosnova * cofmans;
        var plstenmansarda = vissten * nes_sten;

        $('#plmans').val(Math.round(plmans * 100) / 100);
        $('#plstenmansarda').val(Math.round(plstenmansarda * 100) / 100);
        $('.mansard_param').fadeIn();

    } else {
        var ma = 0;
        var vissten = 0;
        var plmans = 0;
        var plstenmansarda = 0;
        $('#plmans').val(plmans);
        $('#plstenmansarda').val(plstenmansarda);
        $('.mansard_param').fadeOut();
    }

    var obpl = (plosnova * etag * 1) + parseInt(plmans);

    $('#obpl').val(Math.round(obpl * 100) / 100);

    var plvnstenot = perim * visetag * etag + parseInt(plfronton) + ((vissten * perim + parseInt(plstenmansarda)) * ma);
    $('#plvnstenot').val(Math.round(plvnstenot * 100) / 100);

    var plnessten = (etag * nes_sten * visetag) + ((vissten * nes_sten + parseInt(plstenmansarda)) * ma) + parseInt(plfronton);
    $('#plnessten').val(Math.round(plnessten * 100) / 100);

    var plvnutsten = obpl * 0.6;
    $('#plvnutsten').val(Math.round(plvnutsten * 100) / 100);

    var plvnutstenot = obpl * 3;
    $('#plvnutstenot').val(Math.round(plvnutstenot * 100) / 100);

    var ploblcok = perim * viscok;
    $('#ploblcok').val(Math.round(ploblcok * 100) / 100);

    var lestnitca = parseInt(etag);

    if ($('#mansarda').prop('checked')) {
        lestnitca += 1;
    }
    if ($('#cokol').prop('checked')) {
        lestnitca += 1;
    }

    if ($('#vnotdel34').prop('checked') || $('#vnotdel35').prop('checked')) {
        $('input[name=drug]').prop('disabled', true);
    } else {
        $('input[name=drug]').prop('disabled', false);
    }




    /*---------------------------------------------*/



    var ras1 = getCostMat(plnessten);
    var ras2 = getOtdelNar(plvnstenot);
    var ras3 = getFundament(nes_sten);
    var ras4 = getPerecrita(plosnova, nes_sten);
    var ras5 = getVnPer(plvnutsten);
    var ras6 = getPol(plosnova);
    var ras7 = getKrisha(plroof, perim);
    var ras8 = getLest(lestnitca);
    var ras9 = getDver(obpl);
    var ras10 = getVnutOt(obpl);
    var ras11 = getDrug(obpl, plvnutstenot);

    summa(ras1, ras2, ras3, ras4, ras5, ras6, ras7, ras8, ras9, ras10, ras11);

}


$('#funda15').on('click', function() {
    $('#cokol').click();
});


$('#cokol').on('change', function() {
    if ($(this).prop('checked')) {
        $('input[name=funda]').prop('disabled', true);
        $('#funda15').prop('disabled', false);
        $('#funda15').prop('checked', true);
        $('input[name=pol]').prop('disabled', true);

    } else {
        $('input[name=funda]').prop('disabled', false);
        $('#funda13').prop('checked', true);
        $('input[name=pol]').prop('disabled', false);
    }
});

/*


	 if($('#funda15').prop('checked')){
	 	$('#cokol').prop('checked',true);
	 }

*/


$('.changing').on('change keyup', function() {
    calculating();
});

function getCostMat(pl) {
    var price = $('input[name=matsten]:checked').val();
    var result = price * pl;
    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('#priceNes').text(result1);
    if (!result) result = 0;
    return result;
}

function getOtdelNar(pl) {
    var price = $('input[name=otdnar]:checked').val();
    var result = price * pl;
    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('#priceOrNar').text(result1);
    if (!result) result = 0;
    return result;
}

function getFundament(pl) {
    var price = $('input[name=funda]:checked').val();
    var result = price * pl;
    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('#priceFunda').text(result1);
    if (!result) result = 0;
    return result;
}

function getPerecrita(pl, nes) {
    if ($('input[name=perecdop]').prop('checked')) {
        var armo = $('input[name=perecdop]:checked').val() * nes;
    } else {
        var armo = 0;
    }

    var price = $('input[name=perec]:checked').val();
    var result = (price * pl) + parseInt(armo);
    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('#pricePerecrit').text(result1);
    if (!result) result = 0;
    return result;
}

function getVnPer(pl) {
    var price = $('input[name=vnutpereg]:checked').val();
    var result = price * pl;
    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('#priceVnPer').text(result1);
    if (!result) result = 0;
    return result;
}

function getPol(pl) {
    var price = $('input[name=pol]:checked').val();
    var result = price * pl;
    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('#pricePol').text(result1);
    if (!result) result = 0;
    return result;
}

function getKrisha(pl, perim) {

    if ($('input[name=vodastock]').prop('checked')) {
        var voda = $('input[name=vodastock]:checked').val() * perim;
    } else {
        var voda = 0;
    }

    var price = $('input[name=krisha]:checked').val();
    var result = (price * pl) + parseInt(voda);
    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('#priceKrisha').text(result1);
    if (!result) result = 0;
    return result;
}

function getLest(pl) {
    if (pl > 1) {
        $('input[name=lest]').prop('disabled', false);
        var price = $('input[name=lest]:checked').val();
        var col = parseInt(pl) - 1;
        var result = price * col;
        if (!result) result = 0;
    } else {
        $('input[name=lest]').prop('disabled', true);
        result = 0;
    }
    if (col) {
        var pecj = ' x ' + col;
    } else {
        var pecj = '';
    }
    $('#collests').text(pecj);

    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('#priceLest').text(result1);
    return result;
}

function getDver(pl) {
    var price = $('input[name=dver]:checked').val();
    var result = price * pl;
    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('#priceDver').text(result1);
    if (!result) result = 0;
    return result;
}

function getVnutOt(pl) {
    if ($('input[name=inzhin]').prop('checked')) {
        var ir = $('input[name=inzhin]:checked').val() * pl;
    } else {
        var ir = 0;
    }
    var price = $('input[name=vnotdel]:checked').val();
    var result = (price * pl) + parseInt(ir);
    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('#priceVnutOt').text(result1);
    if (!result) result = 0;
    return result;
}

function getDrug(pl, plvnutstenot) {
    var price1 = $('#drug37:checked').val();
    var price2 = $('#drug38:checked').val();
    var price3 = $('#drug39:checked').val();

    if (price1) {
        price1 = price1 * pl;
    } else {
        price1 = 0;
    }
    if (price2) {
        price2 = price2 * plvnutstenot;
    } else {
        price2 = 0;
    }
    if (price3) {
        price3 = price3 * plvnutstenot;
    } else {
        price3 = 0;
    }


    var result = parseInt(price1) + parseInt(price2) + parseInt(price3);
    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('#priceDrug').text(result1);
    if (!result) result = 0;
    return result;
}

function summa(ras1, ras2, ras3, ras4, ras5, ras6, ras7, ras8, ras9, ras10, ras11) {
    var result = parseInt(ras1) + parseInt(ras2) + parseInt(ras3) + parseInt(ras4) + parseInt(ras5) + parseInt(ras6) + parseInt(ras7) + parseInt(ras8) + parseInt(ras9) + parseInt(ras10) + parseInt(ras11);
    var result1 = accounting.formatMoney(result, "руб.", 0, " ", ",", "%v %s");
    $('.itogcalc').text(result1);

}