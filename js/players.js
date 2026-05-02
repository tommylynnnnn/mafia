export class Player {
  constructor(id, name, roleName, isHuman = false) {
    this.id = id;
    this.name = name;
    this.roleName = roleName;
    this.isHuman = isHuman;
    this.alive = true;

    this.blocked = false;
    this.protected = false;
  }
}
