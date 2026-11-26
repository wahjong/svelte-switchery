import { mount } from 'svelte';
import Switchery from './Switchery.svelte';

document.querySelectorAll<HTMLElement>('switchery').forEach((ele, i) => {
    console.log('%cele.dataset', 'background-color:purple', ele.dataset);

    let name = ele.dataset.name ||  'switchery_' + i;
    console.log(`%cname`, 'background-color:purple', name);
    if (ele.dataset.checkboxId) {
        ele.checkbox = document.querySelector<HTMLInputElement>(
            `input[type=checkbox][id="${ele.dataset.checkboxId}"]`
        ) ?? undefined;
        console.log(`%cinput[type=checkbox][id="${ele.dataset.checkboxId}"]`, 'background-color:purple', ele.checkbox);
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
            checkboxId: ele.dataset.checkboxId,
            checkboxName: ele.dataset.checkboxName,
            name,
            checkbox: ele.checkbox,
            disabled: disabled,
            onclick: onclickHandler,
        }
    });

    console.log('%cwindow[%s]', 'background-color:brown', name, window[name]);

});
