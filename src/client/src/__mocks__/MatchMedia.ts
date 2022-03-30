import mediaQuery from 'css-mediaquery'


export const createMatchMedia = (width: any) => {
    return (query: any) => ({
        matches: mediaQuery.match(query, {
            width,
        }),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })
}