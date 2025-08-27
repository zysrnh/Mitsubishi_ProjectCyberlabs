<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
    rel="stylesheet">

  @viteReactRefresh
  @vite(['resources/css/app.css', 'resources/js/app.jsx'])
  @inertiaHead
</head>

<body>
  @routes
  @inertia
</body>

</html>
