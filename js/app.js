/**
	* @jsx React.DOM
*/
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
var Game = React.createClass({
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
			winner: ''
		}
	},
	checkForWinner: function(player){
		var wintable = [ [0,1,2], [0,4,8], [0,3,6], [1,4,7], [2,4,6], [2,5,8], [3,4,5], [6,7,8] ]
		var playedTiles = []
		var playedXs = []
		var playedOs = []
		var winner = ''

		{this.state.tiles.map(function(tile, position){
			if(tile === 'X'){
				playedTiles.push(tile)
				playedXs.push(position)
			}
			else if(tile === "O"){
				playedTiles.push(tile)
				playedOs.push(position)
			}
		}, this)}

		for(var i = 0; i < wintable.length; i++){
			if(playedXs.containsArray(wintable[i]) || playedOs.containsArray(wintable[i])){
				winner += player
				this.setState({winner:player})
				alert("Player " + player + " Wins")
			}
		}
		if(playedTiles.length === 9 && winner == ''){
			alert("It's a Tie!")
		}
	},
	tileClick: function(position, player){
		var tiles = this.state.tiles
		// If the selected tile is already filled, return to prevent it being replaced.
		if(this.state.winner) return
		if( tiles[position] === "X" || tiles[position] === "O") return
		tiles[position] = player
		this.setState({tiles:tiles, turn: player === 'O' ? 'X' : 'O'})
		this.checkForWinner(player)
	},
	render: function(){
		return (
			<div id="game">
				<Menu turn={this.state.turn} />
				{ this.state.tiles.map(function(tile, position){
					return (
						<Tile status={tile} key={position} turn={this.state.turn} tileClick={this.tileClick} />
					)
				}, this)}
			</div>
		)
	}
});

var Tile = React.createClass({
	clickHandler: function(){
		this.props.tileClick(this._mountIndex - 1, this.props.turn)
	},
	render: function(){
		return (
			<div className={this.props.status === '' ? 'tile' : 'tile status-' + this.props.status} onClick={this.clickHandler}>{this.props.status}</div>
		)
	}
});

var Menu = React.createClass({
	render: function() {
		return (
			<h2>"Player {this.props.turn}'s Turn"</h2>
		)
	}
});

React.render(<Game />, document.getElementById('board-container'));