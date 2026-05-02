export const Roles = {
  Killer: {
    name: "Killer",
    alignment: "evil",
    description: "Eliminate one player each round.",
    
    ability(game, user) {
      if (user.blocked) return;

      const target = game.chooseKillerTarget(user);
      game.markForDeath(target);
    }
  },

  Detective: {
    name: "Detective",
    alignment: "good",
    description: "Investigate 3 players each round; 1 is evil or good.",
    
    ability(game, user) {
      if (user.blocked) return;

      const picks = game.pickThreePlayers();
      const results = picks.map(p => ({
        name: p.name,
        alignment: game.getAlignment(p.roleName)
      }));

      game.sendToPlayer(user, results);
    }
  },

  Doctor: {
    name: "Doctor",
    alignment: "good",
    description: "Protect one player from death each round.",
    
    ability(game, user) {
      if (user.blocked) return;

      const target = game.chooseHealTarget(user);
      target.protected = true;
    }
  },

  Witch: {
    name: "Witch",
    alignment: "neutral",
    description: "Block one player's ability for a round.",
    
    ability(game, user) {
      const target = game.chooseBlockTarget(user);
      target.blocked = true;
    }
  },

  Innocent: {
    name: "Innocent",
    alignment: "neutral",
    description: "No ability.",
    
    ability() {
      // does nothing
    }
  }
};
