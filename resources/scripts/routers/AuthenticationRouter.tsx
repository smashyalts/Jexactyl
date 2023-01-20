import React from 'react';
import { useStoreState } from '@/state/hooks';
import { NotFound } from '@/components/elements/ScreenBlock';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginContainer from '@/components/auth/LoginContainer';
import DiscordContainer from '@/components/auth/DiscordContainer';
import RegisterContainer from '@/components/auth/RegisterContainer';
import ResetPasswordContainer from '@/components/auth/ResetPasswordContainer';
import ForgotPasswordContainer from '@/components/auth/ForgotPasswordContainer';
import LoginCheckpointContainer from '@/components/auth/LoginCheckpointContainer';

export default () => {
    const navigate = useNavigate();
    const email = useStoreState((state) => state.settings.data?.registration.email);
    const discord = useStoreState((state) => state.settings.data?.registration.discord);

    return (
        <div className={'pt-8 xl:pt-32'}>
            <Routes>
                <Route path={`/auth/login`} element={<LoginContainer />} />
                <Route path={`/auth/login/checkpoint`} element={<LoginCheckpointContainer />} />
                {email && <Route path={`/auth/register`} element={<RegisterContainer />} />}
                {discord && <Route path={`/auth/discord`} element={<DiscordContainer />} />}
                <Route path={`/auth/password`} element={<ForgotPasswordContainer />} />
                <Route path={`/auth/password/reset/:token`} element={<ResetPasswordContainer />} />
                <Route path={`/auth/checkpoint/*`} element={<LoginCheckpointContainer />} />
                <Route path={'*'}>
                    <NotFound onBack={() => navigate('/auth/login')} />
                </Route>
            </Routes>
        </div>
    );
};
