import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Slider, Snackbar, TextField, Typography } from '@mui/material';
import styles from './oppDialog.module.css';
import { useEffect, useState } from 'react';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import { object } from 'prop-types';

// const typesArr = [
//     {
//         "_id": "serviced-apartment",
//         "count": 50,
//         "units": [
//             {
//                 "id": "u-794aa794",
//                 "priceBase": 3625000,
//                 "spaceBuildUp": 118,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-e1108c8a",
//                 "priceBase": 2882000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-b836e3a5",
//                 "priceBase": 3045000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-0fd61995",
//                 "priceBase": 3045000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-b853ffc5",
//                 "priceBase": 3200000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-013d548a",
//                 "priceBase": 3468000,
//                 "spaceBuildUp": 118,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-ee442909",
//                 "priceBase": 3352000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-849a129c",
//                 "priceBase": 3513000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-6a05e8a0",
//                 "priceBase": 3045000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-9acaa2a4",
//                 "priceBase": 3352000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-21895e3f",
//                 "priceBase": 1689000,
//                 "spaceBuildUp": 70,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-295c0e19",
//                 "priceBase": 2514000,
//                 "spaceBuildUp": 99,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-d55ca6fc",
//                 "priceBase": 3513000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-387bef64",
//                 "priceBase": 3672000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-36fc6972",
//                 "priceBase": 2722000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-f34b4b3c",
//                 "priceBase": 2794000,
//                 "spaceBuildUp": 95,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-81015654",
//                 "priceBase": 3200000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-19ec8ad5",
//                 "priceBase": 3468000,
//                 "spaceBuildUp": 118,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-e33b7dc8",
//                 "priceBase": 3625000,
//                 "spaceBuildUp": 118,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-e7a84848",
//                 "priceBase": 3120000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-15877f13",
//                 "priceBase": 2855000,
//                 "spaceBuildUp": 97,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-79d3c5b3",
//                 "priceBase": 3672000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-98317396",
//                 "priceBase": 3200000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-a75ec8b9",
//                 "priceBase": 3468000,
//                 "spaceBuildUp": 118,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-0f6043e3",
//                 "priceBase": 3041000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-5da56089",
//                 "priceBase": 3352000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-ebc73d05",
//                 "priceBase": 3041000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-8158b0a7",
//                 "priceBase": 3625000,
//                 "spaceBuildUp": 118,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-e0a92fe2",
//                 "priceBase": 3513000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-af112be5",
//                 "priceBase": 2882000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-cd819109",
//                 "priceBase": 3120000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-3a314a97",
//                 "priceBase": 3625000,
//                 "spaceBuildUp": 118,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-29d08595",
//                 "priceBase": 3120000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-a971ad6a",
//                 "priceBase": 2562000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-9d30655f",
//                 "priceBase": 3045000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-40dd2cc5",
//                 "priceBase": 3468000,
//                 "spaceBuildUp": 118,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-e49fe5e3",
//                 "priceBase": 2562000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-f5676803",
//                 "priceBase": 2855000,
//                 "spaceBuildUp": 97,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-47eb6296",
//                 "priceBase": 4303000,
//                 "spaceBuildUp": 137,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-e1e0c141",
//                 "priceBase": 3468000,
//                 "spaceBuildUp": 118,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-8d0495e1",
//                 "priceBase": 3352000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-6e646a17",
//                 "priceBase": 2855000,
//                 "spaceBuildUp": 97,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-7f4c30e9",
//                 "priceBase": 7241000,
//                 "spaceBuildUp": 226,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-3612c970",
//                 "priceBase": 2882000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-0843ff34",
//                 "priceBase": 3045000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-2854518b",
//                 "priceBase": 3200000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-5dac21d0",
//                 "priceBase": 4484000,
//                 "spaceBuildUp": 137,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-8a3eb406",
//                 "priceBase": 2794000,
//                 "spaceBuildUp": 95,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-af544d1d",
//                 "priceBase": 3352000,
//                 "spaceBuildUp": 120,
//                 "paymentYears": 4
//             },
//             {
//                 "id": "u-8f9aa5e7",
//                 "priceBase": 3625000,
//                 "spaceBuildUp": 118,
//                 "paymentYears": 4
//             }
//         ]
//     }
// ]

