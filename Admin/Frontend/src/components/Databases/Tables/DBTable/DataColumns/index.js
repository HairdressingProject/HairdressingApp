export const usersTableColumns = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'User Name',
        selector: 'userName',
        sortable: true,
    },
    {
        name: 'First Name',
        selector: 'firstName',
        sortable: true,
    },
    {
        name: 'Last Name',
        selector: 'lastName',
        sortable: true,
    },
    {
        name: 'User Email',
        selector: 'userEmail',
        sortable: true,
    },
    {
        name: 'User role',
        selector: 'userRole',
        sortable: true,
    },
]

export const userFeaturesTableColumns = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true
    },
    {
        name: 'User Id',
        selector: 'userId',
        sortable: true
    },
    {
        name: 'Faceshape Id',
        selector: 'faceShapeId',
        sortable: true
    },
    {
        name: 'Skin Tone Id',
        selector: 'skinToneId',
        sortable: true
    },
    {
        name: 'Hair Style Id',
        selector: 'hairStyleId',
        sortable: true
    },
    {
        name: 'Hair Length Id',
        selector: 'hairLengthId',
        sortable: true
    },    
]

export const skinTonesTableColumns = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true
    },
    {
        name: 'Skin Tone Name',
        selector: 'skinToneName',
        sortable: true
    },
]

export const faceShapesTableColumns = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true,
      },
      {
        name: 'Shape Name',
        selector: 'shapeName',
        sortable: true,
      },
]

export const hairLengthsTableColumns = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true,
      },
      {
        name: 'Hair Length Name',
        selector: 'hairLengthName',
        sortable: true,
      },
]