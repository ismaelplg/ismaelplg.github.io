import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms'
import { Router } from '@angular/router'
import { FormUtils } from '../../shared/utils/form.utils'
import { EmailService } from '../../shared/services/email.service'
import { CommonModule, JsonPipe } from '@angular/common'

@Component({
    selector: 'app-contact',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './contact.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
    private fb = inject(FormBuilder)
    private router = inject(Router)
    private emailService = inject(EmailService)

    status = signal<'idle' | 'loading' | 'success' | 'error'>('idle')
    errorMessage = signal<string>('')

    contactForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        message: ['', [Validators.required, Validators.minLength(15)]],
    })

    formUtils: typeof FormUtils = FormUtils

    getIconClass() {
        switch (this.status()) {
            case 'idle':
                return 'fa-solid fa-envelope text-background'
            case 'loading':
                return 'fa-solid fa-spinner fa-spin text-background'
            case 'success':
                return 'fa-solid fa-check text-background'
            case 'error':
                return 'fa-solid fa-exclamation text-background'
            default:
                return ''
        }
    }

    getButtonText() {
        switch (this.status()) {
            case 'idle':
                return 'Send message'
            case 'loading':
                return 'Sending...'
            case 'success':
                return 'Sent!'
            case 'error':
                return 'Error'
            default:
                return ''
        }
    }

    onSubmit() {
        console.log(this.contactForm.value)
        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched()

            return
        }

        const payload = { ...this.contactForm.value }
        console.log(payload)

        this.status.set('loading')

        this.emailService.sendContactForm(payload).subscribe({
            next: (resp) => {
                if (!resp.status) {
                    this.status.set('error')
                    this.errorMessage.set('Hubo un error al enviar')
                    return
                }
                this.status.set('success')
                console.log(this.status())
            },
            error: (err) => {
                this.status.set('error')
                this.errorMessage.set(
                    `Hubo un error al enviar, intente de nuevo`
                )
                setTimeout(() => this.status.set('idle'), 2500)
            },
            complete: () => {
                this.contactForm.reset()
                setTimeout(() => {
                    this.status.set('idle')
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                }, 1500)
            },
        })
    }
}
