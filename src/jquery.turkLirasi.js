$.fn.turkLirasi = function (options) {
    /**
    * Genel Ayarlar
    */
    var settings = $.extend({
                            allowedDecimal: true,
                            maxDecimalCount: 2,
                            autoFillDecimal: true,
                            suffix: 'TL',
                            formatted: true,
                            autoSelect: true,
                            align: 'right',
                            _eventAfterSet: false,
                            _eventFocusOut: false,
                            debug: false
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

    var log = function(activeElement, value)
    {   
        if (activeElement.data('options').debug) {
            console.log(value);
        }
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

    /**
    * Get Suffix
    *
    * Son ek ayarlanarak geriye gönderilir.
    */
    var getSuffix = function(suffix)
    {
        if (suffix == false) {
            return '';
        }
        return ' ' + suffix;
    };

    /**
    * Set Decimal Point 
    *
    * Ondalık bölüm yazılmış mı kontrol edilir.
    */
    var setDecimalPoint = function(element, value)
    {
        element.data('decimalPoint', value);
    };

    /**
    * Get Decimal Point
    */
    var getDecimalPoint = function(element) {
        return element.data('decimalPoint');
    };

    /**
    * Set Default Value
    *
    * Elemente varsayılan değerin atanması işlemi
    */
    var setDefaultValue = function(element) 
    {
        // Auto Fill işlemi kontrol edilir.
        if (element.data('options').allowedDecimal && element.data('options').autoFillDecimal) {
            // Veriler yazılır
            element.data('value', '0');
            element.data('visualValue', '0,00');
            // Artık sayı virgüllü olacağından değer set edilir.
            setDecimalPoint(element, true);
            element.val(element.data('visualValue') + getSuffix(element.data('options').suffix));                    
        } else {
            // Veriler yazılır
            element.data('value', 0);
            element.data('visualValue', '0');
            setDecimalPoint(element, false);
            // Görünen değer yazılır.
            element.val(element.data('visualValue') + getSuffix(element.data('options').suffix));                                
        }

    };

    var methodDefined = function(element, method)
    {
        if (element.data('options')[method] != false) {
            return true;
        } 
        return false;
    };

    /**
    * Set Value
    *
    * Elemetin değerinin dğeiştirilmesi işlemi.
    */
    var setValue = function(element, value, initialization)
    {
        // Elementin data kısmına değer yazılır.
        value = '' + value;
        // Format dönüşümü yapılır. 
        value = value.replace('.', ',');
        // Değer atanır.
        element.data('value', value);           
        // Sayı bir daha parçalanır.
        sections = value.split(',');
        // Sayı formatlı mı yazdırılacak?
        if (element.data('options').formatted) {
            // Sayı formatlanır
            var visualValue = number_format(sections[0], 0, ',', '.');
        } else {
            // Sayı olduğu gibi yazılır.
            var visualValue = value;                
        }
        // Ondalık kısım var mı_
        if (typeof sections[1] != 'undefined') {
            setDecimalPoint(element, true);
            // Ondalık kısım da birleştirilir
            visualValue += ',' + sections[1];
        } else {
            setDecimalPoint(element, false);                
        }
        element.data('visualValue', visualValue);
        // Görünen değer yazılır.
        element.val(element.data('visualValue') + getSuffix(element.data('options').suffix));   
        log(element, element.data());
        // Herhangi bir set sonrası parametre set edilmiş mi kontrol edilir.
        if (typeof initialization == 'undefined' && methodDefined(element, '_eventAfterSet')) {
            // Olay tetiklenir.
            element.trigger('change', element.data('options')._eventAfterSet);            
        }
    };

    var checkSelectAll = function(element)
    {
        if (element.data('selectAll') == true) {
            setDefaultValue(element);
            element.data('selectAll', false);
            return true;
        }
        return false;
    };

    /**
    * Init
    *
    * Başlangıç aşamasında elementin kurulması işlemi.
    */
    var init = function(element, options) 
    {
        // Ayarlar yapılır.
        element.data('options', options);
        // Elementin içindeki değer alınır.
        var firstValue = element.val();
        // Değer uygun formata göre düzenlenir.
        firstValue = firstValue.replace(/\./g,'').replace(',', '.');
        // Tip dönüşümü yapılır
        firstValue = parseFloat(firstValue);
        // Değer kontrol edilir.
        if (isNaN(firstValue)) {
            // Varsayılan değer atanır.
            setDefaultValue(element);
        } else {
            // Değer atanır.
            setValue(element, firstValue, true)
        }
    };

    // Ana bölüm
    return this.each(function () {
        // Aktif element belirlenir.
        var activeElement = $(this);
        // Varsayılan ayarlar alınır.
        var options = $.meta ? $.extend({}, settings, activeElement.data()) : settings;

        // Ondalık atayı yaplılır.
        setDecimalPoint(activeElement, false);
        // Sitil ayarı yapılır.
        activeElement.css('text-align', options.align);
        // Varsayılan olaran hiç seçilmemiş gibi işaretlenir.
        activeElement.data('selectAll', true);
        // Element kurulur
        init(activeElement, options);

        /**
        * Otomatik seçme fonksiyonu tanımlanır.
        */
        $(this).click(function () {
            // Otomatik olarak input içeriğinin seçilmesi
            if (activeElement.data('options').autoSelect) {
               activeElement.select();
               activeElement.data('selectAll', true);
               log(activeElement, 'Tüm metin seçildi.');
            }
        });

        /**
        * Focus Out
        */
        $(this).focusout(function() {
            // Auto Fill işlemi kontrol edilir.
            if (activeElement.data('options').allowedDecimal && activeElement.data('options').autoFillDecimal) {
                // Değer var mı kontrol edilir. Değer yoksa işlem yapılmaz.
                if (activeElement.data('value') != '' && activeElement.data('value') != '0') {
                    // Değer parçalanırç
                    sections = activeElement.data('value').split(',');
                    // Virgüllü kısım var mı?
                    if (typeof sections[1] == 'undefined') {
                        // Yoksa istenilen ondalık kısım fark olur
                        var fark = activeElement.data('options').maxDecimalCount;
                    } else {
                        // Virgüllü kısım varsa aradaki fark hesaplanır.
                        var fark = activeElement.data('options').maxDecimalCount - sections[1].length;
                    }
                    var fillText = '';
                    // Fark kadar 0 hazırlanır.
                    for (var i=1; i<=fark; i ++) {
                        fillText += '0';
                    }
                    // Daha önceden ondalık için virgül yazılmamışza yazılır.
                    if (!getDecimalPoint(activeElement)) {
                        fillText = ',' + fillText;
                    }
                    // Artık sayı virgüllü olacağından değer set edilir.
                    setDecimalPoint(activeElement, true);
                    // Veriler yazılır
                    activeElement.data('value', activeElement.data('value') + fillText );
                    activeElement.data('visualValue', activeElement.data('visualValue') + fillText );
                    activeElement.val(activeElement.data('visualValue')  + getSuffix(activeElement.data('options').suffix));                    
                }
            }

            // Herhangi bir parametre set edilmiş mi kontrol edilir.
            if (methodDefined(activeElement, '_eventFocusOut')) {
                // Olay tetiklenir.
                activeElement.trigger('change', activeElement.data('options')._eventFocusOut);                               
            }
        });
        
        /**
        * Javascript ile sonradan değer düzenleme bölümü.
        */
        $(this).on('setAgain', function(event, newValue) {
            // Veriler temizlenir.
            newValue = newValue.replace(/\./g,'').replace(',', '.');
            setValue($(this), newValue);
        });

        // Keydown fonksiyonu tanımlanır.
        $(this).keydown(function (e) {

            var activeElement = $(this);
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
            // Log işlemi yapılır.
            log(activeElement, 'Pressed Key Code: #' + key);    
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
                    // Değer set edilir.
                    setValue(activeElement, realValue);
                }, 0);
                return true;
            } else if((e.ctrlKey || e.metaKey) && key == 67) {
                /**
                * Kopyala tuş kombinasyonu
                */
                return true;
            } else if (key == 9 || key == 39 || key == 40) {
                /**
                * Tab ya da sağ yön tuşu
                */
                activeElement.data('selectAll', false);
                return true;
            } else if (key == 8) {
                /**
                * Backspace tuşu
                */
                // Tüm metin seçiliyse metin silinir.
                if (checkSelectAll(activeElement)) {
                    return false;
                }
                // Gerçek değer öğrenilir.
                var realValue = checkValue(activeElement.data('value'));
                // Silinmeye çalışılan değer decimal point mi?
                if (realValue.substr(realValue.length - 1) == ',') {
                    // Yeniden decimal point eklenmesine izin verilir.
                    setDecimalPoint(activeElement, false);
                }
                // Bir karakter silinir.
                realValue = realValue.substr(0, realValue.length - 1);                    
                // Değer kontrol edilir.
                realValue = completeValue(realValue);
                // Değer set edilir.
                setValue(activeElement, realValue);
                // Log
                log(activeElement, activeElement.data());
            } else if (key == 188 && activeElement.data('options').allowedDecimal && getDecimalPoint(activeElement) == false) {
                /**
                * Decimal Point (,) tuşu
                */                
                // Gerçek değer alınır.
                var realValue = checkValue(activeElement.data('value'));
                // Virgül ilave edilir.
                realValue = realValue + ',';
                // Değer set edilir.
                setValue(activeElement, realValue);
                // Log işlemi
                log(activeElement, activeElement.data());
            } else if (key >= 48 && key <= 57) {
                /**
                * Sayısal Karakter
                */
                // Tüm metin seçiliyse metin silinir.
                checkSelectAll(activeElement);
                // Gerçek değer alınır.
                var realValue = checkValue(activeElement.data('value'));
                // Sayı tam ve ondalık olarak parçalanır
                var sections = realValue.split(',');
                // Şuana kadar yazılan değer ondalık dilim içeriyor mu?
                if (getDecimalPoint(activeElement)) {
                    // Ondalık dilimin uzunluğu, izin verilen kadar mı?
                    if (typeof sections[1] != 'undefined' && sections[1].length == options.maxDecimalCount) {
                        // İzin verilenden daha fazla sayı ondalık yazılamaz.
                        return false;
                    }
                }
                // Basılan tuşun sayısal değeri ilave edilir.
                realValue = realValue + String.fromCharCode(e.keyCode);
                // Değer kontrol edilir.
                realValue = completeValue(realValue);
                // Değer yazdırılır.
                setValue(activeElement, realValue);
                // Log işlemi.
                log(activeElement, activeElement.data());
            } else {
                return false;
            }
            return false;
        });
    });
};  
