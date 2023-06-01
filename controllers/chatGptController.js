import axios from "axios"

export const makeMessage = async (req, res) => {
  try {
    let { mlMessage } = req.body;
    const axiosRequest = axios.create({
      baseURL: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-pLEJtwyQeOB1a2jMDT7fT3BIbkFJnaqEo3RLEOMR2YNiTXWE'
      }
    })

    let result = await axiosRequest.post('', {
      model: 'gpt-3.5-turbo-0301',
      messages: mlMessage,
      stream: true
    })

    res.json({
      success: true,
      data: {
        result,
        msg: "Successfully sent."
      }
    })
    console.log('---------------try start----------------')
    console.log(result)
    console.log('---------------try end----------------')
  } catch (err) {
    console.log('---------------catch start----------------')
    console.log(err)
    console.log('---------------catch end----------------')
    res.json({
      success: false,
      data: {
        msg: err.message
      }
    });
  }
}