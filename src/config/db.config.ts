import mongoose from 'mongoose'
import { envVars } from './envVars.config'
import logger from './logger.config'

const connectToDb = async (): Promise<void> => {
  try {
    await mongoose.connect(envVars.DATABASEURI as string)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.warn(error)
  }
}

export default connectToDb
