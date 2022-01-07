import { Context } from "@nuxt/types";
import loglevel from "loglevel";
import { format } from 'util';

export default (context: Context) => {
    switch (context.$config.enviroment) {
        case 'production':
            loglevel.setLevel('info')
            break
        default:
            loglevel.setLevel('trace')
    }
    console.log = (message?: any, ...optionalParams: any[]) => {
        if (Array.isArray(optionalParams) && optionalParams.length > 0) {
            loglevel.log(format(message, optionalParams))
        } else {
            loglevel.log(message)
        }
    }
    console.trace = (message?: any, ...optionalParams: any[]) => {
        if (Array.isArray(optionalParams) && optionalParams.length > 0) {
            loglevel.trace(format(message, optionalParams))
        } else {
            loglevel.trace(message)
        }
    }
    console.debug = (message?: any, ...optionalParams: any[]) => {
        if (Array.isArray(optionalParams) && optionalParams.length > 0) {
            loglevel.debug(format(message, optionalParams))
        } else {
            loglevel.debug(message)
        }
    }
    console.info = (message?: any, ...optionalParams: any[]) => {
        if (Array.isArray(optionalParams) && optionalParams.length > 0) {
            loglevel.info(format(message, optionalParams))
        } else {
            loglevel.info(message)
        }
    }
    console.warn = (message?: any, ...optionalParams: any[]) => {
        if (Array.isArray(optionalParams) && optionalParams.length > 0) {
            loglevel.warn(format(message, optionalParams))
        } else {
            loglevel.warn(message)
        }
    }
    console.error = (message?: any, ...optionalParams: any[]) => {
        if (Array.isArray(optionalParams) && optionalParams.length > 0) {
            loglevel.error(format(message, optionalParams))
        } else {
            loglevel.error(message)
        }
    }
}