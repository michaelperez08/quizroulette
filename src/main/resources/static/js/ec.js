class EC {

    static createElement(tag, attributes, text, parent) {
        let element = document.createElement(tag);
        if (attributes != null) {
            var keys = Object.keys(attributes);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (key == 'dataset') {
                    var datasetkeys = Object.keys(attributes.dataset);
                    for (let index = 0; index < datasetkeys.length; index++) {
                        const datasetkey = datasetkeys[index];
                        element.dataset[datasetkey] = attributes.dataset[datasetkey];
                    }
                } else {
                    element[key] = attributes[key];
                }

            }
        }
        element.innerHTML = text;
        if (parent != null) {
            parent.appendChild(element);
        }
        return element;
    }

}