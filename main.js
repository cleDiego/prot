//pausar o refresh
window.stop();


function include(type = 'script', appendIn = 'head', html = null, attr = []) { //id = null, name = null, value = null, content = null) {
    var elem;
    elem = document.createElement(type);
    for ([k, v] of Object.entries(attr)) elem.setAttribute(k, v);
    elem.innerHTML = html;
    document.getElementsByTagName(appendIn).item(0).appendChild(elem);
}

function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function(script) {
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        });
    });
}

function getProtList() {
    let protList = [];
    let marker, marker_color, marker_bg_color = null
    $('table > tbody  > tr').each(function (i, tr) {
        if ($(tr).find('th[colspan="12"]').length) {
            marker = $(tr).find('th').text();
            marker_color = $(tr).find('th').css('color');
            marker_bg_color = $(tr).find('th').css('background-color');
        }
        if ($(tr).find('td input[name="prot[]"]').length) {
            protList.push({
                'numero': $(tr).find('td').eq(2).find('a').text().replace(/[^0-9]/g, ''),
                'cliente': $(tr).find('td').eq(3).text().trim(),
                'prioridade': $(tr).find('td').eq(4).text().trim(),
                'tipo': $(tr).find('td').eq(5).text().trim(),
                'motivo': $(tr).find('td').eq(6).text().trim(),
                'solicitacao': $(tr).find('td').eq(7).text().trim(),
                'dt_entrada': $(tr).find('td').eq(10).text().trim(),
                'dt_entrega': $(tr).find('td').eq(8).text().trim(),
                'localizacao': $(tr).find('td').eq(9).text().trim(),
                'marker': marker ? marker : '',
                'marker_color': marker_color ? marker_color : '',
                'marker_bg_color': marker_bg_color ? marker_bg_color : ''
            });
        }
    });
    return protList;
}

