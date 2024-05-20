import 'dotenv/config'
import {get} from 'env-var'

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PATH_SERVER: get('PATH_SERVER').required().asString(),
    DIRECTORIO: get('DIRECTORIO').required().asString()
}