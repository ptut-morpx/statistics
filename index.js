const express=require('express');
const app=express();

const PORT=3000;
const DIRECTORY=process.argv[2] || 'data';

const readData=require('./readData');

app.use(express.static(__dirname+'/public'));
app.get('/data.json', async (req, res) => res.json(await readData(DIRECTORY)));
app.listen(PORT, () => {
	console.log("http://127.0.0.1:"+PORT);
});
