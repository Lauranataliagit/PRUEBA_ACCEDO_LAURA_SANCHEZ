<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codigo morse</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <h1>Programa Código Morse</h1>

    <?php

    //Esta clase proporciona métodos para codificar y decodificar mensajes en código Morse
    class convertidorcodigomorse
    {
        //Diccionario de código Morse
        private static $diccionariomorse = [
            'a' => '.-', 'b' => '-...', 'c' => '-.-.', 'd' => '-..', 'e' => '.', 'f' => '..-.',
            'g' => '--. ', 'h' => '....', 'i' => '..', 'j' => '.---', 'k' => '-.-', 'l' => '.-..',
            'm' => '--', 'n' => '-.', 'o' => '---', 'p' => '.--.', 'q' => '--.-', 'r' => '.-.',
            's' => '...', 't' => '-', 'u' => '..-', 'v' => '...-', 'w' => '.--', 'x' => '-..-',
            'y' => '-.--', 'z' => '--..', '0' => '-----', '1' => '.----', '2' => '..---', '3' => '...--',
            '4' => '....-', '5' => '.....', '6' => '-....', '7' => '--...', '8' => '---..', '9' => '----.'
        ];

        //Codifica un mensaje de texto a código Morse
        public static function codificar_morse($mensaje)
        {
            $mensaje = strtolower($mensaje);
            $codificado = '';

            for ($i = 0; $i < strlen($mensaje); $i++) {
                $caracter = $mensaje[$i];
                if (isset(self::$diccionariomorse[$caracter])) {
                    $codificado .= self::$diccionariomorse[$caracter] . ' ';
                } elseif ($caracter == ' ') {
                    $codificado .= '/ ';
                }
            }

            return trim($codificado);
        }


        public static function decodificar_morse($codigoMorse) //Decodifica un mensaje en código Morse a texto
        {
            $decodificado = '';
            $palabrasMorse = explode('/', $codigoMorse);

            foreach ($palabrasMorse as $palabraMorse) {
                $letrasMorse = explode(' ', trim($palabraMorse));
                foreach ($letrasMorse as $letraMorse) {
                    $letra = array_search($letraMorse, self::$diccionariomorse);
                    if ($letra !== false) {
                        $decodificado .= $letra;
                    }
                }
                $decodificado .= ' ';
            }

            return trim($decodificado);
        }
    }
    ?>

    <!-- Formulario para ingresar el texto o código Morse -->
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <label for="entrada">Ingrese el texto o código Morse:</label>
        <input type="text" name="entrada" id="entrada" required>
        <input type="submit" name="codificar" value="Texto a morse">
        <input type="submit" name="decodificar" value="Morse a texto">
    </form>

    <?php
    // Procesar la entrada del usuario
    if (isset($_POST['entrada'])) {
        $entrada = trim($_POST['entrada']);
        if (isset($_POST['codificar'])) {
            $codigoMorse = convertidorcodigomorse::codificar_morse($entrada);
            echo "<div class='result'><p>Código Morse: $codigoMorse</p></div>";
        } elseif (isset($_POST['decodificar'])) {
            $texto = convertidorcodigomorse::decodificar_morse($entrada);
            echo "<div class='result'><p>Texto: $texto</p></div>";
        }
    }
    ?>

</body>

</html>