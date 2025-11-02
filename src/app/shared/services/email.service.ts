import { inject, Injectable } from '@angular/core'
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'
import { from, Observable } from 'rxjs'
import { Contact, ContactResponse } from '../interfaces/contact.interface'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environment/environment'

@Injectable({ providedIn: 'root' })
export class EmailService {
    private http = inject(HttpClient)

    sendContactForm(payload: Contact): Observable<ContactResponse> {
        return this.http.post<ContactResponse>(
            `${environment.apiUrl}/contact`,
            payload
        )
    }
}
