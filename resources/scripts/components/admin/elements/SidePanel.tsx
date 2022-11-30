import React from 'react';
import tw from 'twin.macro';
import * as Icon from 'react-feather';
import { useStoreState } from 'easy-peasy';
import styled from 'styled-components/macro';
import { NavLink, Link } from 'react-router-dom';
import ProgressBar from '@/components/elements/ProgressBar';
import Tooltip from '@/components/elements/tooltip/Tooltip';

interface LinkProps {
    to: string;
    exact?: boolean;
    children: React.ReactChild;
}

const SideLink = ({ to, exact, children }: LinkProps) => (
    <NavLink to={'/admin/' + to} className={'navigation-link'} exact={exact || false}>
        <Tooltip placement={'right'} content={to.charAt(0).toUpperCase() + to.slice(1)}>
            <div className={'bg-gray-700 rounded-lg p-2 my-8'}>{children}</div>
        </Tooltip>
    </NavLink>
);

export default () => {
    const logo = useStoreState((state) => state.settings.data?.logo);

    const PanelDiv = styled.div`
        ${tw`h-screen sticky bg-neutral-800 flex flex-col w-20 fixed top-0`};

        & > div {
            ${tw`mx-auto`};

            & > a,
            & > div {
                &:hover {
                    ${tw`transition duration-500 text-green-600`};
                }

                &:active,
                &.active {
                    ${tw`text-green-600`};
                }
            }
        }
    `;

    return (
        <PanelDiv>
            <ProgressBar />
            <Link to={'/'}>
                <img className={'p-2'} src={logo ?? 'https://avatars.githubusercontent.com/u/91636558'} />
            </Link>
            <div>
                <SideLink to={'overview'} exact>
                    <Icon.Home size={32} />
                </SideLink>
                <SideLink to={'settings'}>
                    <Icon.Settings size={32} />
                </SideLink>
                <SideLink to={'api'}>
                    <Icon.Key size={32} />
                </SideLink>
                <SideLink to={'databases'}>
                    <Icon.Database size={32} />
                </SideLink>
                <SideLink to={'nodes'}>
                    <Icon.Layers size={32} />
                </SideLink>
                <SideLink to={'servers'}>
                    <Icon.Server size={32} />
                </SideLink>
                <SideLink to={'users'}>
                    <Icon.Users size={32} />
                </SideLink>
                <SideLink to={'nests'}>
                    <Icon.Codesandbox size={32} />
                </SideLink>
            </div>
        </PanelDiv>
    );
};
