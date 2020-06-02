import React from 'react';
import { AddEntry } from '../../Databases/AddEntry';
import { EditEntry } from '../../Databases/EditEntry';
import * as FormFields from '../../Forms/FormFields';
import { Modal } from '../../Modal';
import { PortalWrapper } from '../../Modal/PortalWrapper';
import user from '../../../img/icons/user.svg';
import mail from '../../../img/icons/mail.svg';
import password from '../../../img/icons/password.svg';
import { useEffect } from 'react';

export const ModalForm = ({ tableSource, openAddModal, openEditModal, closeAddModal, closeEditModal, editObject }) => {

    /** @constant
     * @type {object} revealStyle - css style of the modal
     */
    const revealStyle = {
        'backgroundColor': 'rgba(12, 24, 83, 0.62)'
    };

    var formFields = [];

    switch (tableSource) {
        case "Users":
            formFields = FormFields.userInitialFields;
            if (openEditModal) {
                formFields = FormFields.userEditInitialFields;
                formFields[0].input = editObject.userName
                formFields[1].input = editObject.userEmail
                //formFields[2].input = editObject.userPassword
                formFields[3].input = editObject.firstName
                formFields[4].input = editObject.lastName
                formFields[5].input = editObject.userRole
                console.log("formFields");
                console.dir(formFields)
            }

            break;

        case "User Features":
            formFields = FormFields.userFeaturesAddInitialFormFields;
            if (openEditModal) {
                formFields = FormFields.userFeaturesAddInitialFormFields;
                formFields[0].input = editObject.userId
                formFields[1].input = editObject.faceShapeId
                formFields[2].input = editObject.skinToneId
                formFields[3].input = editObject.hairStyleId
                formFields[4].input = editObject.hairLengthId
            }
            break;

        case "Skin Tones":
            if (openAddModal) {
                formFields = FormFields.skinTonesAddInitialFormFields;
            }
            if (openEditModal) {
                formFields = FormFields.skinTonesAddInitialFormFields;
                formFields[0].input = editObject.skinToneName
            }
            break;

        case "Hair Lengths":
            if (openAddModal) {
                formFields = FormFields.hairLengthsAddInitialFormFields;
            }
            if (openEditModal) {
                formFields = FormFields.hairLengthsAddInitialFormFields;
                formFields[0].input = editObject.hairLengthName
            }
            break;

        case "Face Shapes":
            if (openAddModal) {
                formFields = FormFields.faceShapesAddInitialFormFields;
            }
            if (openEditModal) {
                formFields = FormFields.faceShapesEditInitialFormFields;
                formFields[0].input = editObject.shapeName
            }
            break;
        default:
            formFields = null;
    }

    return (
        <>
            <PortalWrapper>
                <Modal
                    active={openAddModal}
                >
                    <div>
                        <button
                            style={{
                                position: 'absolute',
                                color: 'red',
                                fontSize: '5rem',
                                top: '10%',
                                left: '90%',
                                cursor: 'pointer'
                            }}
                            onClick={() => closeAddModal(false)}
                        >
                            X
                        </button>
                        <AddEntry
                            title={tableSource}
                            initialFormFields={formFields}
                            close={() => closeAddModal(false)}
                        />
                    </div>
                </Modal>
            </PortalWrapper>

            <PortalWrapper>
                <Modal
                    active={openEditModal}
                >
                    <div>
                        <button
                            style={{
                                position: 'absolute',
                                color: 'red',
                                fontSize: '5rem',
                                top: '10%',
                                left: '90%',
                                cursor: 'pointer'
                            }}
                            onClick={() => closeEditModal(false)}
                        >
                            X
                        </button>
                        <EditEntry
                            tableSource={tableSource} //users, userFeatures, faceShapes, etc...
                            title={tableSource}
                            initialFormFields={formFields}
                            close={closeEditModal}
                            editObject={editObject}
                        />
                    </div>
                </Modal>
            </PortalWrapper>
        </>
    );
}