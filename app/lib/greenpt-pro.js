import axios from 'axios';

const API_URL = 'https://greenpt-pro-api.com';
const API_KEY = process.env.GREENPT_PRO_API_KEY;

export const classifyBin = async (imageUrl, location) => {
  try {
    const res = await axios.post(
      `${API_URL}/classify`,
      { image_url: imageUrl, type: 'bin', location },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
    return {
      binType: res.data.bin_type || 'Unclassified',
      confidence: res.data.confidence || 0.5,
      isReliable: res.data.confidence >= 0.6,
    };
  } catch (err) {
    return { binType: 'Unclassified', confidence: 0.4, isReliable: false };
  }
};