import axios from 'axios';


export async function getCustomerId() {
  try {

    const response = await axios.get('/dashboard', {headers: {token: localStorage.token}});
    return (response.data.customer_id);

  } catch (err) {
    console.log(err);
  }
}