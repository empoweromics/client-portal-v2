import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import styles from './oppDialog.module.css';
import { useEffect, useState } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';

const SubmitOppForm = ({
  setErrorMsg,
  setSnackbarMsg,
  setOpen,
  projectDetails,
  setLoading,
  // setDialogProjectId
}) => {
  const [buyerName, setClientName] = useState('');
  const [mobile, setMobile] = useState('');
  const [projectName, setProjectName] = useState('');
  const [developerName, setDeveloperName] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [prices, setPrices] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [maxPerMonth, setMaxPerMonth] = useState(
    selectedType?.units && selectedType?.units[0]?.paymentYears
      ? parseInt((selectedPrice - downPayment) / (12 * selectedType.units[0].paymentYears))
      : 0
  );
  const [maxDelivery, setMaxDelivery] = useState(2023);
  const [contactDirectlyWithTheClient, setContactDirectlyWithTheClient] =
    useState(true);
  const [submitLoad, setSubmitLoad] = useState(false);
  const [priceStartPoint, setPriceStartPoint] = useState(0);
  const [priceEndPoint, setPriceEndPoint] = useState(0);

  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    getUnits();
    return () => {
      setClientName('');
      setDownPayment(0);
      // setTotalCost(0);
      setMaxPerMonth(0);
      setSelectedPrice(0);
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
  const handleSelectPrice = (selectedType) => {
    const sortedUnits = selectedType?.units?.sort((a, b) => a.priceBase - b.priceBase)
    setPriceEndPoint(sortedUnits[sortedUnits.length - 1]?.priceBase)
    setPriceStartPoint(sortedUnits[0]?.priceBase)
    setSelectedPrice(sortedUnits[0]?.priceBase)
  }
  // ----------------------------------------------------------------------------------------------

  const getUnits = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(
        `/client/project/project/${projectDetails?.project?._id}/units`,
        { headers: { user: 'cXtdTSxTS0a5nyti9CpGeKokWun2' } }
      );
      setTypes(res.data || []);
      setSelectedType(res.data[0]);
      handleSelectPrice(res.data[0])
      // setTotalCost(res.data[0]?.units[0]?.priceBase);
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
    handleSelectPrice(value)
    console.log(value);
    console.log(projectDetails);
  };
  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    if (projectDetails?.project) {
      setProjectName(projectDetails?.project?.i18n?.en?.name || '');
      setDeveloperName(projectDetails?.project?.developer_name || '');
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
          id: projectDetails?.project._id || '',
          name: projectDetails?.project?.i18n?.en?.name || '',
          developer: projectDetails?.project?.developer_name || ''
        },
        // unit: {
        //   id: selectedPrice?.id || '',
        //   priceBase: selectedPrice?.priceBase || '',
        //   spaceBuildUp: selectedPrice?.spaceBuildUp || '',
        //   paymentYears: selectedType?.units&&selectedType?.units[0]?.paymentYears || ''
        // },
        budget: {
          downpayment: downPayment || 0,
          installmentAmountDue: maxPerMonth || '',
          totalNumberOfInstallments: (selectedType?.units[0]?.paymentYears || 8) * 12

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
      console.log(body);
      const res = await axiosClient.post('/client/opportunity/submit', body, {
        headers: { user: 'cXtdTSxTS0a5nyti9CpGeKokWun2' }
      });
      setSnackbarMsg('Opportunity submited successfully');
      setTimeout(() => {
        setSnackbarMsg();
      }, 3000);
      setOpen(false);
    } catch (e) {
      console.log(e);
      setErrorMsg('something went wrong,please try again');
      setTimeout(() => {
        setErrorMsg();
      }, 3000);
    }
    setSubmitLoad(false);
  };
  // ----------------------------------------------------------------------------------------------

  useEffect(() => {

    setMaxPerMonth(
      selectedType?.units && selectedType?.units[0]?.paymentYears
        ? parseInt(
          (selectedPrice - downPayment) / (12 * selectedType.units[0].paymentYears)
        )
        : 0
    );
  }, [downPayment]);
  // ----------------------------------------------------------------------------------------------

  useEffect(() => {
    if (selectedPrice) {
      setDownPayment(+selectedPrice / 10);
      setMaxPerMonth(
        selectedType?.units && selectedType?.units[0]?.paymentYears
          ? parseInt(
            (selectedPrice - selectedPrice / 10) / (12 * selectedType.units[0].paymentYears)
          )
          : 0
      );
    }
  }, [selectedPrice]);
  // ----------------------------------------------------------------------------------------------
  return (
    <div style={{ padding: '20px' }}>
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
                  {type._id}{''} ({type.count})
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/*  */}
        <FormControl className={styles.select}>
          <div
            style={{
              height: '100%',
              display: 'flex',
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

        </FormControl>
        {/*  */}
        <Typography id="slider-label" gutterBottom>
          <span style={{ fontWeight: 'bold' }}>  </span>{' '}
          {selectedPrice ? selectedPrice.toLocaleString() + ' EGP' : null}
        </Typography>
        <Slider
          value={parseInt(selectedPrice)}
          max={priceEndPoint}
          aria-labelledby="price-label"
          min={priceStartPoint}
          aria-label="price"
          valueLabelDisplay="off"
          onChange={(e) => {
            setSelectedPrice(parseInt(e.target.value));
          }}
          step={100000}
          marks
        />
        {/*  */}
        <Typography id="slider-label" gutterBottom>
          <span style={{ fontWeight: 'bold' }}> Down payment: </span>{' '}
          {downPayment.toLocaleString()} EGP
        </Typography>
        <Slider
          disabled={!selectedPrice}
          value={parseInt(downPayment)}
          max={selectedPrice}
          aria-labelledby="downPayment-label"
          min={0}
          aria-label="downPayment"
          valueLabelDisplay="off"
          onChange={(e) => {
            setDownPayment(parseInt(e.target.value));
          }}
        />
        {/*  */}
        <Typography id="slider-label2" gutterBottom>
          <span style={{ fontWeight: 'bold' }}> installment: </span>{' '}
          {maxPerMonth.toLocaleString()} EGP within{' '}
          {selectedType?.units && selectedType?.units[0]?.paymentYears ? 12 * selectedType.units[0].paymentYears : 0}{' '}
          months
        </Typography>
        <Slider
          disabled={!selectedPrice}
          value={parseInt(selectedPrice - downPayment)}
          max={selectedPrice}
          min={0}
          aria-label="PerMonth"
          valueLabelDisplay="off"
          onChange={(e) => {
            setDownPayment(parseInt(selectedPrice - e.target.value));
          }}
        />
        {/*  */}
        <Typography id="slider-label3" gutterBottom>
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
            setMaxDelivery(parseInt(selectedPrice - e.target.value));
          }}
        />

        {/* <Typography color="error" variant="h5">
          This account is not onboarded yet.
        </Typography> */}
        <div className={styles.submit_button_wrapper}>
          {' '}
          <Button
            sx={{ marginTop: '10px' }} variant="contained"
            onClick={handleSubmit}>
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
          {selectedType?.units && selectedType?.units[0]?.paymentYears && (
            <span>and {selectedType.units[0].paymentYears} year payment plan</span>
          )}
          .
        </div>
      </div>
    </div>
  );
};

export { SubmitOppForm };
