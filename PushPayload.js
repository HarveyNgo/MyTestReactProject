'use strict';
import React, { Component } from 'react';
//import buffer from 'buffer'

import {
  Text,
  View,
  Image,
  ListView, 
} from 'react-native';

var buffer = require('buffer');


var FeedItem = require('./FeedItem');
var moment = require('moment')

class PushPayload extends Component {

	constructor(props){
		super(props);
		
		let ds = new ListView.DataSource({
		    rowHasChanged: (r1, r2) => {
		        return (!isEqual(r1, r2))
		    }
		});

		this.state = {
			data: ds,
		};
	}

	render(){
		return (
			<View style={{
				flex: 1,
				paddingTop: 80,
				justifyContent: 'flex-start',
				alignItems: 'center'
			}}>
				<Text>Hello </Text>
			</View>
		);
	}

}


module.exports = PushPayload;


