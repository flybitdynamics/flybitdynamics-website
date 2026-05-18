import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('🚁 Contact form submission received');
  console.log('📋 Request headers:', req.headers);
  console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
  
  try {
    const { name, email, phone, eventType, eventDate, city, message, submissionTime } = req.body;

    // Validate required fields
    console.log('🔍 Validating required fields...');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Event Type:', eventType);
    console.log('City:', city);
    console.log('Message:', message ? 'Present' : 'Missing');
    
    if (!name || !email || !phone || !eventType || !city || !message) {
      console.log('❌ Validation failed - missing required fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    console.log('✅ Validation passed - all required fields present');

    const transporter = createTransporter();

    // Email content for the business
    const businessEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f5a30a; border-bottom: 2px solid #f5a30a; padding-bottom: 10px;">
          🚁 New Contact Form Submission - FLYBIT Dynamics
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #3D473B; margin-top: 0;">📋 Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>City:</strong> ${city}</p>
        </div>

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #3D473B; margin-top: 0;">🎉 Event Information</h3>
          <p><strong>Event Type:</strong> ${eventType}</p>
          <p><strong>Preferred Date:</strong> ${eventDate || 'Not specified'}</p>
        </div>

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #3D473B; margin-top: 0;">💭 Client Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>

        <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #2d5a2d;">
            <strong>📅 Submission Time:</strong> ${submissionTime || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div>

        <div style="margin-top: 30px; padding: 20px; background-color: #f5a30a; border-radius: 8px; text-align: center;">
          <h3 style="color: white; margin: 0;">Quick Actions</h3>
          <p style="color: white; margin: 10px 0;">
            <a href="mailto:${email}?subject=Re: Your Drone Light Show Inquiry" style="color: white; text-decoration: underline;">📧 Reply via Email</a> | 
            <a href="tel:${phone}" style="color: white; text-decoration: underline;">📞 Call Client</a> | 
            <a href="https://wa.me/${phone.replace(/\D/g, '')}?text=Hi ${name}! Thank you for your interest in our drone light show services. We'll get back to you shortly with a detailed quote." style="color: white; text-decoration: underline;">💬 WhatsApp</a>
          </p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; font-size: 12px; color: #666;">
          <p style="margin: 0;">
            This email was automatically generated from the FLYBIT Dynamics contact form.<br>
            Please respond within 24 hours to maintain excellent customer service.
          </p>
        </div>
      </div>
    `;

    // Email content for the client (confirmation)
    const clientEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #f5a30a; margin-bottom: 10px;">🚁 FLYBIT Dynamics</h1>
          <p style="color: #666; font-size: 18px;">Thank you for your interest!</p>
        </div>

        <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #3D473B; margin-top: 0;">✅ We've Received Your Message</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to FLYBIT Dynamics! We're excited about your interest in our drone light show services.</p>
          
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #f5a30a; margin-top: 0;">📋 Your Inquiry Summary</h3>
            <p><strong>Event Type:</strong> ${eventType}</p>
            <p><strong>Location:</strong> ${city}</p>
            <p><strong>Preferred Date:</strong> ${eventDate || 'To be discussed'}</p>
          </div>

          <p>Our team will review your requirements and get back to you within <strong>24 hours</strong> with:</p>
          <ul style="color: #3D473B;">
            <li>Detailed proposal and pricing</li>
            <li>Available dates and scheduling</li>
            <li>Technical specifications</li>
            <li>Next steps for booking</li>
          </ul>
        </div>

        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2d5a2d; margin-top: 0;">📞 Need Immediate Assistance?</h3>
          <p style="margin-bottom: 15px;">If you need urgent assistance, feel free to contact us directly:</p>
          <p style="margin: 5px 0;"><strong>📞 Phone:</strong> <a href="tel:+919979850863" style="color: #2d5a2d;">+91 9979850863</a></p>
          <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:info@flybitdynamics.com" style="color: #2d5a2d;">info@flybitdynamics.com</a></p>
          <p style="margin: 5px 0;"><strong>💬 WhatsApp:</strong> <a href="https://wa.me/919979850863" style="color: #2d5a2d;">Click to chat</a></p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f5a30a; border-radius: 8px;">
          <h3 style="color: white; margin: 0;">🌟 Why Choose FLYBIT Dynamics?</h3>
          <p style="color: white; margin: 10px 0;">
            • Professional drone light shows across India<br>
            • Custom designs and animations<br>
            • Safety-certified operations<br>
            • 100+ successful events completed
          </p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; font-size: 12px; color: #666; text-align: center;">
          <p style="margin: 0;">
            FLYBIT Dynamics Pvt Ltd<br>
            51.1 Satyamev Eminence, Science City Road, Sola, Ahmedabad 380060<br>
            <a href="https://flybitdynamics.com" style="color: #666;">www.flybitdynamics.com</a>
          </p>
        </div>
      </div>
    `;

    // Send email to business
    const businessMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL || 'info@flybitdynamics.com',
      subject: `🚁 New Contact Form: ${eventType} Event - ${name}`,
      html: businessEmailContent,
    };

    // Send email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting FLYBIT Dynamics - We\'ll get back to you soon!',
      html: clientEmailContent,
    };

    // Send both emails
    console.log('📧 Sending business notification email...');
    await transporter.sendMail(businessMailOptions);
    console.log('✅ Business email sent successfully');
    
    console.log('📧 Sending client confirmation email...');
    await transporter.sendMail(clientMailOptions);
    console.log('✅ Client email sent successfully');

    console.log('🎉 All emails sent successfully');
    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully. Check your email for confirmation.' 
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('🏥 Health check request received');
  res.json({ 
    status: 'OK', 
    message: 'FLYBIT Dynamics backend server is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Test endpoint for debugging
app.get('/api/test', (req, res) => {
  console.log('🧪 Test endpoint hit');
  res.json({ 
    message: 'Backend server is working!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.listen(PORT, () => {
  console.log(`🚁 FLYBIT Dynamics backend server running on port ${PORT}`);
  console.log(`📧 Email notifications will be sent to: ${process.env.TO_EMAIL || 'info@flybitdynamics.com'}`);
}); 