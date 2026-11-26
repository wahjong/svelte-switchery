import { mount } from 'svelte';
import Switchery from './Switchery.svelte';

document.querySelectorAll<HTMLElement>('switchery').forEach((ele, i) => {

    let name = ele.dataset.name ||  'switchery_' + i;
    console.log(`%cname`, 'background-color:purple', name);

    if (ele.dataset.checkbox) {
        ele.checkbox = document.querySelector<HTMLInputElement>(
            `input[type=checkbox][id="${ele.dataset.checkbox}"]`
        ) ?? undefined;
        console.log(`%cinput[type=checkbox][id="${ele.dataset.checkbox}"]`, 'background-color:purple', ele.checkbox);
    }
    console.log('%cele.checkbox', 'background-color:purple', ele.checkbox);

    let onclickHandler;

    try {
        const handler = ele.getAttribute('onclick');
        if (handler) {
            onclickHandler = eval(handler);
        }
    } catch(error) {
        console.warn('Inline onclick invalid', error);
    }
    console.log('%conclickHandler', 'background-color:purple', onclickHandler);

    let disabled: boolean;
    try {
        disabled = ele.getAttribute('disabled') != null;
    } catch(error) {
        disabled = false;
    }
    console.log('%cdisabled', 'background-color:purple', disabled);

    window[name] = mount(Switchery, {
        target: ele,
        props: {
            target: ele,
            id: ele.dataset.id,
            name,
            checkbox: ele.checkbox,
            disabled: disabled,
            onclick: onclickHandler,
        }
    });

});
