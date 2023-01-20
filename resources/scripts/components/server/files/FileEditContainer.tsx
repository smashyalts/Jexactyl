import { dirname } from 'path';
import useFlash from '@/plugins/useFlash';
import Can from '@/components/elements/Can';
import { httpErrorToHuman } from '@/api/http';
import { encodePathSegments } from '@/helpers';
import { ServerContext } from '@/state/server';
import Select from '@/components/elements/Select';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { languages } from '@codemirror/language-data';
import { Editor } from '@/components/elements/editor';
import { LanguageDescription } from '@codemirror/language';
import { Button } from '@/components/elements/button/index';
import { ServerError } from '@/components/elements/ScreenBlock';
import ErrorBoundary from '@/components/elements/ErrorBoundary';
import getFileContents from '@/api/server/files/getFileContents';
import FlashMessageRender from '@/components/FlashMessageRender';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import saveFileContents from '@/api/server/files/saveFileContents';
import FileNameModal from '@/components/server/files/FileNameModal';
import PageContentBlock from '@/components/elements/PageContentBlock';
import FileManagerBreadcrumbs from '@/components/server/files/FileManagerBreadcrumbs';

export default () => {
    const [error, setError] = useState('');
    const { action, '*': rawFilename } = useParams<{ action: 'edit' | 'new'; '*': string }>();
    const [loading, setLoading] = useState(action === 'edit');
    const [content, setContent] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [language, setLanguage] = useState<LanguageDescription>();

    const [filename, setFilename] = useState<string>('');

    useEffect(() => {
        setFilename(decodeURIComponent(rawFilename ?? ''));
    }, [rawFilename]);

    const navigate = useNavigate();

    const id = ServerContext.useStoreState((state) => state.server.data!.id);
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const setDirectory = ServerContext.useStoreActions((actions) => actions.files.setDirectory);
    const { addError, clearFlashes } = useFlash();

    let fetchFileContent: null | (() => Promise<string>) = null;

    useEffect(() => {
        if (action === 'new') {
            return;
        }

        if (filename === '') {
            return;
        }

        setError('');
        setLoading(true);
        setDirectory(dirname(filename));
        getFileContents(uuid, filename)
            .then(setContent)
            .catch((error) => {
                console.error(error);
                setError(httpErrorToHuman(error));
            })
            .then(() => setLoading(false));
    }, [action, uuid, filename]);

    const save = (name?: string) => {
        if (!fetchFileContent) {
            return;
        }

        setLoading(true);
        clearFlashes('files:view');
        fetchFileContent()
            .then((content) => saveFileContents(uuid, name ?? filename, content))
            .then(() => {
                if (name) {
                    navigate(`/server/${id}/files/edit/${encodePathSegments(name)}`);
                    return;
                }

                return Promise.resolve();
            })
            .catch((error) => {
                console.error(error);
                addError({ message: httpErrorToHuman(error), key: 'files:view' });
            })
            .then(() => setLoading(false));
    };

    if (error) {
        // TODO: onBack
        return <ServerError message={error} />;
    }

    return (
        <PageContentBlock>
            <FlashMessageRender byKey={'files:view'} className={`mb-4`} />
            <ErrorBoundary>
                <div className={'mb-4 j-right'}>
                    <FileManagerBreadcrumbs withinFileEditor isNewFile={action !== 'edit'} />
                </div>
            </ErrorBoundary>
            {filename === '.pteroignore' && (
                <div className={`mb-4 p-4 border-l-4 bg-neutral-900 rounded border-cyan-400`}>
                    <p className={`text-neutral-300 text-sm`}>
                        You&apos;re editing a{' '}
                        <code className={`font-mono bg-black rounded py-px px-1`}>.pteroignore</code> file. Any files or
                        directories listed in here will be excluded from backups. Wildcards are supported by using an
                        asterisk (<code className={`font-mono bg-black rounded py-px px-1`}>*</code>). You can negate a
                        prior rule by prepending an exclamation point (
                        <code className={`font-mono bg-black rounded py-px px-1`}>!</code>).
                    </p>
                </div>
            )}
            <FileNameModal
                visible={modalVisible}
                onDismissed={() => setModalVisible(false)}
                onFileNamed={(name) => {
                    setModalVisible(false);
                    save(name);
                }}
            />
            <div className={`relative`}>
                <SpinnerOverlay visible={loading} />
                <Editor
                    style={{ height: 'calc(100vh - 20rem)' }}
                    filename={filename}
                    initialContent={content}
                    language={language}
                    onLanguageChanged={(l) => {
                        setLanguage(l);
                    }}
                    fetchContent={(value) => {
                        fetchFileContent = value;
                    }}
                    onContentSaved={() => {
                        if (action !== 'edit') {
                            setModalVisible(true);
                        } else {
                            save();
                        }
                    }}
                />
            </div>
            <div className={'j-up flex justify-end mt-4'}>
                <div className={'flex-1 sm:flex-none rounded bg-neutral-900 mr-4'}>
                    <Select
                        value={language?.name ?? ''}
                        onChange={(e) => {
                            setLanguage(languages.find((l) => l.name === e.target.value));
                        }}
                    >
                        {languages.map((language) => (
                            <option key={language.name} value={language.name}>
                                {language.name}
                            </option>
                        ))}
                    </Select>
                </div>
                {action === 'edit' ? (
                    <Can action={'file.update'}>
                        <Button className={`flex-1 sm:flex-none`} onClick={() => save()}>
                            Save Content
                        </Button>
                    </Can>
                ) : (
                    <Can action={'file.create'}>
                        <Button className={`flex-1 sm:flex-none`} onClick={() => setModalVisible(true)}>
                            Create File
                        </Button>
                    </Can>
                )}
            </div>
        </PageContentBlock>
    );
};
