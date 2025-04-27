export interface JobSite
{
    id: number,
    name: string
}

export interface Order
{
    jobSite: JobSite,
    productAmount: ProductAmount,
    totalPrice: number
}

export interface NewOrder
{
    IdManager:number,
    Order:Order
}

export interface ProductAmount
{
    product: Product,
    amount: number
}

export interface Product
{
    id: number,
    name: string,
    price: number
}

export interface Manager
{
    id: number,
    name: string,
    password: number,
    jobSites: JobSite[],
    orders: Order[]
}

export interface LoginArguments
{
    Name: string,
    Password: number
}

export interface TableInformetion
{
    id: number,
    name: string,
    price: number,
    amount: number,
}

