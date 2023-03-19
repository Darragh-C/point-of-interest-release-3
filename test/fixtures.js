export const serviceUrl = "http://localhost:3000";


export const johnDoe = {
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    password: "password",
    //isAdmin: true,
  };

export const janeDoe = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    password: "password",
};

export const multiTestUsers = [
{
    firstName: "Homer",
    lastName: "Simpson",
    email: "homer@simpson.com",
    password: "secret",
    //isAdmin: true,
},
{
    firstName: "Marge",
    lastName: "Simpson",
    email: "marge@simpson.com",
    password: "secret",
},
{
    firstName: "Bart",
    lastName: "Simpson",
    email: "bart@simpson.com",
    password: "secret",
},
];

export const testPin = {
    name: "Kinsale",
    category: "Public parking",
    description: "Cork seaside town",
    lattitude: "44.45",
    longitude: "55.45",
};

export const multiTestPins = [
    {
        name: "Kinsale",
        category: "Aires",
        description: "Cork seaside town",
        lattitude: "44.45",
        longitude: "55.45",
    },
    {
        name: "Cobh",
        category: "Public parking",
        description: "Cork seaside town",
        lattitude: "44.45",
        longitude: "55.45",
    },
    {
        name: "Castletownbere",
        category: "Aires",
        description: "Cork seaside town",
        lattitude: "44.45",
        longitude: "55.45",
    },
];

export const mongoGroupResponse = [
    {
        _id : "aires",
        pins : [
            {
                userid : "12345",
                name : "Kinsale",
                category : "Aires",
                description : "Cork seaside town",
                lattitude : "lattitude",
                longitute : "55.45",
            },
            {
                userid : "67890",
                name : "Castletownbere",
                category : "Aires",
                description : "Cork seaside town",
                lattitude : "lattitude",
                longitute : "55.45",
            }
        ]
    },
    {
        _id : "public parking",
        pins : [
            {
                userid : "12345",
                name : "Cobh",
                category : "Public parking",
                description : "Cork seaside town",
                lattitude : "lattitude",
                longitute : "55.45",
            }
        ]
    }
]
