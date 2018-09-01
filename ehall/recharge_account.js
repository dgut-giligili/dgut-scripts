'use secret'

window.selector = '[data-reactroot] > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body > div'
for (const key in document.querySelector(window.selector)) { key.startsWith("__reactInternalInstance$") ? window.comp = document.querySelector(window.selector)[key]._currentElement._owner._instance : void 0 }
window.data = window.comp.state.data
window.data[2].type_extend.type_extend.unshift({ ...window.data[2].type_extend.type_extend[0], index: window.data[2].type_extend.type_extend.length, value: 5 })
window.comp.setState({ data: window.data })
