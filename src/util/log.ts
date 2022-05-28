import logger from 'electron-log'
import { app } from 'electron'

logger.transports.file.level = 'debug'
logger.transports.file.maxSize = 1002430 // 10M
logger.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}'
const date = new Date()
const d:string = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
logger.transports.file.file = app.getPath('userData') + '\\electron_log\\app\\' + d + '.log'

export default {
  info (param:string | number) {
    logger.info(param)
  },
  warn (param:string | number) {
    logger.warn(param)
  },
  error (param:string | number) {
    logger.error(param)
  },
  debug (param:string | number) {
    logger.debug(param)
  },
  verbose (param:string | number) {
    logger.verbose(param)
  },
  silly (param:string | number) {
    logger.silly(param)
  }
}
