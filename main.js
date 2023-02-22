//pausar o refresh
window.stop();

function initInterface() {
    function include(type = 'script', appendIn = 'head', html = null, attr = []) { //id = null, name = null, value = null, content = null) {
        var elem;
        elem = document.createElement(type);
        for ([k, v] of Object.entries(attr)) elem.setAttribute(k, v);
        elem.innerHTML = html;
        document.getElementsByTagName(appendIn).item(0).appendChild(elem);
    }

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

        include('link', 'head', null, { href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css', rel: 'stylesheet' });
        include('link', 'head', null, { href: 'https://cdn.datatables.net/1.13.2/css/jquery.dataTables.min.css', rel: 'stylesheet' });
        include('link', 'head', null, { href: 'https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta2/dist/css/bootstrap-select.min.css', rel: 'stylesheet' });
        include('link', 'head', null, { href: 'https://clediego.github.io/prot/main.css?v=' + Date.now(), rel: 'stylesheet' });
        include('link', 'head', null, { href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css', rel: 'stylesheet' });


        //carregar a nova interface
        $.when(
            $.getScript('https://code.jquery.com/jquery-3.6.3.min.js'),
            $.getScript('https://code.jquery.com/ui/1.13.2/jquery-ui.min.js'),
            $.getScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js'),
            $.getScript('https://cdn.datatables.net/1.13.2/js/jquery.dataTables.min.js'),
            $.getScript('https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta2/dist/js/bootstrap-select.min.js'),
            //$.getScript('https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.18/dist/js/i18n/defaults-pt_BR.min.js'),
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
                        '    <td>'+protList[i].solicitacao+'</td>'+
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
        });
    });
}