function initInterface() {

    var protList = getProtList();
    console.log(protList);

    $('head').empty();
    $('body').empty();

    include('meta', 'head', null, { name: 'viewport', content: 'width=device-width, initial-scale=1' });
    include('meta', 'head', null, { charset: 'utf-8' });
    include('title', 'head', 'Nova Caixa de Trabalho');


    include('link', 'head', null, { href: 'https://cdn.datatables.net/1.13.2/css/jquery.dataTables.min.css', rel: 'stylesheet' });
    include('link', 'head', null, { href: 'https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta2/dist/css/bootstrap-select.min.css', rel: 'stylesheet' });
    include('link', 'head', null, { href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css', rel: 'stylesheet' });

    include('link', 'head', null, { href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css', rel: 'stylesheet' });
    include('link', 'head', null, { href: 'https://clediego.github.io/prot/main.css?v=' + Date.now(), rel: 'stylesheet' });



    var scripts = [
        '//code.jquery.com/jquery-3.6.3.min.js',
        '//code.jquery.com/ui/1.13.2/jquery-ui.min.js',
        '//cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',
        '//cdn.datatables.net/1.13.2/js/jquery.dataTables.min.js',
        '//cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta2/dist/js/bootstrap-select.min.js'
    ];

    $.getScript('//clediego.github.io/prot/vendors/getscripts.min.js', function () {
        $.getScripts({
            urls: scripts,
            cache: true,  // Default
            async: false, // Default
            success: function(response) {
                $('body').load('https://clediego.github.io/prot/main.html?v=' + Date.now(), function () {
                    $('.selectpicker').selectpicker();

                    for (let i = 0; i < protList.length; i++) {
                        //let marker_style = protList[i].marker ? 'style="color:' + protList[i].marker_color + '; background-color:' + protList[i].marker_bg_color + '"' : null;
                        let marker = protList[i].marker ?
                            '<i title="'+protList[i].marker+'" style="color:' + protList[i].marker_bg_color + ';" class="bi bi-circle-fill"></i><br/>'+protList[i].marker
                            : '';
                        $('.prot-list-table tbody').append(
                            '<tr class="text-center">'+
                            '    <td></td>'+
                            //'    <td><span '+marker_style+' class="list-prot-marker">'+protList[i].marker+'</span></td>'+
                            '    <td>'+marker+'</td>'+
                            '    <td>'+protList[i].cliente+'</td>'+
                            '    <td>'+protList[i].numero+'</td>'+
                            '    <td>'+protList[i].dt_entrada+'</td>'+
                            '    <td>'+protList[i].tipo+'</td>'+
                            '    <td>'+protList[i].motivo+'</td>'+
                            '    <td class="text-start"><div class="wrap-solicitacao" alt="'+protList[i].solicitacao+'">'+protList[i].solicitacao+'</div></td>'+
                            '    <td>'+protList[i].prioridade+'</td>'+
                            '    <td>'+protList[i].dt_entrega+'</td>'+
                            '    <td>'+protList[i].localizacao+'</td>'+
                            '</tr>'
                        );
                    }

                    $('.prot-list-table').DataTable({
                        paging: false,
                        info: false,
                        searching: false,
                        columns: [
                            {orderable: false},
                            {orderable: true},
                            {orderable: true},
                            {orderable: true},
                            {orderable: true},
                            {orderable: true},
                            {orderable: true},
                            {orderable: false},
                            {orderable: true},
                            {orderable: true},
                            {orderable: true}
                        ]
                    });


                    $('.wrap-solicitacao').click(function () {
                        $(this).toggleClass('expand');
                    });

                });
            }
        });



    });


}




    /*
    $(document).ready(function () {
        //listar os protocolos
        var protList = [];
        var marker, marker_color, marker_bg_color = null
        $('table > tbody  > tr').each(function (i, tr) {
            if ($(tr).find('th[colspan="12"]').length) {
                marker = $(tr).find('th').text();
                marker_color = $(tr).find('th').css('color');
                marker_bg_color = $(tr).find('th').css('background-color');
            }
            if ($(tr).find('td input[name="prot[]"]').length) {
                protList.push({
                    'numero': $(tr).find('td').eq(2).find('a').text().replace(/[^0-9]/g, ''),
                    'cliente': $(tr).find('td').eq(3).text().trim(),
                    'prioridade': $(tr).find('td').eq(4).text().trim(),
                    'tipo': $(tr).find('td').eq(5).text().trim(),
                    'motivo': $(tr).find('td').eq(6).text().trim(),
                    'solicitacao': $(tr).find('td').eq(7).text().trim(),
                    'dt_entrada': $(tr).find('td').eq(10).text().trim(),
                    'dt_entrega': $(tr).find('td').eq(8).text().trim(),
                    'localizacao': $(tr).find('td').eq(9).text().trim(),
                    'marker': marker ? marker : '',
                    'marker_color': marker_color ? marker_color : '',
                    'marker_bg_color': marker_bg_color ? marker_bg_color : ''
                });
            }
        });



        //limpar o front
        $('head').empty();
        $('body').empty();



        include('meta', 'head', null, { name: 'viewport', content: 'width=device-width, initial-scale=1' });
        include('meta', 'head', null, { charset: 'utf-8' });
        include('title', 'head', 'Nova Caixa de Trabalho');


        include('link', 'head', null, { href: 'https://cdn.datatables.net/1.13.2/css/jquery.dataTables.min.css', rel: 'stylesheet' });
        include('link', 'head', null, { href: 'https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta2/dist/css/bootstrap-select.min.css', rel: 'stylesheet' });
        include('link', 'head', null, { href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css', rel: 'stylesheet' });

        include('link', 'head', null, { href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css', rel: 'stylesheet' });
        include('link', 'head', null, { href: 'https://clediego.github.io/prot/main.css?v=' + Date.now(), rel: 'stylesheet' });


        //carregar a nova interface
        $.when(
            $.getScript('//code.jquery.com/jquery-3.6.3.min.js'),
            $.getScript('//code.jquery.com/ui/1.13.2/jquery-ui.min.js'),
            $.getScript('//cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js'),
            $.getScript('//cdn.datatables.net/1.13.2/js/jquery.dataTables.min.js'),
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function () {
            $('body').load('https://clediego.github.io/prot/main.html?v=' + Date.now(), function () {
                console.log(protList);
                for (let i = 0; i < protList.length; i++) {
                    let marker_style = protList[i].marker ? 'style="color:' + protList[i].marker_color + '; background-color:' + protList[i].marker_bg_color + '"' : null;
                    $('.prot-list-table tbody').append(
                        '<tr>'+
                        '    <td><span '+marker_style+' class="list-prot-marker">'+protList[i].marker+'</span></td>'+
                        '    <td></td>'+
                        '    <td>'+protList[i].cliente+'</td>'+
                        '    <td>'+protList[i].numero+'</td>'+
                        '    <td>'+protList[i].dt_entrada+'</td>'+
                        '    <td>'+protList[i].tipo+'</td>'+
                        '    <td>'+protList[i].motivo+'</td>'+
                        '    <td><div class="wrap-solicitacao">'+protList[i].solicitacao+'</div></td>'+
                        '    <td>'+protList[i].prioridade+'</td>'+
                        '    <td>'+protList[i].dt_entrega+'</td>'+
                        '    <td>'+protList[i].localizacao+'</td>'+
                        '</tr>'
                    );
                }


                $.getScript('//cdn.datatables.net/fixedheader/3.3.1/js/dataTables.fixedHeader.min.js', function( data, textStatus, jqxhr ) {
                    $('.prot-list-table').DataTable({
                        paging: false,
                        info: false,
                        searching: false,
                        fixedHeader: {
                            header: true,
                            footer: true
                        },
                        columns: [
                            {orderable: true},
                            {orderable: false},
                            {orderable: true},
                            {orderable: true},
                            {orderable: true},
                            {orderable: true},
                            {orderable: true},
                            {orderable: false},
                            {orderable: true},
                            {orderable: true},
                            {orderable: true}
                        ]
                    });
                });

                $.getScript('//cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta2/dist/js/bootstrap-select.min.js', function( data, textStatus, jqxhr ) {
                    $(".selectpicker").selectpicker();
                });

            });
        });
    });

    $(function() {
                        'use script'

                        feather.replace();

                        const sb = new PerfectScrollbar('.sidebar-body', {
                            suppressScrollX: true
                        });

                        $('.sidebar').on('mouseenter mouseleave', function(e) {
                            var isHover = (e.type === 'mouseenter')? true : false;

                            if($('.sidebar').hasClass('minimized')) {
                            if(isHover) {
                                setTimeout(function(){
                                $('.sidebar').addClass('expand');
                                sb.update();
                                }, 300);
                            } else {
                                $('.sidebar').removeClass('expand');
                                $('.sidebar-body').scrollTop(0);
                                sb.update();
                            }
                            }
                        });

                        $('.search-body .form-control').on('focusin focusout', function(e){
                            $(this).parent().removeClass('onhover');

                            if(e.type === 'focusin') {
                            $(this).parent().addClass('onfocus');
                            } else {
                            $(this).parent().removeClass('onfocus');
                            }
                        });

                        $('.search-body').on('mouseover mouseleave', function(e){
                            if(!$(this).hasClass('onfocus')) {
                            $(this).toggleClass('onhover', e.type === 'mouseover');
                            }
                        });

                        // single level menu
                        $('.nav-sidebar > .nav-link').on('click', function(e){
                            e.preventDefault();

                            // remove active siblings
                            $(this).addClass('active').siblings().removeClass('active');

                            // remove active siblings from other nav
                            var ss = $(this).closest('.nav-sidebar').siblings('.nav-sidebar');
                            var sg = $(this).closest('.nav-group').siblings('.nav-group');

                            ss.find('.active').removeClass('active');
                            ss.find('.show').removeClass('show');

                            sg.find('.active').removeClass('active');
                            sg.find('.show').removeClass('show');
                        });

                        // two level menu
                        $('.nav-sidebar .nav-item').on('click', '.nav-link', function(e){
                            e.preventDefault();

                            if($(this).hasClass('with-sub')) {
                            $(this).parent().toggleClass('show');
                            $(this).parent().siblings().removeClass('show');
                            } else {
                            $(this).parent().addClass('active').siblings().removeClass('active');
                            $(this).parent().siblings().find('.sub-link').removeClass('active');
                            }

                            var ss = $(this).closest('.nav-sidebar').siblings('.nav-sidebar');
                            var sg = $(this).closest('.nav-group').siblings('.nav-group');

                            ss.find('.active').removeClass('active');
                            ss.find('.show').removeClass('show');

                            sg.find('.active').removeClass('active');
                            sg.find('.show').removeClass('show');

                            sb.update();
                        });

                        $('.nav-sub').on('click', '.sub-link', function(e){
                            e.preventDefault();

                            $(this).addClass('active').siblings().removeClass('active');

                            $(this).closest('.nav-item').addClass('active').siblings().removeClass('active');
                            $(this).closest('.nav-item').siblings().find('.sub-link').removeClass('active');

                            $(this).closest('.nav-sidebar').siblings().find('.active').removeClass('active');
                            $(this).closest('.nav-group').siblings().find('.active').removeClass('active');
                        });

                        $('.nav-group-label').on('click', function(){
                            $(this).closest('.nav-group').toggleClass('show');
                            $(this).closest('.nav-group').siblings().removeClass('show');

                            sb.update();
                        });

                        // content menu
                        $('#contentMenu').on('click', function(e){
                            e.preventDefault();
                            $('.sidebar').toggleClass('minimized');

                            $('.sidebar-body').scrollTop(0);
                            sb.update();
                        });

                    });
    */