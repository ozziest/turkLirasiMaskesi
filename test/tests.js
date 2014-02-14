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

	ok( input.val() == "0,00 TL", "Kurulum tamamlandı." );

});


test("Rakam", function() {

	input.trigger('focus');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger('focusout');
	ok( input.val() == "111,00 TL", "Otomatik silme işlemi tamam." );

});

test("Seçili Silme", function() {

	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 8}));
	ok( input.val() == "0,00 TL", "Otomatik silme işlemi tamam." );

});


test("Virgüllü Sayı", function() {
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 188}));
	input.trigger($.Event("keydown", {keyCode: 50}));
	input.trigger($.Event("keydown", {keyCode: 50}));
	input.trigger('focusout');
	ok( input.val() == "1,22 TL", "Otomatik silme işlemi tamam." );	
});

test("Virgüllü Sayı (Otomatik Tamamlamalı)", function() {
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 188}));
	input.trigger($.Event("keydown", {keyCode: 53}));
	input.trigger('focusout');
	ok( input.val() == "1,50 TL", "Otomatik silme işlemi tamam." );	
});

test("Binler Basamağı", function() {
	input.trigger('click');
	input.trigger($.Event("keydown", {keyCode: 49}));
	input.trigger($.Event("keydown", {keyCode: 48}));
	input.trigger($.Event("keydown", {keyCode: 48}));
	input.trigger($.Event("keydown", {keyCode: 48}));
	input.trigger('focusout');
	ok( input.val() == "1.000,00 TL", "Otomatik silme işlemi tamam." );	
});

