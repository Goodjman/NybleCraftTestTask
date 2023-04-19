import PDFDocument from 'pdfkit';
import User from './models/user.model';
import fs from 'fs';
import path from 'path';

const generatePDF = async (email: string) => {
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    // Create a new PDF document
    const pdf = new PDFDocument();
    pdf.pipe(fs.createWriteStream(path.join(__dirname, 'pdfs', `${user.id}.pdf`)));

    // Add the user's name and image to the PDF
    pdf.fontSize(20).text(`${user.firstName} ${user.lastName}`);
    pdf.image(path.join(__dirname, 'uploads', user.image), { width: 200 });

    pdf.end();

    // Update the user's record in the database with the PDF file
    user.pdf = fs.readFileSync(path.join(__dirname, 'pdfs', `${user.id}.pdf`));
    await user.save();
  } catch (error) {
    console.error(error);
  }
};

export default generatePDF;
