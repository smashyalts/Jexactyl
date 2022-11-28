import tw from 'twin.macro';
import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import FlashMessageRender from '@/components/FlashMessageRender';
import ContentContainer from '@/components/elements/ContentContainer';

export interface PageContentBlockProps {
    title: string;
    description: string;
    className?: string;
    showFlashKey?: string;
}

const PageContentBlock: React.FC<PageContentBlockProps> = ({
    title,
    description,
    showFlashKey,
    className,
    children,
}) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    return (
        <CSSTransition timeout={150} classNames={'fade'} appear in>
            <div css={tw`my-4`}>
                <ContentContainer className={className}>
                    <div className={'w-full flex flex-row items-center my-8'}>
                        <div className={'flex flex-col flex-shrink'} style={{ minWidth: '0' }}>
                            <h2 className={'text-2xl text-neutral-50 font-header font-medium'}>{title}</h2>
                            <p
                                className={
                                    'text-base text-neutral-400 whitespace-nowrap overflow-ellipsis overflow-hidden'
                                }
                            >
                                {description}
                            </p>
                        </div>
                    </div>
                    {showFlashKey && <FlashMessageRender byKey={showFlashKey} css={tw`mb-4`} />}
                    {children}
                </ContentContainer>
                <ContentContainer css={tw`text-sm text-center my-4`}>
                    <p css={tw`text-neutral-500 sm:float-left`}>
                        &copy; <a href={'https://jexactyl.com'}>Jexactyl,</a> built on{' '}
                        <a href={'https://pterodactyl.io'}>Pterodactyl.</a>
                    </p>
                    <p css={tw`text-neutral-500 sm:float-right`}>
                        <a href={'https://jexactyl.com'}> Site </a>
                        &bull;
                        <a href={'https://github.com/jexactyl/jexactyl'}> GitHub </a>
                    </p>
                </ContentContainer>
            </div>
        </CSSTransition>
    );
};

export default PageContentBlock;
