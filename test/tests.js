"use strict";

module("Genel İşlemler");

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Input
var input = $('#inputMoney');	
input.turkLirasi({
	debug: true
});


test("Kurulum", function() {

	ok( input.val() == "0,00 TL", "Kurulum başarılı." );

});


test("Rakam", function() {

	input.trigger('focus');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger('focusout');
	ok( input.val() == "111,00 TL", "Rakam yazma işlemi başarılı." );

});

test("Seçili Silme", function() {

	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 8}));
	ok( input.val() == "0,00 TL", "Seçili haldeyken topluca silme işlemi başarılı." );

});


test("Virgüllü Sayı", function() {
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 188}));
	input.trigger($.Event("keydown", {keyCode: 50}));
	input.trigger($.Event("keydown", {keyCode: 50}));
	input.trigger('focusout');
	ok( input.val() == "1,22 TL", "Virgüllü sayı başarılı." );	
});

test("Virgüllü Sayı (Otomatik Tamamlamalı)", function() {
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 188}));
	input.trigger($.Event("keydown", {keyCode: 53}));
	input.trigger('focusout');
	ok( input.val() == "1,50 TL", "Virgüllü sayı otomatik tamamlama işlemi başarılı." );	
});

test("Binler Basamağı", function() {
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 48}));
	input.trigger($.Event("keydown", {keyCode: 48}));
	input.trigger($.Event("keydown", {keyCode: 48}));
	input.trigger('focusout');
	ok( input.val() == "1.000,00 TL", "Binler basamağının formatlı yazdırılması işlemi başarılı." );	
});

test("Fazladan Ondalık Yazma", function() {
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 188}));
	input.trigger($.Event("keydown", {keyCode: 53}));
	input.trigger($.Event("keydown", {keyCode: 53}));
	input.trigger($.Event("keydown", {keyCode: 53}));
	input.trigger('focusout');
	ok( input.val() == "1,55 TL", "Ondalık sınırı başarılı." );	
});

module("Son Ek");

test("Değiştirme", function() {
	input.data('options').suffix = 'YTL';
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger('focusout');
	ok( input.val() == "1,00 YTL", "Son ek değiştirme işlemi başarılı." );	
});

test("Gizleme", function() {
	input.data('options').suffix = false;
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger('focusout');
	ok( input.val() == "1,00", "Son ek gizleme işlemi başarılı." );	
});

module("Ondalık");

test("Değiştirme", function() {
	input.data('options').maxDecimalCount = 3;
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger('focusout');
	ok( input.val() == "1,000", "Maksimum ondalık limiti değiştirme işlemi başarılı." );	
});

test("Gizleme", function() {
	input.data('options').allowedDecimal = false;
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger('focusout');
	ok( input.val() == "1", "Ondalık gizleme başarılı." );	
});

test("Engelleme", function() {
	input.data('options').allowedDecimal = false;
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 188}));
	input.trigger('focusout');
	ok( input.val() == "1", "Ondalık girişi engelleme işlemi başarılı." );	
});

test("Otomatik Ondalık Tamamlama (Kapama)", function() {
	input.data('options').allowedDecimal = true;
	input.data('options').maxDecimalCount = 2;	
	input.data('options').autoFillDecimal = false;	
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger('focusout');
	ok( input.val() == "1", "Otomatik ondalık tamamlama işleminin kapatılması başarılı." );	
});

test("Otomatik Ondalık Tamamlama (Açma)", function() {
	input.data('options').allowedDecimal = true;
	input.data('options').maxDecimalCount = 2;	
	input.data('options').autoFillDecimal = true;	
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger('focusout');
	ok( input.val() == "1,00", "Otomatik ondalık tamamlama işleminin açılması başarılı." );	
});

module("Formatlama");

test("Kapalı", function() {
	input.data('options').formatted = false;
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 48}));
	input.trigger($.Event("keydown", {keyCode: 48}));
	input.trigger($.Event("keydown", {keyCode: 48}));
	input.trigger('focusout');
	ok( input.val() == "1000,00", "Formasız yazdırma işlemi başarılı." );	
});




























