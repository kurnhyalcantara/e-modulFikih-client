import React, { useContext } from 'react';
import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import { GlobalState } from '../../GlobalState';
import { BootstrapedInput, SelectInputStyled } from '../Input/BootstrapedInput';
import { useState } from 'react';

const Filter = () => {
  const state = useContext(GlobalState);
  const [kelas, setKelas] = useState('tujuh'); // TODO: we will using state.courseClassAPI.class;
  const [search, setSearch] = state.courseAPI.search;

  return (
    <Grid container spacing={4} sx={{ mb: 6 }}>
      <Grid item md={3} xs={12}>
        <FormControl fullWidth variant="standard">
          <Select
            id="select-class-category"
            fullWidth
            onChange={(e) => setKelas(e.target.value)}
            value={kelas}
            input={<SelectInputStyled />}
          >
            <MenuItem value={''}>Semua</MenuItem>
            <MenuItem value={'tujuh'}>Kelas VII</MenuItem>
            <MenuItem value={'delapan'}>Kelas VIII</MenuItem>
            <MenuItem value={'sembilan'}>Kelas IX</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={9} xs={12}>
        <FormControl fullWidth variant="standard">
          <BootstrapedInput
            id="search-courses"
            variant="outlined"
            placeholder="Cari Materi"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          ></BootstrapedInput>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filter;
