import OrderService from './../services/ordersService';
export default async function (cb) {
    const { data: clientId } =  await OrderService.getPayPalConfig();
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        cb();
      }
      document.body.appendChild(script)
}