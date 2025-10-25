export const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/
// Comments: alphanumeric + punctuation allowed in requirement
export const commentsRegex = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜü\s\.,'"\&@\$\*\(\)\-\;¿\?]+$/

export function formatDateToDisplay(iso: string) {
    const d = new Date(iso)
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}/${mm}/${yyyy}`
}

export function calculateAge(iso: string) {
    const today = new Date()
    const birth = new Date(iso)
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--
    }
    return age
}

export function validateName(name: string): boolean {
    return nameRegex.test(name.trim()) && name.trim().length > 0
}

export function validateComments(comments: string): boolean {
    return commentsRegex.test(comments.trim()) && comments.trim().length > 0
}

export function validateBirthDate(date: string): boolean {
    if (!date) return false
    const d = new Date(date)
    const min = new Date('1900-01-01')
    const max = new Date()
    return d >= min && d <= max
}
