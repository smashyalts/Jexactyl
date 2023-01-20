import { Link } from 'react-router-dom';
import useFlash from '@/plugins/useFlash';
import Can from '@/components/elements/Can';
import { httpErrorToHuman } from '@/api/http';
import { ServerContext } from '@/state/server';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/elements/Spinner';
import GreyRowBox from '@/components/elements/GreyRowBox';
import { Button } from '@/components/elements/button/index';
import ScheduleRow from '@/components/server/schedules/ScheduleRow';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import getServerSchedules from '@/api/server/schedules/getServerSchedules';
import EditScheduleModal from '@/components/server/schedules/EditScheduleModal';

export default () => {
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const { clearFlashes, addError } = useFlash();
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    const schedules = ServerContext.useStoreState((state) => state.schedules.data);
    const setSchedules = ServerContext.useStoreActions((actions) => actions.schedules.setSchedules);

    useEffect(() => {
        clearFlashes('schedules');
        getServerSchedules(uuid)
            .then((schedules) => setSchedules(schedules))
            .catch((error) => {
                addError({ message: httpErrorToHuman(error), key: 'schedules' });
                console.error(error);
            })
            .then(() => setLoading(false));
    }, []);

    return (
        <ServerContentBlock
            title={'Schedules'}
            description={'Manage scheduled functions for your server.'}
            showFlashKey={'schedules'}
        >
            {!schedules.length && loading ? (
                <Spinner size={'large'} centered />
            ) : (
                <>
                    {schedules.length === 0 ? (
                        <p className={`text-sm text-center text-neutral-300`}>
                            There are no schedules configured for this server.
                        </p>
                    ) : (
                        schedules.map((schedule) => (
                            // @ts-expect-error go away
                            <GreyRowBox
                                key={schedule.id}
                                as={Link}
                                to={schedule.id}
                                className={`cursor-pointer mb-2 flex-wrap`}
                            >
                                <ScheduleRow schedule={schedule} />
                            </GreyRowBox>
                        ))
                    )}
                    <Can action={'schedule.create'}>
                        <div className={`mt-8 flex justify-end`}>
                            <EditScheduleModal visible={visible} onModalDismissed={() => setVisible(false)} />
                            <Button type={'button'} onClick={() => setVisible(true)}>
                                Create schedule
                            </Button>
                        </div>
                    </Can>
                </>
            )}
        </ServerContentBlock>
    );
};
