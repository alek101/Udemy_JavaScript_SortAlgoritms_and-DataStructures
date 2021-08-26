

class HashTable {
  constructor(size = 53){
    this.keyMap = new Array (size);
  }

  _hash(key) {
    let total = 0;
    const WIERD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WIERD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    const hashedKey = this._hash(key);
    const insert = [key, value];
    if(this.keyMap[hashedKey] == null){
      this.keyMap[hashedKey] = [insert];
    } else {
      this.keyMap[hashedKey].push(insert);
    }
  }

  get(key) {
    const hashedKey = this._hash(key);
    const res = this.keyMap[hashedKey];
    if (!res) return undefined;
    for (let member of res){
      if(member[0] === key) return member;
    }
    return undefined;
  }

  keys() {
    const keys = [];
    for(let km of this.keyMap){
      if(km){
        for(let member of km){
        keys.push(member[0])
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for(let km of this.keyMap){
      if(km){
        for(let member of km){
        values.push(member[1])
        }
      }
    }
    return values;
  }

}

const hashTable = new HashTable();
// console.log(hashTable.keyMap)
hashTable.set('pink',5);
// console.log(hashTable.keyMap)
hashTable.set('yellow',15);
console.log(hashTable.get('pink'));
console.log(hashTable.get('frewfewfewf'));
console.log(hashTable.keys());
console.log(hashTable.values());