import { Roles } from "./roles.js";
import { Player } from "./players.js";

export class Game {
  constructor() {
    this.players = [];
    this.round = 1;
    this.deathsThisRound = [];
  }

  initGame(playerNames) {
    const roles = this.assignRoles(playerNames.length);

    this.players = playerNames.map((name, i) =>
      new Player(i, name, roles[i], name === "YOU")
    );
  }

  assignRoles(count) {
    const roles = [
      "Killer",
      "Detective",
      "Doctor",
      "Witch",
    ];

    while (roles.length < count) {
      roles.push("Innocent");
    }

    return this.shuffle(roles);
  }

  startRound() {
    this.resetRoundState();

    // 1. abilities phase
    for (const player of this.players) {
      if (!player.alive) continue;

      const role = Roles[player.roleName];
      role.ability(this, player);
    }

    // 2. resolve deaths
    this.resolveDeaths();

    // 3. check win
    this.checkWin();
  }

  markForDeath(player) {
    if (!player.protected) {
      this.deathsThisRound.push(player);
    }
  }

  resolveDeaths() {
    for (const p of this.deathsThisRound) {
      p.alive = false;
    }
  }

  resetRoundState() {
    this.deathsThisRound = [];

    for (const p of this.players) {
      p.blocked = false;
      p.protected = false;
    }
  }

  getAlivePlayers() {
    return this.players.filter(p => p.alive);
  }

  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  // placeholder UI hooks
  chooseKillerTarget(user) {}
  chooseHealTarget(user) {}
  chooseBlockTarget(user) {}
  pickThreePlayers() {}
  sendToPlayer(user, data) {}
}