const SubmitOppForm = ({ setRenderedComponent, projectDetails, setLoading }) => {
    const [buyerName, setBuyerName] = useState('');
    const [mobile, setMobile] = useState('');
    const [projectName, setProjectName] = useState('');
    const [developerName, setDeveloperName] = useState('');
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [prices, setPrices] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [totalCost, setTotalCost] = useState(10);
    const [downPayment, setDownPayment] = useState(0);
    const [maxPerMonth, setMaxPerMonth] = useState(parseInt((totalCost - downPayment) / (12 * selectedPrice.paymentYears)));
    const [maxDelivery, setMaxDelivery] = useState(2023);
    const [contactDirectlyWithTheBuyer, setContactDirectlyWithTheBuyer] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [submitLoad, setSubmitLoad] = useState(false);

    // ----------------------------------------------------------------------------------------------
    useEffect(() => {

        getUnits();
        return () => {
            setBuyerName('')
            setDownPayment(0)
            setTotalCost(0)
            setMaxPerMonth(0)
            setSelectedPrice('')
            setPrices([])
            setSelectedType('')
            setTypes([])
            setDeveloperName('')
            setMobile('')
            setProjectName('')
            setBuyerName('')
        };
    }, []);
    // ----------------------------------------------------------------------------------------------
    const getUnits = async () => {
        setLoading(true)
        try {
            const res = await axiosClient.get(`/client/project/project/${projectDetails._id}/units`);
            setTypes(res.data || [])
            setSelectedType(res.data[0])
            setPrices(res.data[0]?.units || [])
            setSelectedPrice(res.data[0]?.units[0])
            setTotalCost(res.data[0]?.units[0]?.priceBase);
        }
        catch (e) {
            console.log(e);
            setErrorMsg('Something went wrong with getting Units')
            setTimeout(() => {
                setErrorMsg()
            }, 3000);
        }
        setLoading(false)

    }
    // ----------------------------------------------------------------------------------------------
    const handleSelectType = (value) => {
        setSelectedType(value)
        setPrices(value.units)
    }
    // ----------------------------------------------------------------------------------------------
    useEffect(() => {
        if (projectDetails) {
            setProjectName(projectDetails?.i18n?.en?.name || '');
            setDeveloperName(projectDetails?.developer_name || '');
        }
    }, [projectDetails]);
    // ----------------------------------------------------------------------------------------------
    const handleSubmit = async () => {
        setSubmitLoad(true)
        try {
            const body = {
                "client": {
                    "name": buyerName || '',
                    "phone": mobile || '',
                    "directly": contactDirectlyWithTheBuyer
                },
                "project": {
                    "id": projectDetails._id || '',
                    "name": projectDetails?.i18n?.en?.name || '',
                    "developer": projectDetails?.developer_name || '',
                },
                "unit": {
                    "id": selectedPrice?.id || '',
                    "priceBase": selectedPrice?.priceBase || '',
                    "spaceBuildUp": selectedPrice?.spaceBuildUp || '',
                    "paymentYears": selectedPrice?.paymentYears || '',
                },
                "budget": {
                    "downpayment": downPayment || 0,
                    "installmentAmountDue": maxPerMonth || '',
                    "totalNumberOfInstallments":selectedPrice?.paymentYears?(totalCost-downPayment)/selectedPrice.paymentYears*12:0 || '',
                }
            }

            // validations
            let warnningMsg = ''
            Object.keys(body).forEach(key => {
                Object.keys(body[key]).forEach(minorKey => {
                    if (!body[key][minorKey] && body[key][minorKey] !== downPayment) {
                        console.log(body[key], key, body[key][minorKey], minorKey);
                        if (warnningMsg) {
                            warnningMsg += `& ${minorKey}`
                        } else { warnningMsg += minorKey }
                    }

                })
            });
            if (warnningMsg) {
                setErrorMsg(warnningMsg + ' are required');
                setTimeout(() => {
                    setErrorMsg()
                }, 3000);
                setSubmitLoad(false)
                return
            }
           
            const res = await axiosClient.post('/client/opportunity/submit',body);
            console.log(res);
        } catch (e) {
            console.log(e);
            setErrorMsg('something went wrong,please try again');
            setTimeout(() => {
                setErrorMsg()
            }, 3000);
        }
        setSubmitLoad(false)
    }
    // ----------------------------------------------------------------------------------------------

    useEffect(() => {
        if (parseInt((totalCost - downPayment) / (12 * selectedPrice.paymentYears)) !== maxPerMonth) setMaxPerMonth(parseInt((totalCost - downPayment) / (12 * selectedPrice.paymentYears)))
    }, [downPayment, totalCost]);
    // ----------------------------------------------------------------------------------------------
    return (
        <div style={{ padding: '20px' }}>
            <ArrowBackTwoToneIcon style={{ cursor: 'pointer' }} onClick={() => { setRenderedComponent('ProJect-Details') }} />  <h3>Submit Opportunity</h3>

            <div className={styles.form_wrapper}>

                <TextField value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className={styles.text_feild} id="buyer" label="Buyer" variant="outlined" />
                <TextField value={mobile} onChange={(e) => setMobile(e.target.value)} className={styles.text_feild} id="Mobile" label="Mobile" variant="outlined" />
                <TextField value={developerName} onChange={(e) => setDeveloperName(e.target.value)} className={styles.text_feild} id="Develope" label="Develope" variant="outlined" />
                <TextField value={projectName} onChange={(e) => setProjectName(e.target.value)} className={styles.text_feild} id="Project" label="Project" variant="outlined" />


                <FormControl className={styles.select}>

                    <InputLabel htmlFor="Types">Types</InputLabel>
                    <Select
                        disabled={!types?.length}
                        labelId="Types"
                        id="Types"
                        value={selectedType}
                        label="Types"
                        onChange={(e) => {
                            handleSelectType(e.target.value)
                        }}
                    >
                        {types?.map((type, i) => {
                            return <MenuItem key={i} value={type}>Ten{type._id}</MenuItem>
                        })}

                    </Select>
                </FormControl>
                {/*  */}
                <FormControl className={styles.select}>

                    <InputLabel htmlFor="Price">Price</InputLabel>
                    <Select
                        labelId="Price"
                        id="Price"
                        value={selectedPrice}
                        label="Price"
                        onChange={(e) => {
                            setSelectedPrice(e.target.value)
                            setTotalCost(e.target.value.priceBase);
                        }}
                        disabled={!prices?.length}
                    >
                        {prices?.map((price, i) => {
                            return <MenuItem key={i} value={price}>{price?.priceBase}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                {/*  */}
                <Typography id="slider-label" gutterBottom>
                    <span style={{ fontWeight: 'bold' }}>  downPayment: </span> {downPayment}
                </Typography>
                <Slider
                    disabled={!selectedPrice}
                    value={parseInt(downPayment)} max={totalCost}
                    aria-labelledby="downPayment-label"
                    min={0} aria-label="downPayment"
                    valueLabelDisplay="off"
                    onChange={(e) => {
                        setDownPayment(parseInt(e.target.value))
                    }} />
                {/*  */}
                <Typography id="slider-label" gutterBottom>
                    <span style={{ fontWeight: 'bold' }}> Max/ month: </span> {maxPerMonth}
                </Typography>
                <Slider
                    disabled={!selectedPrice}
                    value={parseInt((totalCost - downPayment))}
                    max={totalCost}
                    min={0}
                    aria-label="PerMonth" valueLabelDisplay="off"
                    onChange={(e) => { setDownPayment(parseInt((totalCost - e.target.value))) }} />
                {/*  */}
                <Typography id="slider-label" gutterBottom>
                    <span style={{ fontWeight: 'bold' }}>Max delivery </span>{maxDelivery}
                </Typography>
                <Slider
                    value={maxDelivery}
                    max={3550}
                    min={0}
                    disabled
                    aria-label="Max delivery" valueLabelDisplay="auto"
                    onChange={(e) => { setMaxDelivery(parseInt((totalCost - e.target.value))) }} />
                {/*  */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <input style={{ marginRight: '10px', width: '1.2rem', height: '1.2rem' }} type='checkbox' id='ContactBuyerDirectly' checked={contactDirectlyWithTheBuyer} onChange={() => { setContactDirectlyWithTheBuyer(prev => !prev) }} disabled />
                    <label htmlFor='ContactBuyerDirectly'>Contact Buyer Directly</label>
                </div>
                {/*  */}
                <Typography color="error" variant="h5">
                    This account is not onboarded yet.
                </Typography>
                <div className={styles.submit_button_wrapper}> <Button variant="contained" onClick={handleSubmit}>{submitLoad&&<CircularProgress color='inherit' sx={{width:'25px !important',height:'25px !important',marginRight:'5px'}}/>} Submit</Button></div>
                <Snackbar
                    open={!!errorMsg}
                    autoHideDuration={6000}
                    //   onClose={handleClose}
                    message={errorMsg}
                //   action={action}
                />
                <div style={{ fontWeight: 'bold' }}>*Estimated payment is based on a 10% down payment minimum {selectedPrice.paymentYears&&<span>and {selectedPrice.paymentYears} year payment plan</span>}.</div>
            </div>
        </div>
    );
}

export { SubmitOppForm };
