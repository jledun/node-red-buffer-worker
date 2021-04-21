# node-red-contrib-buffer-worker

A Node-RED node to call encode and decode functions of [io-buffer-worker](https://github.com/jledun/io-buffer-worker "io-buffer-worker at github").

It's designed to help communication with PLC via Modbus for example.

Buffer description is set on the node itself.

Please, checkout [io-buffer-worker](https://github.com/jledun/io-buffer-worker "io-buffer-worker at github") README to learn how to build a description file.

## encode node options

* formatter la sortie pour un noeud ModbusWrite

Le noeud ModbusWrite du module node-red-contrib-modbus n'écrit pas un buffer mais un tableau de valeurs entières de 16 bits.

Activer cette option formatte automatiquement le buffer calculé en un tableau de valeurs entières de 16 bits, évitant l'emploi d'une fonction intermédiaire de mise en forme.

* Inverser les octets

Lors de la mise en forme du buffer en un tableau de valeurs entières de 16 bits, cette option permet d'inverser les octets de poids fort et de poids faible, à adapter en fonction de l'automate qui héberge le serveur Modbus.

## decode node options

* Source du buffer

Par défaut : msg.payload

Il peut arriver que le noeud en entrée fournisse un objet dans lequel se trouve le buffer. Décrire alors dans ce champ dans quelle propriété de l'objet source se trouve le buffer attendu.



Enjoy !

Julien Ledun <j.ledun@iosystems.fr>

