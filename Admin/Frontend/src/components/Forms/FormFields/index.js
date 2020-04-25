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