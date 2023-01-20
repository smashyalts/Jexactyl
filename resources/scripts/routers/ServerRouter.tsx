import * as Icon from 'react-feather';
import { useStoreState } from 'easy-peasy';
import Can from '@/components/elements/Can';
import { httpErrorToHuman } from '@/api/http';
import { ServerContext } from '@/state/server';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/elements/Spinner';
import { CSSTransition } from 'react-transition-group';
import SidePanel from '@/components/elements/SidePanel';
import Suspended from '@/components/elements/Suspended';
import useWindowDimensions from '@/plugins/useWindowDimensions';
import SubNavigation from '@/components/elements/SubNavigation';
import ErrorBoundary from '@/components/elements/ErrorBoundary';
import ExternalConsole from '@/components/server/ExternalConsole';
import InstallListener from '@/components/server/InstallListener';
import ServerRestoreSvg from '@/assets/images/server_restore.svg';
import PluginContainer from '@/components/server/PluginContainer';
import EditContainer from '@/components/server/edit/EditContainer';
import TransferListener from '@/components/server/TransferListener';
import WebsocketHandler from '@/components/server/WebsocketHandler';
import RequireServerPermission from '@/hoc/RequireServerPermission';
import ServerInstallSvg from '@/assets/images/server_installing.svg';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import MobileNavigation from '@/components/elements/MobileNavigation';
import UsersContainer from '@/components/server/users/UsersContainer';
import AnalyticsContainer from '@/components/server/AnalyticsContainer';
import BackupContainer from '@/components/server/backups/BackupContainer';
import FileEditContainer from '@/components/server/files/FileEditContainer';
import NetworkContainer from '@/components/server/network/NetworkContainer';
import StartupContainer from '@/components/server/startup/StartupContainer';
import SettingsContainer from '@/components/server/settings/SettingsContainer';
import ScheduleContainer from '@/components/server/schedules/ScheduleContainer';
import DatabasesContainer from '@/components/server/databases/DatabasesContainer';
import FileManagerContainer from '@/components/server/files/FileManagerContainer';
import ScreenBlock, { NotFound, ServerError } from '@/components/elements/ScreenBlock';
import ServerConsoleContainer from '@/components/server/console/ServerConsoleContainer';
import ScheduleEditContainer from '@/components/server/schedules/ScheduleEditContainer';
import ServerActivityLogContainer from '@/components/server/ServerActivityLogContainer';

const ConflictStateRenderer = () => {
    const status = ServerContext.useStoreState((state) => state.server.data?.status || null);
    const isTransferring = ServerContext.useStoreState((state) => state.server.data?.isTransferring || false);

    return status === 'installing' || status === 'install_failed' ? (
        <ScreenBlock
            title={'Running Installer'}
            image={ServerInstallSvg}
            message={'Your server should be ready soon, please try again in a few minutes.'}
        />
    ) : status === 'suspended' ? (
        <Suspended />
    ) : (
        <ScreenBlock
            title={isTransferring ? 'Transferring' : 'Restoring from Backup'}
            image={ServerRestoreSvg}
            message={
                isTransferring
                    ? 'Your server is being transfered to a new node, please check back later.'
                    : 'Your server is currently being restored from a backup, please check back in a few minutes.'
            }
        />
    );
};

