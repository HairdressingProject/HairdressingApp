import React from 'react';
import Modal from 'react-foundation-modal';

import { AddEntry } from '../../Databases/AddEntry';
import { EditEntry } from '../../Databases/EditEntry';

import * as FormFields from '../../Forms/FormFields';

export const ModalForm = ({tableSource, formType, isAddModalOpen, isEditModalOpen, setAddModalOpen, setEditModalOpen}) => {


    const revealStyle = {
        'backgroundColor': 'rgba(12, 24, 83, 0.62)'
    };

    var formFields = [];

    switch (tableSource) {
        case "Users":
            if(isAddModalOpen) {
                formFields = FormFields.userInitialFields;
            }
            if(isEditModalOpen) {
                formFields = FormFields.userInitialFields;
            }   

        break;

        case "User Features":
            if(isAddModalOpen) {
                formFields = FormFields.userFeaturesAddInitialFormFields;
            }
            if(isEditModalOpen) {
                formFields = FormFields.userFeaturesAddInitialFormFields;
            }
        break;

        case "Skin Tones":
            if(isAddModalOpen) {
                formFields = FormFields.skinTonesAddInitialFormFields;
            }
            if(isEditModalOpen) {
                formFields = FormFields.skinTonesAddInitialFormFields;
            }
        break;

        case "Hair Lengths":
            if(isAddModalOpen) {
                formFields = FormFields.hairLengthsAddInitialFormFields;
            }
            if(isEditModalOpen) {
                formFields = FormFields.hairLengthsAddInitialFormFields;
            }
        break;        

        case "Face Shapes":
            if(isAddModalOpen) {
                formFields = FormFields.faceShapesAddInitialFormFields;
            }
            if(isEditModalOpen) {
                formFields = FormFields.faceShapesEditInitialFormFields;
            }
        break;
        default:
            formFields = null;
            

    }



    return (
        <div>


            <Modal
                open={isAddModalOpen}
                closeModal={setAddModalOpen}
                isModal={true}
                size="full"
                revealStyle={revealStyle}
                >
                    <AddEntry
                        //tableSource={tableSource} //users, userFeatures, faceShapes, etc...
                        title={tableSource}
                        initialFormFields={formFields}
                    />
            </Modal>




            <Modal
                open={isEditModalOpen}
                closeModal={setEditModalOpen}
                isModal={true}
                size="full"
                revealStyle={revealStyle}
                >
                    <EditEntry
                        tableSource={tableSource} //users, userFeatures, faceShapes, etc...
                        title={tableSource}
                        initialFormFields={formFields}
                    />
            </Modal>




        </div>
    );
}