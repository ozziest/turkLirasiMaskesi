jQuery TürkLirası İnput Maskesi
===============================

jQuery eklentisi olarak hazırlanan basit bir Türk Lirası giriş maskesi.

## Bu proje aktif bir şekilde geliştirilmiyor. Lütfen production ortamında kullanmayın. 

***
### Download

Son versiyon(minified) için [tıklayınız](https://raw.githubusercontent.com/ozziest/turkLirasiMaskesi/master/dist/jquery.turkLirasi.min.js).

***
### Kullanımı
```html
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js" type="text/javascript"></script>
  <script src="jquery.turkLirasi.min.js" type="text/javascript"></script>
</head>
<body>
  <input type="text" id="currency" />
</body>
<script>
  $(function() {
    $('#currency').turkLirasi();
  })
</script>
```

***
### Ayarlar:

Opsiyonel olarak yapılabilecek ayarlar şu şekildedir;


 * `allowedDecimal`: Ondalıklı sayı girişine izin verileceğini belirtir. Varsayılan: true
 * `maxDecimalCount`: Ondalıklı bölüme girilebilecek en fazla sayı adedidir. Varsayılan: 2
 * `autoFillDecimal`: Ondalıklı bölüm girilmediğinde otomatik olarak doldurulması ayarıdır. Varsayılan: true
 * `suffix`: Input sonuna eklenecek olan metini belirten değerdir. Varsayılan: TL
 * `formatted`: Girilen değerin basamaklarının formatlanması durumunu belirten değerdir. Varsayılan: true
 * `autoSelect`: Input seçildiğinde otomatik olarak seçilmesi (hızlı kopyala-yapıştır işlemleri için) ayarını tutan değerdir. Varsayılan: true
 * `align`: Input içine girilen değerlerin ne yana yaslı olacağını belirten değerdir. Varsayılan: right
 * `debug`: Çalışma anında logların gösterilmesi ayarıdır. Varsayılan: false
 * `_eventAfterSet`: Her girilen rakamdan sonra çağırılacak fonksiyon ayarıdır. Varsayılan: false
 * `_eventFocusOut`: FocusOut olayından sonra çağırılacak fonksiyon ayarıdır. Varsayılan: false

***
### Metodlar:

* `setAgain`: Çalışma anında javascript ile değer güncellenmek istenildiğinde kullanılır.
	
		$('#inputName').trigger('setAgain', [newValue]);

 
***
### Önemli Notlar ve Geliştirme Planı

- Varsayılan olarak maske formatı 999.999,99 olarak hazırlanmıştır. 
- Sayı girişine alt ve üst değer konulabilmesi.
- Negatif sayıların girilebilmesi.


