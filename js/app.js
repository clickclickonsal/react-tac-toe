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
			<div>
				<div id="game">
					{ this.state.tiles.map(function(tile, position){
						console.log(position)
						console.log(this.state.playerTurn)
						return (
							<Tile status={tile} key={position} turn={this.state.playerTurn} />
						)
					}, this)}
				</div>
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