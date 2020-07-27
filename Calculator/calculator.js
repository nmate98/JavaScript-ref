let button = document.getElementById("megoldButton");
var lista = document.getElementById('megoldas');
button.onclick = function () {
    var input = document.getElementById('input');
    var feladat = input.value;
    if (feladat.length != 0) {
        lista.innerHTML = ""
        if (!checkFormat(feladat)) {
            var ujElem = document.createElement('dt');
            var ujElemTxt = document.createTextNode("Hibás szintaxis!");
            ujElem.appendChild(ujElemTxt);
            lista.append(ujElem);
            throw new Error("Hibás szintaxis!")
        }
        while (feladat[0] == '(' && feladat[feladat.length - 1] == ')' && removeZj(feladat)) {
            feladat = feladat.substring(1, feladat.length - 1)
        }
        var ujElem = document.createElement('dt');
        var ujElemTxt = document.createTextNode(feladat);
        ujElem.appendChild(ujElemTxt);
        lista.append(ujElem);
        let megoldas = format(feladat)
        lehetsegesMegoldas = megold(zjParse(megoldas));
        if (typeof (lehetsegesMegoldas) == "undefined") {
            megoldas = megold(megoldas);
        }
        else {
            megoldas = lehetsegesMegoldas;
        }
        document.getElementById('megoldas').firstElementChild.innerHTML = document.getElementById('megoldas').firstElementChild.innerHTML + " = " + megoldas
        input.value = "";
    }
    else {
        var ujElem = document.createElement('dt');
        var ujElemTxt = document.createTextNode("Adjon meg egy feladatot!");
        ujElem.appendChild(ujElemTxt);
        lista.append(ujElem);
        throw new Error("Adjon meg egy feladatot!");
    }
}

function checkFormat(feladat) {
    for (poz = 0; poz < feladat.length; poz++) {
        if ((feladat[poz] < '0' || feladat[poz] > '9') &&  feladat[poz] != '('&&  feladat[poz] != ')' &&  feladat[poz] != '+' &&  feladat[poz] != '-' &&  feladat[poz] != '*' &&  feladat[poz] != '/' &&  feladat[poz] != '.') {
            return false
        }
    }
    
    return true
}

function format(feladat) {
    for (poz = 0; poz < feladat.length; poz++) {
        if (feladat[poz] == '-' && feladat[poz - 1] != '*' && feladat[poz - 1] != '/' && feladat[poz - 1] != '+' && feladat[poz - 1] != '(' && poz != 0) {
            feladat = feladat.substring(0, poz) + "+" + feladat.substring(poz);
            poz++;
        }
        if (feladat[poz] == '(' && (feladat[poz-1]>='0' && feladat[poz-1]<='9') && poz > 0) {
            feladat = feladat.substring(0, poz) + "*" + feladat.substring(poz);
            poz++;
        }
    }
    return feladat
}

function zjCount(feladat) {
    var feladatArray = [feladat.length];
    var zj = 0;
    for (poz = 0; poz < feladat.length; poz++) {
        if (feladat[poz] == '(') {
            zj++;

            feladatArray[poz] = [feladat[poz], zj];
            if (feladat[poz + 1] == ')') {
                var ujElem = document.createElement('dt');
                var ujElemTxt = document.createTextNode("Hibás szintaxis!");
                ujElem.appendChild(ujElemTxt);
                lista.append(ujElem);
                throw new Error("Hibás szintaxis!")
            }
        }
        else if (feladat[poz] == ')') {
            feladatArray[poz] = [feladat[poz], zj];
            zj--;
            if (zj < 0) {
                var ujElem = document.createElement('dt');
                var ujElemTxt = document.createTextNode("Hibás szintaxis!");
                ujElem.appendChild(ujElemTxt);
                lista.append(ujElem);
                var ujElem = document.createElement('dt');
                var ujElemTxt = document.createTextNode("Hibás szintaxis!");
                ujElem.appendChild(ujElemTxt);
                lista.append(ujElem);
                throw new Error("Hibás szintaxis!")
            }
        }
        else {
            feladatArray[poz] = [feladat[poz], null];
        }
    }
    if (zj != 0) {
        var ujElem = document.createElement('dt');
        var ujElemTxt = document.createTextNode("Hibás szintaxis!");
        ujElem.appendChild(ujElemTxt);
        lista.append(ujElem);
        throw new Error("Hibás szintaxis!")
    }
    return feladatArray
}

