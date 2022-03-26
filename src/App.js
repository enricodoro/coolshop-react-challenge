import { Button, Container, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins'
  },
});

function App() {
  const [rows, setRows] = useState([{op: 0, value: "", disabled: false}])
  const [total, setTotal] = useState(0)

  const handleChangeValue = (v, i) => {
    let newRows = [...rows]
    let newRow  = {...newRows[i], value: v}
    newRows[i] = newRow
    setRows(newRows)
  }

  const handleChangeOperator = (v, i) => {
    let newRows = [...rows]
    let newRow  = {...newRows[i], op: v}
    newRows[i] = newRow
    setRows(newRows)
  }

  const handleDelete = (i) => {
    let newRows = rows.filter((r,j) => j !== i)
    setRows(newRows)
  }

  const handleDisable = (i) => {
    let newRows = [...rows]
    let newRow  = {...newRows[i]}
    newRow.disabled = !newRow.disabled
    newRows[i] = newRow
    setRows(newRows)
  }

  const handleAdd = () => {
    var newRow = {
      op: 0,
      value: '',
      disabled: false,
    }
    setRows(old => old.concat(newRow))
  }

  useEffect(() => {
    let sum = 0
    rows.forEach(r => {
      if(!r.disabled)
        r.op === 0 ? sum += +r.value : sum -= +r.value
    })
    setTotal(sum)
  }, [rows])

  return <ThemeProvider theme={theme}>
  <Container sx={{maxWidth: 'lg', my: '32px'}}>
    <Typography variant='h4' textAlign="center">
      REACT CALCULATOR
    </Typography>
    <Stack gap={1} alignItems="center" justifyContent="center" sx={{mt: '32px'}}>
      <Button sx={{mb: '32px'}} variant='contained' onClick={handleAdd}>Add row</Button>
      {rows.map((v,i) => 
        <Stack direction="row" gap={2} key={i} alignItems="center" justifyContent="center">
          <Select disabled={v.disabled} sx={{ width: '64px'}} value={v.op} onChange={(e) => handleChangeOperator(e.target.value, i)}>
            <MenuItem value={0}>+</MenuItem>
            <MenuItem value={1}>-</MenuItem>
          </Select>
          <TextField disabled={v.disabled} type='number' value={v.value} onChange={(e) => handleChangeValue(e.target.value, i)}/>
          <Button sx={{width: '100px'}} variant='contained' onClick={() => handleDelete(i)}>Delete</Button>
          <Button color={v.disabled ? 'success' : 'error'} sx={{width: '100px'}} variant='contained' onClick={() => handleDisable(i)}>{v.disabled ? 'Enable' : 'Disable'}</Button>
        </Stack>
      )}
      <Typography sx={{backgroundColor: 'lightblue', borderRadius: '16px', padding: '16px', mt: '32px'}} >Result = {total}</Typography>
    </Stack>
  </Container>
  </ThemeProvider>
}

export default App;
