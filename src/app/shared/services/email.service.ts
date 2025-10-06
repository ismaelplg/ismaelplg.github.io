import { Injectable } from '@angular/core'
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'
import { from, Observable } from 'rxjs'
import { Contact } from '../interfaces/contact.interface'
import { environment } from '../../../environment/environment'

@Injectable({ providedIn: 'root' })
export class EmailService {
    private serviceId = environment.emailjs.serviceId
    private templateId = environment.emailjs.templateId
    private publicKey = environment.emailjs.publicKey

    constructor() {
        emailjs.init(this.publicKey)
    }

    sendContactForm(formData: Contact): Observable<EmailJSResponseStatus> {
        const payload = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
        }
        return from(emailjs.send(this.serviceId, this.templateId, payload))
    }
}
