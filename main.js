function initInterface() {
    function include(file = null, type = 'script', appendIn = 'head', id = null, name = null, value = null, content = null) {
        var elem;
        switch (type) {
            case 'script':
                elem = document.createElement(type);
                elem.src = file;
                elem.type = 'text/javascript';
                elem.defer = true;
                document.getElementsByTagName(appendIn).item(0).appendChild(elem);
                break;
            case 'link':
                elem = document.createElement(type);
                elem.href = file;
                elem.rel = 'stylesheet';
                document.getElementsByTagName(appendIn).item(0).appendChild(elem);
                break;
            case 'meta':
                elem = document.createElement(type);
                elem.name = name;
                elem.content = content;
                document.getElementsByTagName(appendIn).item(0).appendChild(elem);
                break;
            default:
                break;
        }
    }



    //remover a tag de refresh da página
    $(document).ready(function () {
        window.stop();
        $('meta[http-equiv=refresh]').remove();

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

        $('html').empty();

        include(null, 'meta', 'head', null, 'viewport', null, 'width=device-width, initial-scale=1');
        include('https://code.jquery.com/jquery-3.6.3.min.js', 'script', 'head');
        include('https://code.jquery.com/ui/1.13.2/jquery-ui.min.js', 'script', 'head');
        include('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css', 'link', 'head');
        include('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js', 'script', 'body');
        include('https://clediego.github.io/prot/main.css', 'link', 'head');

    });
}