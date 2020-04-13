import React, {useState, useEffect} from 'react';
import useFetchAddress from './hooks';

const Form = () => {
    const [isValid, setisValid  ] = useState(false);
    const [alert, setAlert] = useState({show: false, msg: ''});
    const [form, setForm]= useState({
        cep:'',
        logradouro:'',
        numero:'',
        complemento:'',
        bairro:'',
        localidade:'',
        uf:'',
    });
    
    const address = useFetchAddress(form.cep);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const upddateForm = {...form, [name]: value}

        setForm(upddateForm);
    }

    const checkRequiredForm = () => {
        let validate = true;
        const objForm = form;
        
        for(var key in objForm) {
            if(objForm[key] === '') {
                validate = false;
            }
        }

        setisValid(validate);
    }

    const submitData = (e) => {
        e.preventDefault();

        if(setisValid) {
            setAlert({ show: true, msg: "Formulário preenchido com sucesso"});
            setisValid(false);
            setForm({
                cep:'',
                logradouro:'',
                numero:'',
                complemento:'',
                bairro:'',
                localidade:'',
                uf:'',
            });
        }
    }

    const isEmpty = (obj) =>{
        return JSON.stringify(obj) === '{}';
    }    

    useEffect(() => {
        if(form.cep.length === 8 && !isEmpty(address)) {
            const {logradouro, bairro, localidade, uf} = address;
            setForm((state) => {
                return {
                    ...state,
                    logradouro, bairro, localidade, uf
                }
            });
        }
    }, [form.cep, address]);

    return(
        <>
            {alert.show && <div className="alert alert--sucess">{alert.msg}</div>}
            <form onSubmit={submitData}>
                <label htmlFor="logradouro">CEP</label>
                <input type="text" className="input-sm" name="cep" value={form.cep} minLength="8" maxLength="8" onChange={handleChange} onBlur={checkRequiredForm} />
                <div className="input-inline">
                    <div>
                        <label htmlFor="logradouro">endereço</label>
                        <input type="text" name="logradouro" value={form.logradouro} onChange={handleChange} disabled />
                    </div>
                    <div className="field-inline">
                        <label htmlFor="numero">número</label>
                        <input type="text" name="numero" value={form.numero} onChange={handleChange} onBlur={checkRequiredForm} />
                    </div>
                    <div className="field-inline">
                        <label htmlFor="complemento">complemento</label>
                        <input type="text" name="complemento" value={form.complemento} onChange={handleChange} onBlur={checkRequiredForm} placeholder="ex.: casa, apto" />
                    </div>
                    <div>
                        <label htmlFor="bairro">bairro</label>
                        <input type="text" name="bairro" value={form.bairro} onChange={handleChange} disabled />
                    </div>
                    <div>
                        <label htmlFor="localidade">cidade</label>
                        <input type="text" name="localidade" value={form.localidade} onChange={handleChange} disabled />
                    </div>
                    <div>
                        <label htmlFor="uf">UF</label>
                        <input type="text" name="uf" value={form.uf} onChange={handleChange} disabled />
                    </div>

                </div>
                <button type="submit" disabled={!isValid}>enviar</button>
            </form>
        </>
    )
}

const FormPage = () => {
    return(
        <>
            <Form />
        </>
    )
}

export default FormPage;