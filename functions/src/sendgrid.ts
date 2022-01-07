import client from '@sendgrid/client'
import mail from '@sendgrid/mail'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || 'SG.sendgrid'
const SENDGRID_API_BASE_URL = process.env.SENDGRID_API_BASE_URL

export class SendGridClient {

    constructor() {
        client.setApiKey(SENDGRID_API_KEY)
        client.setDefaultRequest('baseUrl', SENDGRID_API_BASE_URL)
        mail.setClient(client)
    }

    sendText(message: { to: string, from: string, subject: string, text: string }) {
        return mail.send(message).catch(error => console.error(error))
    }

    sendHtml(message: { to: string, from: string, subject: string, html: string }) {
        return mail.send(message).catch(error => console.error(error))
    }
}
