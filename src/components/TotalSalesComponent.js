import { ThemeProvider } from '@emotion/react'
import React from 'react'
import theme from '../theme/theme'
import { Box, Typography } from '@mui/material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { NumericFormat } from 'react-number-format';
import { FormattedNumber, IntlProvider } from 'react-intl';
const TotalSalesComponent = ({total}) => {
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale="es" defaultLocale="es">
        <Box sx={{
            display:'flex',
            width: '100%',
            padding: "18px",
            borderRadius:"20px",
            backgroundColor:"#FFF",
            flexDirection:'column',
            alignItems:'center',
            gap:'24px'
        }}>
            <Box sx={{display:'flex', gap:'12px', alignItems:'center', justifyContent:'center'}}>
                <MonetizationOnIcon/>
                <Typography variant='h5'>Monto total de ventas (Histórico)</Typography>
            </Box>
            <Typography variant='h3' color={'primary'}><FormattedNumber style="decimal" value={total.total}/></Typography>
        </Box>
        </IntlProvider>
    </ThemeProvider>
  )
}

export default TotalSalesComponent