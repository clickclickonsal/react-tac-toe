/**
	* @jsx React.DOM
*/
// Using this code to be able to compare two arrays, able to using containsArray() method.
Array.prototype.containsArray = function ( array /*, index, last*/ ) { //http://jsfiddle.net/ThinkingStiff/X9jed/
    if( arguments[1] ) {
        var index = arguments[1], last = arguments[2];
    } else {
        var index = 0, last = 0; this.sort(); array.sort();
    };
    
    return index == array.length
        || ( last = this.indexOf( array[index], last ) ) > -1
        && this.containsArray(array, ++index, ++last );
};

// Tic Tac Toe board container
var Game = React.createClass({displayName: "Game",
	getInitialState: function(){
		return {
			// Initial state of the game board.
			tiles: [
				'', '', '',
				'', '', '',
				'', '', ''
			],
			// X Goes first
			turn: 'X',
			winner: '',
			xwins: 0,
			owins: 0
		}
	},
	resetGame: function(){
		this.setState(this.getInitialState());
	},
	checkForWinner: function(player){
		// All possible winning combinations 
		var wintable = [ [0,1,2], [0,4,8], [0,3,6], [1,4,7], [2,4,6], [2,5,8], [3,4,5], [6,7,8] ]
		var playedXs = []
		var playedOs = []
		var winner = ''

		{this.state.tiles.map(function(tile, position){
			if(tile === 'X'){
				playedXs.push(position)
			}
			else if(tile === "O"){
				playedOs.push(position)
			}
		}, this)}

		// Checks if the playedXs or playedOs matches any of the combos in the wintable array
		for(var i = 0; i < wintable.length; i++){
			if(playedXs.containsArray(wintable[i]) || playedOs.containsArray(wintable[i])){
				winner += player
				this.setState({winner:player})
				if(player === 'X'){
					this.setState({xwins: xwins + 1})
				}
				else{
					this.setState({owins: owins + 1})
				}
				alert("Player " + player + " Wins")
			}
		}
		//  checks for tie by seeing if all spaces are occupied and if no winner is present
		if( (playedXs.length + playedOs.length) === 9 && winner == ''){
			alert("It's a Tie!")
		}
	},
	tileClick: function(position, player){
		var tiles = this.state.tiles
		// If the selected tile is already filled, return to prevent it being replaced.
		if(this.state.winner) return
		if( tiles[position] === "X" || tiles[position] === "O") return
		tiles[position] = player
		// changes player turn 
		this.setState({tiles:tiles, turn: player === 'O' ? 'X' : 'O'})
		this.checkForWinner(player)
	},
	render: function(){
		return (
			React.createElement("div", {id: "game"}, 
				React.createElement(Menu, {turn: this.state.turn, resetAction: this.resetGame}), 
				 this.state.tiles.map(function(tile, position){
					return (
						React.createElement(Tile, {status: tile, key: position, turn: this.state.turn, tileClick: this.tileClick})
					)
				}, this), 
				React.createElement("div", {className: this.state.xwins}, 
					React.createElement("span", null, "Score"), 
					React.createElement("div", null, "X", React.createElement("br", null), this.state.xwins), 
					React.createElement("div", null, "O", React.createElement("br", null), this.state.owins)
				)
			)
		)
	}
});

var Tile = React.createClass({displayName: "Tile",
	clickHandler: function(){
		this.props.tileClick(this._mountIndex - 1, this.props.turn)
	},
	render: function(){
		return (
			React.createElement("div", {className: this.props.status === '' ? 'tile' : 'tile status-' + this.props.status, onClick: this.clickHandler}, this.props.status)
		)
	}
});

var Menu = React.createClass({displayName: "Menu",
	render: function() {
		return (
			React.createElement("div", {id: "menu"}, 
				React.createElement("h2", null, "\"Player ", this.props.turn, "'s Turn\""), 
				React.createElement("button", {onClick: this.props.resetAction}, "Reset Game")
			)
		)
	}
});

React.render(React.createElement(Game, null), document.getElementById('board-container'));