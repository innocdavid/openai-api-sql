import openaiClient from './api.js';

const generate = async queryDescriptor => {
  const response = await openaiClient.createCompletion({
    model: 'text-davinci-003',
    prompt: `Convert the following natural langugage description into SQL query: \n\n${queryDescriptor}.`,
    max_tokens: 100,
    temperature: 0
  })
  return response.data.choices[0].text
}

export default generate;