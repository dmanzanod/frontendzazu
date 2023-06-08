import { Box, Typography } from '@mui/material'
import React from 'react'

const TermsAndConditionsComponent = () => {
  return (
    <Box sx={{
        width:'90%',
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'center',
        gap:'14px',
        mt:4,
        mb:4
    }}>
        <Typography variant='h4'>Términos y Condiciones del Servicio de Suscripción de Chatbot de Atención al Cliente</Typography>
        <Typography variant='subtitle1'>Estos términos y condiciones (en adelante, "los Términos") establecen los derechos y obligaciones tanto del proveedor del servicio como del cliente en relación con el servicio de suscripción de chatbot de atención al cliente (en adelante, "el Servicio"). Al utilizar el Servicio, usted acepta cumplir y estar sujeto a estos Términos. Si no está de acuerdo con alguno de los términos aquí establecidos, no utilice el Servicio.</Typography>
        <Typography variant='h5'>Definiciones</Typography>
        <ol type='a'>
            <li>"Proveedor del Servicio": se refiere a Zazú Technology que ofrece el Servicio de suscripción de chatbot de atención al cliente.</li>
            <li>"Cliente": se refiere a cualquier entidad o persona física que suscriba y utilice el Servicio ofrecido por el Proveedor del Servicio.</li>
            <li>"Chatbot": se refiere a un programa de inteligencia artificial diseñado para interactuar con los usuarios y brindar servicios de atención al cliente automatizado.</li>
        </ol>
        <Typography variant='h5'>
            Suscripción y Pago
        </Typography>
        <ol type='a'>
            <li>El Cliente puede suscribirse al Servicio mediante el pago anticipado de una tarifa mensual o semestral, según se acuerde entre el Cliente y el Proveedor del Servicio.</li>
            <li>El Cliente debe realizar el pago correspondiente antes de que comience cada período de suscripción. El Proveedor del Servicio se reserva el derecho de suspender el Servicio en caso de incumplimiento del pago.</li>
            <li>El Cliente reconoce que la tarifa de suscripción es no reembolsable, incluso si el Cliente decide cancelar el Servicio antes del final del período de suscripción.</li>
        </ol>
        <Typography variant='h5'>
           Propiedad del Chatbot 
        </Typography>
        <ol type='a'>
            <li>El Cliente comprende y acepta que el Proveedor del Servicio retiene la propiedad exclusiva de los chatbots proporcionados como parte del Servicio. El Cliente solo tiene derecho a utilizar los chatbots durante el período de suscripción y de acuerdo con los términos establecidos en este documento.</li>
            <li>El Cliente se compromete a no copiar, modificar, distribuir, vender o transferir los chatbots a terceros sin el consentimiento previo por escrito del Proveedor del Servicio.</li>
        </ol>
        
        <Typography variant='h5'>
            Datos y Privacidad
        </Typography>
        <ol type='a'>
            <li>El Proveedor del Servicio se compromete a recopilar y mantener los datos generados por el tráfico de los chatbots utilizados por el Cliente. Estos datos incluyen, pero no se limitan a, las métricas de rendimiento y las interacciones de los usuarios.</li>
            <li>El Proveedor del Servicio compartirá los datos generados por el tráfico con el Cliente mediante la entrega de informes de métricas periódicos. Estos informes serán proporcionados al Cliente durante el período de suscripción y se utilizarán únicamente con fines de análisis y mejora del Servicio.</li>
            <li>El Cliente reconoce que el Proveedor del Servicio puede recopilar y utilizar los datos generados por el tráfico de los chatbots de manera anónima y agregada para mejorar sus servicios, siempre respetando la privacidad de los usuarios.</li>
        </ol>
        <Typography variant='h5'>
Limitación de Responsabilidad
        </Typography>
        <ol type='a'>
            <li>El Proveedor del Servicio se esforzará por garantizar la disponibilidad y el rendimiento óptimo del Servicio. Sin embargo, el Cliente reconoce que el Servicio puede estar sujeto a interrupciones temporales debido a factores fuera del control del Proveedor del Servicio, como fallas técnicas, mantenimiento programado o situaciones de fuerza mayor.</li>
            <li>El Proveedor del Servicio no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de uso del Servicio, incluso si se ha informado de la posibilidad de dichos daños.</li>
        </ol>
        <Typography variant='h5' textAlign={'left'}>
Modificaciones y Terminación
        </Typography>
        <ol type='a'>
            <li>El Proveedor del Servicio se reserva el derecho de realizar modificaciones en los presentes Términos en cualquier momento. El Cliente será notificado de dichas modificaciones y deberá aceptar los nuevos términos para continuar utilizando el Servicio.</li>
            <li>Cualquiera de las partes puede dar por terminado este acuerdo mediante notificación por escrito a la otra parte con un preaviso razonable. En caso de terminación, el Cliente no tendrá derecho a ningún reembolso por las tarifas de suscripción no utilizadas.</li>
        </ol>
        <Typography variant='h5'>
Ley Aplicable y Jurisdicción
        </Typography>
        <ol type='a'>
            <li>Estos Términos se regirán e interpretarán de acuerdo con las leyes de Bolivia. Cualquier disputa que surja de o en relación con estos Términos estará sujeta a la jurisdicción exclusiva de los tribunales de la Ciudad de Santa Cruz de la Sierra</li>
           
        </ol>

    <Typography variant='subtitle1'>
    <strong>Al utilizar el Servicio de suscripción de chatbots de atención al cliente, el Cliente declara y garantiza que ha leído, comprendido y aceptado los presentes Términos y Condiciones.</strong>
    </Typography>

    </Box>
  )
}

export default TermsAndConditionsComponent