import React from 'react';
import tw from 'twin.macro';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';

export const SubNavigation = styled.div`
    ${tw`flex flex-row items-center flex-shrink-0 h-12 mb-8 border-b border-gray-700`};

    & > a {
        ${tw`flex flex-row items-center h-full px-4 border-b text-gray-300 text-base whitespace-nowrap border-transparent`};

        & > svg {
            ${tw`w-6 h-6 mr-2`};
        }

        &:active,
        &.active {
            ${tw`text-green-300 border-green-300`};
        }
    }
`;

interface Props {
    to: string;
    name: string;
}

interface PropsWithIcon extends Props {
    icon: React.ComponentType;
    children?: never;
}

interface PropsWithoutIcon extends Props {
    icon?: never;
    children: React.ReactNode;
}

export const SubNavigationLink = ({ to, name, icon: IconComponent, children }: PropsWithIcon | PropsWithoutIcon) => (
    <NavLink to={to} exact>
        {IconComponent ? <IconComponent /> : children}
        {name}
    </NavLink>
);
