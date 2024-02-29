export const jobStartedNotification = async (customerExpoPushToken: string, jobID: string) => {
  const message = {
    to: customerExpoPushToken,
    sound: 'default',
    title: 'Pixxie',
    body: 'Your service has started!',
    data: { jobID: jobID }
  };

  //replace with own api from the backend: To be tested yet
  // https://url/push-notifications/create
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });
};

export const sendJobRequestNotification = async (barberExpoPushToken: string, jobRequestID: string) => {
  const message = {
    to: barberExpoPushToken,
    sound: 'default',
    title: 'Pixxie',
    body: 'You have a new job request!',
    data: { jobRequestID: jobRequestID }
  };
console.log('barberExpoPushToken', barberExpoPushToken);
  //replace with own api from the backend: To be tested yet
  // https://url/push-notifications/create
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });
}

