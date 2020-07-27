let bevitelButton = document.getElementById("bevitelButton");
let mennyiseg = 0
bevitelButton.onclick = function () {
    var input = document.getElementById("egyenletszam");
    mennyiseg = input.value;
    var inputField = document.getElementById('inputField')
    inputField.innerHTML = ""
    var eltavolit = document.getElementById("szamitasButton")
    if (eltavolit != null) {
        eltavolit.parentNode.removeChild(eltavolit)
        eltavolit = document.getElementById("megoldLabel")
        eltavolit.parentNode.removeChild(eltavolit)
    }
    for (sorszam = 1; sorszam <= mennyiseg; sorszam++) {
        var sor = document.createElement('dt')
        for (i = 1; i <= mennyiseg; i++) {
            var element1 = document.createElement('label')
            element1.innerHTML = "V" + i + ": ";
            sor.append(element1);
            var element2 = document.createElement('input')
            element2.setAttribute("id", "valtozo" + sorszam + i)
            element2.setAttribute("type", "text")
            element2.setAttribute("class", "matrixInput")
            sor.append(element2)
        }
        var eredmenyLabel = document.createElement("label")
        eredmenyLabel.innerHTML = "E" + sorszam + ": "
        sor.append(eredmenyLabel)
        var eredmeny = document.createElement('input')
        eredmeny.setAttribute("id", "eredmeny" + sorszam)
        eredmeny.setAttribute("type", "text")
        eredmeny.setAttribute("class", "matrixInput")
        sor.append(eredmeny)
        inputField.append(sor)
    }
    var szamitasButton = document.createElement("button")
    szamitasButton.setAttribute("id", "szamitasButton")
    szamitasButton.innerHTML = "Számítás"
    szamitasButton.onclick = function () {
        gauss()
    }
    var div = document.createElement('div')
    div.append(szamitasButton)
    document.body.append(div)
}

function gauss() {
    var matrix = []
    for (sorszam = 1; sorszam <= mennyiseg; sorszam++) {
        var matrixsor = []
        for (elem = 1; elem <= mennyiseg; elem++) {
            valtozoInput = document.getElementById("valtozo" + sorszam + elem)
            matrixsor[elem - 1] = parseFloat(valtozoInput.value)
        }
        eredmeny = document.getElementById("eredmeny" + sorszam)
        matrixsor[matrixsor.length] = eredmeny.value
        matrix[sorszam - 1] = matrixsor
    }
    var oszt = matrix[0][0]
    for (elem = 0; elem < matrix[0].length; elem++) {
        matrix[0][elem] = matrix[0][elem] / oszt
    }
    for (sor = 0; sor < matrix.length - 1; sor++) {
        for (kivon = sor + 1; kivon < matrix.length; kivon++) {
            szorzo = matrix[kivon][sor] / matrix[sor][sor]
            for (oszlop = sor; oszlop < matrix[kivon].length; oszlop++) {
                matrix[kivon][oszlop] = matrix[kivon][oszlop] - matrix[sor][oszlop] * szorzo
            }
        }

    }
    var megoldas = new Array(matrix.length)
    for (elem = 0; elem < megoldas.length; elem++) {
        megoldas[elem] = 0
    }
    var div = document.createElement('div')
    var megoldLabel = document.createElement('label')
    megoldLabel.setAttribute("id", "megoldLabel")
    div.append(megoldLabel)
    document.body.append(div)
    for (sor = matrix.length - 1; sor >= 0; sor--) {
        var eredmeny = matrix[sor][matrix.length]
        for (elem = matrix.length - 1; elem > sor; elem--) {

            eredmeny -= matrix[sor][elem] * megoldas[elem]
        }
        megoldas[sor] = eredmeny / matrix[sor][sor]
    }
    var nan = false
    for (poz = 0; poz < megoldas.length; poz++) {
        if (Number.isNaN(megoldas[poz])) {
            nan = true
        }
    } if (nan) {
        megoldLabel.innerHTML = "Nincs konkrét megoldása az egyenletrendszernek!"
    }
    else {
        var megoldasString = ""
        for(poz = 0; poz<megoldas.length;poz++){
            megoldasString +="X"+(poz+1)+" = " + megoldas[poz]+", "
        }
        megoldasString = megoldasString.substring(0, megoldasString.length-2)
        megoldLabel.innerHTML = megoldasString
    }
}