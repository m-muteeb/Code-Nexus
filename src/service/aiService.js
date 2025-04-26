// src/services/aiService.js
export const checkAdAuthenticity = async (url) => {
    const response = await fetch('https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: url }),
    });
  
    const data = await response.json();
    return data[0].label === 'LABEL_1' ? 'Fake' : 'Real';
  };
  