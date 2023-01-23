import style from './App.module.css';
import './App.css';
import {getSwapiData} from "./utils/utils";
import {useEffect, useState} from "react";
import {Form, Field} from 'react-final-form';
import FormTextField from "./components/FormTextField/FormTextField";


function App() {
  const API_URL = 'https://swapi.py4e.com/api'
  const [responseStatus, setResponseStatus] = useState({isSuccess: false});
  const [responseData, setResponseData] = useState({data: ''});
  const [controlData, setControlData] = useState({controlVal1: '', controlVal2: ''});
  const [preloader, setPreloader] = useState({isVisible: false});

  useEffect(() => {
    handleResponse();
  }, [])

  const onSubmit = (formValue) => {
    setPreloader({isVisible: true});
    handleResponse(formValue.url);
  }

  const handleResponse = async (url) => {
    const normalizeFormUrl = url ? url.trim() : '';
    const response = await getSwapiData(API_URL, normalizeFormUrl);
    setResponseStatus({isSuccess: response.status === 'success'});
    if (responseStatus.isSuccess) {
      setPreloader({isVisible: false});
      const getURLInfo = normalizeFormUrl.split('/');
      setControlData({...controlData, controlVal1: getURLInfo[0]});
      if (getURLInfo[1]) {
        setControlData({controlVal1: getURLInfo[0], controlVal2: getURLInfo[1]});
      } else {
        setControlData({...controlData, controlVal2: ''});
      }
      setResponseData({data: JSON.stringify(response.data, null, 2)})
    } else {
      setPreloader({isVisible: false});
    }
  }

  const handleValidate = (formValue) => {
    const errors = {};
    if(!formValue.url) {
      errors.url = 'The field is empty';
    }
    return errors;
  }

  return (
    <div className="App">
      <div className="container">
        <h1>SWAPI</h1>
        <Form onSubmit={onSubmit} validate={handleValidate} render={(formProps) => {
          const { handleSubmit, errors, dirty } = formProps;
          return (
              <form onSubmit={handleSubmit} className="input-group mb-3 align-items-start">
                <span className="input-group-text" id="basic-addon3" style={{flexGrow: '3'}}>https://swapi.py4e.com/api/</span>
                <Field className="flex-grow-1" type="text" name="url" component={FormTextField} style={{flexGrow: '14'}} />
                <button className="btn btn-outline-secondary flex-grow-1" type="submit" id="button-addon2" disabled={errors.url && !dirty}>Get info</button>
              </form>
          )
        }} />
        <div className={style.card}>
          <div className="card-body" style={{display: 'flex', flexFlow: 'column', alignItems: 'flex-start'}}>
            <div>
              <span className={`${responseStatus.isSuccess ? '' : 'd-none'}badge bg-secondary`}>{responseStatus.isSuccess ? controlData.controlVal1 : ''}</span>
              <span className={`${responseStatus.isSuccess ? '' : 'd-none'}badge bg-secondary m-1`}>{responseStatus.isSuccess ? controlData.controlVal2 : ''}</span>
            </div>
            <div className={`${style.load} ${preloader.isVisible ? '' : 'd-none'}`}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <pre className="mt-2 mb-0" style={{textAlign: 'left'}}>{responseData.data ? responseData.data : ''}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
