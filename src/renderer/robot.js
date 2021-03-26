const { nativeImage } = require('electron')
const robot = require('robotjs')

/// Screen
function captureToPNG(x, y, width, height) {
    const bitmap = robot.captureScreen()
    return nativeImage.createFromBuffer(Buffer.from(bitmap.image), { width: bitmap.width, height: bitmap.height }).toDataURL()
}

/// Mouse
function moveMouseTo(x, y) {
    robot.moveMouse(x, y)
}

function leftMouseDown() {
    robot.mouseToggle('down', 'left')
}

function leftMouseUp() {
    robot.mouseToggle('up', 'left')
}

function leftMouseClick() {
    robot.mouseClick('left')
}

function rightMouseClick() {
    robot.mouseClick('right')
}

function rightMouseDown() {
    robot.mouseToggle('down', 'right')
}

function dragMouse(origin, target) {
    robot.moveMouse(origin.x, origin.y)
    robot.mouseToggle('down')
    robot.moveMouse(target.x, target.y)
    robot.mouseToggle('up')
}

function getMousePos() {
    return robot.getMousePos()
}

function scrollMouse(x, y) {
    robot.scrollMouse(x, y)
}

/// Keyboard
function pressKey(key, modifiers) {
    robot.keyTap(key, modifiers)
}

function typeString(text) {
    robot.typeString(text)
}

global.captureToPNG = captureToPNG

module.exports = {
    captureToPNG,
    moveMouseTo,
    leftMouseDown,
    leftMouseUp,
    leftMouseClick,
    rightMouseClick,
    rightMouseDown,
    dragMouse,
    getMousePos,
    scrollMouse,
    pressKey,
    typeString
}