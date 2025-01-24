import React from 'react'
import { CargarInputGrid } from '../../../components/Formik/components/CargarInputGrid';
import { FormJson } from '../../../components/Formik/interface';
import Grid from '@mui/material/Grid2';
import { SwitchInput } from '../../../components/Formik/components/SwitchInput';
import { FormikErrors, FormikTouched } from 'formik';

export interface Props {
    column: number;
    formJson: FormJson[];
    values: {
        [key: string]: any;
    };
    errors: FormikErrors<{
        [key: string]: any;
    }>;
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    };
    touched: FormikTouched<{
        [key: string]: any;
    }>
}

export const Inputs2 = (props: Props) => {
    const { formJson, column, values, errors, handleChange, touched } = props;
    const { cargarInputGrid } = CargarInputGrid();

    return (
        column === 1 ? (
            <SwitchInput
                errors={errors}
                formJson={formJson}
                handleChange={handleChange}
                touched={touched}
                values={values}
            />
        ) : (
            <Grid container spacing={2}>
                {cargarInputGrid({
                    values,
                    touched,
                    errors,
                    handleChange,
                    column,
                    formJson,
                })}
            </Grid>
        )
    )
}
