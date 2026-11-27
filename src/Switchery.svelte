<script module lang="ts">
import type { TonChange } from './Switchery';

type Props = {
    arialabelledby?: string;
    ariadescribedby?: string;
    checkbox?: HTMLInputElement;
    checked: boolean;
    disabled: boolean;
    checkboxId?: string;
    checkboxName?: string;
    name?: string;
    target: HTMLElement;
    onchange?: TonChange;
    setPosition: (clicked: boolean) => void;
}
</script>

<script lang="ts">
import { onMount } from 'svelte';
import { Transitionize as transitionize } from './transitionize.js';

let {
    arialabelledby,
    ariadescribedby,
    checkbox,
    checked = false,
    disabled = false,
    checkboxId,
    checkboxName,
    name,
    target,
    onchange,
    setPosition,
}: Props = $props();

let switcher = $state<HTMLElement>();
let jack = $state<HTMLElement>();
let defaults = {
    color             : '#0061e0',
    secondaryColor    : '#e5e7eb',
    jackColor         : '#fff',
    jackSecondaryColor: null,
    disabled          : false,
    disabledOpacity   : 0.5,
    speed             : '0.4s'
};

function colorize() {

    if (!switcher) return;

    let switcherHeight = switcher.offsetHeight / 2;
    switcher.style.boxShadow = 'inset 0 0 0 ' + switcherHeight + 'px ' + defaults.color;
}

function setSpeed() {

    let switcherProp = {};
    let jackProp = {
        'left': (Number(defaults.speed.replace(/[a-z]/, '')) / 2) + 's'
    };

    if (checked) {
        switcherProp = {
            'border': defaults.speed,
            'box-shadow': defaults.speed,
        };

    } else {
        switcherProp = {
            'border': defaults.speed,
            'box-shadow': defaults.speed
        };
    }

    transitionize(switcher!, switcherProp);
    transitionize(jack!, jackProp);
}

setPosition = (clicked: boolean) => {

    checked = clicked;

    checkbox!.checked = clicked;

    if (!jack || !switcher) return;

    if (checked === true) {

        const getstyle = window.getComputedStyle || getComputedStyle;

        jack.style.left = parseInt(getstyle(switcher).width) - parseInt(getstyle(jack).width) - 1 + 'px';

        if (defaults.color) colorize();

    } else {
        jack.style.left = '1px';
        switcher.style.boxShadow = 'inset 0 0 0 0 ' + defaults.secondaryColor;
    }

    setSpeed();
}

onMount(() => {

    if (!switcher) return;

    if (!checkbox) {
        checkbox = document.createElement('INPUT') as HTMLInputElement;
        checkbox.type = 'checkbox';

        if (checkboxId)
            checkbox.id = checkboxId;
    }

    if (!checkbox.name && checkboxName)
        checkbox.name = checkboxName;

    if (!checkbox.getAttribute('aria-labelledby') && arialabelledby)
        checkbox.setAttribute('aria-labelledby', arialabelledby);
    if (!checkbox.getAttribute('aria-describedby') && ariadescribedby)
        checkbox.setAttribute('aria-describedby', ariadescribedby);

    checkbox.addEventListener('click', event => {
        // prevent checkbox click bubble up again
        event.stopPropagation();

        const target = event.target as HTMLInputElement;

        if (target) {
            setTimeout(() => {
                target.focus(); // force reader pronounce
            });
        }
    });

    checkbox.disabled = disabled;
    checkbox.className = 'sr-only';

    setPosition(checkbox.checked || checked);

    checkbox.addEventListener('change', (event) => {

        const checked = (event.target as HTMLInputElement)!.checked;

        setPosition(checked);

        if (onchange) {
            onchange(event, {checked});
        }
    });

    switcher.insertBefore(checkbox, switcher.firstChild);

    return () => {
    };
})

</script>

<span
    class="switchery switchery-default"
    bind:this={switcher}
    onclick={(event) => {

        if (disabled) return;

        if (checkbox) {
            checkbox.click();
        }
    }}
>
    <small bind:this={jack} aria-hidden="true"></small>
</span>

<style type="text/scss">
</style>
