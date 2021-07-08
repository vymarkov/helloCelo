const Web3 = require('web3')
const fs = require('fs')
const path = require('path')
var web3 = new Web3()


const filePath = path.join(__dirname, './.secret')

function getAccount1() {
    return new Promise(resolve => {
        if (fs.existsSync(filePath)) {
            fs.readFile(filePath, { encoding: 'utf-8' }, (_err: Error, data: Buffer) => {
                resolve(web3.eth.accounts.privateKeyToAccount(data))
            })
        } else {
            let randomAccount = web3.eth.accounts.create()

            fs.writeFile(filePath, randomAccount.privateKey, (_err: Error) => {
                if (_err) {
                    return console.log(_err);
                }
            })

            resolve(randomAccount)
        }
    })
}

export const getAccount = async () => {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK)
        const data = await fs.promises.readFile(filePath, { encoding: 'utf-8' })
        return web3.eth.accounts.privateKeyToAccount(data)
    } catch (err) {
        const randomAccount = web3.eth.accounts.create()
        await fs.promises.writeFile(filePath, randomAccount.privateKey)

        return randomAccount
    }
}  
