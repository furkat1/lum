export const refreshSession = async () => {
  const res = await fetch('/api/refresh-session', {
    method: 'POST'
  });
  const data = await res.json();
  if (data.success) {
    console.log('session updated!')
  } else {
    console.log('session update failed')
  }
};