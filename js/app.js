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
			// O Goes first
			playerTurn: 'O'
		}
	},
	render: function(){
		return (
			<div id="game">
				{ this.state.tiles.map(function(tile, position){
					console.log(position)
					return (
						<Tile status={tile} key={position} turn={this.state.playerTurn} />
					)
				}, this)}
			</div>
		)
	}
});

var Tile = React.createClass({
	render: function(){
		return (
			<div className={this.props.status === '' ? 'tile' : 'tile status-' + this.props.status}>{this.props.status}</div>
		)
	}
});

React.render(<Game />, document.getElementById('board-container'));