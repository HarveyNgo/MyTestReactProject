'use strict';
import React, { Component } from 'react';
//import buffer from 'buffer'

import {
  Text,
  View,
  StyleSheet,	
  TabBarIOS,
  NavigatorIOS
} from 'react-native';

var Feed = require('./Feed');
var Search = require('./Search');

class AppContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			selectedTab: 'feed'
		}
	}
	render(){
		return(
			<TabBarIOS style={styles.container}>
				<TabBarIOS.Item
					title='Feed'
					selected={this.state.selectedTab == 'feed'}
					icon={require('./inbox.png')}
					onPress={()=> this.setState({selectedTab: 'feed'})}>
						<NavigatorIOS 
							style={{flex: 1}}
							initialRoute={{component: Feed, title: 'Feed' }} />					
				</TabBarIOS.Item>	
				<TabBarIOS.Item
					title='Search'
					selected={this.state.selectedTab == 'search'}
					icon={require('./search.png')}
					onPress={()=> this.setState({selectedTab: 'search'})}>
					<NavigatorIOS 
							style={{flex: 1}}
							initialRoute={{component: Search, title: 'Search' }} />
				</TabBarIOS.Item>	
			</TabBarIOS>
		);
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
 
});

module.exports = AppContainer;


