const { h, patch } = require('./snabbdom')
const { MONEY, TAXPAYER_ID, PRODUCT, TITLE, importExcelFile, importJsonFile, saveTaxInfo, readTaxInfo } = require('./excel')
const { newClickOp, newTypeOp, newSleepOp, readOps, saveOps, removeOp, execOps, newKeyOp, execKeyOp } = require('./ops')
const { remote } = require('electron')

require('./style')

let ops = readOps()
let status = ''
let taxInfo = []

function resetData() {
    ops = []
    status = ''
    render()
}

const appContainer = document.getElementById('app')
let vnode = patch(appContainer, view())

function opView(op) {
    return h('div.row', {}, [
        h('div', { style: { fontWeight: 'bold' } }, ops.indexOf(op)),
        h('div', op.type === 'click' ? `(${op.position.x},${op.position.y})` : op.type === 'input' ? ops.filter(m => m.type === 'input').indexOf(op) : 'sleep 3s'),
        h('div.btn.rm-btn', { on: { click: () => { removeOp(ops, op, callback) } } }, 'x'),
    ])
}

function companyView() {
    return taxInfo.map(tax => {
        return h('tr', {
            style: {
                background: tax.done ? 'red' : tax.isFilled ? 'blue' : 'white'
            }
        }, [
            h('td', {}, tax[PRODUCT]),
            h('td', {}, tax[MONEY]),
            h('td', {}, tax[TITLE]),
            h('td', {}, tax[TAXPAYER_ID]),
            h('td', {}, [
                h('button', {
                    on: {
                        click: () => {
                            if (tax.done) return
                            execOps(ops, [tax[TITLE], tax[TAXPAYER_ID], tax[PRODUCT], tax[TITLE]])
                            tax.isFilled = true
                            render()
                        }
                    },
                    style: {
                        background: 'blue',
                        color: 'white'
                    }
                }, '填发票'),
                h('button', {
                    on: {
                        click: () => {
                            if (tax.done) return
                            execKeyOp(ops)
                            tax.done = true
                            render()
                        }
                    },
                    style: {
                        background: 'red',
                        color: 'white'
                    }
                }, tax.done ? '已开' : '开发票'),
            ]),
        ])
    })

}

function render() {
    vnode = patch(vnode, view())
}

function view() {
    return h('div', {}, [
        h('h1', 'Happy Hour'),
        h('button', {
            on: {
                click: () => {
                    remote.shell.openPath(remote.app.getPath('userData'))
                }
            }
        }, 'Open Workspace'),
        h('button', {
            on: {
                click: () => {
                    importExcelFile((result) => {
                        resetData()
                        taxInfo = result
                        render()
                    })
                }
            }
        }, 'import excel'),
        h('button', {
            on: {
                click: () => {
                    importJsonFile((result) => {
                        resetData()
                        taxInfo = result
                        render()
                    })
                }
            }
        }, 'import json'),
        h('button', {
            on: {
                click: () => {
                    saveTaxInfo(taxInfo)
                }
            }
        }, 'Save taxpayer info'),
        h('button', {
            on: {
                click: () => {
                    readTaxInfo((result) => {
                        taxInfo = result
                        render()
                    })
                }
            }
        }, 'Read taxpayer info'),
        h('button', {
            on: {
                click: () => {
                    taxInfo = []
                    render()
                }
            }
        }, 'Clear taxpayer info'),
        h('button', {
            on: {
                click: () => {
                    taxInfo = taxInfo.filter(tax => !tax.done)
                    render()
                }
            }
        }, 'Remove done taxpayer info'),
        status ? h('h2', { style: { color: 'red' } }, status) : null,

        /// Available Ops
        h('div', {}, [
            h('label', 'Available Ops: '),
            h('button', {
                on: {
                    click: () => {
                        status = '3秒内点击目标位置,点完之后不要移动鼠标'
                        newClickOp(ops, () => {
                            status = ''
                            render()
                        })
                        render()
                    }
                }
            }, 'mouse click'),
            h('button', {
                on: {
                    click: () => {
                        newTypeOp(ops, render)
                    }
                }
            }, 'type string'),
            h('button', {
                on: {
                    click: () => {
                        newSleepOp(ops, render)
                    }
                }
            }, 'Sleep'),
            h('button', {
                on: {
                    click: () => {
                        status = '3秒内点击目标位置,点完之后不要移动鼠标'
                        newKeyOp(ops, () => {
                            status = ''
                            render()
                        })
                        render()
                    }
                }
            }, 'Key Op'),
        ]),

        /// Custom Ops Flow
        h('div', {}, [
            h('label', 'Custom Ops Flow: '),
            h('button', {
                on: {
                    click: () => {
                        saveOps(ops)
                    }
                }
            }, 'Save Ops'),
            h('button', {
                on: {
                    click: () => {
                        ops = readOps()
                        render()
                    }
                }
            }, 'Read Ops'),
            h('button', {
                on: {
                    click: () => {
                        ops = []
                        render()
                    }
                }
            }, 'Clear Ops'),
            h('div.list', ops.map(opView))
        ]),

        ///
        h('table', {}, [
            h('tbody', {}, companyView())
        ])
    ])
}