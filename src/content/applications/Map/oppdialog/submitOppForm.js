import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import styles from './oppDialog.module.css';
import { useEffect, useState } from 'react';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import axiosClient from 'src/utilities/axios/axiosIntercept';

const SubmitOppForm = ({
  setErrorMsg,
  setSnackbarMsg,
  setRenderedComponent,
  projectDetails,
  setLoading,
  setDialogProjectId
}) => {
  const [buyerName, setClientName] = useState('');
  const [mobile, setMobile] = useState('');
  const [projectName, setProjectName] = useState('');
  const [developerName, setDeveloperName] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [prices, setPrices] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [maxPerMonth, setMaxPerMonth] = useState(
    selectedPrice?.paymentYears? parseInt((totalCost - downPayment) / (12 * selectedPrice.paymentYears)):0
  );
  const [maxDelivery, setMaxDelivery] = useState(2023);
  const [contactDirectlyWithTheClient, setContactDirectlyWithTheClient] =
    useState(true);
  const [submitLoad, setSubmitLoad] = useState(false);

  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    getUnits();
    return () => {
      setClientName('');
      setDownPayment(0);
      setTotalCost(0);
      setMaxPerMonth(0);
      setSelectedPrice('');
      setPrices([]);
      setSelectedType('');
      setTypes([]);
      setDeveloperName('');
      setMobile('');
      setProjectName('');
      setClientName('');
    };
  }, []);
  // ----------------------------------------------------------------------------------------------
  const getUnits = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(
        `/client/project/project/${projectDetails._id}/units`
        , {headers:{'user': 'cXtdTSxTS0a5nyti9CpGeKokWun2'}}
      );
      setTypes(res.data || []);
      setSelectedType(res.data[0]);
      setPrices(res.data[0]?.units || []);
      setSelectedPrice(res.data[0]?.units[0]);
      setTotalCost(res.data[0]?.units[0]?.priceBase);
    } catch (e) {
      console.log(e);
      setErrorMsg('Something went wrong with getting Units');
      setTimeout(() => {
        setErrorMsg();
      }, 3000);
    }
    setLoading(false);
  };
  // ----------------------------------------------------------------------------------------------
  const handleSelectType = (value) => {
    setSelectedType(value);
    setPrices(value.units);
  };
  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    if (projectDetails) {
      setProjectName(projectDetails?.i18n?.en?.name || '');
      setDeveloperName(projectDetails?.developer_name || '');
    }
  }, [projectDetails]);
  // ----------------------------------------------------------------------------------------------
  const handleSubmit = async () => {
    setSubmitLoad(true);
    try {
      const body = {
        client: {
          name: buyerName || '',
          phone: mobile || '',
          directly: contactDirectlyWithTheClient
        },
        project: {
          id: projectDetails._id || '',
          name: projectDetails?.i18n?.en?.name || '',
          developer: projectDetails?.developer_name || ''
        },
        unit: {
          id: selectedPrice?.id || '',
          priceBase: selectedPrice?.priceBase || '',
          spaceBuildUp: selectedPrice?.spaceBuildUp || '',
          paymentYears: selectedPrice?.paymentYears || ''
        },
        budget: {
          downpayment: downPayment || 0,
          installmentAmountDue: maxPerMonth || '',
          totalNumberOfInstallments: selectedPrice?.paymentYears
            ? ((totalCost - downPayment) / selectedPrice.paymentYears) * 12
            : 0 || ''
        }
      };

      // validations
      let warnningMsg = '';
      Object.keys(body).forEach((key) => {
        Object.keys(body[key]).forEach((minorKey) => {
          if (!body[key][minorKey] && body[key][minorKey] !== downPayment) {
            if (warnningMsg) {
              warnningMsg += ` & ${minorKey}`;
            } else {
              warnningMsg += minorKey;
            }
          }
        });
      });
      if (warnningMsg) {
        setErrorMsg(warnningMsg + ' are required');
        setTimeout(() => {
          setErrorMsg();
        }, 3000);
        setSubmitLoad(false);
        return;
      }

      const res = await axiosClient.post('/client/opportunity/submit', body, {headers:{'user': 'cXtdTSxTS0a5nyti9CpGeKokWun2'}});
      setSnackbarMsg('Opportunity submited successfully')
      setTimeout(() => {
        setSnackbarMsg();
      }, 3000);
      setDialogProjectId('')
    } catch (e) {
     
      setErrorMsg('something went wrong,please try again');
      setTimeout(() => {
        setErrorMsg();
      }, 3000);
    }
    setSubmitLoad(false);
  };
  // ----------------------------------------------------------------------------------------------

  useEffect(() => {
    if(totalCost&&!downPayment){
        setDownPayment(+totalCost/10)
      setMaxPerMonth(
        selectedPrice?.paymentYears ?  parseInt((totalCost - (totalCost/10)) / (12 * selectedPrice.paymentYears)):0
      );
    }else if (
      parseInt(
        selectedPrice?.paymentYears ? (totalCost - downPayment) / (12 * selectedPrice.paymentYears):0
      ) !== maxPerMonth
    )
      setMaxPerMonth(
        selectedPrice?.paymentYears ?   parseInt((totalCost - downPayment) / (12 * selectedPrice.paymentYears)):0
      );
  }, [downPayment, totalCost]);
  // ----------------------------------------------------------------------------------------------
  return (
    <div style={{ padding: '20px' }}>
      <ArrowBackTwoToneIcon
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setRenderedComponent('ProJect-Details');
        }}
      />{' '}
      <h3>Submit Opportunity</h3>
      <div className={styles.form_wrapper}>
        <TextField
          value={buyerName}
          onChange={(e) => setClientName(e.target.value)}
          className={styles.text_feild}
          id="client"
          label="Client Name*"
          helperText="Full name for your client"
          variant="outlined"
        />
        <TextField
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className={styles.text_feild}
          id="Mobile"
          label="Mobile*"
          variant="outlined"
        />
        <TextField
          value={developerName}
          className={styles.text_feild}
          disabled
          id="Developer"
          label="Developer*"
          variant="outlined"
        />
        <TextField
          value={projectName}
          className={styles.text_feild}
          disabled
          id="Project"
          label="Project*"
          variant="outlined"
        />

        <FormControl className={styles.select}>
          <InputLabel htmlFor="Types">Type*</InputLabel>
          <Select
            disabled={!types?.length}
            labelId="Types"
            id="Types"
            value={selectedType}
            label="Types"
            onChange={(e) => {
              handleSelectType(e.target.value);
            }}
          >
            {types?.map((type, i) => {
              return (
                <MenuItem key={i} value={type}>
                  {type._id}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/*  */}
        <FormControl className={styles.select}>
          <InputLabel htmlFor="Price">Price*</InputLabel>
          <Select
            labelId="Price"
            id="Price"
            value={selectedPrice}
            label="Price"
            onChange={(e) => {
              setSelectedPrice(e.target.value);
              setTotalCost(e.target.value.priceBase);
            }}
            disabled={!prices?.length}
          >
            {prices?.map((price, i) => {
              return (
                <MenuItem key={i} value={price}>
                  {price?.priceBase.toLocaleString()}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/*  */}
        <Typography id="slider-label" gutterBottom>
          <span style={{ fontWeight: 'bold' }}> Down payment: </span>{' '}
          {downPayment.toLocaleString()} EGP
        </Typography>
        <Slider
          disabled={!selectedPrice}
          value={parseInt(downPayment)}
          max={totalCost}
          aria-labelledby="downPayment-label"
          min={0}
          aria-label="downPayment"
          valueLabelDisplay="off"
          onChange={(e) => {
            setDownPayment(parseInt(e.target.value));
          }}
        />
        {/*  */}
        <Typography id="slider-label" gutterBottom>
          <span style={{ fontWeight: 'bold' }}> installment: </span>{' '}
          {maxPerMonth.toLocaleString()} EGP within{' '}
          {selectedPrice?.paymentYears ? (12 * selectedPrice.paymentYears):0} months
        </Typography>
        <Slider
          disabled={!selectedPrice}
          value={parseInt(totalCost - downPayment)}
          max={totalCost}
          min={0}
          aria-label="PerMonth"
          valueLabelDisplay="off"
          onChange={(e) => {
            setDownPayment(parseInt(totalCost - e.target.value));
          }}
        />
        {/*  */}
        <Typography id="slider-label" gutterBottom>
          <span style={{ fontWeight: 'bold' }}>Max delivery </span>
          {maxDelivery}
        </Typography>
        <Slider
          value={maxDelivery}
          max={3550}
          min={0}
          disabled
          aria-label="Max delivery"
          valueLabelDisplay="auto"
          onChange={(e) => {
            setMaxDelivery(parseInt(totalCost - e.target.value));
          }}
        />
        {/*  */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <input
            style={{ marginRight: '10px', width: '1.2rem', height: '1.2rem' }}
            type="checkbox"
            id="ContactClientDirectly"
            checked={contactDirectlyWithTheClient}
            onChange={() => {
              setContactDirectlyWithTheClient((prev) => !prev);
            }}
            disabled
          />
          <label htmlFor="ContactClientDirectly">Contact Client Directly</label>
        </div>
        {/*  */}
        <Typography color="error" variant="h5">
          This account is not onboarded yet.
        </Typography>
        <div className={styles.submit_button_wrapper}>
          {' '}
          <Button variant="contained" onClick={handleSubmit}>
            {submitLoad && (
              <CircularProgress
                color="inherit"
                sx={{
                  width: '25px !important',
                  height: '25px !important',
                  marginRight: '5px'
                }}
              />
            )}{' '}
            Submit
          </Button>
        </div>
               <div style={{ fontWeight: 'bold' }}>
          *Estimated payment is based on a 10% down payment minimum{' '}
          {selectedPrice?.paymentYears && (
            <span>and {selectedPrice.paymentYears} year payment plan</span>
          )}
          .
        </div>
      </div>
    </div>
  );
};

export { SubmitOppForm };
