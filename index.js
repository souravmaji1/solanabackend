const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const supabaseClient = createClient(
  'https://ddulendmmwvosojiudpj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkdWxlbmRtbXd2b3Nvaml1ZHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4OTU0NzEsImV4cCI6MjAyOTQ3MTQ3MX0.lqitb7qGt0GB_oq1WkZ5ZOlvve-xsNKfEv9i00CkVL4'
);

app.use(express.json()); // Parse JSON request bodies
app.use(cors());



app.post('/api/store-wallet-address', async (req, res) => {
  const { vote } = req.body;

  try {
    // Insert the wallet address and card ID into your Supabase table
    const { data, error } = await supabaseClient
    .from('solanavoting')
    .insert([{ [vote]: 1 }]);

  if (error) {
    console.error('Error inserting data:', error);
    return res.status(500).json({ error: 'Failed to store wallet address and vote' });
  }

  console.log('Data inserted successfully:', data);
  return res.json({ message: 'Wallet address stored and vote counted' });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const { data, error } = await supabaseClient
    .from('solanavoting')
    .select("*")

  if (error) {
    console.error('Error inserting data:', error);
    return res.status(500).json({ error: 'Failed to store wallet address and vote' });
  }

  console.log('wallet address fetched successfully:');
  return res.json(data);
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/api/fetch-wallet-address', async (req, res) => {
  try {
    const { data, error } = await supabaseClient
    .from('solanavoting')
    .select('walletaddress')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error inserting data:', error);
    return res.status(500).json({ error: 'Failed to store wallet address and vote' });
  }

  console.log('wallet address fetched successfully:');
  return res.json(data[0].walletaddress);
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});