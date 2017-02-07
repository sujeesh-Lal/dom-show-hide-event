var domShowHideObserver = function () {
    var self = this;

    self.initialize = function () {
        self.createResetNode();
        return self;
    }

    self.createResetNode = function () {
        if (document.getElementsByClassName("dom-observer-div").length > 0) {
            var element = document.getElementsByClassName("dom-observer-div");
            self.removeAllAttr(element);
            element[0].className = "dom-observer-div";
        } else {
            var hDiv = document.createElement('div');
            document.body.appendChild(hDiv);
            hDiv.className = "dom-observer-div";
            hDiv.setAttribute("style", "width:0px !important;height:0px !important;");
        }
    }

    self.removeAllAttr = function (element) {
        for (var i = element[0].attributes.length; i-- > 0;) {
            if (element[0].attributes[i].name !== "class") {
                element[0].removeAttributeNode(element[0].attributes[i]);
            }
        }
    }

    self.listen = function (target, event, cb) {
        window.MutationObserver = window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver;

        // create an observer instance
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var status = false;
                if (mutation.type === "attributes") {
                    var computedStyle = getComputedStyle(mutation.target, null);
                    if (event === "onHide") {
                        if (computedStyle.display === "none" || computedStyle.visibility === "hidden") {
                            if (self.checkPrevVisibility(mutation.target, mutation.oldValue, mutation.attributeName) === "visible") {
                                status = true;
                            } else {
                                status = false;
                            }
                            cb.call(self, status);
                            return;
                        }
                    }
                    if (event === "onShow") {
                        if (computedStyle.display !== "none" && computedStyle.visibility !== "hidden") {
                            if (self.checkPrevVisibility(mutation.target, mutation.oldValue, mutation.attributeName) === "hidden") {
                                status = true;
                            } else {
                                status = false;
                            }
                            cb.call(self, status);
                            return;
                        }
                    }
                }
            });
        });
        // configuration of the observer:
        var config = {
            attributes: true, // this is to watch for attribute changes.
            attributeOldValue: true
        };
        // pass in the element you wanna watch as well as the options
        observer.observe(target, config);
        return observer;
    }

    self.checkPrevVisibility = function (target, oldValue, attributeName) {
        var hDiv = document.getElementsByClassName("dom-observer-div")[0];
        for (var i = 0; i < target.attributes.length; i++) {
            if (target.attributes[i].name === attributeName) {
                if (target.attributes[i].name === "class") {
                    hDiv.setAttribute(target.attributes[i].name, "dom-observer-div " + oldValue);
                } else if (target.attributes[i].name === "style") {
                    hDiv.setAttribute(target.attributes[i].name, "width:0px !important;height:0px !important;" + oldValue);
                } else {
                    hDiv.setAttribute(target.attributes[i].name, oldValue);
                }
            } else {
                if (target.attributes[i].name === "class") {
                    hDiv.setAttribute(target.attributes[i].name, "dom-observer-div " + target.attributes[i].value);
                } else if (target.attributes[i].name === "style") {
                    hDiv.setAttribute(target.attributes[i].name, "width:0px !important;height:0px !important;" + target.attributes[i].value);
                } else {
                    hDiv.setAttribute(target.attributes[i].name, target.attributes[i].value);
                }
            }
        }
        var computedStyle = getComputedStyle(hDiv, null);
        var status;
        if (computedStyle.display !== "none" && computedStyle.visibility !== "hidden") {
            status = "visible";
        } else {
            status = "hidden";
        }

        self.createResetNode();
        return status;
    }

    self.stopListening = function (observer) {
        observer.disconnect();
    }

    return self.initialize();
}

module.exports = domShowHideObserver;
