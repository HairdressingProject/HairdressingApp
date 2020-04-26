export const userInitialFields = [
    {
        label: 'User Name',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        validation: [
            {
                error: false,
                errorMessage: 'This field is required',
                check: (input) => {
                    return !input || !input.trim();
                }
            }
        ]
    },
    {
        label: 'User Email',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        // validation: [
        //     {
        //         error: false,
        //         errorMessage: 'This field is required',
        //         check: (input) => {
        //             return !input || !input.trim();
        //         }
        //     }
        //]
    },
    {
        label: 'User Password',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        // validation: [
        //     {
        //         error: false,
        //         errorMessage: 'This field is required',
        //         check: (input) => {
        //             return !input || !input.trim();
        //         }
        //     }
        //]
    },
    {
        label: 'First Name',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        // validation: [
        //     {
        //         error: false,
        //         errorMessage: 'This field is required',
        //         check: (input) => {
        //             return !input || !input.trim();
        //         }
        //     }
        //]
    },
    {
        label: 'Last Name',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        // validation: [
        //     {
        //         error: false,
        //         errorMessage: 'This field is required',
        //         check: (input) => {
        //             return !input || !input.trim();
        //         }
        //     }
        //]
    },
    {
        label: 'User Role',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        // validation: [
        //     {
        //         error: false,
        //         errorMessage: 'This field is required',
        //         check: (input) => {
        //             return !input || !input.trim();
        //         }
        //     }
        //]
    },
]


export const faceShapesAddInitialFormFields =[
    {
        label: 'Face Shape Name',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        validation: [
            {
                error: false,
                errorMessage: 'This field is required',
                check: (input) => {
                    return !input || !input.trim();
                }
            }
        ]
    },
];

export const faceShapesEditInitialFormFields = [
    {
        label: 'Id',
        input: '',
        type: 'text',
        touched: false,
    },
    {
        label: 'Face Shape Name',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        validation: [
            {
                error: false,
                errorMessage: 'This field is required',
                check: (input) => {
                    return !input || !input.trim();
                }
            }
        ]
    },
];

export const userFeaturesAddInitialFormFields = [
    {
        label: 'Id',
        input: '',
        type: 'text',
        touched: false
    },
    {
        label: 'User Id',
        input: '',
        type: 'text',
        touched: false
    },
    {
        label: 'FaceShape Id',
        input: '',
        type: 'text',
        touched: false
    },
    {
        label: 'Skin Tone Id',
        input: '',
        type: 'text',
        touched: false
    },
    {
        label: 'Hair Style Id',
        input: '',
        type: 'text',
        touched: false
    },
    {
        label: 'Hair Length Id',
        input: '',
        type: 'text',
        touched: false
    }

];

export const skinTonesAddInitialFormFields = [
    {
        label: 'Skin Tone Name',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        validation: [
            {
                error: false,
                errorMessage: 'This field is required',
                check: (input) => {
                    return !input || !input.trim();
                }
            }
        ]
    },
];

export const skinTonesEditInitialFormFields = [
    {
        label: 'Id',
        input: '',
        type: 'text',
        touched: false,
    },
    {
        label: 'Skin Tone Name',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        validation: [
            {
                error: false,
                errorMessage: 'This field is required',
                check: (input) => {
                    return !input || !input.trim();
                }
            }
        ]
    },
];

export const hairLengthsAddInitialFormFields = [
    {
        label: 'Hair Length Name',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        validation: [
            {
                error: false,
                errorMessage: 'This field is required',
                check: (input) => {
                    return !input || !input.trim();
                }
            }
        ]
    },
];


export const hairLengthsEditInitialFormFields = [
    {
        label: 'Id',
        input: '',
        type: 'text',
        touched: false,
    },
    {
        label: 'Hair Length Name',
        input: '',
        type: 'text',
        touched: false,
        required: true,
        validation: [
            {
                error: false,
                errorMessage: 'This field is required',
                check: (input) => {
                    return !input || !input.trim();
                }
            }
        ]
    },
];

