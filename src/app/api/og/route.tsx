import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get parameters from URL
    const title = searchParams.get('title') || 'Julian Nicácio Garin Brandalise';
    const subtitle = searchParams.get('subtitle') || 'Blockchain & Smart Contract Engineer';
    const type = searchParams.get('type') || 'website';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%)',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
                linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '80px',
              zIndex: 1,
            }}
          >
            {/* Logo/Avatar placeholder */}
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '60px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              JN
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: type === 'project' ? '56px' : '72px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '20px',
                lineHeight: 1.1,
                maxWidth: '900px',
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '32px',
                color: '#a1a1aa',
                marginBottom: '40px',
                maxWidth: '800px',
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </p>

            {/* Accent line */}
            <div
              style={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* Bottom branding */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              display: 'flex',
              alignItems: 'center',
              color: '#71717a',
              fontSize: '20px',
            }}
          >
            juliannic.dev
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG Image generation error:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}