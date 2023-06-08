import { ThemeProvider } from '@emotion/react'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import theme from '../theme/theme'

const HistoryComponent = ({history}) => {
  return (
    <ThemeProvider theme={theme}>
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
            alignContent:'flex-start',
            alignItems:'space-between',
            width: '100%',
            padding: "16px",
            borderRadius:"20px",
            backgroundColor:"#FFF",
            mb:8,
            gap:"12px"

        }}>
            <Typography variant='h6'>Últimos números contactados </Typography>
            <List>
                {history.length>0 && history.map((booking)=>(

                
                <ListItem key={booking.timestamp} sx={{
                    borderBottom:"2px solid #F4F3FA"
                    
                }}>
                    <ListItemAvatar>
                        <Avatar/>
                    </ListItemAvatar>
                    <ListItemText primary={booking.phone.match(/\d+/g).join('')} secondary={<p>{new Date(booking.timestamp).toLocaleString()}</p>}>
                        
                        
                    </ListItemText>
                    
                </ListItem>
                ))}
            </List>

        </Box>

    </ThemeProvider>
  )
}

export default HistoryComponent