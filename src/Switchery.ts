import { mount } from 'svelte';
import Switchery from './Switchery.svelte';

export type TonChange = (event: Event, details?: Record<string, unknown>) => void;

document.querySelectorAll<HTMLElement>('switchery').forEach((ele, i) => {

    let name = ele.dataset.name ||  'switchery_' + i;
    if (ele.dataset.checkboxId) {
        ele.checkbox = document.querySelector<HTMLInputElement>(
            `input[type=checkbox][id="${ele.dataset.checkboxId}"]`
        ) ?? undefined;
    }

    let onchangeHandler: TonChange | undefined;

    try {
        const handler = ele.getAttribute('onchange');
        if (handler) {
            onchangeHandler = eval(handler);
        }
    } catch(error) {
        console.warn('Inline onclick invalid', error);
    }

    let disabled: boolean;
    try {
        disabled = ele.getAttribute('disabled') != null;
    } catch(error) {
        disabled = false;
    }

    window[name] = mount(Switchery, {
        target: ele,
        props: {
            target: ele,
            arialabelledby: ele.dataset.ariaLabelledby,
            ariadescribedby: ele.dataset.ariaDescribedby,
            checkboxId: ele.dataset.checkboxId,
            checkboxName: ele.dataset.checkboxName,
            name,
            checkbox: ele.checkbox,
            disabled: disabled,
            onchange: onchangeHandler,
        }
    });

});
