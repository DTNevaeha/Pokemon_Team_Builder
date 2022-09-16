function elementFactory({eltType, classNames, parentElt, text, attrs, events}) {
    !eltType ? undefined : false;
    const newElt = document.createElement(eltType);
    classNames ?  newElt.classList.add(...classNames) : false;
    text ?  newElt.innerText = text : false;
    parentElt ?  parentElt.appendChild(newElt) : false;
    attrs ? attrs.forEach(attr => setAttribute(attr, newElt)) : false;
    events ? events.forEach(event => setEvent(event, newElt)) : false;
    return newElt;
}

function setAttribute(attr, newElt){
    const { name: attrName, value: attrVal } = attr;
    newElt.setAttribute(attrName, attrVal);
}

function setEvent(event, newElt) {
    const { eventType: type, event: func} = event;
    newElt.addEventListener(type, func);
}

export {
    elementFactory,
}