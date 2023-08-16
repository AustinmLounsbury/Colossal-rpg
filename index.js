const readlineSync = require('readline-sync');

function Character(name, hp, attackPower, inventory) {
  this.name = name;
  this.hp = hp;
  this.attackPower = attackPower;
  this.inventory = inventory;
}

const playerInventory = ['sword', 'shield'];
const heroName = readlineSync.question('What is your name, hero? ');
const hero = new Character(heroName, 200, 15, playerInventory);

const bandit = new Character('Bandit', 25, 10, ['dagger']);
const goblin = new Character('Goblin', 25, 5, ['bonesaw']);
const beast = new Character('Beast', 50, 20, ['claws']);
const titan = new Character('Titan', 75, 25, ['hammer']);
const enemies = [bandit, goblin, beast, titan];

const encounterProbability = 1 / 3;

function checkEnemyEncounter() {
  const randomNum = Math.random();
  if (randomNum < encounterProbability) {
    return true;
  } else {
    return false;
  }
}

function enemyAppearance() {
  if (checkEnemyEncounter()) {
    console.log('An enemy has appeared!');
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    console.log(`Oh no, a new enemy approaches! It's a ${randomEnemy.name}.`);
    const choice = readlineSync.keyInSelect(['Fight', 'Flee', 'Print Inventory'], 'What will you do?');

    if (choice === 0) {
      console.log(`You attack the ${randomEnemy.name}!`);
      fight(randomEnemy);
    } else if (choice === 1) {
      console.log('You run away!');
    } else if (choice === 2) {
      printInventory(hero.inventory);
    } else {
      console.log('You stand there, unsure of what to do...');
    }
  } else {
    console.log('No enemy has appeared.');
  }
}

function fight(randomEnemy) {
  while (hero.hp > 0 && randomEnemy.hp > 0) {
    console.log(`You attack the ${randomEnemy.name} for ${hero.attackPower} damage`);
    randomEnemy.hp -= hero.attackPower;
    console.log(`You get attacked by the ${randomEnemy.name} and take ${randomEnemy.attackPower} damage`);
    hero.hp -= randomEnemy.attackPower;
    console.log(`Hero HP: ${hero.hp}, Enemy HP: ${randomEnemy.hp}`);

    if (randomEnemy.hp <= 0) {
      hero.hp += 20;
      console.log(`After a health potion, your HP is ${hero.hp}`);
      const defeatedEnemyIndex = enemies.indexOf(randomEnemy);
      if (defeatedEnemyIndex !== -1) {
        enemies.splice(defeatedEnemyIndex, 1);
      }
    }

    if (hero.hp <= 0) {
      console.log('You died!');
    }
  }
}

function printInventory(inventory) {
  console.log('Inventory:');
  inventory.forEach(item => {
    console.log(`- ${item}`);
  });
}

while (hero.hp > 0 && enemies.length > 0) {
  console.log('Press "w" to begin walking.');
  const key = readlineSync.keyIn('', { hideEchoBack: true, mask: '' });

  if (key === 'w') {
    console.log('You are now walking...');
    enemyAppearance();
  } else if (key === 'p') {
    printInventory(hero.inventory);
  }
}

if (enemies.length === 0) {
  console.log('You have won');
}




