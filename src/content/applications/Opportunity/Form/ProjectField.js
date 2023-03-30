import React, { useCallback, useState } from 'react';
import { Autocomplete, debounce, TextField } from '@mui/material';
import projects from 'src/data/projects.json';

let projectOptions = projects.features.map((features) => features.properties);
export default function ProjectField({
  setSelectedProject,
  errors,
  onChange,
  setError
}) {
  const [options, setOptions] = useState(projectOptions);

  //   const defaultProps = {
  //     options: projects.features.map((features) => features.properties),
  //     getOptionLabel: (option) => option.name
  //   };

  function onInputChange(text) {
    let newOptions = projectOptions.filter((ele) => {
      return ele.name.includes(text);
    });
    setOptions(newOptions);
    if (newOptions.length <= 0) {
      setError('project', { type: 'custom', message: '*required' });
    }
    // console.log('onInputChange', text);
    // console.log(data.features);
  }
  const debouncedOnChange = useCallback(debounce(onInputChange, 500), []);
  return (
    <>
      <Autocomplete
        onChange={(event, values) => {
          console.log('onChange', values);
          onChange(values);
          setSelectedProject(values.name);
        }}
        options={options}
        getOptionLabel={(option) => option.name}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!errors.project}
            helperText={errors.project?.message}
            label="Name"
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            fullWidth
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.code}>
              {option.name}
            </li>
          );
        }}
        onInputChange={(event, newInputValue) => {
          if (newInputValue.trim()) debouncedOnChange(newInputValue);
        }}
        // onInputChange={debouncedOnChange}
      />
    </>
  );
}
