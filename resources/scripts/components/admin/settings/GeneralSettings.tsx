import React from 'react';
import { Form, Formik } from 'formik';
import Select from '@/components/elements/Select';
import Box from '@/components/admin/elements/Box';
import Input from '@/components/admin/elements/Input';
import Field, { FieldRow } from '@/components/elements/Field';
import { faToolbox, faUserTag } from '@fortawesome/free-solid-svg-icons';

export default () => {
    const submit = () => {
        //
    };

    return (
        <Box title={'General Configuration'} icon={faToolbox}>
            <Formik onSubmit={submit} initialValues={{}}>
                <Form>
                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'}>
                        <Input title={'Branding'} icon={faUserTag}>
                            <FieldRow>
                                <Field
                                    id={'appName'}
                                    name={'appName'}
                                    type={'text'}
                                    label={'App Name'}
                                    description={'The name of this Panel which is used in emails.'}
                                />
                                <Field
                                    id={'appTheme'}
                                    name={'appTheme'}
                                    type={'text'}
                                    label={'App Theme'}
                                    description={"The theme of this Panel's user interface."}
                                />
                                <Field
                                    id={'appType'}
                                    name={'appType'}
                                    type={'text'}
                                    label={'App Type'}
                                    description={'Select the type of Panel deployment.'}
                                />
                            </FieldRow>
                        </Input>
                    </div>
                </Form>
            </Formik>
        </Box>
    );
};
