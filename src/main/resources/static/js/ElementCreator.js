class EC {

    /**
     * createElement Version 2
     *
     * Creates a new HTML element and sets its attributes and append itself to another element if needed.
     *
     * @param tag type o to to create
     * @param attributes class, onclick, id, dataset, etc
     * @param innerContent text o child nodes
     */
    static createElement_V2() {
        let args = arguments;
        let tag = args[0];
        let attributes = args[1];
        let element = document.createElement(tag);
        if (attributes != null) {
            var keys = Object.keys(attributes);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = attributes[key];
                if (value != null && typeof (value) === "object") {
                    var attributekeys = Object.keys(attributes[key]);
                    for (let index = 0; index < attributekeys.length; index++) {
                        const valuekey = attributekeys[index];
                        element[key][valuekey] = attributes[key][valuekey];
                    }
                } else if (value != null) {
                    element[key] = attributes[key];
                }

            }
        }
        for (var i = 2; i < args.length; i++) {
            let innerContent = args[i];
            if (innerContent != null) {
                switch (typeof (innerContent)) {
                    case "string":
                        element.innerHTML = innerContent;
                        break;
                    case "object":
                        if (Array.isArray(innerContent)) {
                            innerContent.map(elem => {
                                element.appendChild(elem);
                            });
                        } else {
                            element.appendChild(innerContent);
                        }
                        break;
                    default:
                        break;

                }
            }
        }
        return element;
    }

    /**
     * createElement
     *
     * Creates a new HTML element and sets its attributes and append itself to another element if needed.
     *
     *@deprecated subtituyed for createElement v2
     *
     * @param tag type o to to create
     * @param attributes class, onclick, id, dataset, etc
     * @param innerContent text o element inside
     * @param parent the parent of the new element
     */
    static createElement(tag, attributes = null, innerContent, parent = null) {
        let element = document.createElement(tag);
        if (attributes != null) {
            var keys = Object.keys(attributes);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = attributes[key];
                if (value != null && typeof (value) === "object") {
                    var attributekeys = Object.keys(attributes[key]);
                    for (let index = 0; index < attributekeys.length; index++) {
                        const valuekey = attributekeys[index];
                        element[key][valuekey] = attributes[key][valuekey];
                    }
                } else if (value != null) {
                    element[key] = attributes[key];
                }

            }
        }
        if (innerContent != null) {
            switch (typeof (innerContent)) {
                case "string":
                    element.innerHTML = innerContent;
                    break;
                case "object":
                    if (innerContent instanceof Array) {
                        innerContent.forEach(elem => {
                            element.appendChild(elem);
                        });
                    } else if (innerContent instanceof Node) {
                        element.appendChild(innerContent);
                    }
                    break;
                default:
                    break;

            }
        }
        if (parent != null) {
            parent.appendChild(element);
        }
        return element;
    }

    static testInifinitiveParameters() {
        var args = arguments;
        for (var i = 0; i < args.length; i++) {
            console.log(args[i]);
        }
    }

}