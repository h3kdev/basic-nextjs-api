const cleverbot = require('cleverbot-free')

export default async function handler(req, res) {
  const { question } = req.body;

  if(!question) {
    return res.status(404).json({
      message: `I can't answer because you entered an empty value.`
    })
  }

  const response = await cleverbot(question)
  res.json({
    question: question,
    response: response
  })
}