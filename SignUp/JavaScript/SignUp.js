
console.log($('#SignUpHead img').css('margin-left'));

// 小方块定时变颜色
setInterval(function () {
    var randomColor = '#' + ('00000'+(0|Math.random()*(1<<24)).toString(16)).slice(-6);
    $('#SignUpChange').css('background-color',randomColor);
    $('#SignUpChange').css('opacity',Math.random());
    $('#SignUpChange').css('border-radius',Math.random() * 50 + '%');
},4000);

// 小方块随着鼠标移动而移动
$(document).on('mousemove','*',function (e) {
    var left = document.getElementById('SignUpChange').getBoundingClientRect().left;
    var top1 = document.getElementById('SignUpChange').getBoundingClientRect().top;
    var SignUpChange = document.getElementById('SignUpChange');
    var x = e.clientX - left;
    var y = e.clientY - top1;
    $('#SignUpChange').css('margin-left',~~(-x / 50) + 'px');
    $('#SignUpChange').css('margin-top',~~(-y / 50) + 'px');
    $('#SignUpHead img').css('margin-left', -50 + ~~(x / 25) + 'px');
});

// 小的添加按钮的点击事件，包括一系列判断，筛选添加自定义条件。
$(document).on('click','.add',function() {
    var newOne = $('#addNew .content').clone();
    var input = newOne.find('input');
    var quantity = $('[name="quantity"]').val();
    newOne.find('label').attr('contentEditable','false');
    if ($('#isLongYes').prop('checked') == true) {
        var height = $('[name="height"]').val();
        var width = $('[name="width"]').val();
        $('<textarea rows="3" cols="20" form="user_form"></textarea>').insertBefore(input);
        input.remove();
        newOne.find('textarea').attr('placeholder',input.val());
        if (height != '') { 
            newOne.find('textarea').attr('rows',height);
        }
        if (width != '') { 
            newOne.find('textarea').attr('cols',width);
        }
        
    } else {
        input.attr('placeholder',input.val());
        input.val('');
    }
    if ($('#isMustYes').prop('checked') == true) {
        if ($('#isLongYes').prop('checked') == true) {
            newOne.find('textarea').prop('required','required');
        } else {
            input.prop('required','required');
        }
    }
    if (quantity != '') { 
        if ($('#isLongYes').prop('checked') == true) {
            newOne.find('textarea').prop('maxLength',quantity);
        } else {
            input.prop('maxLength',quantity);
            console.log(input.prop('maxLength'));
        }
    } else {
        if ($('#isLongYes').prop('checked') == true) {
            newOne.find('textarea').prop('maxLength','10');
        } else {
            input.prop('maxLength','10');
        }
    }
    $('#add').click();
    $('#addNew input').val('');
    $('#isMustNo').click(); 
    $('#isLongNo').click();   
    newOne.attr('style','display: none;margin-left: -750px;opacity: 0');
    newOne.insertBefore($("[type='submit']"));
    newOne.slideDown();
    newOne.animate({
        opacity:'1',
        marginLeft: '0'
    });
    newOne.find('.delete').animate({
        opacity:'show',
    });
});


$('#addNew .content label').on('dblclick',function (e) {
    $(this).attr('contentEditable','true');
});


// 大的添加圆按钮的点击事件
$(document).on('click','#add',function () {
    if ($('#addNew').css('display') == 'none') { 
        // color: rgb(63, 211, 231);background-color: rgb(63, 211, 231);
        $(this).attr('style','transform: translate(50%,10px);font-size: 1em;padding: 0 6px 2px 6px;border: 5px solid white;');
        // var randomColor = '#' + ('00000'+(0|Math.random()*(1<<24)).toString(16)).slice(-6);
        $(this).css('color',$('#SignUpChange').css('background-color'));
        $(this).css('background-color',$('#SignUpChange').css('background-color'));
        $('#addNew').animate({
            opacity:'toggle',
            height: 'toggle'
        });
    } else {
        if ($(this).css('font-size') == '16px') { 
            $(this).attr('style','transform: translate(50%,-50%);font-size: 2em;color: white;background-color: rgb(139, 231, 63);padding: 0 12px 5px 12px;border: 2px solid white;');
            $('#addNew').animate({
                opacity:'toggle',
                height: 'toggle'
            });
        }
    }
    // $('#addNew').animate({
    //     opacity:'toggle'
    // });
    // $(this).animate({ 
    //     transform: 'translate(50%,10px)',
    //     fontSize: '1em',
    //     color: 'rgb(63, 122, 231)',
    //     padding: '0 6px 2px 6px',
    //     border: '5px solid white'
    // });
});

$('#isLongYes').on('click',function () {
    $('.isLong').slideDown();
});

$('#isLongNo').on('click',function () {
    $('.isLong').slideUp();
});

$(document).on('change','input',function () {
    switch ($(this).attr('name')) {
        case 'quantity':
            if ($(this).val() > 80) {
                $(this).val('80');
            }
            break;

        case 'height':
            if ($(this).val() > 4) {
                $(this).val('4');
            }
            break;

        case 'width':
            if ($(this).val() > 50) {
                $(this).val('50');
            }
            break;
    

    }
});


$(document).on('click','.delete',function () {
    $(this).animate({
        opacity: 'hide'
    });
    $(this).closest('.content').animate({
        marginLeft: '-100px'
    });
    $(this).closest('.content').animate({
        marginRight: '-500px',
        opacity: '0',
    });
    $(this).closest('.content').animate({
        height: 'hide'
    },function () {
        $(this).closest('.content').remove();
    });
});

$(document).on('mouseup','#SignUpHead',function (e) {
    var leftDemo = document.getElementById('SignUpHead').getBoundingClientRect().left;
    var topDemo = document.getElementById('SignUpHead').getBoundingClientRect().top;
    var widthDemo = document.getElementById('SignUpHead').getBoundingClientRect().width;
    var heightDemo = document.getElementById('SignUpHead').getBoundingClientRect().height;
    var div = $('<div style="border-radius:100%;position:absolute;transform:translate(-50%, -50%);background: rgba(201, 195, 195, 0.2);z-index:1;"></div>');
    var x = e.clientX - leftDemo;
    var y = e.clientY - topDemo;
    var radius = Math.sqrt(widthDemo * widthDemo + heightDemo * heightDemo);
    div.css('top',y);
    div.css('left',x);
    $('#SignUpHead').append(div);
    div.animate({
        // transform: 'scale(' + radius + ',' + radius + ')'
        width: 2 * radius,
        height: 2 * radius,
    },700);
    div.animate({
        opacity: 'hide'
    },function () {
        div.remove();
    });
});

$.get('http://localhost:3000/comments/seven',function (result) {
    // console.log(result.code);
});

$.post('http://localhost:3000/comments',{
    'id': 'coolBoy',
    'code': 'dsadasd'
}
,function (result) {
    console.log(result.code);
});

