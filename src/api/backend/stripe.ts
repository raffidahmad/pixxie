export const fetchPaymentSheetParams = async ({ session }) => {
  const response = await fetch(`http://192.168.10.5:3000/stripe/payment-sheet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: session?.id,
      displayName: session?.displayName,
      email: session?.email,
      phoneNumber: session?.phoneNumber,
      stripeID: session?.stripe ? session.stripe.ID : null
    })
  });

  const { setupIntent, ephemeralKey, customer } = await response.json();
  console.log('setupIntent', customer);

  return {
    setupIntent,
    ephemeralKey,
    customer
  };
};

export const fetchPaymentMethods = async ({ session }) => {
  const response = await fetch(`http://192.168.10.5:3000/stripe/payment-methods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      stripeID: session.stripe.ID
    })
  });

  const { cards } = await response.json();

  return cards;
};
