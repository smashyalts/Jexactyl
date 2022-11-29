import tw, { styled } from 'twin.macro';
import React, { forwardRef } from 'react';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import { Field as FormikField, FieldProps } from 'formik';

interface OwnProps {
    name: string;
    light?: boolean;
    label?: string;
    description?: string;
    validate?: (value: any) => undefined | string | Promise<any>;
}

type Props = OwnProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>;

const Field = forwardRef<HTMLInputElement, Props>(
    ({ id, name, light = false, label, description, validate, ...props }, ref) => (
        <FormikField innerRef={ref} name={name} validate={validate}>
            {({ field, form: { errors, touched } }: FieldProps) => (
                <div>
                    {label && (
                        <Label htmlFor={id} isLight={light}>
                            {label}
                        </Label>
                    )}
                    <Input
                        id={id}
                        {...field}
                        {...props}
                        isLight={false}
                        hasError={!!(touched[field.name] && errors[field.name])}
                    />
                    {touched[field.name] && errors[field.name] ? (
                        <p className={'input-help error'}>
                            {(errors[field.name] as string).charAt(0).toUpperCase() +
                                (errors[field.name] as string).slice(1)}
                        </p>
                    ) : description ? (
                        <p className={'input-help'}>{description}</p>
                    ) : null}
                </div>
            )}
        </FormikField>
    )
);
Field.displayName = 'Field';

export default Field;

export const FieldRow = styled.div`
    ${tw`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 mb-6`};
    & > div {
        ${tw`sm:w-full sm:flex sm:flex-col`};
    }
`;
