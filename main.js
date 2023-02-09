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

include(null, 'meta', 'head', null, 'viewport', null, 'width=device-width, initial-scale=1');
include('https://code.jquery.com/jquery-3.6.3.min.js', 'script', 'head');
include('https://code.jquery.com/ui/1.13.2/jquery-ui.min.js', 'script', 'head');
include('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css', 'link', 'head');
include('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js', 'script', 'body');