import { login, platforms, Vanguard } from 'call-of-duty-api';
import fs from 'fs'

async function apiCall() {

    const ssoToken = 'NDE0NDA3ODU5NDYzNDU0NzE1MToxNjQ5MzM4NDMwMzgyOmM4NmFmZDI2YjI0YjU2N2UwNDJiMWM4Zjk1NzU1Mzdl'
    const gamerTag = 'Sievert#5226134'
    const platform = platforms.Activision

    try {
        await login(ssoToken)
        let data = await Vanguard.fullData(gamerTag, platform)
        const formatData = JSON.stringify(data)
        fs.writeFile('viewer.json', formatData, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('JSON data is saved.')
            }
        })
    } catch (error) {
        console.log(error);
    }
}

apiCall();