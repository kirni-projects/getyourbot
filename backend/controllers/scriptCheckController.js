
import axios from 'axios';

export const checkScript = async (req, res) => {
    const { domainURL, eid } = req.query;

    if (!domainURL) {
      return res.status(400).json({ message: 'domainURL is required' });
    }
  
    try {
      // Determine the appropriate URL based on the environment
      const formattedURL = domainURL.startsWith('http://') || domainURL.startsWith('https://')
        ? domainURL
        : `https://${domainURL}`; // You might want to enforce HTTPS in production
  
      // Log the formatted URL for debugging
      console.log('Formatted URL:', formattedURL);
  
      const response = await axios.get(formattedURL);
  
      // Use the production URL for the script tag
      const scriptTag = `<script type='module' src='${process.env.LOCAL_URL}/widget.js' data-id='chatbot-${eid}'></script>`;
      const isScriptPresent = response.data.includes(scriptTag);
  
      if (isScriptPresent) {
        return res.status(200).json({ success: true, message: 'Script is present' });
      } else {
        return res.status(404).json({ success: false, message: 'Script not found' });
      }
    } catch (error) {
      console.error('Error fetching domain HTML:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch domain HTML', error: error.message });
    }
};