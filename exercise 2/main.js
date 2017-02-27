//Assuming its a standard game with 52 cards and 4 suites

var Players= []; //Global list of Players Objects

/**
 * Prototype for card
 * @param suit
 * @param name
 * @param value
 * @param weight
 * @constructor
 */
var Card = function(suit, names, value, weight){
    this.suit = suit;
    this.names = names;
    this.value = value;
};

Card.suit = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
Card.names = ['Ace', 'Two', 'Three',"Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen", "King" ,"Joker"];
Card.value = [{'Ace': 1},{2:2},{3:3},{4:4},{5:5},{6:6},{7: 7},{8: 8},{9: 9},{10: 10},{'Jack': 11},{'Queen': 12},{'King': 13},{"Joker":0}];
Card.weight = []; //optional This would as per the rules of the game


/**
 * @description Prints out all the cards
 * @returns {*}
 */
Card.prototype.toString= function(){
    if(this.names !== -1 && this.suit !== -1){
        return Card.names[this.names] + ' of ' + Card.suit[this.suit];
    }else{
        return new Error("Invalid card: Name or Suit not found");
    }
};

/**
 * Deck prototype
 * @param Joker -> needs to be a binary value to include or exclude the Joker from the game
 * @constructor
 */
var Deck = function(Joker){
    var cards = [];
    for(var suit = 0; suit < Card.suit.length; suit++){
        for(var name = 0; name < Card.name.length - Joker; name++){
            cards.push(new Card(suit, name));
        }
    }
    this.cards = cards;
};

/**
 * @description Prints out a deck of cards
 * @returns {Array}
 */
Deck.prototype.toString = function (){
    return this.cards.map(function (card){
        return card.toString();
    });
};

/**
 * @description Returns a random deck of cards after shuffling
 * Could be implemented as either a block shuffle or a single card shuffle
 * @returns {Array}
 */
Deck.prototype.shuffle = function(){
    return this.cards;
};

/**
 * @description Deals a deck amongst players
 * @param players
 */
Deck.prototype.deal = function (players) {
    for(var i = 0; i < 4;i++) {
        Players[i] = new Player(players[i],i + 1);
    }
    this.shuffle();
    var arr = this.toString();

    while(arr.length !== 0){
        for(var j = 0; j< Players.length;j++){
            Players[j].deck.push(arr.pop());
        }
    }
};

/**
 * Player prototype
 * @param name
 * @param id
 * @constructor
 */
var Player = function(name, id){
    this.name = name;
    this.id = id;
    this.deck = [];
    this.bid = 0;
    this.score = 0;
    this.passed = false;
    this.Won = false;
};

/**
 * @description Returns player's name and id
 * @returns {string}
 */
Player.prototype.toString = function () {
    return 'PLAYER ' + this.name + ' ID: '+this.id;
};

/**
 * @description Prints a player's deck
 * @returns {string}
 */
Player.prototype.printDeck = function () {
    return 'PLAYER ' + this.name + ' with deck ' + this.deck.toString().split(',');
};
/**
 * @description Place a players bid
 * @returns {string}
 */
Player.prototype.bid = function (bidValue) {
    this.bid = bidValue;
    this.passed = false;
    return 'PLAYER ' + this.name + ' has bid '+this.bid;
};

/**
 * @description Prints a player's pass
 * @returns {string}
 */
Player.prototype.pass = function () {
    this.passed = true;
    return 'PLAYER ' + this.name + ' has passed this try';
};

/**
 * @description Removes a player from the list of Players array
 * @returns {string}
 */
Player.prototype.quit = function () {
    return 'PLAYER ' + this.name + ' has quit';
};

/**
 * Bidder Prototype
 * @param BidderList
 * @constructor
 */
var Bidders = function(BidderList) {
    this.bidders = BidderList;
    this.compareBids(this.bidders)
};

/**
 * @description Given a list of Players and their bids, compare and find the winner
 * @returns {Object} of type Player (Winner)
 */
Bidders.prototype.compareBids = function(bidders){
    return {};
};

/**
 * Game prototype
 * @param name -> Name of the type of card game to be played example: Poker, BlackJack
 * @constructor
 */
var Game = function(name, players){
    this.name = name; //name of the game
    this.players = players; // names of players
    this.init();
    setInterval(function(){ if(Players.length <= 0){
        this.abort('All players have quit');
    } }, 30000);
};

/**
 * @description Initializes a game and a deck
 */
Game.prototype.init = function(){
    var rules = new Rules(this.name);
    if(this.players.length > rules.MinPlayers && this.players.length < rules.MaxPlayers){
        //start deck
        var d = new Deck(rules.Joker);
        d.deal();
    }else{
        this.abort('Not enough ');
    }
};

/**
 * @description Stops a game
 * @param winner
 * @returns {string}
 */
Game.prototype.stop = function(winner){
   var msg = 'Game has ended';
   if(winner){
       msg += 'Winner is '+ winner;
   }
   this.players = [];
   Players = {}; //destroy all players in the global scope
   return msg;
};

Game.prototype.abort = function(msg){
    return msg;
};

/**
 * Rules Prototype
 * @constructor
 */
var Rules = function(){
    this.MaxPlayers = 0;
    this.MinPlayers = 0;
    this.Joker = 1; //remove Joker
    this.win = '';
};
/**
 * @description returns a rules object based on the name of the game
 * @param name
 * @returns {{MaxPlayers: number, MinPlayers: number, win: string}}
 */
Rules.prototype.getRules = function(name){

    // Could be a switch case that is based on a given game's name and returns
    // max players, winning condition. Will return an Object ex: Poker
    return {"MaxPlayers": 10,"MinPlayers":3, "win":"Be the last player standing"}
};
