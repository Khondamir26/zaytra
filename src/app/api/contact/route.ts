import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/mongodb';
import Contact from '@/models/Contact'; // Fixed case sensitivity

export async function POST(request: NextRequest) {
  console.log('🚀 Contact API called');
  
  try {
    // Connect to database
    console.log('📡 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected successfully');

    // Parse request body
    console.log('📝 Parsing request body...');
    const body = await request.json();
    console.log('📋 Request body:', { ...body, message: body.message?.substring(0, 50) + '...' });
    
    const { name, email, company, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create new contact
    console.log('👤 Creating new contact...');
    const contact = new Contact({
      name,
      email,
      company,
      phone,
      service,
      message,
    });

    // Save to database
    console.log('💾 Saving to database...');
    const savedContact = await contact.save();
    console.log('✅ Contact saved successfully:', savedContact._id);

    return NextResponse.json(
      {
        message: 'Contact form submitted successfully',
        contact: {
          id: savedContact._id,
          name: savedContact.name,
          email: savedContact.email,
          createdAt: savedContact.createdAt,
        },
      },
      { status: 201 }
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('💥 API Error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors = Object.values(error.errors).map((err: any) => err.message);
      console.log('🚫 Validation errors:', errors);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Handle duplicate email (if you add unique constraint)
    if (error.code === 11000) {
      console.log('🚫 Duplicate email error');
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    // Handle connection errors
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
      console.log('🌐 Database connection error');
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('📊 GET contacts called');
    await connectDB();
    
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-__v');

    console.log('✅ Retrieved contacts:', contacts.length);
    return NextResponse.json({ contacts });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('💥 GET Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}