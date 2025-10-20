import { FormGroup, ValidationErrors } from '@angular/forms'

export class FormUtils {
    // Expresiones regulares/
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$'

    static getTextError(errors: ValidationErrors) {
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'This field is required'

                case 'minlength':
                    return `Must be at least ${errors['minlength'].requiredLength} characters long.`

                case 'email':
                    return 'Enter a valid email address.'

                default:
                    return `Unhandled validation error: ${key} `
            }
        }

        return null
    }

    static isValidField(form: FormGroup, fieldName: string): boolean | null {
        return (
            !!form.controls[fieldName].errors &&
            form.controls[fieldName].touched
        )
    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
        if (!form.controls[fieldName]) return null

        const errors = form.controls[fieldName].errors ?? {}

        return FormUtils.getTextError(errors)
    }
}
