import React from 'react';
import Modal from 'react-foundation-modal';
import { AddEntry } from '../../Databases/AddEntry';
import { EditEntry } from '../../Databases/EditEntry';
import * as FormFields from '../../Forms/FormFields';

export const ModalForm = ({tableSource, openAddModal, openEditModal, closeAddModal, closeEditModal}) => {

/** @constant
 * @type {object} revealStyle - css style of the modal
 */
    const revealStyle = {
        'backgroundColor': 'rgba(12, 24, 83, 0.62)'
    };

    var formFields = [];

    switch (tableSource) {
        case "Users":
            if(openAddModal) {
                formFields = FormFields.userInitialFields;
            }
            if(openEditModal) {
                formFields = FormFields.userInitialFields;
            }   

        break;

        case "User Features":
            if(openAddModal) {
                formFields = FormFields.userFeaturesAddInitialFormFields;
            }
            if(openEditModal) {
                formFields = FormFields.userFeaturesAddInitialFormFields;
            }
        break;

        case "Skin Tones":
            if(openAddModal) {
                formFields = FormFields.skinTonesAddInitialFormFields;
            }
            if(openEditModal) {
                formFields = FormFields.skinTonesAddInitialFormFields;
            }
        break;

        case "Hair Lengths":
            if(openAddModal) {
                formFields = FormFields.hairLengthsAddInitialFormFields;
            }
            if(openEditModal) {
                formFields = FormFields.hairLengthsAddInitialFormFields;
            }
        break;        

        case "Face Shapes":
            if(openAddModal) {
                formFields = FormFields.faceShapesAddInitialFormFields;
            }
            if(openEditModal) {
                formFields = FormFields.faceShapesEditInitialFormFields;
            }
        break;
        default:
            formFields = null;
            

    }



    return (
        <div>


            <Modal
                open={openAddModal}
                closeModal={closeAddModal}
                isModal={true}
                size="full"
                revealStyle={revealStyle}
                >
                    <AddEntry
                        title={tableSource}
                        initialFormFields={formFields}
                        close={closeAddModal}
                    />
            </Modal>




            <Modal
                open={openEditModal}
                closeModal={closeEditModal}
                isModal={true}
                size="full"
                revealStyle={revealStyle}
                >
                    <EditEntry
                        tableSource={tableSource} //users, userFeatures, faceShapes, etc...
                        title={tableSource}
                        initialFormFields={formFields}
                        close={closeEditModal}
                    />
            </Modal>




        </div>
    );
}