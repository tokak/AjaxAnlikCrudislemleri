

function Veriler() {
    var url = '/Home/Veriler';
    $('table').html("");
    var thead = '<thead><tr><th>Seç</th><th>Ad Soyad</th><th>Yaş</th></tr></thead>';
    $('table').append(thead);
    $.getJSON(url, function (data) {
        for (var item in data.Result) {

            var guncelle = '<button data-id=' + data.Result[item].Id + ' class="btn btn-primary guncelle">Güncelle</button>';
            var checkbox = '<input type="checkbox" name="secilmis" value=' + data.Result[item].Id + '>';
            var deger = '<tbody><tr><td>' + checkbox + '</td> <td>' + data.Result[item].Adsoyad + '</td> <td>' + data.Result[item].Yas + '</td><td>' + guncelle + '</td></tr></tbody>';
            $('table').append(deger);
        }
    });
}


$('#temizle').click(function () {
    $('table').html("");
});

$("#yenile").click(function () {
    Veriler();
});


$("#ekle").click(async function () {
    const { value: formValues } = await Swal.fire({
        title: 'Öğrenci Ekle',
        showCancelButton: true,
        cancelButtonColor: "#d43f3a",
        cancelButtonText: "İptal",
        confirmButtonText: "Onayla",
        confirmButtonColor: "#337ab7",
        html:
            '<input id="ad" class="swal2-input" placeholder="Ad">' +
            '<input id="soyad" class="swal2-input" placeholder="Soyad">' +
            '<input id="yas" class="swal2-input" placeholder="Yaş">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('ad').value,
                document.getElementById('soyad').value,
                document.getElementById('yas').value
            ]
        }
    });

    $.ajax({
        url: "/Home/EkleJson",
        type: "Post",
        dataType: "json",
        data: { ad: formValues[0], soyad: formValues[1], yas: formValues[2] },
        success: function (gelenDeg) {
            if (gelenDeg == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Eklendi!',
                    text: 'İşlem Başarıyla Gerçekleşti.!'
                });
                Veriler();
            }

            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Eklenmedi!',
                    text: 'Bir hata oluştu!'

                });
            }
        }
    });
});


$('#sil').click(function () {
    Swal.fire({
        title: 'Siliniyor',
        text: "Öğrencileri Gerçekten Silmek İstiyormusunuz?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sil'
    }).then((result) => {
        if (result.value) {
            var silinecekler = [];
            var tr = [];
            var sayac = 0;
            $('input[type=checkbox]:checked').each(function () {
                parseInt(silinecekler.push($(this).val()));
                tr[sayac] = $(this).parent('td').parent('tr');
                sayac++;

            });

            $.ajax({
                url: '/Home/SilJson',
                type: 'POST',
                data: { silinecekler: silinecekler },
                success: function (gelenDeg) {
                    if (gelenDeg == "1") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Silindi!',
                            text: 'İşlem Başarıyla Gerçekleşti.!'
                        });
                        //Veriler();
                        var sayac2 = 0;
                        $(tr).each(function () {
                            tr[sayac2].remove();
                            sayac2++;
                        });
                    }

                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Eklenmedi!',
                            text: 'Bir hata oluştu!'
                        });
                    }
                }
            });
        }
    });
});

$(document).on("click", ".guncelle", async function () {
    var id = $(this).attr('data-id');
    var formValues;

    console.log(id);

    $.ajax({
        url: "/Home/GuncelleJson",
        type: "Post",
        dataType: "json",
        data: { 'id': id },
        success: async function (data) {
            const { value } = await Swal.fire({
                title: 'Öğrenci Ekle',
                showCancelButton: true,
                cancelButtonColor: "#d43f3a",
                cancelButtonText: "İptal",
                confirmButtonText: "Onayla",
                confirmButtonColor: "#337ab7",
                html:
                    '<input id="ad" value=' + data.Result.Ad + ' class="swal2-input" placeholder="Ad">' +
                    '<input id="soyad" value=' + data.Result.Soyad + ' class="swal2-input" placeholder="soyad">' +
                    '<input id="yas" value=' + data.Result.Yas + ' class="swal2-input" placeholder="Yaş">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('ad').value,
                        document.getElementById('soyad').value,
                        document.getElementById('yas').value
                    ]
                }
            });
            formValues = value;

            $.ajax({
                url: "/Home/Guncelle",
                type: "Post",
                dataType: "json",
                data: { id: id, ad: formValues[0], soyad: formValues[1], yas: formValues[2] },
                success: function (gelenDeg) {
                    if (gelenDeg == "1") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Güncellendi!',
                            text: 'İşlem Başarıyla Gerçekleşti.!'
                        });
                        Veriler();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Güncellenemedi!',
                            text: 'Bir hata oluştu!'
                        });
                    }
                }
            });
        }
    });
});




