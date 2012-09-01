<!DOCTYPE html>
<html>
  <head>
    <title>Game Prototype</title>

    <!-- CSS: Globals -->
    <link rel="stylesheet" type="text/css" href="css/globals.css" />

    <!-- CSS: Page -->
    <link rel="stylesheet" type="text/css" href="css/index.css" />

    <!-- CSS: Modals -->
    <link rel="stylesheet" type="text/css" href="css/modals/gamejoin.css" />

    <!-- CSS: GameField -->
    <link rel="stylesheet" type="text/css" href="css/gamefield.css" />    

    <!-- JS: Dependencies -->
    <script type="text/javascript" src="js/lib/underscore-min.js"></script>
    <script type="text/javascript" src="js/lib/backbone-min.js"></script>
    <script type="text/javascript" src="js/lib/handlebars.js"></script>
    <script type="text/javascript" src="js/lib/jquery-1.8.0.min.js"></script>

    <!-- JS: jQuery Plugins -->
    <script type="text/javascript" src="js/lib/jquery-plugins/simple-modal.js"></script>

    <!-- JS: Core -->
    <script type="text/javascript" src="js/core.js"></script>

    <!-- JS: Game Dependencies -->
    <script type="text/javascript" src="js/modals/gamejoin.js"></script>
    <script type="text/javascript" src="js/gamefield.js"></script>

    <!-- JS: App -->
    <script type="text/javascript" src="js/app.js"></script>
  </head>
  <body>
    <?php include('views/modals/gamejoin.php'); ?>
    <?php include('views/gamefield.php'); ?>
  </body>
</html>
