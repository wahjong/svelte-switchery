<script lang="ts">
import { onMount } from 'svelte';
import { Transitionize as transitionize } from './transitionize.js';

type Props = {
    checkbox?: HTMLInputElement;
    checked: boolean;
    disabled: boolean;
    checkboxId?: string;
    checkboxName?: string;
    name?: string;
    target: HTMLElement;
    onclick: (event: Event, details?: Record<string, unknown>) => void;
    setPosition: (clicked: boolean) => void;
}

let {
    checkbox,
    checked = false,
    disabled = false,
    checkboxId,
    checkboxName,
    name,
    target,
    onclick,
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
    console.log('%cSwitchery.colorize', 'background-color:green');

    if (!switcher) return;

    let switcherHeight = switcher.offsetHeight / 2;
    switcher.style.boxShadow = 'inset 0 0 0 ' + switcherHeight + 'px ' + defaults.color;
}

function setSpeed() {
    console.log('%cSwitchery.setSpeed', 'background-color:green');

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
    console.log('%cSwitchery.setPosition', 'background-color:green', clicked);

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
    console.log('%cSwitchery.onMount', 'background-color:green');

    if (!switcher) return;

    if (!checkbox) {
        checkbox = document.createElement('INPUT') as HTMLInputElement;
        checkbox.type = 'checkbox';

        if (checkboxId)
            checkbox.id = checkboxId;
    }

    if (!checkbox.name && checkboxName)
        checkbox.name = checkboxName;

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

    console.log('%ccheckbox', 'background-color:brown', checkbox);

    setPosition(checkbox.checked || checked);

    checkbox.addEventListener('change', (event) => {
        console.log('%ccheckbox.change', 'background-color:green', event.target);

        const checked = (event.target as HTMLInputElement)!.checked;

        setPosition(checked);

        if (onclick) {
            onclick(event, {checked});
        }
    });

    switcher.insertBefore(checkbox, switcher.firstChild);

    return () => {
    };
})

</script>

<!-- Switchery.svelte -->
<!-- id: {id}, -->
<!-- checked: {checked}, -->
<!-- disabled: {disabled}, -->
<!-- onclick: {onclick}, -->
<span
    class="switchery switchery-default"
    bind:this={switcher}
    onclick={(event) => {
        console.log('%cSwitchery.onclick', 'background-color:green', checkbox, event);

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
