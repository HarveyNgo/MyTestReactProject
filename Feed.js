'use strict';
import React, { Component } from 'react';
//import buffer from 'buffer'

import {
  Text,
  View,
  ListView
} from 'react-native';

var buffer = require('buffer');
let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => {
        return (!isEqual(r1, r2))
    }
});

//var FeedItem11 = require('./FeedItem');

class Feed extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			data: ['a'],
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
				//var feedModels = FeedItem11.convertFeedList(feedItems);
				this.setState({
					data: feedItems
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
				{rowData.id}
			</Text>
			);
	}

	render(){
		return(
			<View style={{
				flex: 1,
				justifyContent: 'flex-start'
			}}>
				<ListView
					dataSource={ds.cloneWithRows(this.state.data)}
					renderRow={this.renderRow.bind(this)} />
			</View>
		);
	}

}


module.exports = Feed;


