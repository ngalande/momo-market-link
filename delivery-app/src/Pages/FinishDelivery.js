import React, {useEffect, useState} from 'react'
import BackButton from '../Assests/Components/BackButton'
import axios from 'axios'
import { useParams, useLocation } from 'react-router-dom'
import Logo from '../Assests/Images/logomml.svg'
import ErrorAlert from '../Assests/Components/ErrorAlert'
import SuccessAlert from '../Assests/Components/SuccessAlert'


const FinishDelivery = ({refID}) => {


  const {id} = useParams();
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const [correctPin, setCorrectPin] =useState(false)
  const [transaction, setTransaction] = useState([]);
  
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    
    axios.get(`https://mml-backend.vercel.app/getransactionid?referenceId=${id}`)
    .then((data)=>{
      console.log("ReferenceID: ",id)
      console.log(data.data)
      setTransaction(data.data)
      console.log(transaction)
    })
    .catch((error)=>{
      console.log("Error fetching trasactions:",error)
    })
  },[])

  useEffect(() => {
    console.log(isError)
  },[isError])

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = 'https://mml-backend.vercel.app/confirmdelivery';
    const data = {
     
      referenceId : id,//required
      confirmationPin: pin,//required
      externalId: "kssad34jdnfd",//required
      payerMessage: "MoMo",//required
      payeeNote: "string"//required
    
    };

    console.log(data)

    try {
      axios.post(url, data, {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 5000
      })
        .then(res => {
          console.log(res.data.status)
           if(res.data.status === 200){
            console.log('Request successful:', res.data);
              
            setCorrectPin(true)
            setTimeout(() => {
            setCorrectPin(false)
            }, 2000);

            }else if(res.data.status === 403){
              //wrong pin 
             
              setIsError(true)
              console.log('Wrong pin')
              console.log(res.data)
              setTimeout(()=>{
                setCorrectPin(true)
              }, 5000);
              
              
            }else{
              setCorrectPin(true)
              setIsError(true)

              //bad network
            }
        }).catch(e => {

          console.log(e?.response?.data)
          setError(e?.response?.data?.message || 'Login failed');
        })

    } catch (error) {
      console.error('Error during pin submission:', error);
      
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className='' >
     
      <div className='flex items-center justify-between min-w-screen bg-blue-950'>
        <BackButton/>
        <img
          src={Logo}
          alt='Logo'
          className='h-20'
        />
      </div>
      
      <form >
        <div className='bg-blue-950 h-1/2 w-auto m-8 p-4 rounded-md shadow-sm'>
          <div className='my-4'>
            <p className='text-3xl text-yellow-500'>Enter confirmation Pin</p>
            <p className='text-white'>Please note that the confirmation is to be entered by the customer only!</p>
          </div>
          <div>
            <input
                      id="pin"
                      name="pin"
                      type="text"
                      autoComplete="confirmation pin"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      required
                      className="block my-4 w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                    />
            </div>
          <div>
            <button className='text-white font-bold bg-yellow-500 rounded-md px-4 py-2 ' onClick={handlePinSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
      {correctPin  ? (
        <SuccessAlert />
      ) : isError  ? (
        <ErrorAlert />
      ) : null}
    </div>
  )
}

export default FinishDelivery