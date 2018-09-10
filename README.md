Star Wars RPG

This is a small game using HTML,CSS,Bootstrap,JS and JQuery. Four combantants are defined with visible health amounts.
They each have a hidden attack and counter-attack value. The game starts with the user selecting one of the four
pre-defined characters. The user will then select another of the remaining 3 characters. An attack button will then
appear. The user then uses the attack button to attack the opponent. The attack value of the selected character that
represents the user's hero then decrements from the opponent's health. This value will increase by it's own value
each attack. The enemy character will then attack using its pre-defined counterattack value. This value never increases
and remains constant. 

The game will continue until either the user runs out of health or the enemy is defeated. If the enemy is defeated the
user then selects another opponent. The game continues per the above criteria until no opponents are left or the
user dies. Either way the reset button then appears and is available for the user to reset the game.

The game also employs error checking. The user cannot select his character as the defender and the attacker. The user
also cannot click on the portrait and is reminded he or she must use the attack or reset button instead UNLESS picking
a new opponent.
