import user from '../../../img/icons/user.svg';
import mail from '../../../img/icons/mail.svg';
import password from '../../../img/icons/password.svg';
//import password from '../../../img/icons/password.svg';

export const userInitialFields = [
    {
        label: 'User Name',
        input: '',
        icon: user,
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
            },
            {
                error: false,
                errorMessage: 'Spaces are not allowed in this field',
                check: (input) => {
                    return /\s/g.test(input.trim());
                }
            },
            {
                error: false,
                errorMessage: 'Maximum 32 characters allowed',
                check: (input) => {
                    return input.length > 32;
                }
            }
        ]
    },
    {
        label: 'User Email',
        input: '',
        icon: mail,
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
            },
            {
                error: false,
                errorMessage: 'Spaces are not allowed in this field',
                check: (input) => {
                    return /\s/g.test(input.trim());
                }
            },
            {
                error: false,
                errorMessage: 'Maximum 512 characters allowed',
                check: (input) => {
                    return input.length > 512;
                }
            }
        ]
    },
    {
        label: 'User Password',
        input: '',
        icon: password,
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
            },
            {
                error: false,
                errorMessage: 'Spaces are not allowed in this field',
                check: (input) => {
                    return /\s/g.test(input.trim());
                }
            },
            {
                error: false,
                errorMessage: 'Minimum 6 characters required',
                check: (input) => {
                    return input.length < 6;
                }
            },
            {
                error: false,
                errorMessage: 'Maximum 512 characters allowed',
                check: (input) => {
                    return input.length > 512;
                }
            }
        ]
    },
    {
        label: 'First Name',
        input: '',
        icon: user,
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
            },
            {
                error: false,
                errorMessage: 'Maximum 128 characters allowed',
                check: (input) => {
                    return input.length > 128;
                }
            }
        ]
    },
    {
        label: 'Last Name',
        input: '',
        icon: user,
        type: 'text',
        touched: false,
        required: false,
        validation: [
            {
                error: false,
                errorMessage: 'Maximum 128 characters allowed',
                check: (input) => {
                    return input.length > 128;
                }
            }
        ]
    },
    {
        label: 'User Role',
        input: '',
        icon: user,
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
]

export const userEditInitialFields = [
    {
        label: 'User Name',
        input: '',
        icon: user,
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
        icon: mail,
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
        icon: password,
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
        icon: user,
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
        icon: user,
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
        icon: user,
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

