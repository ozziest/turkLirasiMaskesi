$.fn.turkLirasi = function (options) {
    /**
    * Genel Ayarlar
    */
    var settings = $.extend({
                            logPressed: false,
                            allowedDecimal: true,
                            maxDecimalCount: 2,
                            suffix: 'TL',
                            formatted: true,
                            autoSelect: true,
                            align: 'right'
                    }, options );
    // Sayıları formatlı yazdırma işlemi
    var number_format = function  (number, decimals, dec_point, thousands_sep) {
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + Math.round(n * k) / k;
        };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    };
    // Değer kontrolü
    var checkValue = function (value)
    {
        if (value == 0) return '';
        return value;
    };
    // Görsel kontrlü
    var completeValue = function (value)
    {
        if (value == '') return 0;
        return value;
    };
    // Ana bölüm
    return this.each(function () {
        // Aktif element belirlenir.
        var activeElement = $(this);
        // Varsayılan ayarlar alınır.
        var options = $.meta ? $.extend({}, settings, activeElement.data()) : settings;
        // Varsayılan değerler ayarlarnı.
        activeElement.data('value', 0);
        activeElement.data('decimalPoint', false);
        activeElement.val('0 ' + options.suffix);     
        activeElement.css('text-align', options.align);

        $(this).click(function () {
            // Otomatik olarak input içeriğinin seçilmesi
            if (options.autoSelect) {
               $(this).select();
            }
        });

        // Keydown fonksiyonu tanımlanır.
        $(this).keydown(function (e) {
            /**
            * Suffix 
            *
            * Görsel olarak sayı yazdırılırken bir son ek kullanılacak mı?
            */
            var suffix = '';
            if (options.suffix != '' && options.suffix != false) {
                // Son ek hazırlanır
                suffix = ' ' + options.suffix;
            }
            // Basılan tuş kaydedilir.
            var key = e.charCode || e.keyCode || 0;
            /**
            * Her basılan tuş loglanıyor mu kontrol edilir.
            */
            if (options.logPressed) {
                // Basılan tuş loglanır
                console.log('Pressed Key Code: #' + key);                
            }
            // Karakter Kodu Kontrolü
            if ((e.ctrlKey || e.metaKey) && key == 86) {
                /**
                * Copy-Paste işlemi
                */
                // Elementin içeriği boşaltılıyor
                activeElement.val('');
                // Zamanlı bir fonksiyon oluşturuluyor.
                setTimeout(function (e) {
                    // Yapıştırılan içerik alınır
                    var realValue = activeElement.val();
                    // Başka yerlerden alınan değerler düzeltilir.
                    realValue = realValue.replace(/\./g,'').replace(',', '.');
                    // Floata çevrilir
                    realValue = parseFloat(realValue);
                    // Değerin durumu kontrol ediliyor.
                    if (isNaN(realValue)) {
                        // Eğer sayısal bir değer değilse aktif input içeriği sıfırlanıyor
                        activeElement.data('value', 0);
                        activeElement.data('decimalPoint', false);
                        activeElement.val('0 ' + options.suffix)
                    } else {
                        // 2.100.000,12
                        realValue = '' + realValue;
                        realValue = realValue.replace('.', ',');
                        // Sayı formatlı mı yazdırılacak?
                        if (options.formatted) {
                            // Sayı bir daha parçalanır.
                            sections = realValue.split(',');
                            // Sayı formatlanır
                            var visualValue = number_format(sections[0], 0, ',', '.');
                            // Ondalık kısım var mı_
                            if (typeof sections[1] != 'undefined') {
                                activeElement.data('decimalPoint', true);
                                // Ondalık kısım da birleştirilir
                                visualValue += ',' + sections[1];
                            }
                        } else {
                            // Sayı olduğu gibi yazılır.
                            var visualValue = realValue;
                        }
                        // Gerçek değer kaydedilir.
                        activeElement.data('value', realValue);
                        // Görünen değer yazılır.
                        activeElement.val(visualValue + suffix);                    
                    }
                }, 0);
                // İçeriğin yapıştırılmasına izin veriliyor.
                return true;
            } else if((e.ctrlKey || e.metaKey) && key == 67) {
                return true;
            } else if (key == 9) {
                /**
                * Tab 
                */
                return true;
            } else if (key == 8) {
                /**
                * Backspace tuşu
                */
                // Gerçek değer öğrenilir.
                var realValue = checkValue(activeElement.data('value'));
                // Silinmeye çalışılan değer decimal point mi?
                if (realValue.substr(realValue.length - 1) == ',') {
                    // Yeniden decimal point eklenmesine izin verilir.
                    activeElement.data('decimalPoint', false);                    
                }
                // Bir karakter silinir.
                realValue = realValue.substr(0, realValue.length - 1);                    
                // Değer kontrol edilir.
                realValue = completeValue(realValue);
                // Sayı formatlı mı yazdırılacak?
                if (options.formatted && realValue != 0) {
                    // Sayı bir daha parçalanır.
                    sections = realValue.split(',');
                    // Sayı formatlanır
                    var visualValue = number_format(sections[0], 0, ',', '.');
                    // Ondalık kısım var mı_
                    if (activeElement.data('decimalPoint')) {
                        // Ondalık kısım da birleştirilir
                        visualValue += ',' + sections[1];
                    }
                } else {
                    // Sayı olduğu gibi yazılır.
                    var visualValue = realValue;
                }
                // Gerçek değer yazılır.
                activeElement.data('value', realValue);
                // Görünen değer yazılır.
                activeElement.val(visualValue + suffix);                
            } else if (key == 188 && options.allowedDecimal && activeElement.data('decimalPoint') == false) {
                /**
                * Decimal Point (,) tuşu
                */
                // Gerçek değer alınır.
                var realValue = checkValue(activeElement.data('value'));
                // Virgül ilave edilir.
                realValue = realValue + ',';
                // Sayı formatlı mı yazdırılacak?
                if (options.formatted) {
                    // Sayı bir daha parçalanır.
                    sections = realValue.split(',');
                    // Sayı formatlanır
                    var visualValue = number_format(sections[0], 0, ',', '.') + ',';
                } else {
                    // Sayı olduğu gibi yazılır.
                    var visualValue = realValue;
                }
                // Gerçek değer kaydedilir
                activeElement.data('value', realValue);
                // Görünen değer yazılır.
                activeElement.val(visualValue + suffix);
                // Bir daha decimal point yazılamaması için gerekli ayar set edilir.
                activeElement.data('decimalPoint', true);
            } else if (key >= 48 && key <= 57) {
                /**
                * Sayısal Karakter
                */
                // Gerçek değer alınır.
                var realValue = checkValue(activeElement.data('value'));
                // Sayı tam ve ondalık olarak parçalanır
                var sections = realValue.split(',');
                // Şuana kadar yazılan değer ondalık dilim içeriyor mu?
                if (activeElement.data('decimalPoint')) {
                    // Ondalık dilimin uzunluğu, izin verilen kadar mı?
                    if (sections[1].length == options.maxDecimalCount) {
                        // İzin verilenden daha fazla sayı ondalık yazılamaz.
                        return false;
                    }
                }
                // Basılan tuşun sayısal değeri ilave edilir.
                realValue = realValue + String.fromCharCode(e.keyCode);
                // Değer kontrol edilir.
                realValue = completeValue(realValue);
                // Sayı formatlı mı yazdırılacak?
                if (options.formatted) {
                    // Sayı bir daha parçalanır.
                    sections = realValue.split(',');
                    // Sayı formatlanır
                    var visualValue = number_format(sections[0], 0, ',', '.');
                    // Ondalık kısım var mı_
                    if (activeElement.data('decimalPoint')) {
                        // Ondalık kısım da birleştirilir
                        visualValue += ',' + sections[1];
                    }
                } else {
                    // Sayı olduğu gibi yazılır.
                    var visualValue = realValue;
                }
                // Gerçek değer kaydedilir.
                activeElement.data('value', realValue);
                // Görünen değer yazılır.
                activeElement.val(visualValue + suffix);
            } else {
                return false;
            }
            return false;
        });
    });
};  
