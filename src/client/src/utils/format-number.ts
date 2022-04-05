export const formatRentValue = (rent: number | string) => {
    const myVal = rent.toString().replace(/,/g, '')

    return new Intl.NumberFormat().format(Number(myVal))
}
