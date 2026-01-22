import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();
    const refCode = `WL-${Math.floor(1000 + Math.random() * 9000)}`;

    // 1. Save to database
    const { error } = await supabase
      .from('Wishlist')
      .insert({ email, ref_code: refCode });

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Already Wishlisted!!' },
          { status: 400 }
        );
      } else {
        console.error('Database Error:', error);
        return NextResponse.json(
          { error: 'Something went wrong, try again later!!' },
          { status: 500 }
        );
      }
    }

    // 2. Send confirmation email
    const { data, error: resendError } = await resend.emails.send({
      from: 'Kunal from DapLink <onboarding@daplink.online>',
      to: email,
      subject: 'Welcome to the Founders Club 👑',
      html: `
      <div style="background:#f8fafc;padding:40px 16px;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;border:3px solid #0d0d0d;box-shadow:6px 6px 0 #0d0d0d;padding:32px;">
          
          <div style="font-size:24px;font-weight:900;letter-spacing:-0.03em; display:flex; align-items:center; gap: 8px;">
             DapLink <span style="font-size: 12px; background: #000; color: #fff; padding: 2px 6px; margin-left: 8px;">BETA</span>
          </div>

          <div style="height:3px;background:#0d0d0d;margin:20px 0;"></div>

          <h1 style="font-size:28px;font-weight:900;line-height:1.1;margin:0 0 16px 0;text-transform:uppercase;">
            You’re officially in.
          </h1>

          <div style="margin: 24px 0;">
            <div style="display:inline-block; background:#facc15; border:3px solid #0d0d0d; padding:12px 20px; box-shadow:4px 4px 0 #0d0d0d;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px; font-size:24px; line-height:1;">👑</td>
                  <td>
                    <div style="font-family:'Plus Jakarta Sans',sans-serif; font-weight:900; font-size:14px; text-transform:uppercase; color:#0d0d0d; letter-spacing:0.05em; line-height:1.2;">
                      Founding Member
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#4b3804;">
                      BATCH: EARLY ADOPTER
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <p style="font-size:16px;font-weight:600;line-height:1.6;color:#374151;margin:0 0 20px 0;">
            Welcome to the <strong>DapLink Wishlist</strong>.  
            Your early access is secured, and you’re now in line for priority username selection and exclusive launch perks.
          </p>

          <div style="border:3px solid #0d0d0d;padding:14px 16px;font-family:monospace;font-size:14px;font-weight:700;background:#f8fafc;margin-bottom:24px;">
            REF ID: ${refCode}
          </div>

          <ul style="padding-left:18px;margin:0 0 24px 0;color:#374151;font-size:14px;font-weight:600;">
            <li style="margin-bottom: 8px;">Priority handle reservation</li>
            <li style="margin-bottom: 8px;">Early beta access</li>
            <li>Founders-only premium themes</li>
          </ul>

          <div style="margin-bottom:28px;">
            <a href="https://daplink.online" style="text-decoration:none; display:inline-block;background:#0d0d0d;color:#ffffff;padding:12px 20px;font-weight:900;text-transform:uppercase;letter-spacing:0.05em;border:3px solid #0d0d0d;box-shadow:4px 4px 0 #6366f1;">
              Visit Website
            </a>
          </div>

          <p style="font-size:12px;color:#6b7280;line-height:1.5;margin:0;">
            We’ll notify you as soon as DapLink opens its doors.<br />
            Until then — build boldly.
          </p>

          <p style="font-size:12px;font-weight:700;margin-top:12px;">
            — Team DapLink
          </p>

        </div>

        <div style="text-align:center;font-size:10px;color:#9ca3af;margin-top:16px;letter-spacing:0.2em;">
          EST. 2026 • MADE FOR CREATORS AND PROFESSIONALS
        </div>
      </div>
    `,
    });

    if (resendError) {
      console.error("Resend Error:", resendError);
      return NextResponse.json(
        { error: `Email failed: ${resendError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ refCode });
    
  } catch (err) {
    console.error("Unexpected Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}