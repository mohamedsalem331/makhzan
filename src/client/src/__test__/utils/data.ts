
//-----------------------------------------------------------
// Some mock data for testing both warehouse and user model
//-----------------------------------------------------------

export const warehouses = [
    {
        id: '202a085b-4c55-4d7e-9cc1-f2169730256d',
        title: 'Warehouse 1500 SQM licensed Food & Beverage',
        description:
            'Warehouse for Rent in New Cairo Alf Masnaa Area.Space Area: 1500 SQM.Hangar Height 10.5 M Rent Rate: EGP250,000 Monthly.Newly Renovated Fully finished',
        size: 1500,
        rent: 150000,
        governorate: 'Cairo',
        location: '6 October City',
        street: '112',
        services: ['Power', 'RFID', 'Networked', 'Thermostat', 'Alarm', 'Bathroom'],
        images: ['https://res.cloudinary.com/makhzan/image/upload/v1643349711/cld-sample.jpg'],
        UserId: '1c023ede-c424-45e6-bae0-0c61b0d2a2d1',
        createdAt: '2022-03-10T15:47:20.559Z',
        updatedAt: '2022-03-10T15:47:20.559Z',
    },
    {
        id: '4c1ada9d-f622-4188-a042-18984dd2bfe0',
        title: 'Amazing warehouse with 5 floors',
        description: 'Warehouse for Rent in New Cairod',
        size: 2000,
        rent: 200000,
        governorate: 'Giza',
        location: 'Dokki',
        street: '105 street',
        services: ['thermostat', 'forklift', 'alarm'],
        images: ['https://res.cloudinary.com/makhzan/image/upload/v1643349711/cld-sample.jpg'],
        UserId: 'cc5f307d-654d-4d60-91eb-5da96990fa29',
        createdAt: '2022-03-10T15:47:20.559Z',
        updatedAt: '2022-03-10T15:47:20.559Z',
    },
]

export const users = [
    {
        id: "c23bd2d9-7400-48f3-936a-caa169ebfd62",
        name: "Admin User",
        email: "admin1@example.com",
        phoneNumber: "412354345",
        createdAt: "2022-01-30T07:49:59.878Z",
    },
    {
        id: "c5187fe8-4c93-469c-ab65-a252e60504c2",
        name: "fds User",
        email: "admin3@example.com",
        phoneNumber: "412354342",
        createdAt: "2022-01-30T07:49:59.878Z",
    },
]

