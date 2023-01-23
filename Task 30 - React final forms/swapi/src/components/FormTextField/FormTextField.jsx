const FormTextField = (props) => {
    const {input, meta} = props;
    console.log(meta);
    return (
        <div className="d-flex flex-column justify-content-start align-items-start" style={{flexGrow: '14'}}>
            <input
                className="form-control"
                id="basic-url"
                placeholder="people/1/"
                aria-describedby="basic-addon3"
                onChange={input.onChange}
                error={meta.error && !meta.touched}
            />
            <div style={{color: '#dc3545', fontSize: '12px', margin: '4px'}}>{meta.error && !meta.touched ? meta.error : null}</div>
        </div>
    )
}

export default FormTextField;