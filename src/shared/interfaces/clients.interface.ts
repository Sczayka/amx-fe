export interface Client {
    id?: string
    name: string
    email: string
    phone: string
    cellphone: string
    address: {
        street: string
        number: string
        neighborhood: string
        city: string
        state: string
        country: string
        zipcode: string
        complement?: string
    }
}