function removeZj(feladat) {
    zj = 0
    remove = true
    for (poz = 0; poz < feladat.length; poz++) {
        if (feladat[poz] == "(") {
            zj++;
        };
        if (feladat[poz] == ")") {
            zj--;
        };
        if (zj == 0 && poz != feladat.length - 1) {
            remove = false
        }
    }
    return remove
}

function zjParse(feladat) {
    var feladatArray = zjCount(feladat)
    for (var poz = 0; poz < feladat.length; poz++) {
        if (feladat[poz][0] == '(') {
            var elore = 1;
            var feladatString = "";
            var ujpoz = 0
            while (feladatArray[poz + elore][0] != ')' || feladatArray[poz][1] != feladatArray[poz + elore][1]) {
                feladatString += feladatArray[poz + elore][0];
                elore++;
                ujpoz++;
            }
            if (!feladatString.includes("(") && !feladat.includes("(")) {
                feladat = zjParse(feladat.substring(0, poz) + megold(zjParsefeladatString) + feladat.substring(poz + 1 + elore))
            }
            else {
                feladat = zjParse(feladat.substring(0, poz) + megold(zjParse(feladatString)) + feladat.substring(poz + 1 + elore))
            }
        }
    }
    return feladat
}

function megold(feladat) {
    for (poz = 0; poz < feladat.length; poz++) {
        if (feladat[poz] == '/') {
            if (feladat[poz + 1] == '+' || feladat[poz + 1] == '*' || feladat[poz + 1] == '/' || feladat[poz + 1] == ')' || poz == feladat.length - 1) {
                var ujElem = document.createElement('dt');
                var ujElemTxt = document.createTextNode("Hibás szintaxis!");
                ujElem.appendChild(ujElemTxt);
                lista.append(ujElem);
                throw new Error("Hibás szintaxis!")
            }
            let vissza = 1;
            let elore = 1;
            while ((feladat[poz - vissza] != '+' && feladat[poz - vissza] != '*' && feladat[poz - vissza] != '/') && poz - vissza >= 0) {
                vissza++;
            }
            while ((feladat[poz + elore] != '+' && feladat[poz + elore] != '*' && feladat[poz + elore] != '/') && poz + elore <= feladat.length - 1) {
                elore++;
            }
            if (vissza == 1 && elore == 1) {
                var ujElem = document.createElement('dt');
                var ujElemTxt = document.createTextNode("Hibás szintaxis!");
                ujElem.appendChild(ujElemTxt);
                lista.append(ujElem);
                throw new Error("Hibás szintaxis!")
            }
            else {
                let elsoTag = parseFloat(feladat.substring(poz - vissza + 1, poz));
                let masodikTag = parseFloat(feladat.substring(poz + 1, poz + elore));
                let eredmeny = elsoTag / masodikTag;
                eredmeny = feladat.substring(0, poz - vissza + 1) + eredmeny + feladat.substring(poz + elore);
                if (eredmeny.includes('+') || eredmeny.includes('*') || eredmeny.includes('/')) {
                    return megold(eredmeny);
                }
                else {
                    var lista = document.getElementById('megoldas');
                    var ujElem = document.createElement('dt');
                    var ujElemTxt = document.createTextNode(feladat + " = " + eredmeny);
                    ujElem.appendChild(ujElemTxt);
                    lista.append(ujElem);
                    return eredmeny
                }
            }
        }
        if (feladat[poz] == '*') {
            if (feladat[poz + 1] == '+' || feladat[poz + 1] == '*' || feladat[poz + 1] == '/' || feladat[poz + 1] == ')' || poz == feladat.length - 1) {
                var ujElem = document.createElement('dt');
                var ujElemTxt = document.createTextNode("Hibás szintaxis!");
                ujElem.appendChild(ujElemTxt);
                lista.append(ujElem);
                throw new Error("Hibás szintaxis!")
            }
            let vissza = 1;
            let elore = 1;
            while ((feladat[poz - vissza] != '+' && feladat[poz - vissza] != '*' && feladat[poz - vissza] != '/') && poz - vissza >= 0) {
                vissza++;
            }
            while ((feladat[poz + elore] != '+' && feladat[poz + elore] != '*' && feladat[poz + elore] != '/') && poz + elore <= feladat.length - 1) {
                elore++;
            }
            if (vissza == 1 && elore == 1) {
                var ujElem = document.createElement('dt');
                var ujElemTxt = document.createTextNode("Hibás szintaxis!");
                ujElem.appendChild(ujElemTxt);
                lista.append(ujElem);
                throw new Error("Hibás szintaxis!")
            }
            else {
                let elsoTag = parseFloat(feladat.substring(poz - vissza + 1, poz));
                let masodikTag = parseFloat(feladat.substring(poz + 1, poz + elore));
                let eredmeny = elsoTag * masodikTag;
                eredmeny = feladat.substring(0, poz - vissza + 1) + eredmeny + feladat.substring(poz + elore);
                if (eredmeny.includes('+') || eredmeny.includes('*') || eredmeny.includes('/')) {
                    return megold(eredmeny);
                }
                else {
                    var lista = document.getElementById('megoldas');
                    var ujElem = document.createElement('dt');
                    var ujElemTxt = document.createTextNode(feladat + " = " + eredmeny);
                    ujElem.appendChild(ujElemTxt);
                    lista.append(ujElem);
                    return eredmeny
                }
            }
        }
    }
    for (poz = 0; poz < feladat.length; poz++) {
        if (feladat[poz] == '+') {
            if (feladat[poz + 1] == '+' || feladat[poz + 1] == '*' || feladat[poz + 1] == '/' || feladat[poz + 1] == ')' || poz == feladat.length - 1 || (feladat[poz + 1] == '-' && (feladat[poz + 2] == '+' || feladat[poz + 2] == '*' || feladat[poz + 2] == '/' || feladat[poz + 2] == ')' || poz == feladat.length - 2))) {
                var ujElem = document.createElement('dt');
                var ujElemTxt = document.createTextNode("Hibás szintaxis!");
                ujElem.appendChild(ujElemTxt);
                lista.append(ujElem);
                throw new Error("Hibás szintaxis!")
            }
            let vissza = 1;
            let elore = 1;
            while ((feladat[poz - vissza] != '+' && feladat[poz - vissza] != '*' && feladat[poz - vissza] != '/') && poz - vissza >= 0) {
                vissza++;
            }
            while ((feladat[poz + elore] != '+' && feladat[poz + elore] != '*' && feladat[poz + elore] != '/') && poz + elore <= feladat.length - 1) {
                elore++;
            }
            if (vissza == 1 && elore == 1) {
                var ujElem = document.createElement('dt');
                var ujElemTxt = document.createTextNode("Hibás szintaxis!");
                ujElem.appendChild(ujElemTxt);
                lista.append(ujElem);
                throw new Error("Hibás szintaxis!")
            }
            else {
                let elsoTag = parseFloat(feladat.substring(poz - vissza + 1, poz));
                let masodikTag = parseFloat(feladat.substring(poz + 1, poz + elore));
                let eredmeny = elsoTag + masodikTag;
                eredmeny = feladat.substring(0, poz - vissza + 1) + eredmeny + feladat.substring(poz + elore);
                if (eredmeny.includes('+') || eredmeny.includes('*') || eredmeny.includes('/')) {
                    eredmeny = format(eredmeny)
                    return megold(eredmeny);
                }
                else {
                    var lista = document.getElementById('megoldas');
                    var ujElem = document.createElement('dt');
                    var ujElemTxt = document.createTextNode(feladat + " = " + eredmeny);
                    ujElem.appendChild(ujElemTxt);
                    lista.append(ujElem);
                    return eredmeny
                }
            }
        }
    }
}


