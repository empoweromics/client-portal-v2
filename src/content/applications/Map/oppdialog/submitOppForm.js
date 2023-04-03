import { Button, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import styles from './oppDialog.module.css';
import { useEffect, useState } from 'react';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { ProjectDetails } from './projectDetails';


const SubmitOppForm = ({ setRenderedComponent,ProjectDetails }) => {
    const [buyerName, setBuyerName] = useState('test');
    const [mobile, setMobile] = useState('test');
    const [projectName, setProjectName] = useState('test');
    const [developerName, setDeveloperName] = useState('test');
    const [types, setTypes] = useState([1, 2, 3]);
    const [selectedType, setSelectedType] = useState(1);
    const [prices, setPrices] = useState([1, 2, 3]);
    const [selectedPrice, setSelectedPrice] = useState(1);
    const [totalCost, setTotalCost] = useState(1000000);
    const [downPayment, setDownPayment] = useState(0);
    const [maxPerMonth, setMaxPerMonth] = useState(parseInt((totalCost - downPayment) / (12 * 8)));
    const [maxDelivery, setMaxDelivery] = useState(200);


    useEffect(() => {
        if (parseInt((totalCost - downPayment) / (12 * 8)) !== maxPerMonth) setMaxPerMonth(parseInt((totalCost - downPayment) / (12 * 8)))
    }, [downPayment]);

    return (
        <div style={{ padding: '20px' }}>
            <ArrowBackTwoToneIcon style={{ cursor: 'pointer' }} onClick={() => { setRenderedComponent('ProJect-Details') }} />  <h3>Submit Opportunity</h3>

            <div className={styles.form_wrapper}>

                <TextField value={buyerName} onChange={(e)=>setBuyerName(e.target.value)} className={styles.text_feild} id="buyer" label="Buyer" variant="outlined" />
                <TextField value={mobile} onChange={(e)=>setMobile(e.target.value)} className={styles.text_feild} id="Mobile" label="Mobile" variant="outlined" />
                <TextField value={developerName} onChange={(e)=>setDeveloperName(e.target.value)} className={styles.text_feild} id="Develope" label="Develope" variant="outlined" />
                <TextField value={projectName} onChange={(e)=>setProjectName(e.target.value)} className={styles.text_feild} id="Project" label="Project" variant="outlined" />


                <FormControl className={styles.select}>

                    <InputLabel htmlFor="Types">Types</InputLabel>
                    <Select

                        labelId="Types"
                        id="Types"
                        value={selectedType}
                        label="Types"
                        onChange={(e) => {
                            setSelectedType(e.target.value)
                        }}
                    >
                        {types.map((type, i) => {
                            return <MenuItem key={i} value={type}>Ten{type}</MenuItem>
                        })}

                    </Select>
                </FormControl>
                {/*  */}
                <FormControl className={styles.select}>

                    <InputLabel htmlFor="Price">Price</InputLabel>
                    <Select
                        labelId="Price"
                        id="Price"
                        value={selectedType}
                        label="Price"
                        onChange={(e) => {
                            setSelectedType(e.target.value)
                        }}
                    >
                        {types.map((type, i) => {
                            return <MenuItem key={i} value={type}>Ten{type}</MenuItem>
                        })}

                    </Select>
                </FormControl>
                {/*  */}
                <Typography id="slider-label" gutterBottom>
                    <span style={{ fontWeight: 'bold' }}>  downPayment: </span> {downPayment}
                </Typography>
                <Slider 
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
                    max={1000}
                    min={0}
                    disabled
                    aria-label="Max delivery" valueLabelDisplay="auto"
                    onChange={(e) => { setMaxDelivery(parseInt((totalCost - e.target.value))) }} />
                {/*  */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <input type='checkbox' id='ContactBuyerDirectly' style={{ marginRight: '10px' }} />
                    <label htmlFor='ContactBuyerDirectly'>Contact Buyer Directly</label>
                </div>
                {/*  */}
                <Typography color="error" variant="h5">
  This account is not onboarded yet.
</Typography>
                <div className={styles.submit_button_wrapper}> <Button variant="contained"> Submit</Button></div>

                <div style={{ fontWeight: 'bold' }}>*Estimated payment is based on a 10% down payment minimum and 8 year payment plan.</div>
            </div>
        </div>
    );
}

export { SubmitOppForm };
