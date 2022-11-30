import { Form, Formik } from 'formik';
import Label from '@/components/elements/Label';
import Select from '@/components/elements/Select';
import Box from '@/components/admin/elements/Box';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/elements/Spinner';
import Input from '@/components/admin/elements/Input';
import Field, { FieldRow } from '@/components/elements/Field';
import { getGeneralSettings, GeneralSettings } from '@/api/admin/settings';
import { faTag, faToolbox, faUserTag } from '@fortawesome/free-solid-svg-icons';

export default () => {
    const [settings, setSettings] = useState<GeneralSettings>();

    useEffect(() => {
        getGeneralSettings().then((data) => setSettings(data));
    }, []);

    const submit = () => {
        //
    };

    if (!settings) return <Spinner size={'base'} centered />;

    return (
        <Box title={'General Configuration'} icon={faToolbox}>
            <Formik
                onSubmit={submit}
                initialValues={{
                    panelName: settings.panelName,
                    panelTheme: settings.panelTheme,
                    panelLogo: settings.panelLogo,
                    panelBackground: settings.panelBackground,
                    require2FA: 1,
                    connectionTimeout: 15,
                    requestTimeout: 15,
                }}
            >
                <Form>
                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'}>
                        <Input title={'Branding'} icon={faUserTag}>
                            <FieldRow>
                                <Field
                                    id={'panelName'}
                                    name={'panelName'}
                                    type={'text'}
                                    label={'panel Name'}
                                    description={'The name of this Panel which is used in emails.'}
                                />
                                <div>
                                    <Label>Panel Theme</Label>
                                    <Select id={'require2FA'} name={'require2FA'}>
                                        <option value={'dark'}>Dark Theme</option>
                                        <option value={'light'}>Light Theme</option>
                                    </Select>
                                    <p className={'text-xs mt-1 input-help'}>Choose a theme for the Panel&apos;s UI.</p>
                                </div>
                                <Field
                                    id={'panelLogo'}
                                    name={'panelLogo'}
                                    type={'url'}
                                    label={'Panel Logo'}
                                    description={'The logo used throughout the Panel UI.'}
                                />
                                <Field
                                    id={'panelBackground'}
                                    name={'panelBackground'}
                                    type={'url'}
                                    label={'Panel Background'}
                                    description={'The background used throughout the Panel UI.'}
                                />
                            </FieldRow>
                        </Input>
                        <Input title={'Security'} icon={faTag}>
                            <FieldRow>
                                <div>
                                    <Label>Require 2FA</Label>
                                    <Select id={'require2FA'} name={'require2FA'}>
                                        <option value={0}>All Users</option>
                                        <option value={1}>Admins Only</option>
                                        <option value={1}>Not Required</option>
                                    </Select>
                                    <p className={'text-xs mt-1 input-help'}>
                                        Set whether users must enable 2FA to use the Panel.
                                    </p>
                                </div>
                            </FieldRow>
                        </Input>
                        <Input title={'HTTP Configuration'} icon={faTag}>
                            <FieldRow>
                                <Field
                                    id={'connectionTimeout'}
                                    name={'connectionTimeout'}
                                    type={'text'}
                                    label={'Connection Timeout'}
                                    description={'The amount of time in seconds to wait for a connection to be opened.'}
                                />
                                <Field
                                    id={'requestTimeout'}
                                    name={'requestTimeout'}
                                    type={'text'}
                                    label={'Request Timeout'}
                                    description={'The amount of time in seconds to wait for a request to be completed.'}
                                />
                            </FieldRow>
                        </Input>
                    </div>
                </Form>
            </Formik>
        </Box>
    );
};
