import React from 'react';
//import Modal from 'react-foundation-modal';
import { AddEntry } from '../../Databases/AddEntry';
import { EditEntry } from '../../Databases/EditEntry';
import * as FormFields from '../../Forms/FormFields';
import { PortalWrapper } from '../../Modal/PortalWrapper';
import { Modal } from '../../Modal';


import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../../_actions';
import { resourceNames } from '../../../_constants';

export const ModalForm = ({tableSource, openAddModal, openEditModal, closeAddModal, closeEditModal, editObject}) => {

    const dispatch = useDispatch();

/** @constant
 * @type {object} revealStyle - css style of the modal
 */
    const revealStyle = {
        'backgroundColor': 'rgba(12, 24, 83, 0.62)'
    };

    var formFields = [];
    console.log("openAddmodal", openAddModal); //debug
    console.log("openEditmodal", openEditModal); //debug

    switch (tableSource) {
        case "Users":
            if(openAddModal) {
                formFields = FormFields.userInitialFields;
            }
            if(openEditModal) {
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
            if(openAddModal) {
                formFields = FormFields.userFeaturesAddInitialFormFields;
            }
            if(openEditModal) {
                formFields = FormFields.userFeaturesAddInitialFormFields;
                formFields[0].input = editObject.userId
                formFields[1].input = editObject.faceShapeId
                formFields[2].input = editObject.skinToneId
                formFields[3].input = editObject.hairStyleId
                formFields[4].input = editObject.hairLengthId
            }
        break;

        case "Skin Tones":
            if(openAddModal) {
                formFields = FormFields.skinTonesAddInitialFormFields;
            }
            if(openEditModal) {
                formFields = FormFields.skinTonesAddInitialFormFields;
                formFields[0].input = editObject.skinToneName
            }
        break;

        case "Hair Lengths":
            if(openAddModal) {
                formFields = FormFields.hairLengthsAddInitialFormFields;
            }
            if(openEditModal) {
                formFields = FormFields.hairLengthsAddInitialFormFields;
                formFields[0].input = editObject.hairLengthName
            }
        break;        

        case "Face Shapes":
            if(openAddModal) {
                formFields = FormFields.faceShapesAddInitialFormFields;
            }
            if(openEditModal) {
                formFields = FormFields.faceShapesEditInitialFormFields;
                formFields[0].input = editObject.shapeName
            }
        break;
        default:
            formFields = null;
            

    }



    return (
        <div>
            <PortalWrapper>
                {openAddModal ?
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
                        onClick={() => {closeAddModal(false); /*dispatch(resourceActions.getAll(resourceNames.USERS));*/ /*window.location.reload(false);*/}}
                    >
                        X
                    </button>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {console.log("table source", tableSource)}
                        {console.log("ffields", formFields)}
                    <AddEntry
                        title={tableSource}
                        initialFormFields={formFields}
                        close={closeAddModal}
                    />
                    </div>
                </div>
                </Modal>
                :
                null
                }
                
            </PortalWrapper>

            <PortalWrapper>
                {openEditModal?
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}></div>
                    <EditEntry
                        tableSource={tableSource} //users, userFeatures, faceShapes, etc...
                        title={tableSource}
                        initialFormFields={formFields}
                        close={closeEditModal}
                        editObject={editObject}
                    />
                    </div>
                </Modal>
                :
                null
                }
            </PortalWrapper>
        </div>
    );
}