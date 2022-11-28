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
    children: React.ReactChild;
}

const SideLink = (props: LinkProps) => (
    <NavLink to={'/admin/' + props.to} className={'navigation-link'} exact>
        <Tooltip placement={'right'} content={props.to.charAt(0).toUpperCase() + props.to.slice(1)}>
            <div className={'bg-gray-700 rounded-lg p-2 my-8'}>{props.children}</div>
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
                <SideLink to={'overview'}>
                    <Icon.Home size={32} />
                </SideLink>
                <SideLink to={'settings'}>
                    <Icon.Settings size={32} />
                </SideLink>
            </div>
        </PanelDiv>
    );
};
