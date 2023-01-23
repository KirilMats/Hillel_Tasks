import {InputAdornment, styled, TextField} from "@mui/material";
import c from "../SearchPanel/SearchPanel.module.css";

const SearchField = styled(TextField)(() => ({
    '& fieldset': {
        border: '1px solid #dfe1e5',
        borderRadius: '24px'
    },
    '& input': {
        height: '34px',
        padding: '6px 12px 6px 0',
    }
}));

const FormTextField = (props) => {
    const {input, meta} = props;
    return (
        <SearchField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <div className={c.magGlass_icon_wrapper}>
                                        <span className={c.magGlass_icon} style={{'height':'20px','lineHeight':'20px','width':'20px'}}>
                                            <svg className={c.magGlass_svg} focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox={'0 0 24 24'}>
                                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                            </svg>
                                        </span>
                        </div>
                    </InputAdornment>
                ),
            }}
            {...input}
            onChange={input.onChange}
            error={meta.error && meta.touched}
            helperText={meta.error && meta.touched ? meta.error : null}
        />
    )
}

export default FormTextField;