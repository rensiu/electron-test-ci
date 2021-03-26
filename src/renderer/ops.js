const robot = require('./robot')
const fs = require('fs')
const path = require('path')
const { remote } = require('electron')

const workspacePath = remote.app.getPath('userData')

function newClickOp(ops, callback) {
    setTimeout(() => {
        const position = robot.getMousePos()
        ops.push({
            type: 'click',
            desc: 'click',
            position,
        })
        callback && callback()
    }, 3000)
}

function newTypeOp(ops, callback) {
    ops.push({
        type: 'input',
        desc: 'input'
    })
    callback && callback()
}

function newKeyOp(ops, callback) {
    setTimeout(() => {
        const position = robot.getMousePos()
        ops.push({
            type: 'key',
            desc: 'keyop',
            position,
        })
        callback && callback()
    }, 3000)
}

function newSleepOp(ops, callback) {
    ops.push({
        type: 'sleep'
    })
    callback && callback()
}

function removeOp(ops, op, callback) {
    ops = ops.filter((m) => {
        return m !== op
    })
    callback && callback()
}

function saveOps(ops, callback) {
    const opsPath = path.join(workspacePath, 'ops.json')
    fs.writeFileSync(opsPath, JSON.stringify(ops))
}

function readOps() {
    let ops = []
    const opsPath = path.join(workspacePath, 'ops.json')
    if (fs.existsSync(opsPath)) {
        ops = JSON.parse(fs.readFileSync(opsPath))
    }
    return ops
}

async function execKeyOp(ops, callback) {
    ops.filter(op => op.type === 'key').forEach(keyOp => {
        const position = keyOp.position
        robot.moveMouseTo(position.x, position.y)
        robot.leftMouseClick()
    })
    callback && callback()
}

async function execOps(ops, data, callback) {
    ops = ops.filter(op => op.type !== 'key')
    const inputOps = ops.filter(op => op.type === 'input')
    if (inputOps.length !== data.length) {
        remote.dialog.showMessageBox(remote.getCurrentWindow(), {
            message: `定义的输入文本操作个数${inputOps.length}和提供的数据数目${data.length}不符`
        })
        return
    }
    for (let index = 0; index < ops.length; index++) {
        const op = ops[index]
        if (op.type === 'click') {
            const position = op.position
            robot.moveMouseTo(position.x, position.y)
            robot.leftMouseClick()
        } else if (op.type === 'input') {
            const inputIndex = inputOps.indexOf(op)
            robot.typeString(data[inputIndex])
            console.log(data[inputIndex])
        } else if (op.type === 'sleep') {
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, 3000)
            })
        }
    }
    callback && callback()
}

export {
    newClickOp,
    newTypeOp,
    newSleepOp,
    removeOp,
    execOps,
    saveOps,
    readOps,
    newKeyOp,
    execKeyOp
}