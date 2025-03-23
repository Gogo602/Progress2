import fs from 'fs'
import os from 'os'
import EventEmitter from 'events'



class Logger extends EventEmitter {
    log(message) {
        this.emit('message', {message})
    }
}

const logger = new Logger()
const logFile = './eventlog.txt' //creating and writing to this file

const logToFIle = (event) => {
    const logMessage = `${new Date().toISOString()} - ${event.message} \n`
    fs.appendFileSync(logFile, logMessage)
}

logger.on('message', logToFIle)

setInterval(() => {
    const memoryUsage = (os.freemem() / os.totalmem()) * 100
    logger.log(`current memory usage: ${memoryUsage.toFixed(2)}`)
}, 3000)

logger.log('Application Started')
logger.log('Application even occured')