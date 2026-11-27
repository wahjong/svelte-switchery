# svelte-switchery

An accessible and customisable toggle switch component made with Svelte 5.

### Configuration

The `<switchery>` element can be configured using `data-*` attributes:

- `data-name` - Sets the global access variable name. If omitted, a name such as `window['switchery1']` is assigned automatically.
- `data-aria-labelledby` - Identifies the element that labels the switch.
- `data-aria-describedby` - Identifies the element that describes the switch.
- `data-checkbox-id` - Associates the switch with an `<input type="checkbox">` by ID. If the checkbox does not exist, one is created automatically with the specified ID.
- `data-checkbox-name` - Sets the `name` attribute of the associated checkbox.
- `onchange` - Called when the switch state changes. Receives `event` and `detail`, where `detail` contains `{ checked }`.
