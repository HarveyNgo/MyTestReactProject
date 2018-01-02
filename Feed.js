'use strict';
import React, { Component } from 'react';
//import buffer from 'buffer'

import {
  Text,
  View,
  ActivityIndicator,
  ListView
} from 'react-native';

var buffer = require('buffer');


var FeedItem = require('./FeedItem');

class Feed extends Component {

	constructor(props){
		super(props);
		
		let ds = new ListView.DataSource({
		    rowHasChanged: (r1, r2) => {
		        return (!isEqual(r1, r2))
		    }
		});

		this.state = {
			data: ds,
			showProgress: true
		};
	}

	componentDidMount(){
		this.fetchFeed();
	}

	fetchFeed(){
		require('./AuthService').getAuthInfo((err,authInfo) =>{
			var url = 'https://api.github.com/users/' 
				+ authInfo.user.login
				+ '/received_events';

			fetch(url, {
				headers: authInfo.header
			})
			.then((response) => response.json())
			.then((responseData) => {
				var feedItems = 
					responseData.filter((ev)=> ev.type == 'PushEvent');
				var feedModels = FeedItem.convertFeedList(feedItems);
				this.setState({
					data: this.state.data.cloneWithRows(feedModels),
					showProgress: false
				});
			})
		});
	}

	renderRow(rowData){
		

		return (
			<Text style={{
				color: '#333',
				backgroundColor: '#fff',
				alignSelf: 'center'
			}}>
				{rowData.actor.login}
			</Text>
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


module.exports = Feed;


