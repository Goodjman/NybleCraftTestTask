import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import upload from './upload';
import User from './models/user.model';
import  generatePDF  from './pdf';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/users/upload', upload.single('image'), async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    const image = req.file?.filename;

    // Create a new user with the uploaded image
    const user = await User.create({
      email,
      firstName,
      lastName,
      image,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.post('/users/pdf', async (req, res) => {
  try {
    const { email } = req.body;

    // Generate the PDF for the user
    await generatePDF(email);

    res.status(200).send('PDF generated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});



/* terminal test 
curl --location --request POST 'http://localhost:3000/users/upload'
--header 'Content-Type: application/json'
--data-raw '{
"email": "john.doe@example.com",
"firstName": "John",
"lastName": "Doe",
"image": "image.jpg"
}'

curl --location --request POST 'http://localhost:3000/users/pdf'
--header 'Content-Type: application/json'
--data-raw '{
"email": "john.doe@example.com"
}'
*/