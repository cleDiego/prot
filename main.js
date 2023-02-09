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
