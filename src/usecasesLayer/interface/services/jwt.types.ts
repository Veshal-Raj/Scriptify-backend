export interface Ijwt {
    createJWt(userId: number, email: string, role: string, name: string): string
}