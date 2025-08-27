<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8" />
  <title>Konfirmasi Registrasi</title>
</head>

<body style="margin:0; padding:0; background-color:#0a0a0a; font-family:Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
    background="{{ config('app.url') }}/images/bg-1_compressed.jpg"
    style="background-color:#0a0a0a; background-size:cover; background-position:center;">
    <tr>
      <td align="center">
        <!-- Outer container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
          style="background-color:rgba(0,0,0,0.85);">

          <!-- Header -->
          <tr>
            <td style="padding:30px; text-align:center;">
              <img src="{{ config('app.url') }}/images/logo-ika-ismei_compressed.png" alt="Logo IKA ISMEI"
                style="height:80px; max-width:200px; width:auto; display:block; margin:0 auto;" />
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:20px 30px; text-align:center;">
              <h1 style="font-size:26px; font-weight:bold; margin:0 0 20px 0; color:#ECAF16;">
                REGISTRASI BERHASIL!
              </h1>

              {{-- Optional event name --}}
              @isset($event_name)
                <p style="font-size:18px; margin:0 0 25px 0; color:#ffffff;">
                  Acara: {{ Str::title($event_name) }}
                </p>
              @endisset

              <!-- QR Code -->
              <img src="{{ $message->embed($registration->qr_path) }}" alt="QR Code"
                style="display:block; margin:0 auto; border:4px solid #ffffff; max-width:250px; width:100%; height:auto;" />
              <p style="margin-top:20px; font-size:14px; line-height:1.5; color:#cccccc;">
                Simpan QR Code ini dan tunjukkan saat acara.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#000000; padding:15px; text-align:center; font-size:12px; color:#999999;">
              Copyright © 2025 Alcomedia.id | Powered By Alco Media Indonesia
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>

</html>
