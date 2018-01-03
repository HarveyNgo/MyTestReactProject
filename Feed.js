'use strict';
import React, { Component } from 'react';
//import buffer from 'buffer'

import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ListView,
  TouchableHighLight
} from 'react-native';

var buffer = require('buffer');


var FeedItem = require('./FeedItem');
var moment = require('moment')
var PushPayload = require('./PushPayload')

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

	pressRow(rowData){
		// this.props.navigator.push({
		// 	title: "PushEvent",
		// 	component: PushPayload,
		// 	passProps:{
		// 		pushEvent: rowData 
		// 	}
		// });
	}
	renderRow(rowData){
		

		return (
			

				<View style={{flex: 1,
					flexDirection: 'row',
					padding: 20,
					alignItems:'center',
					borderColor: '#d7d7d7',
					borderBottomWidth: 1
					}}>
						<Image 
							source={{uri: rowData.actor.avatar_url}}
							style={{
								height: 36,
								width: 36,
								borderRadius: 18
							}} />
						<View style={{	paddingLeft: 20}} >
							<Text style={{backgroundColor: '#fff'}}>
								{moment(rowData.created_at).fromNow()}
							</Text>
							<Text style={{backgroundColor: '#fff'}}>
								{rowData.actor.login} push to
							</Text>
							<Text style={{backgroundColor: '#fff'}}>
								{rowData.payload.ref.replace('refs/heads/','')}
							</Text>
							<Text style={{backgroundColor: '#fff'}}>
								at <Text style={{ fontWeight: '600' }}>
										{rowData.repo.name}
									</Text>
							</Text>
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


module.exports = Feed;


