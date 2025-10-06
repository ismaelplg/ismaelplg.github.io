import { FormGroup, ValidationErrors } from '@angular/forms'

export class FormUtils {
    // Expresiones regulares/
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$'

    static getTextError(errors: ValidationErrors) {
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido'

                case 'minlength':
                    return `Mínimo de ${errors['minlength'].requiredLength} carácteres.`

                case 'email':
                    return 'Ingresa un correo válido'

                default:
                    return `Error de validación no controlado ${key}`
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
