import { useState, useEffect } from 'react';

const useFetchAddress = (zipCode) => {
    const [address, setAddress] = useState({});
    
    useEffect(() => {
        const urlAPI = `https://viacep.com.br/ws/${zipCode}/json/`;

        async function fetchData() {
            if(zipCode.length === 8) {
                try{
                    const data = await fetch(urlAPI);
                    const json = await data.json();
    
                    if(json) {
                        setAddress(json);
                    }
                } catch(error) {
                    setAddress({});
                    console.log(error);
                }
            }
        }
    
        fetchData();

    }, [zipCode]);

    return address;
}

export default useFetchAddress;