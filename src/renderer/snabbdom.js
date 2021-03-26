const { init } = require('snabbdom/build/package/init')
const { classModule } = require('snabbdom/build/package/modules/class')
const { propsModule } = require('snabbdom/build/package/modules/props')
const { styleModule } = require('snabbdom/build/package/modules/style')
const { eventListenersModule } = require('snabbdom/build/package/modules/eventlisteners')
const { h } = require('snabbdom/build/package/h')

const patch = init([ // Init patch function with chosen modules
    classModule, // makes it easy to toggle classes
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventListenersModule, // attaches event listeners
])

module.exports = {
    h,
    patch
}