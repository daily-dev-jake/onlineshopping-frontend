import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard({order}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="random phone"
        height="140"
        image="https://images.pexels.com/photos/263564/pexels-photo-263564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {order.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Order ID: {order.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Shipping address: {order.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Order date: {order.order_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Shipping Date: {order.shipping_date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{order.order_amount}</Button>
      </CardActions>
    </Card>
  );
}