export default () => {
    const params = useParams<'id'>();
    const { width } = useWindowDimensions();

    const [error, setError] = useState('');
    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const databasesEnabled = useStoreState((state) => state.settings.data!.databases);
    const editEnabled = useStoreState((state) => state.storefront.data!.editing.enabled);

    const id = ServerContext.useStoreState((state) => state.server.data?.id);
    const status = ServerContext.useStoreState((state) => state.status.value);
    const uuid = ServerContext.useStoreState((state) => state.server.data?.uuid);
    const serverId = ServerContext.useStoreState((state) => state.server.data?.internalId);
    const getServer = ServerContext.useStoreActions((actions) => actions.server.getServer);
    const eggFeatures = ServerContext.useStoreState((state) => state.server.data?.eggFeatures);
    const inConflictState = ServerContext.useStoreState((state) => state.server.inConflictState);
    const clearServerState = ServerContext.useStoreActions((actions) => actions.clearServerState);

    useEffect(() => {
        clearServerState();
    }, []);

    useEffect(() => {
        setError('');

        if (params.id === undefined) {
            return;
        }

        getServer(params.id).catch((error) => {
            console.error(error);
            setError(httpErrorToHuman(error));
        });

        return () => {
            clearServerState();
        };
    }, [params.id]);

    return (
        <React.Fragment key={'server-router'}>
            {width >= 1280 ? <SidePanel /> : <MobileNavigation />}
            {!uuid || !id ? (
                error ? (
                    <ServerError message={error} />
                ) : (
                    <Spinner size={'large'} centered />
                )
            ) : (
                <>
                    <CSSTransition timeout={150} classNames={'fade'} appear in>
                        <SubNavigation className={'j-down'}>
                            <div>
                                <NavLink to={`/server/${id}`}>
                                    <div className={`flex items-center justify-between`}>
                                        Console <Icon.Terminal className={`ml-1`} size={18} />
                                    </div>
                                </NavLink>
                                {status !== ('offline' || null) && (
                                    <NavLink to={`/server/${id}/analytics`}>
                                        <div className={`flex items-center justify-between`}>
                                            Analytics <Icon.BarChart className={`ml-1`} size={18} />
                                        </div>
                                    </NavLink>
                                )}
                                <Can action={'activity.*'}>
                                    <NavLink to={`/server/${id}/activity`}>
                                        <div className={`flex items-center justify-between`}>
                                            Activity <Icon.Eye className={`ml-1`} size={18} />
                                        </div>
                                    </NavLink>
                                </Can>
                                {eggFeatures?.includes('eula') && (
                                    <Can action={'plugin.*'}>
                                        <NavLink to={`/server/${id}/plugins`}>
                                            <div className={`flex items-center justify-between`}>
                                                Plugins <Icon.Box className={`ml-1`} size={18} />
                                            </div>
                                        </NavLink>
                                    </Can>
                                )}
                                <Can action={'file.*'}>
                                    <NavLink to={`/server/${id}/files`}>
                                        <div className={`flex items-center justify-between`}>
                                            Files <Icon.Folder className={`ml-1`} size={18} />
                                        </div>
                                    </NavLink>
                                </Can>
                                {databasesEnabled && (
                                    <Can action={'database.*'}>
                                        <NavLink to={`/server/${id}/databases`}>
                                            <div className={`flex items-center justify-between`}>
                                                Databases <Icon.Database className={`ml-1`} size={18} />
                                            </div>
                                        </NavLink>
                                    </Can>
                                )}
                                <Can action={'schedule.*'}>
                                    <NavLink to={`/server/${id}/schedules`}>
                                        <div className={`flex items-center justify-between`}>
                                            Tasks <Icon.Clock className={`ml-1`} size={18} />
                                        </div>
                                    </NavLink>
                                </Can>
                                <Can action={'user.*'}>
                                    <NavLink to={`/server/${id}/users`}>
                                        <div className={`flex items-center justify-between`}>
                                            Users <Icon.Users className={`ml-1`} size={18} />
                                        </div>
                                    </NavLink>
                                </Can>
                                <Can action={'backup.*'}>
                                    <NavLink to={`/server/${id}/backups`}>
                                        <div className={`flex items-center justify-between`}>
                                            Backups <Icon.Archive className={`ml-1`} size={18} />
                                        </div>
                                    </NavLink>
                                </Can>
                                <Can action={'allocation.*'}>
                                    <NavLink to={`/server/${id}/network`}>
                                        <div className={`flex items-center justify-between`}>
                                            Network <Icon.Share2 className={`ml-1`} size={18} />
                                        </div>
                                    </NavLink>
                                </Can>
                                <Can action={'startup.*'}>
                                    <NavLink to={`/server/${id}/startup`}>
                                        <div className={`flex items-center justify-between`}>
                                            Startup <Icon.Play className={`ml-1`} size={18} />
                                        </div>
                                    </NavLink>
                                </Can>
                                <Can action={['settings.*', 'file.sftp']} matchAny>
                                    <NavLink to={`/server/${id}/settings`}>
                                        <div className={`flex items-center justify-between`}>
                                            Settings <Icon.Settings className={`ml-1`} size={18} />
                                        </div>
                                    </NavLink>
                                </Can>
                                {editEnabled && (
                                    <Can action={['settings.*']} matchAny>
                                        <NavLink to={`/server/${id}/edit`}>
                                            <div className={`flex items-center justify-between`}>
                                                Edit <Icon.Edit className={`ml-1`} size={18} />
                                            </div>
                                        </NavLink>
                                    </Can>
                                )}
                                {rootAdmin && (
                                    <a href={'/admin/servers/view/' + serverId} rel='noreferrer' target={'_blank'}>
                                        <div className={`flex items-center justify-between`}>
                                            Admin <Icon.ExternalLink className={`ml-1`} size={18} />
                                        </div>
                                    </a>
                                )}
                            </div>
                        </SubNavigation>
                    </CSSTransition>
                    <InstallListener />
                    <TransferListener />
                    <WebsocketHandler />
                    {inConflictState ? (
                        <ConflictStateRenderer />
                    ) : (
                        <ErrorBoundary>
                            <Routes>
                                <Route path={`/server/${id}`} element={<ServerConsoleContainer />} />
                                <Route path={`/server/${id}/console`} element={<ExternalConsole />} />
                                <Route path={`/server/${id}/analytics`} element={<AnalyticsContainer />} />
                                <Route path={`/server/${id}/activity`}>
                                    <RequireServerPermission permissions={'activity.*'}>
                                        <ServerActivityLogContainer />
                                    </RequireServerPermission>
                                </Route>
                                {eggFeatures?.includes('eula') && (
                                    <Route path={`/server/${id}/plugins`}>
                                        <RequireServerPermission permissions={'plugin.*'}>
                                            <PluginContainer />
                                        </RequireServerPermission>
                                    </Route>
                                )}
                                <Route path={`/server/${id}/files`}>
                                    <RequireServerPermission permissions={'file.*'}>
                                        <FileManagerContainer />
                                    </RequireServerPermission>
                                </Route>
                                <Route path={`/server/${id}/files/:action(edit|new)`}>
                                    <Spinner.Suspense>
                                        <FileEditContainer />
                                    </Spinner.Suspense>
                                </Route>
                                {databasesEnabled && (
                                    <Route path={`/server/${id}/databases`}>
                                        <RequireServerPermission permissions={'database.*'}>
                                            <DatabasesContainer />
                                        </RequireServerPermission>
                                    </Route>
                                )}
                                <Route path={`/server/${id}/schedules`}>
                                    <RequireServerPermission permissions={'schedule.*'}>
                                        <ScheduleContainer />
                                    </RequireServerPermission>
                                </Route>
                                <Route path={`/server/${id}/schedules/:id`}>
                                    <ScheduleEditContainer />
                                </Route>
                                <Route path={`/server/${id}/users`}>
                                    <RequireServerPermission permissions={'user.*'}>
                                        <UsersContainer />
                                    </RequireServerPermission>
                                </Route>
                                <Route path={`/server/${id}/backups`}>
                                    <RequireServerPermission permissions={'backup.*'}>
                                        <BackupContainer />
                                    </RequireServerPermission>
                                </Route>
                                <Route path={`/server/${id}/network`}>
                                    <RequireServerPermission permissions={'allocation.*'}>
                                        <NetworkContainer />
                                    </RequireServerPermission>
                                </Route>
                                <Route path={`/server/${id}/startup`} element={<StartupContainer />} />
                                <Route path={`/server/${id}/settings`} element={<SettingsContainer />} />
                                {editEnabled && <Route path={`/server/${id}/edit`} element={<EditContainer />} />}
                                <Route path={'*'} element={<NotFound />} />
                            </Routes>
                        </ErrorBoundary>
                    )}
                </>
            )}
        </React.Fragment>
    );
};
