<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>Konfirmasi Registrasi</title>
</head>

<body style="margin:0; padding:0; background-color:#0a0a0a; color:#ffffff; font-family:Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center">
        <!-- Outer container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
          style="background-color:#0a0a0a;">

          <!-- Header -->
          <tr>
            <td style="padding:20px; text-align:left;">
              {{-- <img src="https://dummyimage.com/160x80/ffffff/000000&text=SBY+Logo" alt="SBY Logo"
                style="height:60px; vertical-align:middle;" /> --}}
              <img src="{{ config('app.url') }}/images/sbyart-logo.png" alt="SBY Logo"
                style="height:60px; vertical-align:middle;" />
            </td>
            <td style="padding:20px; text-align:right;">
              {{-- <img src="https://dummyimage.com/100x60/ffffff/000000&text=EKRAF" alt="EKRAF Logo"
                style="height:40px; vertical-align:middle; margin-right:5px;" />
              <img src="https://dummyimage.com/100x60/ffffff/000000&text=KEMENBUD" alt="KEMENBUD Logo"
                style="height:40px; vertical-align:middle;" /> --}}
              <img src="{{ config('app.url') }}/images/ekraf-text-white.png" alt="EKRAF Logo" style="height:40px; vertical-align:middle; margin-right:5px;" />
              <img src="{{ config('app.url') }}/images/kkri-text-white.png" alt="KEMENBUD Logo"
                style="height:40px; vertical-align:middle;" />
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td colspan="2" style="padding:30px; text-align:center;">
              <h1 style="font-size:24px; font-weight:bold; margin:0; color:#ffffff;">REGISTRASI BERHASIL!</h1>
              <p style="font-size:18px; margin:10px 0 30px 0; color:#ffffff;">
                Acara: {{ Str::title($event_name) }}
              </p>

              <!-- QR Code -->
              <img src="{{ $message->embed($registration->qr_path) }}" alt="QR Code"
                style="display:block; margin:0 auto; border:4px solid #ffffff;" />
              {{-- <img src="https://dummyimage.com/200x200/ffffff/000000&text=QR+Code" alt="QR Code"
                style="display:block; margin:0 auto; border:4px solid #ffffff;" /> --}}

              <!-- Thank you message -->
              <p style="margin-top:20px; font-size:14px; line-height:1.5; color:#cccccc;">
                Terima kasih telah melakukan registrasi.<br>
                Silakan simpan QR Code ini dan tunjukkan saat acara.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td colspan="2"
              style="background-color:#000000; padding:15px; text-align:center; font-size:12px; color:#999999;">
              Copyright © 2025 Alcomedia.id | Powered By Alco Media Indonesia
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>

</html>
