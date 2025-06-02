const base = process.env.PAYPAL_API_BASE_URL || 'https://api-m.sandbox.paypal.com';


export const paypalConfig = {

};

// general paypal access token
 async function generateAccessToken() {
    const {PAYPAL_CLIENT_ID,PAYPAL_APP_SECRET} = process.env;
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString('base64');
    const response = await fetch(`${base}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });
    if (!response.ok) {
        throw new Error(`Failed to generate access token: ${response.statusText}`);
    }
    const data = await response.json();
    return data.access_token;   
 }