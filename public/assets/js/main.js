$(document).ready(function () {
    //project1
    $('#input1').on('change', function () {

        $('.nameFile').empty();

        if ($('#input1')[0].files.length !== 0) {
            var inputFiles = $('#input1')[0].files;
            var filesArray = Array.from(inputFiles);

            filesArray.forEach(function (file, index) {

                $('.nameFile').append('<div>' + index + ': ' + file.name.slice(0, 30) + '</div>'); // نمایش نام هر فایل  
            });

        } else {
            $('.nameFile').text('هیچ فایلی انتخاب نشده است');
        }
    });



    function loadImages() {
        $.ajax({
            url: "image.php",
            method: "POST",
            success: function (response) {
                $('#imageList').html(response);
            }
        });
    }

    loadImages();

    $('#uploadForm').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                loadImages();
            }
        });
    });

    // $(document).on('click', '.deleteImg', function() {  
    //     console.log($(this)[0].attributes['data-id'].value);  
    // });

    // $(document).on('click', '.deleteImg', function() {  
    //     console.log($(this).data('id'));  
    // });

    // $(document).on('click', '.deleteImg', function() {  
    //     console.log($(this).attr('data-id'));  
    // });
    function deleteImage(button) {
        var form = $(button).closest('form');
        var id = form.data('id');

        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: { idDelete: id },
            dataType: 'json',
            success: function (response) {
                $('.image-container[data-id="' + response.id + '"]').remove();
            },
            error: function (xhr, status, error) {
                console.error("خطا در ارسال درخواست: ", xhr.responseText); // خطا را با جزئیات نمایش دهید  
            }
        });
    }
    $(document).on('click', '.noSend', function () {
        deleteImage(this)

    });
    $('#itemUp').on('change', function () {
        var itemId = $(this).val();
        if (itemId) {
            $.ajax({
                url: 'admin.php',
                type: 'POST',
                data: {
                    idSelect: itemId
                },
                success: function (response) {
                    var data = JSON.parse(response);

                    if (data.status === 'success') {
                        $('#titleUp').val(data.result['title'])
                        $('#contentUp').val(data.result['content'])
                    } else {
                        alert(' نشد')
                    }
                },
                error: function (xhr, status, error) {
                    alert('یک خطا رخ داد: ' + error);
                }
            });
        }
    });

    $('#updateForm').on('submit', function (e) {
        e.preventDefault();

        var itemId = $('#itemUp').val();
        var title = $('#titleUp').val();
        var content = $('#contentUp').val();

        if (itemId && title && content) {
            $.ajax({
                url: 'admin.php',
                type: 'POST',
                data: {
                    idUpdate: itemId,
                    titleUp: title,
                    contentUp: content
                },
                success: function (response) {
                    var data = JSON.parse(response);

                    if (data.status === 'success') {
                        $(".intitle").attr("data-id", data.id).text(data.result['title']);
                        $(".content").attr("data-id", data.id).text(data.result['content']);
                        $('#updateForm')[0].reset()
                        alert('به‌روزرسانی با موفقیت انجام شد.');

                    } else {
                        alert('به‌روزرسانی انجام نشد.');
                    }
                },
                error: function (xhr, status, error) {
                    alert('یک خطا رخ داد: ' + error);
                }
            });
        } else {
            alert('لطفاً یک مورد را انتخاب کنید و عنوان و محتوا را وارد کنید.');
        }
    });

    //project 3
    $('.accordion').on('click', '.heading', function () {
        var itemElement = $(this).parent('.item');
        itemElement.find('.content').slideToggle();
        itemElement.siblings().find('.content').slideUp();
        itemElement.toggleClass('active').siblings().removeClass('active');
    });

    $('#myForm').on('submit', function (event) {
        event.preventDefault();

        var title = $('#title').val();
        var content = $('#content').val();

        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                title: title,
                content: content
            },
            success: function (response) {
                var data = JSON.parse(response);
                if (data.status === 'success') {

                    $('.accordion').append("<div class='item' data-id='" + data.id + "'><div class='heading'><p>" + data.title + "</p><i class='ti-angle-down'></i></div><div class='content'><p>" + data.content + "</p></div></div>");

                    $('#itemAc').append("<option value='" + data.id + "'>" + data.title + "</option>");
                    $('#itemUp').append("<option value='" + data.id + "'>" + data.title + "</option>");
                    $('#myForm')[0].reset();
                    alert("عملیات با موفقیت ارسال شد!");
                } else {
                    alert(data.message);
                }
            }

        });
    });

    //delete 

    $('#deleteForm').on('submit', function (event) {
        event.preventDefault();
        var id = $('#itemAc').val();
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                id: id,
            }, success: function () {

                $('#itemAc option[value="' + id + '"]').remove();
                $('#itemUp option[value="' + id + '"]').remove();

                $('.item[data-id="' + id + '"]').remove();

                $('#deleteForm')[0].reset();
                alert(' با موفقیت حذف شد');
            },
            error: function (xhr, status, error) {
                alert('یک خطا رخ داد: ' + error);
            }
        })
    })



    //project4
    $('.password input').on("input", function () {
        var password = $(this).val();
        if (password.match(/[a-z]/)) {
            $('#errorn').text('')
        } else {
            $('#errorn').text('LowerCase is required')
            return
        }
        if (password.match(/[A-Z]/)) {
            $('#errorn').text('')
        } else {
            $('#errorn').text('UperCase is required')
            return
        }
        if (password.match(/[0-9]/)) {
            $('#errorn').text('')
        } else {
            $('#errorn').text('Number is required')
            return
        }
        if (password.length >= 8) {
            $('#errorn').text('')
        } else {
            $('#errorn').text('Minimum 8 character')
        }
    });
    //project5
    $('.toggle-menu-button').click(function () {
        $('.mobileMenu').toggleClass('active');
    })






    $(document).on('click', '.dropdown > a', function (event) {
        event.preventDefault();
        var menuItems = $(this).parent('.dropdown').find('.menu-itemss');
        for (let i = 0; i < menuItems.length; i++) {
            $(menuItems[i]).slideToggle(1000)
            break;
        }
        $(this).parent('.dropdown').siblings().find('.menu-itemss').slideUp(1000)

    });

    function menu() {
        $.ajax({
            url: 'menu.php',
            success: function (response) {
                $('#menuAjax').html(response)
            }

        })
    }
    menu()
    function admin() {
        $.ajax({
            url: 'livemenu.php',
            success: function (response) {
                $('#admin').html(response)
            }
        })
    }
    admin()
    $('#menuForm').on('submit', function (e) {
        e.preventDefault()
        var title = $('#titleMenu').val()
        var parent = $('.parentMenu').val()
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                titleMenu: title,
                parentMenu: parent
            },
            dataType: 'JSON',
            success: function (data) {
                alert('با موفقیت انجام شد')
                admin()
                $('.parentMenu').append("<option value='" + data.data['id'] + "'>" + data.data['title'] + "</option>");
                menu()
                $('#menuForm')[0].reset()
            }
        })
    })

    $(document).on('click', '.btnn', function (e) {

        var id = $(this).closest('form').data('id');

        e.preventDefault()
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                idMenu: id
            },
            dataType: 'JSON',
            success: function (data) {
                console.log(data)
                $('.menuItem[data-id="' + data.id + '"]').remove()
                $('.parentMenu option[data-id="' + data.id + '"]').remove()
                if (data.array.length > 0) {
                    data.array.forEach(function (element) {
                        var id = element.id;
                        $('.menuItem[data-id="' + id + '"]').remove()
                        $('.parentMenu option[data-id="' + id + '"]').remove()
                    })

                }
            }
        })
    })
    $(document).on('click', '.ti-pencil', function () {
        $(this).parent('.allItem').find('.formEditMenu').slideToggle(1000)
        // $(this).parent('.allItem').parent('.menuItem').siblings().find('.formEditMenu').slideUp(1000)
        $(this).closest('.menuItem').siblings().find('.formEditMenu').slideUp(1000)
    })

    function editMenu(button) {
        var id = $(button).closest('form').data('id');
        var title = $(button).closest('form').find('.editMenu').val()
        var parent = $(button).closest('form').find('.parentMenu').val()
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                editId: id,
                editTitle: title,
                editParent: parent
            },
            dataType: 'JSON',
            success: function () {
                alert('با موفقیت به‌روزرسانی شد')
                setTimeout(function () {
                    location.reload();
                }, 100);
            },
            error: function (xhr, status, error) {
                console.log('یک خطا رخ داد: ' + error);

            }
        });
    }

    $(document).on('click', '.bEditMenu', function () {
        editMenu(this);
    });




    $(document).on('click', '.tb', function () {
        var id = $(this).closest('form').data('id')
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                idTest: id
            },
            dataType: 'JSON',
            success: function (data) {
                $('.test[data-id=' + data.id + ']').remove()
            }

        })

    })
    $('.btnMobile').on('click', function () {
        $('.mobileMenu').toggleClass('active');
        if ($('.mobileMenu').hasClass('active')) {
            $(this).text('close menu');
        } else {
            $(this).text('open menu');
        }
    });

    $('.toggle-menu-button').on('click', function () {
        if ($('.mobileMenu').hasClass('active')) {
            $('.btnMobile').text('close menu')
        } else {
            $('.btnMobile').text('open menu')
        }
    })
    // project2
    function preloader() {
        $.ajax({
            url: 'preloader.php',
            success: function (data) {
                $('#imgUpload').html(data)
            }
        })
    }
    preloader()

    $('#pre').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            url: 'preloader.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                preloader()
            }
        });
    });

    $('#timeb').on('click', function () {
        var time = $(this).closest('form').find('#timein').val()
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                time: time
            },
            dataType: 'JSON',
            success: function (data) {
                $('#timein').val(data.time)
            }
        })
    })


    //project6

    $('.slider .next').on('click', function () {
        var activeItem = $('.slider .item.active')
        if (activeItem.next().length != 0) {
            activeItem.removeClass('active')
            activeItem.next().addClass('active')
        } else {
            activeItem.removeClass('active')
            $('.slider .item:first-child').addClass('active')
        }
    })
    $('.slider .prev').on('click', function () {
        var activeItem = $('.slider .item.active')
        if (activeItem.prev().length != 0) {
            activeItem.removeClass('active')
            activeItem.prev().addClass('active')
        } else {
            activeItem.removeClass('active')
            $('.slider .item:last-child').addClass('active')
        }
    })
    $('.images .item').on('click', function () {
        var index = $(this).index()
        $('.slider .item.active').removeClass('active')
        $('.slider .item').eq(index).addClass('active')
    })
    // project 7
    $('.copy-button').on('click', function () {
        $('.incopy').select()
        //  document.execCommand('copy')
        $(document)[0].execCommand('copy')
    })
    $('.copyButton').on('click', function () {
        var input = $('<input>')
        input.val($('.bcopy').text())
        $('body').append(input)
        input.select()

        $(document)[0].execCommand('copy')
        input.remove()
    })
    // project8
    $('.show-password-button').on('click', function () {
        var type = $(this).closest('.form-group').find('input').attr('type')
        // if(type === 'password'){
        //     type = 'text'
        // }else{
        //     type = 'password'
        // }
        type = (type === 'password') ? 'text' : 'password'
        $(this).closest('.form-group').find('input').attr('type', type)
    })
    $('.show-password-button2').on(
        'mousedown', function () {
            $('.pshow').attr('type', 'text');
        }).on('mouseup', function () {
            $('.pshow').attr('type', 'password');
        }).on('mouseleave', function () {
            $('.pshow').attr('type', 'password');
        });
    //project9
    $(window).on('scroll', function () {
        var scrollTop = $(this).scrollTop()
        var height = $(document).height() - $(this).height()
        var percent = (scrollTop / height) * 100 + '%'
        $('.percent').css({ width: percent })
    }).scroll()

    //    $('.show-password-button2').on('mousedown',function(){
    //     $('.pshow').attr('type','text')
    //    })

    //    $('.show-password-button2').on('mouseup',function(){
    //     $('.pshow').attr('type','password')
    //    })

    //    navigator.clipboard.writeText(input.val()).then(function() {  
    //     console.log('متن کپی شد!');  
    //   }).catch(function(err) {  
    //     console.error('مقدار کپی نشد!', err);  
    //   });







    // project 10


    let intervalId;
    if (localStorage.getItem('title')) {
        titleH = localStorage.getItem('title')
        anime(titleH);
    }
    $('.animet').on('input', function () {
        var titleH = $(this).val();
        localStorage.setItem('title', titleH)
        titleH = localStorage.getItem('title')
        anime(titleH);
    });

    function anime(titleH) {
        var h1 = $('.titleH');
        var texth1 = titleH;
        h1.empty();
        let i = 0;

        if (intervalId) {
            clearInterval(intervalId);
        }

        intervalId = setInterval(function () {
            if (i < texth1.length) {
                h1.append('<span>' + texth1[i] + '</span>');
                i++;
            } else {
                h1.empty();
                i = 0;
            }
        }, 500);
    }


    // $.noConflict();
    // jQuery(document).ready(function ($) {  
    //     $('#btn1').on({  
    //         'click': function () {  
    //             $('#blue').hide();  
    //         },  
    //         'dblclick': function () {  
    //             $('#blue').show();  
    //         },  
    //         'mouseenter': function() {  
    //             $(this).css('background-color', 'red');  
    //         },  
    //         'mouseleave': function() {  
    //             $(this).css('background-color', '');
    //         }  
    //     });  
    // });

    // jQuery(document).ready(function(){

    // })

    // project11
    $('.inputC input').on('input', function () {
        var name = $(this).attr('name')
        var value = $(this).val()
        switch (name) {
            case 'meter':
                $(".inputC input[name=centimeter]").val(value * 100)
                $(".inputC input[name=inch]").val(value * 39.37)
                break;
            case 'centimeter':
                $(".inputC input[name=meter]").val(value * 0.01)
                $(".inputC input[name=inch]").val(value * 0.3937)
                break;
            case 'inch':
                $(".inputC input[name=meter]").val(value / 39.37)
                $(".inputC input[name=centimeter]").val(value / 0.3937)
                break;
        }
    })
    // project12
    var darkModeLink = "<link rel='stylesheet' href='assets/css/dark.css'>";

    if (localStorage.getItem('isDarkMode') == 'true') {
        $("head").append(darkModeLink)
        $(".p12 input[type=checkbox]").attr("checked", "checked")
    }

    $(".p12 input[type=checkbox]").on("change", function () {
        var isChecked = $(this).is(":checked");

        localStorage.setItem("isDarkMode", isChecked)

        if (isChecked) {
            $("head").append(darkModeLink)
        } else {
            $("head link[href='assets/css/dark.css']").remove()
        }
    })
    // project13
    $('.p13 .col').on('mousemove', function (event) {
        var circle = $('<span></span>');
        var size = Math.random() * 100 + 'px';
        var x = event.pageX - $(this).offset().left
        var y = event.pageY - $(this).offset().top


        circle.css({
            'width': size,
            'height': size,
            'top': y,
            'left': x,
        });

        $(this).append(circle)


        setTimeout(function () {
            circle.remove()
        }, 1500)
    });
    // project14
    $('#cblack').on('change', function () {
        if ($(this).prop('checked')) {
            $('.p14 .col-10').empty()
        }
    })
    $('.p14 .col-10').on('mousemove', function (event) {  
     
            if ($('#pencil').is(':checked')) {  
                 
                var w = ($('#wpencil').val()) ? $('#wpencil').val() : 20
                var c = $('#colorp').val();
                var b = $('#bpencil').val();
                var x = event.pageX - $(this).offset().left 
                var y = event.pageY - $(this).offset().top  
                var circle = $('<span></span>');  
                circle.css({  
                    'top': y,  
                    'left': x,  
                    'width': w + 'px',  
                    'height': w + 'px',
                    'background': c,
                    'border-radius': b + '%'
                });  
                $(this).append(circle)  
            }  
           
    })
    $('#bgcolor').on('input',function(){
        var bg = $('#bgcolor').val()
        $('.p14 .col-10').css({
            'background': bg
        })
    })
    

    // project15
    $('#bgmove').on('input',function(){
        if($('#bgmove').is(':checked')){
            $(window).on('scroll',function(){
                var scrollTop = $(window).scrollTop()
                $('.bg').css({
                    'background-position-x':scrollTop
                })
            })
        }else{
            $(window).on('scroll',function(){
                $('.bg').css({
                    'background-position-x':0
                })
            })
            
        }
    })
   
    

    // project16
    $('.comparison-slider').on('mousemove',function(event){
        var x = event.pageX - $(this).offset().left
        $('.front-layer').css({
            'left': x + 'px'
        })
    })
    // project17
    var setNumber
    inputA()
    $('.number input').on('input',function(){
            
        if(setNumber){
            clearInterval(setNumber)
        }
                
                inputA()
     
    
    })
    
    
    function inputA(){
        if(setNumber){
            clearInterval(setNumber)
        }
        var numberN = ($('.number').find('input').val()) ? $('.number').find('input').val() : 2000
        var spanN = $('.number').find('span')
        var spanElement = spanN.text(numberN)
        setNumber = setInterval(function(){
            
            if(spanElement.text() > 0){
                spanElement.text(spanElement.text() - 1)
            }else{
                clearInterval(setNumber)
            }
        },1000) 
    }
 
    
    // end js
})


function time(callback) {
    $.ajax({
        url: 'time.php',
        dataType: 'JSON',
        success: function (data) {
            var time = data.time;
            callback(time);
        }
    });
}
$(window).on('load', function () {
    time(function (time) {
        $('.loader').delay(500).fadeOut(time);
    });
});