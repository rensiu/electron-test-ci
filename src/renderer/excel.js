const xlsx = require('xlsx')
const { remote } = require('electron')
const fs = require('fs')
const path = require('path')

const workspacePath = remote.app.getPath('userData')

export const PRODUCT = '产品'
export const TITLE = '发票抬头'
export const TAXPAYER_ID = '纳税人识别号'
export const MONEY = '金额_1'

function excelToJson(filePath) {
    const workbook = xlsx.readFile(filePath)

    const sheetName = Object.entries(workbook.Sheets)[0][0]
    const sheetJSON = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])

    const sheet = []

    sheetJSON.forEach(item => {
        sheet.push({
            [PRODUCT]: item[PRODUCT],
            [TITLE]: item[TITLE],
            [TAXPAYER_ID]: item[TAXPAYER_ID],
            [MONEY]: item[MONEY]
        })
    })
    return sheet
}

async function importExcelFile(callback) {
    const { canceled, filePaths } = await remote.dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {
                name: 'Taxpayer Excel Info',
                extensions: ['xlsx']
            },
        ]
    })
    if (canceled) return

    callback && callback(excelToJson(filePaths[0]))
}

async function importJsonFile(callback) {
    const { canceled, filePaths } = await remote.dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {
                name: 'Taxpayer JSON Info',
                extensions: ['json']
            },
        ]
    })
    if (canceled || filePaths.length === 0) return
    callback && callback(JSON.parse(fs.readFileSync(filePaths[0])))
}

function saveTaxInfo(taxInfo) {
    const taxInfoPath = path.join(workspacePath, 'taxInfo.json')
    fs.writeFileSync(taxInfoPath, JSON.stringify(taxInfo))
}

function readTaxInfo(callback) {
    let taxInfo = []
    const taxInfoPath = path.join(workspacePath, 'taxInfo.json')
    if (fs.existsSync(taxInfoPath)) {
        taxInfo = JSON.parse(fs.readFileSync(taxInfoPath))
    }
    callback && callback(taxInfo)
    return taxInfo
}

export {
    excelToJson,
    importExcelFile,
    importJsonFile,
    saveTaxInfo,
    readTaxInfo
}