// /app/api/vendor/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectVendorDB } from '@/lib/mongodb';
import Vendor from '@/models/Vendor';

export async function POST(request: NextRequest) {
    console.log('🚀 Vendor API called');

    try {
        // 1. Подключение к базе данных
        console.log('📡 Connecting to Vendor database...');
        await connectVendorDB();
        console.log('✅ Vendor DB connected');

        // 2. Парсинг тела запроса
        const body = await request.json();
        console.log('📋 Parsed fields:', {
            legalCompanyName: body.legalCompanyName,
            productName: body.productName,
            contactEmail: body.contactEmail,
        });

        // 3. Преобразование данных формы
        const transformedBody = {
            ...body,
            agreeToTerms: body.agreeToTerms === 'on' || body.agreeToTerms === true,
            agreeToContact: body.agreeToContact === 'on' || body.agreeToContact === true,
            pitchDeck: typeof body.pitchDeck === 'string' ? body.pitchDeck : '',
            testimonialsFile: typeof body.testimonialsFile === 'string' ? body.testimonialsFile : '',
            submissionDate: body.submissionDate || new Date().toISOString(),
        };

        // 4. Валидация обязательных полей
        const requiredFields = ['legalCompanyName', 'contactEmail', 'productName', 'agreeToTerms'];
        const missingFields = requiredFields.filter((field) => !transformedBody[field]);

        if (missingFields.length > 0) {
            console.log('❌ Missing required fields:', missingFields);
            return NextResponse.json(
                { error: 'Missing required fields', details: missingFields },
                { status: 400 }
            );
        }

        // 5. Сохранение в базу данных
        const newVendor = new Vendor(transformedBody);
        const savedVendor = await newVendor.save();
        console.log('✅ Vendor saved:', savedVendor._id);

        // 6. Ответ клиенту
        return NextResponse.json(
            {
                message: 'Vendor form submitted successfully',
                vendor: {
                    id: savedVendor._id,
                    legalCompanyName: savedVendor.legalCompanyName,
                    contactEmail: savedVendor.contactEmail,
                    createdAt: savedVendor.createdAt,
                },
            },
            { status: 201 }
        );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('💥 Server error:', error);

        if (error.name === 'ValidationError') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const validationErrors = Object.values(error.errors).map((err: any) => err.message);
            return NextResponse.json(
                { error: 'Validation failed', details: validationErrors },
                { status: 400 }
            );
        }

        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Duplicate entry detected' },
                { status: 409 }
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
        console.log('📊 Fetching vendors...');
        await connectVendorDB();

        const vendors = await Vendor.find({})
            .sort({ createdAt: -1 })
            .limit(50)
            .select('-__v');

        console.log(`✅ ${vendors.length} vendors retrieved`);
        return NextResponse.json({ vendors });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('💥 GET error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
