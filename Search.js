'use strict';
import React, { Component } from 'react';
//import buffer from 'buffer'

import {
  Image,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

 var SearchResults = require('./SearchResults');

 class Search extends Component {

	constructor(props){
		super(props);
		this.state = {
		}
	}

	render(){
		return(
			<View style={styles.container}>
				<TextInput
					onChangeText={(text) => this.setState({searchQuery: text})}
					style={styles.input}				
					placeholder="Search Query" />
				<TouchableHighlight
					onPress={this.onSearchPressed.bind(this)} 
					style= {styles.button}>
					<Text style={styles.buttonText}>Search</Text>
				</TouchableHighlight>

				
			</View>
		);
	}

	onSearchPressed(){
		console.log('Attempting to search for '+ this.state.searchQuery)
		this.props.navigator.push({
			component: SearchResults,
			title: 'Results',
			passProps:{
				searchQuery: this.state.searchQuery
			}
		});
	}
}


const styles = StyleSheet.create({
	container:{
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop:  100,
		alignItems: 'center',
		padding: 10
	},	
	logo:{
		width: 66,
		height: 55
	},
	heading:{
		fontSize: 30,
		marginTop: 10
	},
	input: {
		height: 50,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48bbec',
		borderRadius: 0,
		alignSelf: 'stretch'
	},
	button:{
		height: 50,
		backgroundColor: '#48bbec',
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center'
	},
	buttonText:{
		 fontSize: 22,
		 color: '#FFFF',
		 alignSelf: 'center'	
	}
});
module.exports = Search;

	
