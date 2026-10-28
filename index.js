/**
 * Host half of the plugin-manager bundle.
 *
 * The UI is the Client module (`client.js`); data and mutations come from the
 * existing `pluginManager` Host service through its generated `@Remote`
 * entry points, so this half has no registrations of its own.
 */
export function apply() {}
