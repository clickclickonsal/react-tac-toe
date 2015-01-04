/**
	* @jsx React.DOM
*/

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
		}
	},
	checkForWinner: function(){
		var playedTiles = []
		console.log("hi")
		{this.state.tiles.map(function(tile, position){
			if(tile !== ''){
				playedTiles.push(tile)
			}
			if(tile)
		}, this)}
		if(playedTiles.length === 9){
			alert("It's a Tie!")
		}
	},
	tileClick: function(position, player){
		var tiles = this.state.tiles
		// If the selected tile is already filled, return to prevent it being replaced.
		if ( tiles[position] === "X" || tiles[position] === "O") return
		tiles[position] = player
		this.setState({tiles:tiles, turn: player === 'O' ? 'X' : 'O'})
		this.checkForWinner()
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