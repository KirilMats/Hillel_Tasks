import c from './SearchPanel.module.css';
import {Box, ButtonBase, Paper} from "@mui/material";
import {Form, Field} from 'react-final-form';
import FormTextField from "../FormTextField/FormTextField";

const SearchPanel = (props) => {
    const handleSubmit = (formValue) => {
        console.log(formValue);
    }

    const handleValidate = (formValue) => {
        const errors = {}
        if(!formValue.search) {
            errors.search = 'The field is empty';
        }
        return errors;
    }

    return (
        <div className={c.searchPanel}>
            <Form onSubmit={handleSubmit} validate={handleValidate} render={(formProps) => {
                const { handleSubmit, errors, touched } = formProps;
                return (
                    <Paper component="form" onSubmit={handleSubmit} sx={{
                        boxShadow: 'none',
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                        <legend className={c.legend}>G<span className={c.legend_red}>o</span><span className={c.legend_yellow}>o</span>g<span className={c.legend_green}>l</span><span className={c.legend_red}>e</span></legend>
                        <Box sx={{
                            width: 584,
                            maxWidth: '100%',
                            height: 44
                        }}>
                            <Field name="search" title="search" component={FormTextField} />
                        </Box>
                        <ButtonBase className={c.search_button} variant="contained" type="submit" disabled={errors.search && touched.search} sx={{
                            backgroundColor: '#f8f9fa',
                            height: 36,
                            padding: '0 16px',
                            margin: '30px 0 0',
                            borderRadius: '4px',
                            color: '#3c4043',
                            fontFamily: 'arial,sans-serif',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}>Пошук Google</ButtonBase>
                    </Paper>
                )
            }} />
        </div>
    )
}

export default SearchPanel;