const Pyrex = (function(){
    return function(pyr, options) {
        let element;

        const LOGGING = {
            TRACE: options && options.logging && options.logging.trace,
            DEBUG: options && options.logging && options.logging.debug,
            INFO: options && options.logging && options.logging.info,
            WARNING: options && options.logging && options.logging.warning,
            ERROR: options && options.logging && options.logging.error
        };

        if(typeof pyr === 'string') {
            LOGGING.TRACE ? console.log('determining element type of: ' + pyr) : () => {};
            if(pyr.indexOf('#!') === 0) {
                LOGGING.TRACE ? console.log('Creating text element from: ' + pyr.replace('#!', '')) : () => {};
                element = document.createTextNode(pyr.replace('#!', ''));
            } else if(pyr.indexOf('!') === 0) {
                LOGGING.TRACE ? console.log('Creating element from: ' + pyr.replace('!', '')) : () => {};
                element = document.createElement(pyr.replace('!', ''));
            } else {
                LOGGING.TRACE ? console.log('Creating element from existing: ' + pyr) : () => {};
                element = document.querySelector(pyr);
            }
        } else if(typeof pyr === 'object' || pyr.constructor === Array) {
            LOGGING.TRACE ? console.log('Creating element from existing element: ' + pyr) : () => {};
            element = pyr;
        } else {
            console.error('Pyrex cannot be instantiated with anything other than a string or DOM element.');
        }

        if(!element) {
            console.error('Pyrex cannot create an object from: ' + pyr);
        }

        if(typeof element === 'object') {
            element.all = function (sel) {
                const elements = element.querySelectorAll(sel);
                let ret = [];
                for (let i = 0; i < elements.length; i++) {
                    ret.push(Pyrex(elements[i]));
                }
                return ret;
            };

            element.append = function (el) {
                LOGGING.TRACE ? console.log('Appending ' + el + ' to ' + element) : () => {};
                element.appendChild(el);
                return Pyrex(element);
            };

            element.addClass = function (cls) {
                element.classList.add(cls);
                return Pyrex(element);
            };

            element.link = function (link) {
                element.href = link;
                return Pyrex(element);
            };

            element.click = function (cb) {
                element.onclick = cb;
                return Pyrex(element);
            };
        } else if(pyr.constructor === Array) {
            console.error('The Array constructor is not yet implemented.');
        }

        return element;
    }
})();