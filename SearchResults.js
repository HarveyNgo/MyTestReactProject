'use strict';
import React, { Component } from 'react';
//import buffer from 'buffer'

import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ListView,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

var buffer = require('buffer');


class SearchResults extends Component {

	constructor(props){
		super(props);
		
		let ds = new ListView.DataSource({
		    rowHasChanged: (r1, r2) => {
		        return (!isEqual(r1, r2))
		    }
		});

		this.state = {
			data: ds,
			showProgress: true,
			searchQuery: props.searchQuery
		};
	}

	componentDidMount(){
		this.doSearch();
	}

	doSearch(){
		var url = 'https://api.github.com/search/repositories?q='
			+ encodeURIComponent(this.state.searchQuery); 

		fetch(url)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					repositories: responseData.repositories,
					data: this.state.data.cloneWithRows(responseData.items),
					showProgress: false
				});
			})
			.finally(() => {
				this.setState({
					showProgress: false
				});
			});	
	}

	renderRow(rowData){
		

		return (
			<View style={{
				padding: 20,
				borderColor: '#d7d7d7',
				borderBottomWidth: 1,
				backgroundColor: '#fff'
			}}>
					<Text style={{
						fontSize: 20,
						fontWeight: '600'
					}}>
						{rowData.full_name}
					</Text>
					<View style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 20,
						marginBottom: 20
					}}>
						<View style={styles.repoCell}>
							<Image source={require('./star.png')}
								style={styles.repoCellIcon}></Image>
							<Text style={styles.repoCellLabel}>
								{rowData.stargazers_count}
							</Text>
						</View>

						<View style={styles.repoCell}>
							<Image source={require('./fork.png')}
								style={styles.repoCellIcon}></Image>
							<Text style={styles.repoCellLabel}>
								{rowData.forks}
							</Text>
						</View>

						<View style={styles.repoCell}>
							<Image source={require('./issue.png')}
								style={styles.repoCellIcon}></Image>
							<Text style={styles.repoCellLabel}>
								{rowData.open_issues}
							</Text>
						</View>

					</View>
				</View>
			);
	}

	render(){
		if(this.state.showProgress){
			return (
				<View style={{flex: 1, justifyContent: 'center'}}>
					<ActivityIndicator 
						size='large'
						animating={true} />
				</View>
				);
		}
		return(
			<View style={{
				flex: 1,
				justifyContent: 'flex-start'
				}}>
				<ListView
					dataSource={this.state.data}
					renderRow={this.renderRow.bind(this)} />
			</View>
		);
	}

}

var styles = StyleSheet.create({
	repoCell:{
		width: 50,
		alignItems: 'center'
	},
	repoCellIcon:{
		width: 20,
		height: 20
	},
	repoCellLabel:{
		textAlign: 'center'
	}
});
module.exports = SearchResults;


