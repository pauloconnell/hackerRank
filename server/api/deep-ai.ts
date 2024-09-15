// server/api/deep-ai.ts
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event) // Extract the request body
    console.log("inside server...");
    console.log("Server got request ", body)
    // Make a request to the DeepAI API
    const response = await fetch('https://api.deepai.org/api/text-generator', {
      method: 'POST',
      headers: {
        'Api-Key': config.deepAiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if (response.status === 204) {
        console.warn('Received 204 No Content response')
        return { message: 'No content returned from the API' }
      }

      const responseText = await response.text()
    console.log("Server got response ", responseText)
    try{
        const data = await JSON.parse(responseText)
        return data
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
    
  })
  