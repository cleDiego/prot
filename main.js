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
        $('table > tbody  > tr').each(function(i, tr) {
            if ($(tr).find('td input[name="prot[]"]').length) {

                protList[i] = {
                    'numero': $(tr).find('td').eq(2).find('a').text().replace(/[^0-9]/g, ''),
                    'cliente': $(tr).find('td').eq(3).text().trim(),
                    'prioridade': $(tr).find('td').eq(4).text().trim(),
                    'tipo': $(tr).find('td').eq(5).text().trim(),
                    'motivo': $(tr).find('td').eq(6).text().trim(),
                    'solicitacao': $(tr).find('td').eq(7).text().trim(),
                    'data_entrega': $(tr).find('td').eq(8).text().trim(),
                    'localizacao_atual': $(tr).find('td').eq(9).text().trim()
                }
            }
        });

        //limpar o front
        $('head').empty();
        $('body').empty();
        //pausar o refresh
        window.stop();

        include('meta', 'head', null, { name: 'viewport', content: 'width=device-width, initial-scale=1' });
        include('meta', 'head', null, { charset: 'utf-8' });
        include('title', 'head', 'Caixa de Trabalho');


        include('link', 'head', null, { href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css', rel: 'stylesheet' });
        include('link', 'head', null, { href: 'https://cdn.datatables.net/1.13.2/css/jquery.dataTables.min.css', rel: 'stylesheet' });
        include('link', 'head', null, { href: 'https://clediego.github.io/prot/main.css?v=' + Date.now(), rel: 'stylesheet' });

        include('script', 'body', null, { src: 'https://code.jquery.com/jquery-3.6.3.min.js' });
        include('script', 'body', null, { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js' });
        include('script', 'body', null, { src: 'https://cdn.datatables.net/1.13.2/js/jquery.dataTables.min.js' });
        include('script', 'body', null, { src: 'https://code.jquery.com/ui/1.13.2/jquery-ui.min.js' });

        include('main', 'body', null, null);

        //carregar a nova interface
        $('main').load('https://clediego.github.io/prot/main.html?v='+Date.now(), function () {

        });

    });
}