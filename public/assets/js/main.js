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
            success: function(response){
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
            success: function(response) {  
                $('.image-container[data-id="' + response.id + '"]').remove();
            },  
            error: function(xhr, status, error) {  
                console.error("خطا در ارسال درخواست: ", xhr.responseText); // خطا را با جزئیات نمایش دهید  
            }  
        });  
    }
    $(document).on('click', '.noSend', function() {  
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
    
    
  



    $(document).on('click', '.dropdown > a', function(event) {  
        event.preventDefault();  
        var menuItems = $(this).parent('.dropdown').find('.menu-itemss');  
        for (let i = 0; i < menuItems.length; i++) {      
            $(menuItems[i]).slideToggle(1000)
                break; 
        }
        $(this).parent('.dropdown').siblings().find('.menu-itemss').slideUp(1000)
        
    });
  
    function menu(){
        $.ajax({
            url: 'menu.php',
            success: function(response){
                $('#menuAjax').html(response)
            }
            
        })
    }
    menu()
    function admin(){
        $.ajax({
            url: 'livemenu.php',
            success: function(response){
                $('#admin').html(response)
            }
        })
    }
    admin()
    $('#menuForm').on('submit',function(e){
        e.preventDefault()
        var title = $('#titleMenu').val()
        var parent = $('.parentMenu').val() 
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data:{
                titleMenu: title,
                parentMenu: parent
            },
            dataType: 'JSON',
            success: function(data){
                alert('با موفقیت انجام شد')
                admin()
                $('.parentMenu').append("<option value='" + data.data['id'] + "'>" + data.data['title'] + "</option>");
                menu()
                $('#menuForm')[0].reset()
            }
        })
    })
    
    $(document).on('click','.btnn',function(e){

        var id = $(this).closest('form').data('id');
     
        e.preventDefault()
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data: {
                idMenu: id
            },
            dataType: 'JSON',
            success: function(data){
                console.log(data)
                $('.menuItem[data-id="' + data.id + '"]').remove()
                $('.parentMenu option[data-id="' + data.id + '"]').remove()
                if (data.array.length > 0) {  
                    data.array.forEach(function(element){
                        var id = element.id;
                        $('.menuItem[data-id="' + id + '"]').remove()
                        $('.parentMenu option[data-id="' + id + '"]').remove()
                    })
                    
                }
            }
        })
    })
    $(document).on('click','.ti-pencil',function(){
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
            success: function() {  
                alert('با موفقیت به‌روزرسانی شد')
                setTimeout(function() {  
                    location.reload();  
                }, 100);
            },  
            error: function(xhr, status, error) {  
                console.log('یک خطا رخ داد: ' + error);  
               
            }  
        });   
    }  
    
    $(document).on('click', '.bEditMenu', function() {  
        editMenu(this);  
    });




    $(document).on('click','.tb',function(){
        var id = $(this).closest('form').data('id')
      $.ajax({
        url: 'admin.php',
        type: 'POST',
        data:{
          idTest: id  
        },
        dataType:'JSON',
        success: function(data){
            $('.test[data-id='+ data.id +']').remove()
        }
       
      })

    })
    $('.btnMobile').on('click', function() {  
        $('.mobileMenu').toggleClass('active');  
        if ($('.mobileMenu').hasClass('active')) {  
            $(this).text('close menu');  
        } else {  
            $(this).text('open menu');  
        }  
    });
   
    $('.toggle-menu-button').on('click',function(){
        if($('.mobileMenu').hasClass('active')){
            $('.btnMobile').text('close menu')
        } else{
            $('.btnMobile').text('open menu')
        }
    })
    // project2
    function preloader(){
        $.ajax({
            url: 'preloader.php',
            success: function(data){
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
            success: function(){
                preloader()
            }
        });  
    });

    $('#timeb').on('click',function(){
        var time = $(this).closest('form').find('#timein').val()
        $.ajax({
            url: 'admin.php',
            type: 'POST',
            data:{
                time: time
            },
            dataType: 'JSON',
            success: function(data){
                $('#timein').val(data.time)
            }
        })
    })
});

// project2


function time(callback) {  
    $.ajax({  
        url: 'time.php',  
        dataType: 'JSON',  
        success: function(data) {  
            var time = data.time;  
            callback(time); 
        }  
    });  

    //project6

        $('.slider .next').on('click',function(){
           var activeItem = $('.slider .item.active')
           console.log(activeItem.next().length)
        })
}  

$(window).on('load', function() {  
    time(function(time) {  
        $('.loader').delay(500).fadeOut(time);  
    });  
});


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

